import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authAPI } from "../services/api";
import { ROUTES } from "../constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, User, Mail, Phone, Lock, FileText, Shield, Eye, EyeOff } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  // Match backend Joi: ^[+]?[0-9]{10,15}$
  phone: z
    .string()
    .regex(/^[+]?[0-9]{10,15}$/, "Phone must be 10–15 digits (optional + prefix)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  kycDocNumber: z
    .string()
    .min(10, "KYC Document Number must be at least 10 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverErrors, setServerErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setError("");
    setServerErrors([]);
    setLoading(true);

    try {
      const response = await authAPI.register({
        name: data.name.trim(),
        username: data.username.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        password: data.password,
        kycDocNumber: data.kycDocNumber
      });

      if (response.data.success) {
        console.log('Registration successful:', response.data);
        // Navigate to login page with success message
        navigate(ROUTES.LOGIN, {
          state: { message: "Registration successful! Please log in with your credentials." }
        });
      } else {
        // Show server-provided validation message if any
        if (response.data.message) {
          const list = String(response.data.message).split(/,\s*/).filter(Boolean);
          if (list.length > 1) setServerErrors(list);
          setError(response.data.message);
        } else {
          setError("Registration failed");
        }
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Handle specific error types
      if (error.response?.status === 409) {
        setError("User with this username, email, or KYC document already exists");
      } else if (error.response?.status === 400) {
        const message = error.response?.data?.message || "Please check your input and try again";
        const list = String(message).split(/,\s*/).filter(Boolean);
        if (list.length > 1) setServerErrors(list);
        setError(message);
      } else {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo/Brand Section */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
          <p className="text-muted-foreground">Join SafeTravels and stay safe on your journeys</p>
        </div>

        {/* Registration Card */}
        <Card className="glass-effect border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Fill in your details to create a new account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {(error || serverErrors.length > 0) && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error}
                    {serverErrors.length > 0 && (
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {serverErrors.map((msg, idx) => (
                          <li key={idx}>{msg}</li>
                        ))}
                      </ul>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                      {...register("username")}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* KYC Document Field */}
              <div className="space-y-2">
                <Label htmlFor="kycDocNumber" className="text-white">KYC Document Number</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="kycDocNumber"
                    type="text"
                    placeholder="Enter your Aadhaar/Passport number"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                    {...register("kycDocNumber")}
                  />
                </div>
                {errors.kycDocNumber && (
                  <p className="text-sm text-destructive">{errors.kycDocNumber.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                      {...register("password")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                      {...register("confirmPassword")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:text-primary/80"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center space-x-4">
          <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto">
            Privacy Policy
          </Button>
          <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
}
