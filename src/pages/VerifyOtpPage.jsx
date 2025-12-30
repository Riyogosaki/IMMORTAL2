import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import AuthImagePattern from "../components/AuthmagePatter.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Key, Shield, Sparkles, Zap, Mail } from "lucide-react";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState({ otp: false });
  const { verifyOtpLogin, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("otpEmail");
    if (!savedEmail) navigate("/login"); // Redirect if email not saved
    else setEmail(savedEmail);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [navigate]);

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");
    const success = await verifyOtpLogin(email, otp);
    if (success) {
      alert("OTP Verified! Logged in successfully.");
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
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
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Left Side Form */}
      <div className="relative flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="absolute top-8 left-8 opacity-20 animate-pulse">
          <Sparkles className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-20 animate-pulse delay-500">
          <Shield className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="w-full max-w-md space-y-8 relative">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div
              className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-900/20 p-8 sm:p-10"
              style={{
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.03}deg) rotateY(${(mousePosition.x - 50) * 0.03}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Verify OTP
                </h1>
                <p className="text-gray-400 mt-2">Enter the OTP sent to your email</p>
              </div>

              {/* OTP Input */}
              <div className="space-y-7">
                <div className="group">
                  <label className="label">
                    <span className="label-text font-medium text-gray-300">OTP</span>
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg transition-all duration-500 ${
                        isFocused.otp ? "opacity-50" : "opacity-30"
                      } group-hover:opacity-50`}
                    ></div>
                    <div className="relative">
                      <input
                        type="text"
                        className={`input w-full pl-3 bg-gray-900/80 border-2 ${
                          isFocused.otp ? "border-blue-500/50" : "border-blue-500/30"
                        } text-white placeholder:text-gray-500 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:shadow-lg focus:shadow-blue-500/20`}
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onFocus={() => setIsFocused((prev) => ({ ...prev, otp: true }))}
                        onBlur={() => setIsFocused((prev) => ({ ...prev, otp: false }))}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isLoggingIn}
                  className="relative group w-full py-3.5 px-6 rounded-xl text-white font-bold text-lg transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 group-hover:from-blue-500 group-hover:via-cyan-500 group-hover:to-blue-500 transition-all duration-500"></div>
                  <div className="absolute top-0 -inset-x-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Verifying OTP...</span>
                      </>
                    ) : (
                      <>
                        <Key className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Verify OTP</span>
                      </>
                    )}
                  </div>
                  {isLoggingIn && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse"></div>}
                </button>

                <div className="text-center pt-4 border-t border-blue-500/20">
                  <p className="text-gray-400">
                    Didn't receive OTP?{" "}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors inline-flex items-center gap-1 group">
                      Resend
                      <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

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
        title={"Verify OTP!"}
        subtitle={"Enter the OTP sent to your email to access your account securely."}
      />

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
        .animate-shine { animation: shine 1.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default VerifyOtpPage;
