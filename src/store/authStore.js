import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    try {
      set({ loading: true });
      const response = await axios.get("https://backend-tau-seven-87.vercel.app//me", { 
        withCredentials: true 
      });
      if (response.data.success) {
        set({ user: response.data.user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        "https://backend-tau-seven-87.vercel.app//login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        set({ user: response.data.user });
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Login failed!" 
      };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const response = await axios.get("https://backend-tau-seven-87.vercel.app//logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        set({ user: null });
        return true;
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ loading: false });
    }
    return false;
  },
}));

export default useAuthStore;