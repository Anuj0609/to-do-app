import { useTask } from "@/context/TaskContext";
import React, { useState } from "react";

function TaskList() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [updatedCategory, setUpdatedCategory] = useState<string>("");
  const [updatedTask, setUpdatedTask] = useState<string>("");

  const {
    tasks,
    toggleTaskCompleted,
    handleDelete,
    handleEdit,
    categories,
    clearAllTasks,
  } = useTask();

  const editTask = (
    taskId: string,
    currentTask: string,
    currentCategory: string
  ) => {
    setIsEditing(taskId);
    setUpdatedCategory(currentCategory);
    setUpdatedTask(currentTask);
  };

  const saveTask = (taskId: string) => {
    if (updatedTask.trim()) {
      handleEdit(taskId, updatedTask, updatedCategory);
    }
    setIsEditing(null);
  };

  const cancelEdit = () => {
    setIsEditing(null);
  };

  return (
    <div className="flex justify-center w-full px-6">
      <ul className="w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-3 p-2 rounded-xl shadow-md hover:shadow-xl "
          >
            <div className="flex flex-col space-y-3">
              {isEditing === task.id ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={updatedTask}
                      onChange={(e) => setUpdatedTask(e.target.value)}
                      className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300"
                    />
                    <select
                      value={updatedCategory}
                      onChange={(e) => setUpdatedCategory(e.target.value)}
                      className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => saveTask(task.id)}
                      className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompleted(task.id)}
                      className="w-6 h-5 rounded-full border-gray-300 checked:bg-blue-500 transition-all duration-200"
                    />
                    <div className="flex flex-col space-y-1">
                      <span
                        className={`text-sm font-medium ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-black"
                        }`}
                      >
                        {task.task
                          .toLowerCase()
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </span>
                      <span className="text-xs text-gray-400">
                        {task.createdAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {task.category}
                    </span>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-all duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        editTask(task.id, task.task, task.category)
                      }
                      className="px-2 py-1 bg-yellow-600 text-white rounded-xl hover:bg-yellow-500 transition-all duration-300"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
        <div className="flex justify-end ">
          <button
            onClick={clearAllTasks}
            className="flex flex-row gap-2 items-center"
          >
            <img className="w-4" src="/clear.png" alt="Clear Icon" />
            <span>Clear All</span>
          </button>
        </div>
      </ul>
    </div>
  );
}

export default TaskList;
