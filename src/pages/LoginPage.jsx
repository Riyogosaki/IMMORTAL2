import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import AuthImagePattern from "../components/AuthmagePatter.jsx";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Sparkles, Shield, Zap, Key } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

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

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Interactive light effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 opacity-20 animate-pulse">
          <Sparkles className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-20 animate-pulse delay-500">
          <Shield className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="w-full max-w-md space-y-8 relative">
          {/* Glassmorphism container */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            
            {/* Glass container */}
            <div 
              className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-900/20 p-8 sm:p-10"
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
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* 3D Logo container */}
                    <div className="relative size-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <MessageSquare className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                      Welcome Back
                    </h1>
                    <p className="text-gray-400 mt-2">Sign in to your secure account</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Email Input */}
                <div className="group">
                  <label className="label">
                    <span className="label-text font-medium text-gray-300">Email Address</span>
                  </label>
                  <div className="relative">
                    {/* Input glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg transition-all duration-500 ${
                      isFocused.email ? 'opacity-50' : 'opacity-30'
                    } group-hover:opacity-50`}></div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 transition-colors duration-300 ${
                          isFocused.email ? 'text-blue-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <input
                        type="email"
                        className={`input w-full pl-11 bg-gray-900/80 border-2 ${
                          isFocused.email ? 'border-blue-500/50' : 'border-blue-500/30'
                        } text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-lg focus:shadow-blue-500/20`}
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
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg transition-all duration-500 ${
                      isFocused.password ? 'opacity-50' : 'opacity-30'
                    } group-hover:opacity-50`}></div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 transition-colors duration-300 ${
                          isFocused.password ? 'text-blue-400' : 'text-gray-500'
                        }`} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`input w-full pl-11 bg-gray-900/80 border-2 ${
                          isFocused.password ? 'border-blue-500/50' : 'border-blue-500/30'
                        } text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-lg focus:shadow-blue-500/20`}
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
                          <EyeOff className="h-5 w-5 text-gray-500 group-hover/eye:text-blue-400 transition-colors duration-300" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500 group-hover/eye:text-blue-400 transition-colors duration-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="checkbox checkbox-sm bg-gray-800 border-blue-500/30" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isLoggingIn}
                  className="relative group w-full py-3.5 px-6 rounded-xl text-white font-bold text-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Button glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 group-hover:from-blue-500 group-hover:via-cyan-500 group-hover:to-blue-500 transition-all duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute top-0 -inset-x-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-2">
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <Key className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Sign In</span>
                      </>
                    )}
                  </div>
                  
                  {/* Loading bar */}
                  {isLoggingIn && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse"></div>
                  )}
                </button>
              </form>

              {/* Divider */}
             <div>
              </div>
               <div className="text-center pt-4 border-t border-blue-500/20">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup" 
                    className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors inline-flex items-center gap-1 group"
                  >
                    Create account
                    <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>

              {/* Social Login */}

              {/* Sign up link */}
             
            </div>

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-purple-500/50 rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-pink-500/50 rounded-br-lg"></div>
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
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
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

export default LoginPage;