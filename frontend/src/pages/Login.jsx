// Login.jsx
import React from "react";

export default function Login() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-black/80 to-black/60 dark font-noto-sans flowery-pattern">
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-2xl p-8 glassmorphism">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-black font-spline-sans">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-300">
              Login to continue your safe journey.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="sr-only" htmlFor="user-id">
                User ID
              </label>
              <input
                className="form-input w-full rounded-full border-none bg-black/40 px-5 py-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#38e07b]"
                id="user-id"
                placeholder="User ID"
                type="text"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
              </div>
              <input
                className="form-input w-full rounded-full border-none bg-black/40 px-5 py-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#38e07b]"
                id="password"
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="text-right">
              <a className="text-sm text-[#38e07b] hover:underline" href="#">
                Forgot Password?
              </a>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-full bg-[#38e07b] py-4 text-base font-bold text-black shadow-lg shadow-[#38e07b]/20 transition-colors duration-200 ease-in-out hover:bg-green-300"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <a className="font-semibold text-[#38e07b] hover:underline" href="#">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <div className="mb-4 flex justify-center space-x-6">
            <a className="hover:text-white" href="#">
              About
            </a>
            <a className="hover:text-white" href="#">
              Contact
            </a>
            <a className="hover:text-white" href="#">
              Privacy Policy
            </a>
          </div>
          <div className="mb-4 flex justify-center space-x-6">
            <a className="text-gray-400 hover:text-white" href="#">
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.434 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.06.069-.06 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <a className="text-gray-400 hover:text-white" href="#">
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </div>
          <p className="text-xs">© 2024 Smart Tourist Safety. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
