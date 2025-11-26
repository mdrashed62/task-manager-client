import { create } from "zustand";
import axios from "../utils/axiosConfig";
import { toast } from 'react-toastify';

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
  setEditingTask: (task) => {
    if (task) {
      set({
        editingTask: task,
        editTitle: task.title,
        editDescription: task.description,
        editStatus: task.status,
      });
    } else {
      set({
        editingTask: null,
        editTitle: "",
        editDescription: "",
        editStatus: "pending",
      });
    }
  },
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  fetchTasks: async () => {
    try {
      set({ loading: true });
      const { filter } = get();

      const res = await axios.get(
        `/tasks${filter !== "all" ? `?status=${filter}` : ""}`
      );

      console.log("Fetch tasks response:", res.data);

      if (res.data.success) {
        set({ tasks: res.data.tasks });
      } else {
        toast.error(res.data.message || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        toast.error("Please login to view tasks");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch tasks!");
      }
    } finally {
      set({ loading: false });
    }
  },

  createTask: async () => {
    try {
      set({ creating: true });
      const { createTitle, createDescription, createStatus } = get();

      if (!createTitle.trim()) {
        toast.error("Task title is required");
        return;
      }

      console.log("Creating task with data:", {
        title: createTitle,
        description: createDescription,
        status: createStatus,
      });

      const res = await axios.post("/tasks", {
        title: createTitle,
        description: createDescription,
        status: createStatus,
      });

      console.log("Create task response:", res.data);

      if (res.data.success) {
        toast.success("Task created successfully!");
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
      if (error.response?.status === 401) {
        toast.error("Please login to create tasks");
      } else {
        toast.error(error.response?.data?.message || "Failed to create task");
      }
    } finally {
      set({ creating: false });
    }
  },

  updateTask: async () => {
    try {
      set({ loading: true });
      const { editingTask, editTitle, editDescription, editStatus } = get();

      if (!editingTask) {
        toast.error("No task selected for editing");
        return;
      }

      if (!editTitle.trim()) {
        toast.error("Task title is required");
        return;
      }

      const res = await axios.put(`/tasks/${editingTask._id}`, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
      });

      console.log("Update task response:", res.data);

      if (res.data.success) {
        toast.success("Task updated successfully!");
        set({
          isModalOpen: false,
          editingTask: null,
          editTitle: "",
          editDescription: "",
          editStatus: "pending",
        });
        get().fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to update tasks");
      } else {
        toast.error(error.response?.data?.message || "Failed to update task");
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    
    try {
      set({ loading: true });
      const res = await axios.delete(`/tasks/${id}`);

      console.log("Delete task response:", res.data);

      if (res.data.success) {
        toast.success("Task deleted successfully!");
        get().fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to delete tasks");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete task");
      }
    } finally {
      set({ loading: false });
    }
  },

  toggleTask: async (id) => {
    try {
      set({ loading: true });
      const res = await axios.patch(`/tasks/${id}/toggle`);

      console.log("Toggle task response:", res.data);

      if (res.data.success) {
        toast.success("Task status updated!");
        get().fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to toggle task status");
      }
    } catch (error) {
      console.error("Error toggling task:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to update tasks");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to toggle task status"
        );
      }
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTaskStore;
