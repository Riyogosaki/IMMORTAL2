import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://immortal1-1.onrender.com"   

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],
      socket: null,
      token: null,

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data });
          get().connectSocket();
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ authUser: null, token: null });
          // Clear any invalid tokens
          localStorage.removeItem('auth-token');
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          get().connectSocket();
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Signup failed";
          toast.error(errorMessage);
          throw error; // Re-throw for component handling
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
          get().connectSocket();
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Login failed";
          toast.error(errorMessage);
          throw error;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null, onlineUsers: [] });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          console.error("Logout error:", error);
          // Even if API call fails, clear local state
          set({ authUser: null, onlineUsers: [] });
          get().disconnectSocket();
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Profile update failed";
          toast.error(errorMessage);
          throw error;
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        try {
          const socket = io(BASE_URL, {
            query: {
              userId: authUser._id,
            },
            transports: ["websocket"], // Better for production
          });

          socket.connect();

          socket.on("connect", () => {
            console.log("Socket connected successfully");
          });

          socket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
          });

          socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
          });

          socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
          });

          set({ socket });
        } catch (error) {
          console.error("Failed to connect socket:", error);
        }
      },

      disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
          socket.removeAllListeners(); // Clean up listeners
          socket.disconnect();
          set({ socket: null });
        }
      },

      // Helper method to check if user is online
      isUserOnline: (userId) => {
        return get().onlineUsers.includes(userId);
      },

      // Clear auth state (useful for token expiration)
      clearAuth: () => {
        set({ authUser: null, onlineUsers: [] });
        get().disconnectSocket();
      },
    }),
    {
      name: "auth-storage", // name for the storage
      partialize: (state) => ({ 
        authUser: state.authUser,
        // Don't persist sensitive data or socket instances
      }),
    }
  )
);


// Optional: Auto-cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    useAuthStore.getState().disconnectSocket();
  });
}
