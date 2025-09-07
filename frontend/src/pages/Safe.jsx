import React from "react";

export default function SafeTravels() {
  return (
    <div className="bg-[var(--background-dark)] text-white">
      <div className="flex h-screen w-full flex-col">
        {/* Header */}
        <header className="absolute top-0 z-20 w-full p-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="h-8 w-8 text-[var(--primary-color)]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h1 className="text-2xl font-bold tracking-tight">SafeTravels</h1>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <a
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                href="#"
              >
                Home
              </a>
              <a
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                href="#"
              >
                Explore
              </a>
              <a
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                href="#"
              >
                Alerts
              </a>
              <a
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                href="#"
              >
                Community
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                <span className="material-symbols-outlined">person</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="relative flex-1">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDB9vsrzqXEl0mRFuq7MSs5CN8MYBVvll6wvpses1ugbG3W1C07jwZxs2HM8L9tEUm6rVGcYDwC-qHRCJUOyUGYHy6DeTULodhcPbJM_eRXhwHiMIhBgt5Ll2sPpMB6u3mPSz9-HuGe2GLABGYzR3cKBGZSBADkAjZiUui0kfGfRzw822elJKfX4bLTFRmnoJLRY_KQ9ekpuwF0WXNnFzYK4NCmp3DMD2fsG5QwiXX1YgQQigkYNrvCq2RFeMKWh9dG486LLCv8QcdD")',
            }}
          ></div>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

          {/* Center content */}
          <div className="relative z-10 flex h-full items-center justify-center p-4">
            {/* Left side panel */}
            <div className="absolute left-4 top-24 w-80 space-y-4">
              {/* Search bar */}
              <div className="flex items-center rounded-full bg-[var(--surface-dark)]/80 backdrop-blur-sm shadow-lg">
                <div className="pl-4 text-white/60">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="w-full flex-1 appearance-none border-none bg-transparent py-3 pl-2 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-0"
                  placeholder="Search for a location"
                  type="text"
                />
              </div>

              {/* Map Layers */}
              <div className="space-y-2 rounded-xl bg-[var(--surface-dark)]/80 p-4 backdrop-blur-sm shadow-lg">
                <h3 className="font-semibold">Map Layers</h3>
                <div className="space-y-3 pt-2">
                  {/* High-Alert Zones */}
                  <label className="flex items-center justify-between">
                    <span className="text-sm">High-Alert Zones</span>
                    <button
                      aria-checked="false"
                      className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
                      role="switch"
                      type="button"
                    >
                      <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </label>

                  {/* Safe Routes */}
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Safe Routes</span>
                    <button
                      aria-checked="true"
                      className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[var(--primary-color)] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
                      role="switch"
                      type="button"
                    >
                      <span className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </label>

                  {/* Police Stations */}
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Police Stations</span>
                    <button
                      aria-checked="false"
                      className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)]"
                      role="switch"
                      type="button"
                    >
                      <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                    </button>
                  </label>
                </div>
              </div>
            </div>

            {/* Right side controls */}
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col overflow-hidden rounded-full bg-[var(--surface-dark)]/80 shadow-lg backdrop-blur-sm">
                  <button className="p-3 transition-colors hover:bg-white/10">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <div className="h-px bg-white/20"></div>
                  <button className="p-3 transition-colors hover:bg-white/10">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
                <button className="rounded-full bg-[var(--surface-dark)]/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/10">
                  <span className="material-symbols-outlined">near_me</span>
                </button>
              </div>
              {/* SOS Button */}
              <button className="group flex h-24 w-24 items-center justify-center rounded-full bg-red-600 shadow-2xl shadow-red-900/50 transition-transform hover:scale-105">
                <div className="flex flex-col items-center text-white">
                  <span className="material-symbols-outlined text-4xl">sos</span>
                  <span className="text-lg font-bold tracking-wider">SOS</span>
                </div>
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="absolute bottom-4 left-4 w-80">
              <div className="rounded-xl bg-[var(--surface-dark)]/80 p-4 backdrop-blur-sm shadow-lg">
                <h3 className="font-semibold">Emergency Contacts</h3>
                <div className="mt-3 space-y-3">
                  {/* Police */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-red-400">
                        local_police
                      </span>
                      <span className="text-sm">Local Police</span>
                    </div>
                    <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                  </div>

                  {/* Embassy */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-blue-400">
                        apartment
                      </span>
                      <span className="text-sm">Embassy</span>
                    </div>
                    <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                  </div>

                  {/* Mom */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-green-400">
                        family_restroom
                      </span>
                      <span className="text-sm">Mom</span>
                    </div>
                    <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 z-20 w-full p-2 md:hidden">
          <nav className="flex justify-around rounded-full border border-white/10 bg-[var(--background-dark)]/80 p-2 backdrop-blur-sm">
            <a
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-[var(--primary-color)] transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-xs font-medium">Home</span>
            </a>
            <a
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-white/60 transition-colors hover:bg-white/10"
              href="#"
            >
              <span className="material-symbols-outlined">explore</span>
              <span className="text-xs font-medium">Explore</span>
            </a>
            <a
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-white/60 transition-colors hover:bg-white/10"
              href="#"
            >
              <span className="material-symbols-outlined">maps_ugc</span>
              <span className="text-xs font-medium">Community</span>
            </a>
            <a
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-1 text-white/60 transition-colors hover:bg-white/10"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="text-xs font-medium">Settings</span>
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
}