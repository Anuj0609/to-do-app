import React, { useState } from "react";
import { useTask } from "@/context/TaskContext";
import categoryIcons from "@/utils/categoryIcons";

function TaskInput() {
  const [inputTask, setInputTask] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { addTask, categories } = useTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTask.trim() && category) {
      addTask(inputTask, category);
      setInputTask("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row p-4 gap-2 justify-evenly"
    >
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-1 border border-gray-300 rounded-2xl text-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#463f3a]"
        >
          <option value="" className="bg-[#8a817c] hover:text-2xl font-light">
            Select Category
          </option>
          {categories.map((cat, index) => (
            <option
              key={index}
              value={cat}
              className="px-2 py-1 text-lg text-gray-700 bg-[#8a817c] focus:bg-red-500 hover:text-4xl"
            >
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row">
        <div>
          <input
            value={inputTask}
            type="text"
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Enter your task"
            className="p-1 border border-gray-300 rounded-l-3xl text-lg bg-white"
          />
        </div>
        <div>
          <button
            type="submit"
            className="p-1 border border-gray-300 rounded-r-3xl text-lg bg-[#CAE5FF]"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskInput;
