import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Sparkles, Palette, Zap, Check } from "lucide-react";
import { useState, useEffect } from "react";

// Expanded themes with unique gradient colors
const ENHANCED_THEMES = [
  "aurora", "cyberpunk", "sunset", "ocean", "forest", 
  "galaxy", "candy", "neon", "vintage", "monochrome",
  "ruby", "sapphire", "emerald", "amber", "amethyst"
];

// Color gradients for each theme
const THEME_GRADIENTS = {
  aurora: "from-purple-500 via-pink-500 to-blue-500",
  cyberpunk: "from-cyan-400 via-purple-500 to-pink-500",
  sunset: "from-orange-400 via-red-500 to-purple-600",
  ocean: "from-blue-400 via-cyan-500 to-teal-600",
  forest: "from-green-500 via-emerald-500 to-lime-400",
  galaxy: "from-indigo-600 via-purple-700 to-pink-600",
  candy: "from-pink-400 via-rose-400 to-red-400",
  neon: "from-green-400 via-cyan-400 to-blue-400",
  vintage: "from-amber-600 via-orange-500 to-yellow-400",
  monochrome: "from-gray-400 via-gray-600 to-gray-800",
  ruby: "from-red-500 via-rose-600 to-pink-500",
  sapphire: "from-blue-500 via-indigo-600 to-purple-500",
  emerald: "from-green-600 via-emerald-500 to-teal-400",
  amber: "from-yellow-500 via-orange-500 to-red-400",
  amethyst: "from-purple-600 via-violet-600 to-fuchsia-500"
};

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
  { id: 3, content: "Check out these amazing themes! 🎨", isSent: false },
  { id: 4, content: "Wow! The 3D animations are incredible! ✨", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [hoveredTheme, setHoveredTheme] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation on theme change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 container mx-auto px-4 pt-20 max-w-6xl">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="space-y-8 relative z-10">
        {/* Header with animation */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <Palette className="w-8 h-8 text-primary-content animate-pulse" />
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-content to-secondary-content bg-clip-text text-transparent">
                Theme Customizer
              </h1>
              <p className="text-base-content/80 text-sm">Transform your chat experience with stunning themes</p>
            </div>
            <Sparkles className="w-8 h-8 text-accent animate-bounce" />
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-6 bg-base-100/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-base-300/50">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <Zap className="w-5 h-5 text-primary-content" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Choose Your Theme
                </h2>
                <p className="text-base-content/70">Select from our collection of beautifully crafted themes</p>
              </div>
            </div>
          </div>

          {/* 3D Theme Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-4">
            {ENHANCED_THEMES.map((t) => (
              <button
                key={t}
                onMouseEnter={() => setHoveredTheme(t)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={`
                  group relative
                  transform transition-all duration-500
                  ${hoveredTheme === t ? 'scale-110 z-50' : 'scale-100'}
                  ${theme === t ? 'ring-4 ring-primary ring-offset-2 ring-offset-base-100' : ''}
                `}
                onClick={() => setTheme(t)}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D Container */}
                <div className={`
                  relative h-32 rounded-2xl overflow-hidden
                  transition-all duration-500 ease-out
                  group-hover:shadow-2xl group-hover:shadow-primary/30
                  ${hoveredTheme === t ? 'rotate-y-6 rotate-x-3' : ''}
                  ${THEME_GRADIENTS[t]}
                  bg-gradient-to-br
                `}>
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Color palette preview */}
                  <div className="absolute bottom-2 left-2 right-2 grid grid-cols-4 gap-1">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 rounded-full opacity-90"
                        style={{
                          background: `hsl(${(i * 45) % 360}, 70%, 50%)`,
                          animation: isAnimating && theme === t ? `pulse 0.5s ease-out ${i * 0.1}s` : 'none'
                        }}
                      />
                    ))}
                  </div>

                  {/* Theme name */}
                  <div className="absolute top-3 left-0 right-0">
                    <span className={`
                      block text-xs font-bold px-2 py-1 rounded-full mx-2
                      ${theme === t ? 'bg-primary/20 text-primary-content' : 'bg-black/40 text-white'}
                      backdrop-blur-sm
                      transform transition-transform duration-300
                      ${hoveredTheme === t ? 'translate-y-0' : 'translate-y-1'}
                    `}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </div>

                  {/* Selection indicator */}
                  {theme === t && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                      <Check className="w-4 h-4 text-primary-content" />
                    </div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* 3D shadow effect */}
                <div className={`
                  absolute inset-0 rounded-2xl -z-10 transition-all duration-500
                  ${hoveredTheme === t ? 'bg-primary/20 blur-xl' : 'bg-base-300 blur-sm'}
                  ${theme === t ? 'scale-90' : 'scale-95'}
                `} />
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4 bg-base-100/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-base-300/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-accent to-secondary rounded-xl">
                <Sparkles className="w-5 h-5 text-accent-content" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Live Preview
                </h3>
                <p className="text-base-content/70 text-sm">See your theme in action</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-medium text-primary">Real-time Preview</span>
            </div>
          </div>

          {/* 3D Animated Chat Preview */}
          <div className={`
            relative rounded-2xl overflow-hidden
            transform transition-all duration-1000
            ${isAnimating ? 'scale-95' : 'scale-100'}
          `}>
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x" />
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary animate-float"
                  style={{
                    left: `${10 + (i * 10)}%`,
                    top: `${20 + (i * 5)}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            <div className="relative p-6">
              <div className="max-w-2xl mx-auto">
                {/* 3D Chat Container */}
                <div className={`
                  bg-base-100 rounded-2xl shadow-2xl overflow-hidden
                  transform transition-all duration-500
                  hover:shadow-primary/20 hover:shadow-2xl
                  border border-base-300/50
                  relative
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent before:animate-shimmer
                `}>
                  {/* Chat Header with gradient */}
                  <div className={`
                    px-6 py-4
                    bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10
                    backdrop-blur-sm
                    border-b border-base-300/50
                  `}>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold text-lg shadow-lg">
                          J
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            John Doe
                          </h3>
                          <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full">Online</span>
                        </div>
                        <p className="text-base-content/60 text-sm">Last seen: Just now</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages with animation */}
                  <div className="p-6 space-y-4 min-h-[300px] max-h-[300px] overflow-y-auto bg-gradient-to-b from-base-100 to-base-200">
                    {PREVIEW_MESSAGES.map((message, index) => (
                      <div
                        key={message.id}
                        className={`
                          flex ${message.isSent ? "justify-end" : "justify-start"}
                          transform transition-all duration-500
                          ${isAnimating ? 'translate-x-0 opacity-100' : ''}
                        `}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div
                          className={`
                            relative max-w-[75%] rounded-2xl p-4 shadow-lg
                            transform transition-all duration-300
                            hover:scale-[1.02] hover:shadow-xl
                            ${message.isSent 
                              ? "bg-gradient-to-br from-primary to-secondary text-primary-content rounded-br-none" 
                              : "bg-base-200 border border-base-300 rounded-bl-none"
                            }
                            before:absolute before:w-4 before:h-4 before:bg-inherit
                            ${message.isSent
                              ? 'before:bottom-0 before:right-[-8px] before:clip-path-polygon-arrow-right'
                              : 'before:bottom-0 before:left-[-8px] before:clip-path-polygon-arrow-left'
                            }
                          `}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className={`
                              text-xs
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                            `}>
                              12:00 PM
                            </p>
                            {message.isSent && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-primary-content/50" />
                                <div className="w-2 h-2 rounded-full bg-primary-content/70" />
                                <div className="w-2 h-2 rounded-full bg-primary-content" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input with glass effect */}
                  <div className="p-4 bg-base-100/80 backdrop-blur-lg border-t border-base-300/50">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          className="input input-bordered w-full pl-12 pr-4 h-12 rounded-xl border-base-300/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Type your message here..."
                          value="This is a preview of your beautiful theme ✨"
                          readOnly
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <Send className="w-3 h-3 text-primary-content" />
                          </div>
                        </div>
                      </div>
                      <button className={`
                        btn h-12 px-6 rounded-xl
                        bg-gradient-to-r from-primary to-secondary
                        hover:from-primary/90 hover:to-secondary/90
                        border-none
                        text-primary-content
                        transform transition-all duration-300
                        hover:scale-105 hover:shadow-lg
                        active:scale-95
                        shadow-md
                      `}>
                        <Send className="w-5 h-5" />
                        Send
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="text-xs text-base-content/60">Press</span>
                      <kbd className="kbd kbd-sm bg-base-200 border-base-300">Enter</kbd>
                      <span className="text-xs text-base-content/60">to send •</span>
                      <kbd className="kbd kbd-sm bg-base-200 border-base-300">Shift</kbd>
                      <kbd className="kbd kbd-sm bg-base-200 border-base-300">Enter</kbd>
                      <span className="text-xs text-base-content/60">for new line</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 backdrop-blur-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">15+</div>
            <div className="text-sm text-base-content/70">Beautiful Themes</div>
          </div>
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-4 backdrop-blur-lg border border-secondary/20">
            <div className="text-2xl font-bold text-secondary">Real-time</div>
            <div className="text-sm text-base-content/70">Live Preview</div>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-4 backdrop-blur-lg border border-accent/20">
            <div className="text-2xl font-bold text-accent">3D Effects</div>
            <div className="text-sm text-base-content/70">Smooth Animations</div>
          </div>
        </div>
      </div>

      {/* Add custom animations to global styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .clip-path-polygon-arrow-right {
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        
        .clip-path-polygon-arrow-left {
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
        
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
        
        .rotate-x-3 {
          transform: rotateX(3deg);
        }
      `}</style>
    </div>
    
  );
};

export default SettingsPage;