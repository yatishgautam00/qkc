"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { db, auth } from "@/app/Firebase/Firebase";
import {
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Lock, MoreVertical } from "lucide-react";

export default function ChatInterface() {
  const { connectionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [connection, setConnection] = useState(null);
  const [otherUserName, setOtherUserName] = useState("");
  const [activeMessage, setActiveMessage] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [showEncryptionSteps, setShowEncryptionSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef(null);

  const steps = [
    "Readying secure channel...",
    "Generating quantum key...",
    "Encrypting with AES...",
    "Message sent!"
  ];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!connectionId || !user) return;
    const ref = doc(db, "connections", connectionId);
    const unsub = onSnapshot(ref, async (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setConnection(data);

        const filtered = (data.messages || []).filter(
          (msg) => msg.state === "Default" || msg.state === "one-time"
        );

        setMessages(
          filtered.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );

        const otherUid = user?.uid === data.from_uid ? data.to_uid : data.from_uid;
        const orgSnap = await getDoc(doc(db, "organizations", otherUid));
        setOtherUserName(orgSnap.exists() ? orgSnap.data().name : "Unknown");
      }
    });
    return () => unsub();
  }, [connectionId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || !user || !connection) return;
    setShowEncryptionSteps(true);
    setCurrentStep(0);

    const newMessage = {
      from: user.uid,
      to: user.uid === connection.from_uid ? connection.to_uid : connection.from_uid,
      date: new Date().toISOString(),
      message,
      state: "Default",
    };

    const simulateSteps = async () => {
      for (let i = 0; i < steps.length - 1; i++) {
        await new Promise((res) => setTimeout(res, 1000));
        setCurrentStep((prev) => prev + 1);
      }
      const ref = doc(db, "connections", connectionId);
      await updateDoc(ref, {
        messages: [...(connection.messages || []), newMessage],
      });
      setMessage("");
      setCurrentStep(steps.length - 1);
    };

    simulateSteps();
  };

  const updateMessageState = async (index, newState) => {
    const updatedMessages = [...connection.messages];
    updatedMessages[index].state = newState;
    const ref = doc(db, "connections", connectionId);
    await updateDoc(ref, { messages: updatedMessages });
    setShowOptionsIndex(null);
  };

  const deleteMessage = async (index) => {
    const updatedMessages = [...connection.messages];
    updatedMessages.splice(index, 1);
    const ref = doc(db, "connections", connectionId);
    await updateDoc(ref, { messages: updatedMessages });
    setShowOptionsIndex(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b text-lg font-semibold text-slate-800 dark:text-white bg-white dark:bg-slate-900">
        Chat with {otherUserName || "..."}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-slate-100 dark:bg-slate-800">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.from === user?.uid;
          const isOneTime = msg.state === "one-time";

          return (
            <div
              key={index}
              className={`relative w-max px-4 py-2 rounded-lg break-words transition ${
                isCurrentUser ? "ml-auto text-right" : "mr-auto text-left"
              } ${
                isCurrentUser ? "bg-zinc-600" : "bg-gray-600"
              } ${
                isOneTime ? "opacity-50 cursor-not-allowed" : "text-white cursor-pointer"
              }`}
              onClick={() => {
                if (!isOneTime) setActiveMessage(msg);
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> <span>Locked Message</span>
              </div>
              <div className="text-xs text-gray-300 mt-1">
                {new Date(msg.date).toLocaleString()}
              </div>
              {isCurrentUser && (
                <div className="absolute top-1 right-1">
                  <MoreVertical
                    className="w-4 h-4 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptionsIndex(showOptionsIndex === index ? null : index);
                    }}
                  />
                  {showOptionsIndex === index && (
                    <div className="absolute right-0 mt-1 w-24 bg-white dark:bg-slate-700 text-sm shadow-md rounded z-10">
                      <button
                        className="block w-full px-3 py-1 hover:bg-slate-200 dark:hover:bg-slate-600"
                        onClick={() => updateMessageState(index, "one-time")}
                      >
                        One-time
                      </button>
                      <button
                        className="block w-full px-3 py-1 hover:bg-slate-200 dark:hover:bg-slate-600"
                        onClick={() => deleteMessage(index)}
                      >
                        Destroy
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white dark:bg-slate-900 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded border px-3 py-2 outline-none dark:bg-slate-700 dark:text-white"
          placeholder="Type a message"
        />
        <button
          onClick={handleSend}
          className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
        >
          Send
        </button>
      </div>

      {/* Message Popup */}
      {activeMessage && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">Decrypted Message</h3>
            <p className="text-slate-700 dark:text-white mb-4">{activeMessage.message}</p>
            <div className="text-right">
              <button
                onClick={() => setActiveMessage(null)}
                className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Encryption Steps Modal */}
      {showEncryptionSteps && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full text-center">
            <p className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {steps[currentStep]}
            </p>
            {currentStep === steps.length - 1 && (
              <button
                onClick={() => setShowEncryptionSteps(false)}
                className="mt-4 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
