"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/Firebase/Firebase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // or your desired route
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-slate-800 p-8 rounded shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Login</h2>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded dark:bg-slate-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded dark:bg-slate-700 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <h2 className="text-white">Create an account <Link href={"/verification"} className="underline text-blue-500 ">here</Link></h2>
      </form>
    </div>
  );
}
