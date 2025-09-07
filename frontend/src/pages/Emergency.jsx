import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmergencyContacts() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/tripdetails"); // Redirect to TripDetails page
  };

  return (
    <div className="relative flex min-h-screen flex-col dark justify-between group/design-root overflow-x-hidden" style={{ fontFamily: "Spline Sans, Noto Sans, sans-serif" }}>
      <main className="flex-grow">
        <div
          className="flex h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAt_ZYQ3apsArvgGfnX6mjRF9eh2dotLxjOcVF5PxQGXnru6PjW6jOmhPI7eYo3hUonlfgz2x3Ksvqh7c62mWMsUPle-0NzcCUgwKHRsE1C5_xgky6dZiPvIAgu9OG8eVs8JbT79xFmCt0ELE1SG9A6Ip77uwVIWo4cPrdUXH9Enr30DvjiUuMZ9YNWJbat4w7VkjFkYuS-wxRzDy-5rVgYIgZ_fs5Ego9GUwIM601EeIJ4ZWocyzk2Ctq1FbZSvNDEkzs957DhfVVz")',
          }}
        >
          <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-black/30 p-8 backdrop-blur-sm">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Emergency Contacts</h1>
              <p className="mt-4 text-gray-300">Please provide details for two emergency contacts.</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 text-gray-400">1</div>
                <span className="text-gray-400">Basic Info</span>
              </div>
              <div className="h-px w-12 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#38e07b] text-black">2</div>
                <span className="text-white">Emergency</span>
              </div>
              <div className="h-px w-12 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 text-gray-400">3</div>
                <span className="text-gray-400">Trip</span>
              </div>
              <div className="h-px w-12 bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 text-gray-400">4</div>
                <span className="text-gray-400">KYC</span>
              </div>
            </div>

            {/* Emergency Contact Forms */}
            <div className="space-y-6">
              {/* Contact 1 */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Emergency Contact 1</h3>
                <div className="space-y-4">
                  <input
                    className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#38e07b] focus:ring-[#38e07b]"
                    placeholder="Full Name"
                    type="text"
                  />
                  <input
                    className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#38e07b] focus:ring-[#38e07b]"
                    placeholder="Relation"
                    type="text"
                  />
                  <input
                    className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#38e07b] focus:ring-[#38e07b]"
                    placeholder="Phone Number"
                    type="tel"
                  />
                </div>
              </div>

              {/* Contact 2 */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Emergency Contact 2</h3>
                <div className="space-y-4">
                  <input
                    className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#38e07b] focus:ring-[#38e07b]"
                    placeholder="Full Name"
                    type="text"
                  />
                  <input
                    className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#38e07b] focus:ring-[#38e07b]"
                    placeholder="Relation"
                    type="text"
                  />
                  <input
                    className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#38e07b] focus:ring-[#38e07b]"
                    placeholder="Phone Number"
                    type="tel"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              <button className="flex items-center justify-center gap-2 rounded-full border border-gray-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800">
                Back
              </button>
              <button
                onClick={handleNext}
                className="lex items-center justify-center gap-2 rounded-full border border-gray-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800">
              
                Next
              </button>
            </div>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a className="font-medium text-[#38e07b] hover:underline" href="#">
                Log in
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#111714] py-8 text-center">
        <div className="container mx-auto px-4">
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
          <p className="text-sm text-gray-500">© 2024 SafeTravels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
