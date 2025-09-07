import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      {/* Hero Section */}
      <main className="flex-grow">
        <div
          className="flex flex-col items-center justify-center w-full min-h-screen"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAt_ZYQ3apsArvgGfnX6mjRF9eh2dotLxjOcVF5PxQGXnru6PjW6jOmhPI7eYo3hUonlfgz2x3Ksvqh7c62mWMsUPle-0NzcCUgwKHRsE1C5_xgky6dZiPvIAgu9OG8eVs8JbT79xFmCt0ELE1SG9A6Ip77uwVIWo4cPrdUXH9Enr30DvjiUuMZ9YNWJbat4w7VkjFkYuS-wxRzDy-5rVgYIgZ_fs5Ego9GUwIM601EeIJ4ZWocyzk2Ctq1FbZSvNDEkzs957DhfVVz")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full max-w-md space-y-8 rounded-2xl bg-black/30 p-8 backdrop-blur-sm">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
                Welcome to SafeTravels
              </h1>
              <p className="mt-4 text-gray-300">
                Your safety is our priority. Register or log in to access
                personalized safety features and real-time assistance.
              </p>
            </div>

            <div className="space-y-4">
              <button
               className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-600 bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
                onClick={() => navigate("/login")}
              >
                <span className="material-symbols-outlined"></span>
                Login
              </button>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-600 bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
                onClick={() => navigate("/register")}
              >
                <span className="material-symbols-outlined">Register</span>
              </button>

            
            <button
  className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3 text-sm font-bold text-orange-900 transition-colors hover:bg-orange-600"
  onClick={() => navigate("/adminlogin")}
>
  <span className="material-symbols-outlined"></span>
  Admin
</button>

             
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#111714] py-8 text-center">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            <a className="text-gray-400 hover:text-white" href="#">
              About Us
            </a>
            <a className="text-gray-400 hover:text-white" href="#">
              Contact
            </a>
            <a className="text-gray-400 hover:text-white" href="#">
              Privacy Policy
            </a>
            <a className="text-gray-400 hover:text-white" href="#">
              Terms of Service
            </a>
          </div>

          <p className="text-sm text-gray-500">
            © 2024 SafeTravels. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
