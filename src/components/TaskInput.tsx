import React, { useState } from "react";
import { useTask } from "@/context/TaskContext";

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
    <form
      onSubmit={handleSubmit}
      className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 mx-auto md:gap-2 gap-1  w-3/4 lg:w-1/2 py-5 justify-center items-center"
    >
      <input
        value={inputTask}
        type="text"
        onChange={(e) => setInputTask(e.target.value)}
        placeholder="Enter your task"
        className="lg:col-span-4 md:col-span-4 border border-gray-300  px-2 rounded-xl md:h-12 h-10"
      />

      <div className="text-center lg:col-span-4 md:col-span-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 md:h-12 h-10 rounded-xl w-full px-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="text-center lg:col-span-2 md:col-span-4 bg-[#586BA4] text-white px-3 py-1 md:h-12 h-10 rounded-xl md:w-full w-1/2 mx-auto"
      >
        +Task
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          clearAllTasks();
        }}
        className="text-center lg:col-span-2 md:col-span-4 bg-[#4e0110] text-white rounded-xl md:h-12 h-10 px-3 py-1 md:w-full w-1/2 mx-auto"
      >
        <img src="/clear.png" alt="Clear Icon" className="inline w-6 mr-2" />
        Reset
      </button>
    </form>
  );
}

export default TaskInput;
