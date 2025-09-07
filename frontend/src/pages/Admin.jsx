import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const handleView = () => {
    navigate("/touristdetails"); // Redirect to IDCard page
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Lexend", "Noto Sans", sans-serif' }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          alt="background image"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHYTBL5VXFVtCvGzustPexbcB65RHiJ6Ok06g3nCZDWrQJyr6d8v2c4ArPehA2gUoKP4EgJUE0OpHjlI-Fxh6Fe3yD9PZ4BY2JpJfJp61b3U3oaYepaVI75WOvvJLES1SISNtznhtBUrM2_BeL3_l2lTfv4CFIDirpbh0h91wGSU5LNu_kj980AjgPir1UxLxpvliGqDUNd5enOGw7JmE82jF5FD3ciHuyP-Cr0R6Dtu0ILr7xxO4UG2PNz19NDhosqzr5m1mrXI2E"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      {/* Top Navbar */}
      <div className="flex-grow">
        <div className="flex items-center bg-transparent p-4 pb-2 justify-between sticky top-0 z-10">
          <button className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Admin Dashboard
          </h1>
          <div className="size-10"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Clustered Map View */}
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <h2 className="text-white font-bold text-lg mb-4">Clustered Map View</h2>
            <div className="aspect-video bg-gray-700/50 rounded-lg">
              <img
                alt="Map view of tourists"
                className="w-full h-full object-cover rounded-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnKceOfCBvxgVAuFHnrCCirbaZFO0KLRVfYSCivcKSvOzpHvi-NlK7yV5pJpIN6LKX5l7QD_L2qZ8giTaH4CoeIKpLaxHY-mPbyWFXv-o7O1LRpPekwNsVc1UhSE0r_21pm1jhxIHyfIqOnhTOqYrvPkJUxK5CKvtpoLx9J87y_TsBEC-D54VCPDVVZsUhvFRTY3ozcrbECMKmKf4TsCXEuo_76h5_YegwFpsM7Ym4Q_TKuFx5OspkFwRo54vVTe0bYS0FRlkoM1DL"
              />
            </div>
          </div>

          {/* Tourist Details */}
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <h2 className="text-white font-bold text-lg mb-4">Tourist Details</h2>
            <div className="space-y-4">
              {/* Tourist 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Ethan Carter"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQYvI8dVqoLDW64wUG3n69sdFPSds4QcCm9hEexDCZtO0151Ws0DPH_D2oa6bgrHnIrnbwFuYNkvvjxdB3Zz5W5kx-8EFvOvBORUnoTWVKYavEclmBKfKaam7vhmW_xIrcPbGOG5oSDXc9IFZYZgFO1ihINqE5JrujS_ZXvcQHxeQ9lePxhpRUqMVsmCiGZx74JlLCym9voLV4xK0HSY2kQ-TUOBGP_StxAfQM_DdEFyCAdYkcsaOHqqhcVzvK3Ouj44-sYo7yng1l"
                  />
                  <div>
                    <p className="text-white font-semibold">Ethan Carter</p>
                    <p className="text-gray-300 text-sm">+1-555-123-4567</p>
                  </div>
                </div>
                <button
                  onClick={handleView}
                  className="bg-[var(--primary-color)] text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base"></span>
                  View
                </button>
              </div>

              {/* Tourist 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Olivia Bennett"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6x2mxHyUnRwiP6DKeBoJ2M4fE4yIXgLJLthgyUCPUbCH-z8ixadIt8Txs_zEqjiLQHPCBknKSgqdmUeQIV7J6p3x2W2h0HYdam-3xMnEkCBmmiQoBGWtUvoI3DWb_iDZj1dt4ILz0yQJnMRlBzWmDGc1bEOJyafpfezQG3rxyeB0y0GkBrCNQbISQzTHzOYfL_1nqQAO53BT696hRzCabZgr7zKSjOVKyRnoKJQ3oqQJV85gO98xZ1JJ-X5izcpPUQYL_ErUzJZ6D"
                  />
                  <div>
                    <p className="text-white font-semibold">Olivia Bennett</p>
                    <p className="text-gray-300 text-sm">+1-555-987-6543</p>
                  </div>
                </div>
                <button
                  onClick={handleView}
                  className="bg-[var(--primary-color)] text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base"></span>
                  View
                </button>
              </div>

              {/* Tourist 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Noah Thompson"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPxrWhsp-GuRzABV5BQ1OxI9MncQoJMs2mGxQPuSCUdiBzsEKUdcUmdGizQ_iXhSQVbgWD6e0oMO6mWtRSTPiW1Z_L-2WTIuDgHEvzALe59-4wsaG5Q_bv3ve_OzLc4LQBceBNMuoBHfK6eOLrhszJHJKPlw0J97ANp1DLwolzIlMaNjZTru5PpEa3YGWp5gzeDz0ai2hsB3ps6OErwHdCPOREuaqLW3nRFLiqmTMdjVaeHe0M6UlHgfTXdaRvwMKyRj6c3QkYpC3W"
                  />
                  <div>
                    <p className="text-white font-semibold">Noah Thompson</p>
                    <p className="text-gray-300 text-sm">+1-555-246-8013</p>
                  </div>
                </div>
                <button
                  onClick={handleView}
                  className="bg-[var(--primary-color)] text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base"></span>
                  View
                </button>
              </div>

              {/* Tourist 4 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="Ava Rodriguez"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC51jHbwf9YzGzdIR3yT4gbStIXRjO10vnwbaWGZFiQ8Hd9C-aruYhvKZRQfuEefn9k_ouYpNYpcYkNHqSxkFvsfeWsNYw6UpMZpvAfEWnvti_ilK1LcdnDCz7P6ksuhdS-KgRnUMbTU7ZVQf6A3b_CDf3ma6GBzDkkplvveuv49eGzp1gi2QRcBfkovJJWwYsLsFaR4YgE4L-u8pQGDzAbajtCWT2ok73tN_7KBk9bncpBTuTDeEBaXs00i6LYxJkOr434YtwyfXAw"
                  />
                  <div>
                    <p className="text-white font-semibold">Ava Rodriguez</p>
                    <p className="text-gray-300 text-sm">+1-555-369-1470</p>
                  </div>
                </div>
                <button
                  onClick={handleView}
                  className="bg-[var(--primary-color)] text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base"></span>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="sticky bottom-0 bg-black/50 backdrop-blur-lg">
        <div className="flex gap-2 px-4 pb-3 pt-2">
          <a className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[var(--primary-color)]" href="#">
            <div className="flex h-8 w-16 items-center justify-center rounded-full bg-[var(--primary-color)]/[.15] text-[var(--primary-color)]">
              <span className="material-symbols-outlined">dashboard</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Dashboard</p>
          </a>
          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-gray-400" href="#">
            <div className="flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">group</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Tourists</p>
          </a>
          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-gray-400" href="#">
            <div className="flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Alerts</p>
          </a>
          <a className="flex flex-1 flex-col items-center justify-end gap-1 text-gray-400" href="#">
            <div className="flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">settings</span>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">Settings</p>
          </a>
        </div>
        <div className="h-3"></div>
      </div>
    </div>
  );
}
