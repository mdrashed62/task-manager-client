import React from "react";

export default function TaskList({
  tasks,
  handleEdit,
  handleDelete,
  handleToggle,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tasks?.length > 0 ? (
        tasks?.map((task) => (
          <div
            key={task._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <button
                onClick={() => handleToggle(task._id, task.status)}
                className={`px-3 py-1 text-sm rounded-full mb-3 transition-colors duration-200 ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }`}
              >
                {task.status === "completed" ? "Completed" : "Pending"}
              </button>
            </div>
            <p className="text-gray-600 mb-3">{task.description}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(task)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          No tasks found.
        </div>
      )}
    </div>
  );
}
