import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Edit2, Check, X, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  useEffect(() => {
    if (authUser?.fullName) {
      setTempName(authUser.fullName);
    }
  }, [authUser?.fullName]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleNameUpdate = async () => {
    if (tempName.trim() && tempName !== authUser.fullName) {
      await updateProfile({ fullName: tempName });
    }
    setIsEditingName(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-20">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="mt-3 text-base-content/70">Manage your personal information</p>
        </div>

        {/* Main Card */}
        <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-base-300">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-6 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsHoveringAvatar(true)}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <img
                      src={selectedImg || authUser?.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="size-40 rounded-full object-cover border-4 border-base-100 relative z-10 shadow-xl transform group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute -bottom-2 -right-2 
                      bg-gradient-to-r from-primary to-secondary 
                      p-3 rounded-full cursor-pointer 
                      shadow-lg z-20
                      transform transition-all duration-300
                      hover:scale-110 hover:shadow-2xl
                      active:scale-95
                      ${isUpdatingProfile ? "animate-pulse" : ""}
                    `}
                  >
                    {isUpdatingProfile ? (
                      <Loader2 className="w-5 h-5 text-base-100 animate-spin" />
                    ) : (
                      <Camera className="w-5 h-5 text-base-100" />
                    )}
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                  
                  {/* Hover Overlay */}
                  {isHoveringAvatar && !isUpdatingProfile && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center z-10 transition-opacity duration-300">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {isEditingName ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="bg-base-100 border border-primary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          autoFocus
                        />
                        <button
                          onClick={handleNameUpdate}
                          className="p-2 bg-success text-success-content rounded-full hover:scale-110 transition-transform"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingName(false);
                            setTempName(authUser?.fullName || "");
                          }}
                          className="p-2 bg-error text-error-content rounded-full hover:scale-110 transition-transform"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">{authUser?.fullName}</h2>
                        <button
                          onClick={() => setIsEditingName(true)}
                          className="p-2 hover:bg-base-300 rounded-full transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-2 bg-base-300 px-4 py-2 rounded-full">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">Verified Account</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-base-200/50 rounded-xl p-5 border border-base-300 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">Full Name</p>
                        <p className="font-medium">{authUser?.fullName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200/50 rounded-xl p-5 border border-base-300 hover:border-secondary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <Mail className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">Email Address</p>
                        <p className="font-medium">{authUser?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Account Information
                </h3>
                
                <div className="bg-base-200/50 rounded-xl p-6 border border-base-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-base-300/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Calendar className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">Member Since</p>
                          <p className="text-sm text-base-content/60">{formatDate(authUser?.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-base-300/50 transition-colors">
                      <div>
                        <p className="font-medium">Account Status</p>
                        <p className="text-sm text-base-content/60">Active and secured</p>
                      </div>
                      <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-base-300/50 transition-colors">
                      <div>
                        <p className="font-medium">Account Type</p>
                        <p className="text-sm text-base-content/60">Premium Member</p>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-full text-sm font-medium">
                        Premium
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-xl border border-primary/20">
                <div className="text-2xl font-bold text-primary">24</div>
                <p className="text-sm text-base-content/60 mt-1">Projects Created</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-5 rounded-xl border border-secondary/20">
                <div className="text-2xl font-bold text-secondary">1,248</div>
                <p className="text-sm text-base-content/60 mt-1">Contributions</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-5 rounded-xl border border-accent/20">
                <div className="text-2xl font-bold text-accent">98%</div>
                <p className="text-sm text-base-content/60 mt-1">Profile Complete</p>
              </div>
            </div>

            {/* Upload Status */}
            {isUpdatingProfile && (
              <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-xl flex items-center justify-center gap-3 animate-pulse">
                <Loader2 className="w-5 h-5 text-info animate-spin" />
                <p className="text-info">Updating profile picture...</p>
              </div>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/50">
            {isUpdatingProfile 
              ? "Uploading your new profile picture..." 
              : "Click the camera icon to update your profile photo. Drag & drop is also supported."
            }
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;