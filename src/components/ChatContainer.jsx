import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { 
  Check, CheckCheck, Clock, 
  Sparkles, Zap, Shield, 
  Image as ImageIcon, Download,
  MoreVertical,
  Play
} from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages && !isScrolling) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(handleScroll.timer);
    handleScroll.timer = setTimeout(() => setIsScrolling(false), 100);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, rgba(59, 130, 246, 0.3) 100%),
                              linear-gradient(0deg, transparent 95%, rgba(59, 130, 246, 0.3) 100%)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <ChatHeader />

      {/* Chat Messages Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 relative"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        {/* Connection Status Banner */}
        <div className="sticky top-4 z-10">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl border border-green-500/30 p-3 flex items-center justify-center gap-3">
              <div className="relative">
                <div className="size-2 bg-green-500 rounded-full animate-ping absolute"></div>
                <div className="size-2 bg-green-500 rounded-full relative"></div>
              </div>
              <span className="text-sm text-gray-300">End-to-end encrypted</span>
              <Shield className="size-4 text-green-400" />
            </div>
          </div>
        </div>

        {/* Date Separator */}
        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          </div>
          <div className="relative px-4 py-1.5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full border border-blue-500/30 text-xs text-blue-300">
            Today
          </div>
        </div>

        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          const isImageMessage = message.image;
          
          return (
            <div
              key={message._id}
              className={`relative group ${isOwnMessage ? 'flex justify-end' : 'flex justify-start'}`}
              onMouseEnter={() => setHoveredMessage(message._id)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              {/* Message glow effect */}
              <div className={`absolute -inset-1 rounded-2xl blur-lg transition-all duration-500 ${
                hoveredMessage === message._id 
                  ? isOwnMessage 
                    ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-100' 
                    : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-100'
                  : 'opacity-0'
              }`}></div>

              {/* Message Container */}
              <div className={`relative flex gap-3 max-w-xl ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`relative ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                  <div className={`absolute -inset-2 rounded-full blur opacity-20 transition-opacity duration-300 ${
                    hoveredMessage === message._id 
                      ? isOwnMessage ? 'bg-blue-500' : 'bg-purple-500' 
                      : ''
                  }`}></div>
                  <div className={`relative size-10 rounded-full overflow-hidden border-2 ${
                    isOwnMessage ? 'border-blue-500/50' : 'border-purple-500/50'
                  }`}>
                    <img
                      src={isOwnMessage ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                      alt="profile"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Message Content */}
                <div className={`${isOwnMessage ? 'order-1' : 'order-2'} flex-1`}>
                  {/* Sender name for incoming messages */}
                  {!isOwnMessage && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-purple-300">
                        {selectedUser.fullName}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">
                        {formatMessageTime(message.createdAt)}
                      </span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`relative ${
                    isOwnMessage 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                      : 'bg-gradient-to-r from-gray-800 to-gray-900'
                  } rounded-2xl p-4 shadow-2xl ${
                    isOwnMessage 
                      ? 'rounded-br-none shadow-blue-500/20' 
                      : 'rounded-bl-none shadow-purple-500/20'
                  } border ${
                    isOwnMessage 
                      ? 'border-blue-500/30' 
                      : 'border-purple-500/30'
                  } transition-all duration-300 group-hover:translate-y-[-2px]`}>
                    {/* Message pointer */}
                    <div className={`absolute top-0 w-4 h-4 ${
                      isOwnMessage 
                        ? '-right-2 bg-gradient-to-r from-blue-600 to-cyan-600' 
                        : '-left-2 bg-gradient-to-r from-gray-800 to-gray-900'
                    } transform ${
                      isOwnMessage ? 'rotate-45' : '-rotate-45'
                    }`} style={{
                      clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
                    }}></div>

                    {/* Message Content */}
                    {isImageMessage && (
                      <div className="relative mb-3 group/image">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover/image:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative overflow-hidden rounded-xl border-2 border-blue-500/30">
                          <img
                            src={message.image}
                            alt="Attachment"
                            className="max-w-full sm:max-w-md rounded-lg object-cover transition-transform duration-500 group-hover/image:scale-105"
                          />
                          {/* Image overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                          {/* Image actions */}
                          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <button className="p-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors">
                              <Download className="size-4 text-white" />
                            </button>
                            <button className="p-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-colors">
                              <ImageIcon className="size-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {message.text && (
                      <p className={`text-white ${isImageMessage ? 'mt-3' : ''} leading-relaxed`}>
                        {message.text}
                      </p>
                    )}

                    {/* Message metadata */}
                    <div className={`flex items-center justify-between mt-3 ${
                      isOwnMessage ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      <div className="flex items-center gap-2 text-xs">
                        {isOwnMessage ? (
                          <>
                            {message.read ? (
                              <CheckCheck className="size-3.5 text-blue-300" />
                            ) : message.delivered ? (
                              <CheckCheck className="size-3.5 text-gray-400" />
                            ) : (
                              <Check className="size-3.5 text-gray-400" />
                            )}
                            <span>
                              {message.read ? 'Read' : message.delivered ? 'Delivered' : 'Sent'}
                            </span>
                          </>
                        ) : (
                          <Clock className="size-3.5" />
                        )}
                      </div>
                      <div className="text-xs opacity-75">
                        {formatMessageTime(message.createdAt)}
                      </div>
                    </div>

                    {/* Message actions */}
                    <div className={`absolute top-3 ${
                      isOwnMessage ? '-left-12' : '-right-12'
                    } flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <button className="p-2 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 transition-colors">
                        <MoreVertical className="size-3.5" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 transition-colors">
                        <Sparkles className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* End of messages indicator */}
        <div ref={messageEndRef} className="relative py-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full border border-blue-500/30">
              <div className="flex items-center gap-2">
                <Zap className="size-3.5 text-blue-400 animate-pulse" />
                <span className="text-xs text-blue-300">End of conversation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MessageInput />

      {/* Typing indicator (example - you can connect to actual typing events) */}
      {selectedUser && (
        <div className="px-6 pb-2">
          <div className="flex items-center gap-2 text-sm text-gray-400 animate-pulse">
            <div className="flex gap-1">
              <div className="size-1.5 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-blue-500 rounded-full animate-bounce delay-75"></div>
              <div className="size-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
            </div>
            <span>{selectedUser.fullName} is typing...</span>
          </div>
        </div>
      )}

      {/* CSS for float animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;