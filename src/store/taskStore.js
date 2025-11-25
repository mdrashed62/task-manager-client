import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const useTaskStore = create((set, get) => ({
  tasks: [],
  filter: "all",
  loading: false,
  creating: false,

  createTitle: "",
  createDescription: "",
  createStatus: "pending",

  editTitle: "",
  editDescription: "",
  editStatus: "pending",
  editingTask: null,
  isModalOpen: false,

  setTasks: (tasks) => set({ tasks }),
  setFilter: (filter) => set({ filter }),
  setLoading: (loading) => set({ loading }),
  setCreating: (creating) => set({ creating }),

  setCreateTitle: (title) => set({ createTitle: title }),
  setCreateDescription: (desc) => set({ createDescription: desc }),
  setCreateStatus: (status) => set({ createStatus: status }),

  setEditTitle: (title) => set({ editTitle: title }),
  setEditDescription: (desc) => set({ editDescription: desc }),
  setEditStatus: (status) => set({ editStatus: status }),
  setEditingTask: (task) => set({ editingTask: task }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),


  fetchTasks: async () => {
    try {
      set({ loading: true });
      const { filter } = get();

      const res = await axios.get(
        `https://backend-tau-seven-87.vercel.app/tasks${
          filter !== "all" ? `?status=${filter}` : ""
        }`,
        { withCredentials: true }
      );

      set({ tasks: res.data.tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks!");
    } finally {
      set({ loading: false });
    }
  },

  createTask: async () => {
    try {
      set({ creating: true });
      const { createTitle, createDescription, createStatus } = get();

      const res = await axios.post(
        "https://backend-tau-seven-87.vercel.app/tasks",
        {
          title: createTitle,
          description: createDescription,
          status: createStatus,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        set({
          createTitle: "",
          createDescription: "",
          createStatus: "pending",
        });
        get().fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error.response?.data?.message || "Failed to create task");
    } finally {
      set({ creating: false });
    }
  },

  updateTask: async () => {
    try {
      set({ loading: true });
      const { editingTask, editTitle, editDescription, editStatus } = get();
      if (!editingTask) return;

      const res = await axios.put(
        `https://backend-tau-seven-87.vercel.app/tasks/${editingTask._id}`,
        {
          title: editTitle,
          description: editDescription,
          status: editStatus,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        set({ isModalOpen: false, editingTask: null });
        get().fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    try {
      set({ loading: true });
      const res = await axios.delete(
        `https://backend-tau-seven-87.vercel.app/tasks/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        get().fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      set({ loading: false });
    }
  },

  toggleTask: async (id) => {
    try {
      set({ loading: true });
      const res = await axios.patch(
        `https://backend-tau-seven-87.vercel.app/tasks/${id}/toggle`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        get().fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to toggle task status");
      }
    } catch (error) {
      console.error("Error toggling task:", error);
      toast.error(
        error.response?.data?.message || "Failed to toggle task status"
      );
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTaskStore;