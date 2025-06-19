// components/Sidebar.js
"use client";
import { Bell, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { db, auth } from "@/app/Firebase/Firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Sidebar() {
  const [showDialog, setShowDialog] = useState(false);
  const [secretCode, setSecretCode] = useState(["", "", "", "", "", ""]);
  const [targetOrg, setTargetOrg] = useState(null);
  const [error, setError] = useState("");
  const [connections, setConnections] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "connections"),
      where("from_uid", "==", user.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setConnections(list);
    });
    return () => unsub();
  }, [user]);

  const handleSecretCodeSubmit = async () => {
    setError("");
    const joined = secretCode.join("");
    if (joined.length !== 6) {
      setError("Please enter full 6-digit code.");
      return;
    }
    try {
      const docRef = doc(db, "organizations", joined);
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        setError("Invalid organization code.");
        return;
      }
      setTargetOrg({ id: joined, ...snap.data() });
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  const handleSendRequest = async () => {
    if (!user || !targetOrg) return;
    const connRef = doc(collection(db, "connections"));
    await setDoc(connRef, {
      from_uid: user.uid,
      to_uid: targetOrg.uid,
      status: "pending",
      req_from: "accepted",
      req_to: "pending",
      messages: [],
    });
    setShowDialog(false);
    setSecretCode(["", "", "", "", "", ""]);
    setTargetOrg(null);
  };

  return (
    <aside className="w-full md:w-72 bg-white dark:bg-slate-900 shadow-md h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Image src="/assets/icons/logo.svg" alt="Logo" width={32} height={32} className="rounded" />
          <span className="text-lg font-semibold text-slate-800 dark:text-white">QuantumChat</span>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-slate-600 dark:text-white cursor-pointer" />
          <Plus className="w-5 h-5 text-slate-600 dark:text-white cursor-pointer" onClick={() => setShowDialog(true)} />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b dark:border-slate-700">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-2">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-300" />
          <input
            type="text"
            placeholder="Search connections"
            className="ml-2 bg-transparent outline-none text-sm w-full text-slate-700 dark:text-white"
          />
        </div>
      </div>

      {/* Connection List */}
      <div className="flex-1 overflow-y-auto">
        {connections.map((conn, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer border-b dark:border-slate-700"
          >
            <h4 className="text-slate-800 dark:text-white font-medium">{conn.name || conn.to_uid}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-300 truncate">{conn.status}</p>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black  bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Connect via Secret Code</h2>
            {!targetOrg ? (
              <>
                <div className="flex justify-center gap-2 mb-4">
                  {secretCode.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      className="w-10 h-12 text-xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      value={val}
                      onChange={(e) => {
                        const updated = [...secretCode];
                        updated[idx] = e.target.value.replace(/[^0-9]/g, "");
                        setSecretCode(updated);
                        const nextInput = document.getElementById(`otp-${idx + 1}`);
                        if (e.target.value && nextInput) nextInput.focus();
                      }}
                      id={`otp-${idx}`}
                    />
                  ))}
                </div>
                {error && <p className="text-sm text-red-600 mb-2 text-center">{error}</p>}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleSecretCodeSubmit}
                    className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => setShowDialog(false)}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-4">Organization: <strong>{targetOrg.name}</strong></p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowDialog(false)}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                  >
                    Send Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}