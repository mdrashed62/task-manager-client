import { create } from "zustand";
import axios from "../utils/axiosConfig";
import { toast } from 'react-toastify';

const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isInitialized: false,

  fullName: "",
  email: "",
  password: "",

  setFullName: (fullName) => set({ fullName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  clearForm: () => set({ fullName: "", email: "", password: "" }),

  clearError: () => set({ error: null }),

  initializeAuth: async () => {
    try {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      };

      const cookieToken = getCookie("token");
      const localToken = localStorage.getItem("token");

      console.log("Cookie Token:", cookieToken);
      console.log("LocalStorage Token:", localToken);

      const token = cookieToken || localToken;

      if (!token) {
        console.log("No token found");
        set({ isInitialized: true, user: null });
        return;
      }

      set({ loading: true });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get("/me");
      console.log("Auth response:", response.data);

      if (response.data.success && response.data.user) {
        set({ user: response.data.user, isInitialized: true, loading: false });
      } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        set({ user: null, isInitialized: true, loading: false });
      }
    } catch (error) {
      console.log("Auth initialization failed:", error);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      set({ user: null, isInitialized: true, loading: false });
    }
  },

  login: async () => {
    try {
      const { email, password } = get();
      if (!email || !password) {
        toast.error("Please fill all fields");
        return { success: false, message: "Missing fields" };
      }

      set({ loading: true, error: null });
      const response = await axios.post("/login", { email, password });
      console.log("Login response:", response.data);

      if (response.data.success && response.data.user) {
        const user = response.data.user;

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          console.log("Token stored in localStorage");
        }

        setTimeout(() => {
          const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return null;
          };
          const token = getCookie("token");
          console.log("Token after login (cookie):", token);
        }, 500);

        set({ user: user, email: "", password: "" });
        toast.success(`Welcome back ${user.fullName}!`);
        return { success: true };
      } else {
        const message = response.data.message || "Login failed!";
        set({ error: message });
        toast.error(message);
        return { success: false, message };
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed! Please try again.";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  register: async () => {
    try {
      const { fullName, email, password } = get();

      if (!fullName || !email || !password) {
        toast.error("Please fill all fields");
        return { success: false, message: "Missing fields" };
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return { success: false, message: "Password too short" };
      }

      set({ loading: true, error: null });

      const response = await axios.post("/register", {
        fullName,
        email,
        password,
      });
      console.log("Register response:", response.data);

      if (response.data.success) {
        toast.success("Account created successfully!");
        set({ fullName: "", email: "", password: "" });
        return { success: true };
      } else {
        const message = response.data.message || "Registration failed!";
        set({ error: message });
        toast.error(message);
        return { success: false, message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || "Registration failed!";
      set({ error: errorMessage });
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      await axios.get("/logout");

      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];

      toast.success("Logged out successfully");
      set({
        user: null,
        email: "",
        password: "",
        fullName: "",
        loading: false,
        error: null,
      });
      return true;
    } catch (error) {
      console.error("Logout API error:", error);
      set({ loading: false });
      return false;
    }
  },
}));

export default useAuthStore;
