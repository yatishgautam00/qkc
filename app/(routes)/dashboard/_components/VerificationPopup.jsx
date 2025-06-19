"use client";


import { useRouter } from "next/navigation";

export default function VerificationPopup() {
  const router = useRouter();

  const handleContact = () => {
    // Redirect to contact or verification instructions page
    router.push("/contact-support");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl max-w-md w-full shadow-xl space-y-4 text-center border border-slate-300 dark:border-slate-700">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Account Pending Verification</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Your organization account is not yet verified. Please contact the admin or follow the verification process to access the dashboard.
        </p>
        <button onClick={handleContact} className="w-full bg-white py-2 px-23 rounded-lg mt-4">
          Contact Support
        </button>
      </div>
    </div>
  );
}
