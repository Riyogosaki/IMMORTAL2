import { X, Video, Phone, MoreVertical, Shield, Wifi, WifiOff, Volume2, Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringClose, setIsHoveringClose] = useState(false);
  const isOnline = onlineUsers.includes(selectedUser._id);

  const handleCall = () => {
    console.log("Start call with", selectedUser.fullName);
  };

  const handleVideoCall = () => {
    console.log("Start video call with", selectedUser.fullName);
  };

  return (
    <div className="relative p-4 lg:p-6 border-b border-blue-500/20 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/95 backdrop-blur-xl">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        {/* Interactive hover effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 transition-opacity duration-500 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="relative flex items-center justify-between">
        {/* Left Side - User Info */}
        <div 
          className="flex items-center gap-4 group cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* 3D Avatar Container */}
          <div className="relative">
            {/* Glow effect based on online status */}
            <div className={`absolute -inset-3 rounded-full blur-xl transition-all duration-500 ${
              isOnline 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-30' 
                : 'bg-gradient-to-r from-gray-600 to-gray-700 opacity-20'
            } ${isHovering ? 'scale-110 opacity-50' : ''}`}></div>
            
            {/* Avatar with 3D depth */}
            <div className="relative">
              {/* Avatar border with gradient */}
              <div className={`absolute -inset-1 rounded-full ${
                isOnline 
                  ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 animate-pulse' 
                  : 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600'
              } opacity-50 blur-sm`}></div>
              
              {/* Avatar image */}
              <div className="relative size-14 lg:size-16 rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-blue-500/50 transition-colors duration-300">
                <img 
                  src={selectedUser.profilePic || "/avatar.png"} 
                  alt={selectedUser.fullName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Online/Offline indicator */}
                <div className={`absolute bottom-0 right-0 size-4 lg:size-5 rounded-full border-2 border-gray-900 flex items-center justify-center ${
                  isOnline 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-700'
                }`}>
                  {isOnline && (
                    <div className="absolute inset-0 border-2 border-green-500/30 rounded-full animate-ping"></div>
                  )}
                  {isOnline ? (
                    <Wifi className="size-2.5 text-white" />
                  ) : (
                    <WifiOff className="size-2.5 text-gray-300" />
                  )}
                </div>
              </div>
              
              {/* Active ring for online users */}
              {isOnline && (
                <div className="absolute -inset-2 border-2 border-green-500/30 rounded-full animate-spin"></div>
              )}
            </div>
          </div>

          {/* User Information with Gradient Text */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                {selectedUser.fullName}
              </h3>
              
              {/* Status badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                isOnline 
                  ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/20 border-green-500/30 text-green-400' 
                  : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/50 text-gray-400'
              }`}>
                {isOnline ? 'Active Now' : 'Offline'}
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2">
                <div className={`size-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
                <p className="text-sm text-gray-400">
                  {isOnline ? 'Currently online' : 'Last seen recently'}
                </p>
              </div>
              
              {/* Encryption badge */}
              <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/20">
                <Shield className="size-3 text-blue-400" />
                <span className="text-xs text-blue-300">Encrypted</span>
              </div>
            </div>
            
            {/* Typing indicator (example - can be connected to actual typing events) */}
            {isOnline && (
              <div className="flex items-center gap-2 mt-2 text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-1">
                  <div className="size-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="size-1.5 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                  <div className="size-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                </div>
                <span>Typing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Call Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 mr-4">
            {/* Voice Call Button */}
            <button
              onClick={handleCall}
              className="relative group flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <Phone className="size-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 text-xs text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Voice Call
              </span>
            </button>

            {/* Video Call Button */}
            <button
              onClick={handleVideoCall}
              className="relative group flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <Video className="size-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Video Call
              </span>
            </button>

            {/* More Options Button */}
            <button className="relative group flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 transition-all duration-300">
              <div className="absolute -inset-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <MoreVertical className="size-5 text-gray-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                More Options
              </span>
            </button>
          </div>

          {/* Close Chat Button */}
          <button
            onClick={() => setSelectedUser(null)}
            onMouseEnter={() => setIsHoveringClose(true)}
            onMouseLeave={() => setIsHoveringClose(false)}
            className="relative group p-3 rounded-xl transition-all duration-300"
          >
            {/* Glow effect */}
            <div className={`absolute -inset-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur transition-all duration-500 ${
              isHoveringClose ? 'opacity-40' : 'opacity-20'
            }`}></div>
            
            {/* Button container */}
            <div className={`relative p-2 rounded-lg transition-all duration-300 ${
              isHoveringClose 
                ? 'bg-gradient-to-r from-red-900/30 to-pink-900/20 border-red-500/50' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700'
            } border group-hover:scale-110 group-active:scale-95`}>
              <X className={`size-5 transition-all duration-300 ${
                isHoveringClose ? 'text-red-400 rotate-90' : 'text-gray-400'
              }`} />
            </div>
            
            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-red-300 px-3 py-1.5 rounded-lg border border-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Close Chat
            </span>
          </button>
        </div>
      </div>

      {/* Connection Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 animate-gradient-x"></div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatHeader;