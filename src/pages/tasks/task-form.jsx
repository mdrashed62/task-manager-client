import React from "react";

export default function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  handleSubmit,
  creating
}) {
  return (
    <div className="bg-linear-to-r from-[#6865F2] to-[#A156F7] rounded-2xl shadow-lg p-6 py-10 mb-8">

      <div className="flex flex-col sm:flex-row gap-3 py-0 lg:py-4">

        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 bg-white rounded-xl outline-none"
          disabled={creating}
        />

        <input
          type="text"
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 px-4 py-3 bg-white rounded-xl outline-none"
          disabled={creating} 
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-3 bg-white rounded-xl outline-none"
          disabled={creating} 
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={creating}
          className="bg-white text-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 min-w-[140px]"
        >
          {creating ? (
            <>
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              Creating...
            </>
          ) : (
            <>
              + Create Task
            </>
          )}
        </button>

      </div>

    </div>
  );
}