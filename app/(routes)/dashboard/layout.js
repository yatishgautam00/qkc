// app/dashboard/layout.js
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/app/Firebase/Firebase";
import VerificationPopup from "./_components/VerificationPopup";
import Sidebar from "./_components/Slidebar";
export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check for organization verification status
        const orgDocs = await getDoc(doc(db, "organizations", user.uid));
        if (orgDocs.exists()) {
          const data = orgDocs.data();
          setIsVerified(data.verification === true);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div>
      {isVerified ? (
        <main>
              <div className="flex h-screen w-full">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">{children}</div>
                
      </div>

     
          
</main>
      ) : (
        <VerificationPopup />
      )}
    </div>
  );
}
