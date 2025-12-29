import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Sparkles, Home } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <header
      className="fixed w-full top-0 z-50  
      bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-transparent
      backdrop-blur-xl border-b border-blue-500/20 shadow-2xl shadow-blue-900/20"
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 right-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 h-20 relative z-10">
        <div className="flex items-center justify-between h-full">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-3 group relative"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* 3D Logo Container */}
              <div className="relative">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg transition-all duration-500 ${
                  isLogoHovered ? "opacity-70 scale-110" : "opacity-40 scale-100"
                }`}></div>
                
                {/* Logo with 3D effect */}
                <div className={`
                  relative size-12 rounded-xl 
                  bg-gradient-to-br from-gray-900 to-gray-800
                  border border-blue-500/30
                  flex items-center justify-center
                  shadow-2xl
                  transition-all duration-500 group-hover:shadow-blue-500/40
                  ${isLogoHovered ? "translate-y-[-4px] rotate-3" : ""}
                `}
                style={{
                  transform: isLogoHovered 
                    ? "perspective(1000px) rotateY(5deg) translateY(-4px)" 
                    : "perspective(1000px) rotateY(0)",
                }}
                >
                  <Sparkles className={`w-6 h-6 text-blue-400 transition-all duration-500 ${
                    isLogoHovered ? "scale-110 rotate-12" : ""
                  }`} />
                  <MessageSquare className="absolute w-5 h-5 text-cyan-400" />
                </div>
                
                {/* Floating particles */}
                {isLogoHovered && (
                  <>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-150"></div>
                  </>
                )}
              </div>

              {/* Logo Text with Gradient */}
              <div className="relative">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Immortal
                </h1>
                <p className="absolute -bottom-5 left-0 text-xs text-blue-300/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Beyond Time & Space
                </p>
              </div>
            </Link>
          </div>

          {/* Right Side - Navigation */}
          <div className="flex items-center gap-3">
            {/* Home Link */}
            <Link
              to="/"
              className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl
                bg-gradient-to-r from-gray-800/50 to-gray-900/50
                border border-blue-500/20
                hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20
                transition-all duration-300
                hover:translate-y-[-2px] active:translate-y-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-500" />
              <Home className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-300">Home</span>
            </Link>

            {/* Settings Link */}
            <Link
              to="/settings"
              className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl
                bg-gradient-to-r from-gray-800/50 to-gray-900/50
                border border-blue-500/20
                hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20
                transition-all duration-300
                hover:translate-y-[-2px] active:translate-y-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-500" />
              <Settings className="w-4 h-4 text-blue-400 group-hover:rotate-90 transition-all duration-500" />
              <span className="text-sm font-medium text-gray-300">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl
                    bg-gradient-to-r from-gray-800/50 to-gray-900/50
                    border border-blue-500/20
                    hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20
                    transition-all duration-300
                    hover:translate-y-[-2px] active:translate-y-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-500" />
                  <User className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-300">Profile</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl
                    bg-gradient-to-r from-red-900/30 to-red-800/20
                    border border-red-500/30
                    hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20
                    transition-all duration-300
                    hover:translate-y-[-2px] active:translate-y-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-pink-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:via-pink-500/20 group-hover:to-red-500/20 rounded-xl transition-all duration-500" />
                  <LogOut className="w-4 h-4 text-red-400 group-hover:rotate-3 transition-transform" />
                  <span className="text-sm font-medium text-gray-300">Logout</span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>

                {/* User Avatar Pill */}
                <div className="relative ml-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-50"></div>
                  <div className="relative size-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500/30 flex items-center justify-center shadow-xl">
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {authUser.username?.[0]?.toUpperCase() || "U"}
                    </span>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;