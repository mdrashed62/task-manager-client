import React, { useEffect, useState } from "react";
import TaskForm from "./task-form";
import useTaskStore from "../../store/taskStore";
import TaskList from "./task-list";
import { Toaster } from "react-hot-toast";

function TaskCards() {
  const {
    tasks,
    filter,
    loading,
    setFilter,
    createTitle,
    setCreateTitle,
    createDescription,
    setCreateDescription,
    createStatus,
    setCreateStatus,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    editStatus,
    setEditStatus,
    setEditingTask,
    isModalOpen,
    setIsModalOpen,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    creating,
  } = useTaskStore();

  const [deleteTaskId, setDeleteTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, filter]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => setIsModalOpen(false);

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Task Manager</h1>
        <p className="text-lg text-gray-600">
          Here you can create your task...!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {totalTasks}
          </div>
          <div className="text-gray-500 font-medium">Total</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {completedCount}
          </div>
          <div className="text-gray-500 font-medium">Completed</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {pendingCount}
          </div>
          <div className="text-gray-500 font-medium">Pending</div>
        </div>
      </div>

      <TaskForm
        title={createTitle}
        setTitle={setCreateTitle}
        description={createDescription}
        setDescription={setCreateDescription}
        status={createStatus}
        setStatus={setCreateStatus}
        handleSubmit={createTask}
        creating={creating}
      />

      <div className="flex space-x-1 bg-gray-200 rounded-xl p-1 mb-6 w-fit">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              filter === f
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
     
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-700">Loading...</span>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          handleEdit={handleEdit}
          handleDelete={(id) => setDeleteTaskId(id)}
          handleToggle={toggleTask}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white/70 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Task</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full outline-none px-4 py-3 border rounded-lg"
                placeholder="Task title"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full outline-none px-4 py-3 border rounded-lg"
                placeholder="Task description"
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-4 outline-none py-3 border rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleCancelEdit}
                disabled={loading}
                className="px-6 py-2 rounded-xl border bg-white border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={updateTask}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-[#7064F3] text-white hover:bg-[#9E57F7] disabled:opacity-50 flex items-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTaskId && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Delete Task
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTaskId(null)}
                disabled={loading}
                className="px-6 py-2 rounded-xl border bg-white border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteTask(deleteTaskId);
                  setDeleteTaskId(null);
                }}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}

export default TaskCards;