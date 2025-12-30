import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, Sparkles, Shield, Zap, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthmagePatter.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState({ fullName: false, email: false, password: false, otp: false });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [otp, setOtp] = useState("");

  const { sendOtp, verifyOtp, isSigningUp, otpSent } = useAuthStore();

  // Password strength calculation
  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  // Mouse tracking for background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (!success) return;
    try {
      await sendOtp(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return toast.error("OTP is required");
    try {
      await verifyOtp(otp);
      setFormData({ fullName: "", email: "", password: "" });
      setOtp("");
    } catch (err) {
      console.error(err);
    }
  };

  const getStrengthColor = (strength) => {
    switch(strength) {
      case 0: return "from-red-500 to-pink-500";
      case 1: return "from-red-500 to-orange-500";
      case 2: return "from-orange-500 to-yellow-500";
      case 3: return "from-yellow-500 to-green-500";
      case 4: return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Left side - Form */}
      <div className="relative flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-md space-y-8 relative">
          <div className="relative group">
            {/* Form container */}
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-900/20 p-8 sm:p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 bg-clip-text text-transparent">
                  {otpSent ? "Verify OTP" : "Create Account"}
                </h1>
                <p className="text-gray-400 mt-2">
                  {otpSent ? "Enter the OTP sent to your email" : "Join our growing community"}
                </p>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-7">
                  {/* Full Name Input */}
                  <div className="group relative">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="input w-full pl-3 bg-gray-900/80 border-2 border-purple-500/30 text-white rounded-xl focus:outline-none"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="group relative">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email"
                        className="input w-full pl-3 bg-gray-900/80 border-2 border-purple-500/30 text-white rounded-xl focus:outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="group relative">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="input w-full pl-3 bg-gray-900/80 border-2 border-purple-500/30 text-white rounded-xl focus:outline-none"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </button>
                    </div>

                    {/* Password strength bar */}
                    {formData.password && (
                      <div className="mt-2 h-2 bg-gray-800 rounded-full">
                        <div
                          className={`h-full bg-gradient-to-r ${getStrengthColor(passwordStrength)} transition-all`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full py-3 bg-purple-600 rounded-xl text-white font-bold"
                  >
                    {isSigningUp ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Send OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-7">
                  {/* OTP Input */}
                  <div className="group relative">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="input w-full pl-3 bg-gray-900/80 border-2 border-purple-500/30 text-white rounded-xl focus:outline-none"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  {/* Verify OTP Button */}
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full py-3 bg-purple-600 rounded-xl text-white font-bold"
                  >
                    {isSigningUp ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Verify OTP"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - 3D Image pattern */}
      <AuthImagePattern
        title={"Join our community"}
        subtitle={"Connect with friends, share moments, and stay in touch with your loved ones."}
      />
    </div>
  );
};

export default SignUpPage;
