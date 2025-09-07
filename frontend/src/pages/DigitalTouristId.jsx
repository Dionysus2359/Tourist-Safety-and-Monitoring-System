import React from "react";
import { useNavigate } from "react-router-dom"; 

const TouristID = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-[#1a1a1a]">
      <main className="flex-grow">
        <div
          className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAt_ZYQ3apsArvgGfnX6mjRF9eh2dotLxjOcVF5PxQGXnru6PjW6jOmhPI7eYo3hUonlfgz2x3Ksvqh7c62mWMsUPle-0NzcCUgwKHRsE1C5_xgky6dZiPvIAgu9OG8eVs8JbT79xFmCt0ELE1SG9A6Ip77uwVIWo4cPrdUXH9Enr30DvjiUuMZ9YNWJbat4w7VkjFkYuS-wxRzDy-5rVgYIgZ_fs5Ego9GUwIM601EeIJ4ZWocyzk2Ctq1FbZSvNDEkzs957DhfVVz")',
          }}
        >
          <div className="w-full max-w-lg space-y-6 rounded-2xl bg-gray-900/50 p-8 backdrop-blur-md">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
                Digital Tourist ID
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-white">
              <div>
                <label className="text-sm font-medium text-gray-400">Name</label>
                <p className="font-bold">{""}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">ID No.</label>
                <p className="font-bold">{""}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Phone No.</label>
                <p className="font-bold">{""}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Status</label>
                <p className="font-bold text-[#38e07b]">{""}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Issue Date</label>
                <p className="font-bold">{""}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Expiration Date</label>
                <p className="font-bold">{""}</p>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-400">Emergency Contacts</label>
                <p>{""}</p>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-400">Public Key</label>
                <p className="font-bold break-all">{""}</p>
                <p className="text-xs text-gray-400 mt-1">
                  You can verify your ID using the public key
                </p>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-400">Signature</label>
                <div className="mt-1 h-16 w-full rounded-md bg-white/10 p-2">
                  <p className="text-lg italic text-gray-200" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    {""}
                  </p>
                </div>
              </div>

              <div className="col-span-2 mt-4 rounded-lg bg-black/50 p-4">
                <h3 className="text-lg font-bold text-white">Important Information</h3>
                <p className="mt-2 text-sm text-gray-300">
                  This digital ID is for identification purposes within the SafeTravels network. In case of emergency,
                  please present this to the relevant authorities.
                </p>
              </div>
            </div>
        
            {/* Home Button */}
            <div className="mt-4">
              <button
                className="px-4 py-2 rounded bg-[#38e07b] text-white font-semibold hover:bg-green-500"
                onClick={() => navigate("/safe")} 
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#1a1a1a] py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            <a className="text-gray-400 hover:text-white" href="#">About Us</a>
            <a className="text-gray-400 hover:text-white" href="#">Contact</a>
            <a className="text-gray-400 hover:text-white" href="#">Privacy Policy</a>
            <a className="text-gray-400 hover:text-white" href="#">Terms of Service</a>
          </div>
          <div className="mb-4 flex justify-center gap-6">{/* Social icons */}</div>
          <p className="text-sm text-gray-500">© 2024 SafeTravels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TouristID;
