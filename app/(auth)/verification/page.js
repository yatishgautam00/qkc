// components/OrganizationSignUp.js
"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/app/Firebase/Firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; 

export default function OrganizationSignUp() {
    const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    registrationNumber: "",
    orgId: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateUniqueOrgId = async () => {
    let unique = false;
    let orgId = "";
    while (!unique) {
      orgId = Math.floor(100000 + Math.random() * 900000).toString();
      const docRef = doc(db, "organizations", orgId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) unique = true;
    }
    return orgId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const orgId = await generateUniqueOrgId();
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "organizations", uid), {
        uid,
        name: form.name,
        registrationNumber: form.registrationNumber,
        email: form.email,
        orgId: orgId,
        verification: false,    
        createdAt: new Date().toISOString(),
      });

      setSuccess("Organization registered successfully with ID: " + orgId);
      setForm({ name: "", registrationNumber: "", orgId: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center text-slate-800">Organization Sign Up</h2>

        <div>
          <label className="block mb-1 text-slate-700">Organization Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            required
            value={form.registrationNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register Organization"}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
      </form>
    </div>
  );
}
