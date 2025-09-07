import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username: formData.username,
        password: formData.password
      }, {
        withCredentials: true // Important for session cookies
      });

      if (response.data.success) {
        console.log('Login successful:', response.data);
        // Store user data in localStorage for quick access
        localStorage.setItem('user', JSON.stringify(response.data.data));
        // Navigate to Digital Tourist ID page
        navigate("/DigitalTouristId");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col dark justify-between group/design-root overflow-x-hidden bg-[#111714]"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <main className="flex-grow">
        <div
          className="flex h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAt_ZYQ3apsArvgGfnX6mjRF9eh2dotLxjOcVF5PxQGXnru6PjW6jOmhPI7eYo3hUonlfgz2x3Ksvqh7c62mWMsUPle-0NzcCUgwKHRsE1C5_xgky6dZiPvIAgu9OG8eVs8JbT79xFmCt0ELE1SG9A6Ip77uwVIWo4cPrdUXH9Enr30DvjiUuMZ9YNWJbat4w7VkjFkYuS-wxRzDy-5rVgYIgZ_fs5Ego9GUwIM601EeIJ4ZWocyzk2Ctq1FbZSvNDEkzs957DhfVVz")',
          }}
        >
          <div className="w-full max-w-md space-y-8 rounded-2xl bg-black/30 p-8 backdrop-blur-sm">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
                Login
              </h1>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  person
                </span>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-full border border-gray-600 bg-transparent py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  lock
                </span>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-full border border-gray-600 bg-transparent py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-600 bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">login</span>
                    Login
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-green-400 hover:text-green-300 underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#111714] py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white">
              About Us
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
