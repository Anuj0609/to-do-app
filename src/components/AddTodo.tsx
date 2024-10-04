import { Task } from "@/app/page";
import React from "react";

export const AddTodo = ({
  taskList,
  setTaskList,
}: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newTaskText = data.get("new-task")?.toString();
    if (!newTaskText) return;
    if (newTaskText.trim()) {
      const newTask: Task = {
        name: newTaskText,
        id: Math.floor(Math.random() * 99999),
      };
      const updatedTask = [newTask, ...taskList];
      localStorage.setItem("taskLists", JSON.stringify(updatedTask));
      setTaskList(updatedTask);
    }
    e.currentTarget.reset();
  };

  return (
    <form
      className="bg-#969696 text-lg flex md:w-[465px]"
      onSubmit={addTask}
      w-full
    >
      <input
        type="text"
        placeholder="What do you need to do?"
        name="new-task"
        className="bg-[#F1ECE6] rounded-l-2xl py-1 px-4 text-gray-500 min-w-0 max-w-screen-2xl outline-gray-300 w-full"
        autoComplete="off"
      />
      <button
        className="bg-[#76B7CD] p-1 px-4 rounded-r-2xl text-white font-bold"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};
