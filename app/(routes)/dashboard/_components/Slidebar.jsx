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
  getDocs,
  setDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Sidebar() {
  const [showDialog, setShowDialog] = useState(false);
  const [secretCode, setSecretCode] = useState(["", "", "", "", "", ""]);
  const [targetOrg, setTargetOrg] = useState(null);
  const [error, setError] = useState("");
  const [connections, setConnections] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userOrgCode, setUserOrgCode] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch current user's org secret code
        const orgSnap = await getDocs(
          query(
            collection(db, "organizations"),
            where("uid", "==", currentUser.uid)
          )
        );
        if (!orgSnap.empty) {
          setUserOrgCode(orgSnap.docs[0].data().orgId);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q1 = query(
      collection(db, "connections"),
      where("from_uid", "==", user.uid),
      where("status", "==", "accepted")
    );

    const q2 = query(
      collection(db, "connections"),
      where("to_uid", "==", user.uid),
      where("status", "==", "accepted")
    );

    const unsub1 = onSnapshot(q1, async (snapshot) => {
      const list1 = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          // if user is from_uid, other user is to_uid
          const otherOrgSnap = await getDocs(
            query(
              collection(db, "organizations"),
              where("uid", "==", data.to_uid)
            )
          );
          const otherOrg = otherOrgSnap.docs[0]?.data() || {};
          return { id: doc.id, ...data, otherOrg };
        })
      );
      setConnections((prev) => {
        // merge or just set for now
        // We'll merge with q2 next
        return [...list1];
      });
    });

    const unsub2 = onSnapshot(q2, async (snapshot) => {
      const list2 = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          // if user is to_uid, other user is from_uid
          const otherOrgSnap = await getDocs(
            query(
              collection(db, "organizations"),
              where("uid", "==", data.from_uid)
            )
          );
          const otherOrg = otherOrgSnap.docs[0]?.data() || {};
          return { id: doc.id, ...data, otherOrg };
        })
      );
      setConnections((prev) => {
        // merge list2 with existing connections
        const combined = [...prev];
        list2.forEach((item) => {
          if (!combined.find((conn) => conn.id === item.id)) {
            combined.push(item);
          }
        });
        return combined;
      });
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, [user]);

useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "connections"),
    where("status", "==", "accepted"),
    where("from_uid", "==", user.uid)
  );

  const q2 = query(
    collection(db, "connections"),
    where("status", "==", "accepted"),
    where("to_uid", "==", user.uid)
  );

  // We'll fetch connections where user is either from_uid or to_uid
  // Then fetch other org details for each connection

  const unsub1 = onSnapshot(q, async (snapshot) => {
    const conns = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        // user is from_uid, so other user is to_uid
        const otherUid = data.to_uid;
        // fetch other org
        const otherOrgSnap = await getDocs(
          query(collection(db, "organizations"), where("uid", "==", otherUid))
        );
        const otherOrg = otherOrgSnap.docs[0]?.data() || {};
        return { id: doc.id, ...data, otherOrg };
      })
    );
    setConnections((prev) => {
      // Combine with existing but avoid duplicates
      const merged = [...prev];
      conns.forEach((c) => {
        if (!merged.find((conn) => conn.id === c.id)) merged.push(c);
      });
      return merged;
    });
  });

  const unsub2 = onSnapshot(q2, async (snapshot) => {
    const conns = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        // user is to_uid, so other user is from_uid
        const otherUid = data.from_uid;
        // fetch other org
        const otherOrgSnap = await getDocs(
          query(collection(db, "organizations"), where("uid", "==", otherUid))
        );
        const otherOrg = otherOrgSnap.docs[0]?.data() || {};
        return { id: doc.id, ...data, otherOrg };
      })
    );
    setConnections((prev) => {
      // Combine with existing but avoid duplicates
      const merged = [...prev];
      conns.forEach((c) => {
        if (!merged.find((conn) => conn.id === c.id)) merged.push(c);
      });
      return merged;
    });
  });

  return () => {
    unsub1();
    unsub2();
  };
}, [user]);


  const handleSecretCodeSubmit = async () => {
    setError("");
    setLoading(true);
    const joined = secretCode.join("");
    if (joined.length !== 6) {
      setError("Please enter full 6-digit code.");
      setLoading(false);
      return;
    }

    try {
      // Check if connection already exists in either direction
      const connQuery = query(
        collection(db, "connections"),
        where("from_secret", "in", [userOrgCode, joined]),
        where("to_secret", "in", [joined, userOrgCode])
      );
      const connSnapshot = await getDocs(connQuery);
      const exists = connSnapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          (data.from_secret === userOrgCode && data.to_secret === joined) ||
          (data.from_secret === joined && data.to_secret === userOrgCode)
        );
      });

      if (exists) {
        setError("Connection already exists.");
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "organizations"),
        where("orgId", "==", joined)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid organization code.");
        setLoading(false);
        return;
      }

      const docSnap = querySnapshot.docs[0];
      setTargetOrg({ id: docSnap.id, ...docSnap.data() });
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  const handleSendRequest = async () => {
    if (!user || !targetOrg) return;
    setLoading(true);
    try {
      const connRef = doc(collection(db, "connections"));
      await setDoc(connRef, {
        from_uid: user.uid,
        to_uid: targetOrg.uid,
        from_secret: userOrgCode,
        to_secret: targetOrg.orgId,
        status: "pending",
        req_from: "accepted",
        req_to: "pending",
        messages: [],
      });
      setShowDialog(false);
      setSecretCode(["", "", "", "", "", ""]);
      setTargetOrg(null);
    } catch (err) {
      console.error(err);
      setError("Error sending request.");
    }
    setLoading(false);
  };
  const handleAcceptRequest = async (id) => {
    await updateDoc(doc(db, "connections", id), {
      req_to: "accepted",
      status: "accepted",
    });
    setShowNotifications(false);
  };

  return (
    <aside className="w-full md:w-72 bg-white dark:bg-slate-900 shadow-md h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <Link href={"/dashboard/profile"} className="text-xl   text- rounded-sm font-semibold text-slate-800 dark:text-white">
            Profile
          </Link>
        </div>
        <div className="relative flex items-center gap-3">
          {pendingRequests.length > 0 && (
            <span className="absolute top-0 right-0 -mt-2 mr-6 inline-flex items-center justify-center px-1.5 py-0.5 text-[8px]   font-bold leading-none text-white  bg-red-600 rounded-full">
              {pendingRequests.length}
            </span>
          )}
          <Bell
            className={`w-5 h-5 cursor-pointer ${
              pendingRequests.length > 0
                ? "text-red-500 animate-pulse"
                : "text-slate-600 dark:text-white"
            }`}
            onClick={() => setShowNotifications(!showNotifications)}
          />

          <Plus
            className="w-5 h-5 text-slate-600 dark:text-white cursor-pointer"
            onClick={() => setShowDialog(true)}
          />
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
        {connections.map((conn) => (
          <div
            key={conn.id}
            className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer border-b dark:border-slate-700"
          >
            <Link href={"dashboard/"+conn.id}><h4 className="text-slate-800 dark:text-white font-medium">
              {conn.otherOrg?.name  || "Unknown"}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-300 truncate">
              {conn.status}
            </p></Link>
            
          </div>
        ))}
      </div>

      {/* Notifications */}
      {showNotifications && pendingRequests.length > 0 && (
        <div className="fixed inset-0  bg-opacity-20 flex items-center justify-center z-50">
          <div className=" pl-4 bg-slate-900  pr-12 pt-5 pb-5 rounded-lg">
            {" "}
            <h3 className="text-xl font-semibold text-white mb-2">
              Pending Requests
            </h3>
            {pendingRequests.map((req) => (
              <div key={req.id} className="mb-2">
                <p className="text-slate-700 dark:text-white">
                  {req.name} ({req.code})
                </p>
                <button
                  onClick={() => handleAcceptRequest(req.id)}
                  className="text-sm bg-slate-800 text-white px-2 py-1 mt-1 rounded hover:bg-slate-700"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
              Connect via Secret Code
            </h2>
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
                        const nextInput = document.getElementById(
                          `otp-${idx + 1}`
                        );
                        if (e.target.value && nextInput) nextInput.focus();
                      }}
                      id={`otp-${idx}`}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-sm text-red-600 mb-2 text-center">
                    {error}
                  </p>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleSecretCodeSubmit}
                    className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify"}
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
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-4">
                  Organization: <strong>{targetOrg.name}</strong>
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowDialog(false)}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Request"}
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
