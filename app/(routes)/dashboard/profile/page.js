"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/app/Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orgData, setOrgData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "organizations", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrgData(docSnap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user || !orgData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600 dark:text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        Your Profile
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
          <p className="text-lg text-slate-700 dark:text-white">
            {orgData.name}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-lg text-slate-700 dark:text-white">
            {orgData.email}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Registration
          </p>
          <p className="text-lg text-slate-700 dark:text-white">
            {orgData.registrationNumber}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Secret Code
          </p>
          <p className="text-lg text-slate-700 dark:text-white">
            {orgData.orgId}
          </p>
        </div>
      </div>
    </div>
  );
}
