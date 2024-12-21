import { useTask } from "@/context/TaskContext";
import React, { useState } from "react";

function Accordion() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories, tasks, toggleTaskCompleted, handleDelete, handleEdit } =
    useTask();

  const [editingTask, setEditingTask] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleSaveEdit = (
    taskId: string,
    updatedTask: string,
    updatedCategory: string
  ) => {
    handleEdit(taskId, updatedTask, updatedCategory);
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto p-4  w-full md:w-2/3">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Category-Wise Tasks
        </h2>
      </div>

      <div className="space-y-1 justify-center ">
        {categories.map((category) => (
          <div
            key={category}
            className="border-b border-gray-300 shadow-md rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => {
                if (tasks.length > 0) handleCategoryClick(category);
              }}
              className="flex justify-between items-center w-full py-2 px-6 text-lg font-light text-gray-900 bg-gray-100  hover:bg-[#786f52] transition-all duration-600 ease-in-out hover:text-white"
            >
              
              <span className="md:text-sm">{category}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-gray-900">
                  {tasks.filter((task) => task.category === category).length}
                </span>
                <span className="text-lg font-bold">
                  {selectedCategory === category ? "-" : "+"}
                </span>
              </div>
            </button>

            {selectedCategory === category && (
              <div className="space-y-3">
                <ul>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task) => (
                      <li
                        key={task.id}
                        className="flex justify-between items-center py-2 px-2 bg-white hover:shadow-lg transition-all duration-400 ease-in-out"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompleted(task.id)}
                            className="w-4 h-4 rounded-full border-gray-300 checked:bg-blue-500 transition-all duration-200"
                          />
                          {editingTask === task.id ? (
                            <input
                              type="text"
                              defaultValue={task.task}
                              onBlur={(e) =>
                                handleSaveEdit(
                                  task.id,
                                  e.target.value,
                                  task.category
                                )
                              }
                              className="p-1 border border-gray-300 rounded-md w-3/4"
                            />
                          ) : (
                            <span
                              className={`${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : "text-gray-700"
                              } text-sm font-medium`}
                            >
                              {task.task}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {task.createdAt}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          {editingTask !== task.id && (
                            <button
                              onClick={() => setEditingTask(task.id)}
                              className="px-3 py-1 bg-yellow-500 text-sm text-white rounded-md hover:bg-yellow-400 transition-all duration-300"
                            >
                              Edit
                            </button>
                          )}
                          {editingTask === task.id && (
                            <button
                              onClick={() =>
                                handleSaveEdit(
                                  task.id,
                                  task.task,
                                  task.category
                                )
                              }
                              className="px-3 py-1 bg-[#586BA4] text-white rounded-md hover:bg-green-400 transition-all duration-300"
                            >
                              Save
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="px-3 py-1 bg-[#4e0110] text-white rounded-md hover:bg-red-400 transition-all duration-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accordion;
