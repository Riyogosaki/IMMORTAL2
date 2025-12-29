import { useEffect, useState } from "react";
import { Sparkles, Shield, Lock, Key, Globe, Users, Zap, Cpu } from "lucide-react";

const AuthmagePatter = ({ title, subtitle }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCube, setHoveredCube] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: (prev.x + 0.2) % 360,
        y: (prev.y + 0.1) % 360
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  };

  const cubeData = [
    { icon: Shield, color: "from-blue-500 to-cyan-500", text: "Secure" },
    { icon: Lock, color: "from-emerald-500 to-green-500", text: "Encrypted" },
    { icon: Key, color: "from-purple-500 to-pink-500", text: "Auth" },
    { icon: Globe, color: "from-orange-500 to-red-500", text: "Global" },
    { icon: Users, color: "from-cyan-500 to-blue-500", text: "Network" },
    { icon: Zap, color: "from-yellow-500 to-orange-500", text: "Fast" },
    { icon: Cpu, color: "from-indigo-500 to-purple-500", text: "Powered" },
    { icon: Sparkles, color: "from-pink-500 to-rose-500", text: "Magic" },
    { icon: Shield, color: "from-green-500 to-emerald-500", text: "Safe" },
  ];

  return (
    <div 
      className="hidden lg:flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)`,
              transform: `translate3d(${Math.sin(i) * 10}px, ${Math.cos(i) * 10}px, ${Math.random() * 100 - 50}px)`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* 3D Cube Grid */}
      <div className="relative z-10 p-12">
        <div className="max-w-2xl text-center">
          {/* 3D Cube Grid Container */}
          <div 
            className="grid grid-cols-3 gap-6 mb-12 relative"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x + mousePosition.y * 10}deg) rotateY(${rotation.y + mousePosition.x * 10}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease-out',
            }}
          >
            {cubeData.map((cube, i) => {
              const Icon = cube.icon;
              const row = Math.floor(i / 3);
              const col = i % 3;
              const depth = (row - 1) * 40 + (col - 1) * 20;
              const isHovered = hoveredCube === i;
              
              return (
                <div
                  key={i}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredCube(i)}
                  onMouseLeave={() => setHoveredCube(null)}
                  style={{
                    transform: `translateZ(${depth}px)`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Cube Container */}
                  <div className="relative">
                    {/* Cube glow effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-r ${cube.color} rounded-2xl blur-xl transition-all duration-500 ${
                      isHovered ? 'opacity-50 scale-110' : 'opacity-20 scale-100'
                    }`}></div>
                    
                    {/* 3D Cube */}
                    <div className={`
                      relative aspect-square rounded-xl
                      bg-gradient-to-br from-gray-900 to-gray-800
                      border-2 border-blue-500/30
                      flex items-center justify-center
                      shadow-2xl
                      transition-all duration-500
                      group-hover:shadow-blue-500/40
                      ${isHovered ? 'scale-110' : ''}
                    `}
                    style={{
                      transform: isHovered 
                        ? `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(30px)` 
                        : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
                    }}
                    >
                      {/* Icon with gradient */}
                      <div className={`relative p-4 rounded-xl bg-gradient-to-r ${cube.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}>
                        <Icon className="w-8 h-8 text-white group-hover:scale-125 transition-transform duration-300" />
                      </div>
                      
                      {/* Floating particles on hover */}
                      {isHovered && (
                        <>
                          {Array.from({ length: 8 }).map((_, j) => (
                            <div
                              key={j}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `floatParticle ${Math.random() * 2 + 1}s ease-in-out infinite`,
                                animationDelay: `${j * 0.1}s`,
                              }}
                            />
                          ))}
                        </>
                      )}
                      
                      {/* Cube faces for 3D effect */}
                      <div className="absolute inset-0 rounded-xl border-2 border-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Cube label */}
                    <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-300 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap ${
                      isHovered ? 'translate-y-0' : 'translate-y-2'
                    }`}>
                      {cube.text}
                    </div>
                  </div>
                  
                  {/* Connection lines */}
                  {(i % 3 !== 2) && (
                    <div className="absolute top-1/2 right-0 w-6 h-px bg-gradient-to-r from-blue-500/50 to-transparent transform translate-x-3"></div>
                  )}
                  {(i < 6) && (
                    <div className="absolute bottom-0 left-1/2 h-6 w-px bg-gradient-to-b from-blue-500/50 to-transparent transform -translate-y-3"></div>
                  )}
                </div>
              );
            })}
            
            {/* Central connection hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative size-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Title with gradient */}
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-lg mx-auto">
            {subtitle}
          </p>

          {/* Security stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center group">
              <div className="relative inline-block mb-2">
                <div className="absolute -inset-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative size-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-green-500/30 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-green-400">256-bit</div>
              <div className="text-sm text-gray-400">Encryption</div>
            </div>
            
            <div className="text-center group">
              <div className="relative inline-block mb-2">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative size-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-blue-500/30 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            
            <div className="text-center group">
              <div className="relative inline-block mb-2">
                <div className="absolute -inset-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative size-12 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-purple-500/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-400">&lt;10ms</div>
              <div className="text-sm text-gray-400">Latency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-spin-slow" style={{ width: '400px', height: '400px' }}></div>
          <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-spin-reverse" style={{ width: '500px', height: '500px' }}></div>
          <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full animate-spin" style={{ width: '600px', height: '600px' }}></div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          33% { transform: translate3d(30px, -50px, -20px) rotate(120deg); }
          66% { transform: translate3d(-20px, 20px, 10px) rotate(240deg); }
        }
        
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { transform: translate(20px, -20px) scale(0.5); opacity: 0.5; }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthmagePatter;