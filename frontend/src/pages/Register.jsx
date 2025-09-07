import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    kycDocNumber: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        kycDocNumber: formData.kycDocNumber
      });

      if (response.data.success) {
        console.log('Registration successful:', response.data);
        // Navigate to emergency contacts page
        navigate("/emergency");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            type="text"
            required
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username (unique)"
            type="text"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            type="email"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number"
            type="tel"
            required
          />
          <input
            name="kycDocNumber"
            value={formData.kycDocNumber}
            onChange={handleInputChange}
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="KYC Document Number (Aadhaar/Passport)"
            type="text"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            required
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full rounded-full border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm Password"
            type="password"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-600 bg-transparent py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating Account...
              </>
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
