import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, Sparkles, Shield, Zap, Key, CheckCircle, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthmagePatter.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState({ fullName: false, email: false, password: false });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

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

  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
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
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 3}px`,
              height: `${Math.random() * 10 + 3}px`,
              background: `radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Interactive light effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 opacity-20 animate-pulse">
          <Sparkles className="w-8 h-8 text-purple-400" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-20 animate-pulse delay-500">
          <Globe className="w-8 h-8 text-pink-400" />
        </div>

        <div className="w-full max-w-md space-y-8 relative">
          {/* Glassmorphism container */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            
            {/* Glass container */}
            <div 
              className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-900/20 p-8 sm:p-10"
              style={{
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.03}deg) rotateY(${(mousePosition.x - 50) * 0.03}deg)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Logo */}
              <div className="text-center mb-10">
                <div className="flex flex-col items-center gap-4 group">
                  <div className="relative">
                    {/* Logo glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* 3D Logo container */}
                    <div className="relative size-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <MessageSquare className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 bg-clip-text text-transparent">
                      Create Account
                    </h1>
                    <p className="text-gray-400 mt-2">Join our growing community</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Full Name Input */}
                <div className="group">
                  <label className="label">
                    <span className="label-text font-medium text-gray-300">Full Name</span>
                  </label>
                  <div className="relative">
                    {/* Input glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg transition-all duration-500 ${
                      isFocused.fullName ? 'opacity-50' : 'opacity-30'
                    } group-hover:opacity-50`}></div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 transition-colors duration-300 ${
                          isFocused.fullName ? 'text-purple-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <input
                        type="text"
                        className={`input w-full pl-11 bg-gray-900/80 border-2 ${
                          isFocused.fullName ? 'border-purple-500/50' : 'border-purple-500/30'
                        } text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:shadow-lg focus:shadow-purple-500/20`}
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        onFocus={() => setIsFocused(prev => ({ ...prev, fullName: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, fullName: false }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="group">
                  <label className="label">
                    <span className="label-text font-medium text-gray-300">Email Address</span>
                  </label>
                  <div className="relative">
                    {/* Input glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg transition-all duration-500 ${
                      isFocused.email ? 'opacity-50' : 'opacity-30'
                    } group-hover:opacity-50`}></div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 transition-colors duration-300 ${
                          isFocused.email ? 'text-purple-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <input
                        type="email"
                        className={`input w-full pl-11 bg-gray-900/80 border-2 ${
                          isFocused.email ? 'border-purple-500/50' : 'border-purple-500/30'
                        } text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:shadow-lg focus:shadow-purple-500/20`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="group">
                  <label className="label">
                    <span className="label-text font-medium text-gray-300">Password</span>
                  </label>
                  <div className="relative">
                    {/* Input glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg transition-all duration-500 ${
                      isFocused.password ? 'opacity-50' : 'opacity-30'
                    } group-hover:opacity-50`}></div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 transition-colors duration-300 ${
                          isFocused.password ? 'text-purple-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`input w-full pl-11 bg-gray-900/80 border-2 ${
                          isFocused.password ? 'border-purple-500/50' : 'border-purple-500/30'
                        } text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:shadow-lg focus:shadow-purple-500/20`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center group/eye"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500 group-hover/eye:text-purple-400 transition-colors duration-300" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500 group-hover/eye:text-purple-400 transition-colors duration-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Password strength</span>
                        <span className={`text-sm font-medium ${passwordStrength >= 4 ? 'text-green-400' : passwordStrength >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {strengthLabels[passwordStrength]}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${getStrengthColor(passwordStrength)} transition-all duration-500`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`size-3 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-700'}`} />
                          <span>8+ characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`size-3 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-700'}`} />
                          <span>Uppercase letter</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`size-3 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-700'}`} />
                          <span>Number</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`size-3 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-700'}`} />
                          <span>Special character</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="checkbox checkbox-sm mt-1 bg-gray-800 border-purple-500/30" 
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                    I agree to the <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Terms of Service</span> and <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Privacy Policy</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSigningUp}
                  className="relative group w-full py-3.5 px-6 rounded-xl text-white font-bold text-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Button glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-purple-500 transition-all duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute top-0 -inset-x-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-2">
                    {isSigningUp ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        <span>Join Now</span>
                      </>
                    )}
                  </div>
                  
                  {/* Loading bar */}
                  {isSigningUp && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/80 text-gray-500">or sign up with</span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {['Google', 'GitHub', 'Twitter'].map((provider) => (
                  <button
                    key={provider}
                    type="button"
                    className="relative group py-2.5 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 to-pink-500/0 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <span className="relative text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {provider}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sign in link */}
              <div className="text-center pt-4 border-t border-purple-500/20">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors inline-flex items-center gap-1 group"
                  >
                    Sign in now
                    <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500/50 rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-pink-500/50 rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-blue-500/50 rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
          </div>

          {/* Security note */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500">
              <Shield className="w-3 h-3 text-green-400" />
              <span>Your data is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - 3D Image Pattern */}
      <AuthImagePattern
        title={"Join our community"}
        subtitle={"Connect with friends, share moments, and stay in touch with your loved ones."}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;