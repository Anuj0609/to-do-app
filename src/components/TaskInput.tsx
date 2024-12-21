import React, { useState } from "react";
import { useTask } from "@/context/TaskContext";
import categoryIcons from "@/utils/categoryIcons";

function TaskInput() {
  const [inputTask, setInputTask] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { addTask, categories, clearAllTasks } = useTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTask.trim() && category) {
      addTask(inputTask, category);
      setInputTask("");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row p-4 gap-2 justify-evenly items-center"
      >
        <input
          value={inputTask}
          type="text"
          onChange={(e) => setInputTask(e.target.value)}
          placeholder="Enter your task"
          className="px-2 py-1 border border-gray-300 rounded-md bg-white"
        />

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#463f3a]"
          >
            <option value="" className=" hover:text-2xl font-light">
              Select Category
            </option>
            {categories.map((cat, index) => (
              <option
                key={index}
                value={cat}
                className="px-2 py-1 text-lg text-gray-700 focus:bg-red-500 hover:text-4xl"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="px-3 py-1 bg-[#4e0110] text-white rounded-md hover:bg-red-400 transition-all duration-300"
          >
            Add Task
          </button>
        </div>
        <div className="px-3 py-1 bg-[#130407] text-white rounded-md hover:bg-red-400 transition-all duration-300 ">
          <button onClick={clearAllTasks} className="flex flex-row items-center">
            <img className="w-4" src="/clear.png" alt="Clear Icon" />
            <span className="px-4">Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskInput;
