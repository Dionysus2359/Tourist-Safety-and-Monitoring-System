import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt_ZYQ3apsArvgGfnX6mjRF9eh2dotLxjOcVF5PxQGXnru6PjW6jOmhPI7eYo3hUonlfgz2x3Ksvqh7c62mWMsUPle-0NzcCUgwKHRsE1C5_xgky6dZiPvIAgu9OG8eVs8JbT79xFmCt0ELE1SG9A6Ip77uwVIWo4cPrdUXH9Enr30DvjiUuMZ9YNWJbat4w7VkjFkYuS-wxRzDy-5rVgYIgZ_fs5Ego9GUwIM601EeIJ4ZWocyzk2Ctq1FbZSvNDEkzs957DhfVVz')",
      }}
    >
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-black/30 p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-white text-center">Create your account</h1>
        <div className="space-y-4">
          <input
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white"
            placeholder="Full Name"
            type="text"
          />
          <input
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white"
            placeholder="Phone Number"
            type="tel"
          />
          <input
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white"
            placeholder="Email Address"
            type="email"
          />
        </div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-600 bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          onClick={() => navigate("/emergency")}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
