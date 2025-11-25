// src/store/authStore.js
import { create } from "zustand";
import axios from "../utils/axiosConfig";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    try {
      set({ loading: true });
      const response = await axios.get("/me");
      
      if (response.data.success) {
        set({ user: response.data.user });
        return { success: true };
      } else {
        set({ user: null });
        return { success: false };
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user) => set({ user }),

  login: async (email, password) => {
    try {
      set({ loading: true });
      const response = await axios.post("/login", { email, password });

      if (response.data.success) {
        set({ user: response.data.user });
        toast.success("Welcome! Login successful");
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
      return { 
        success: false, 
        message: errorMessage
      };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const response = await axios.get("/logout");
      
      if (response.data.success) {
        set({ user: null });
        toast.success("Logout successful!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed!");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;