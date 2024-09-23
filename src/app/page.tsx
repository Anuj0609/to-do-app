"use client";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import React, { useState, useEffect } from "react";

export interface Task {
  id: number;
  name: string;
}

export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskLists");
    if (savedTasks) {
      const savedTasksArray: Task[] = JSON.parse(savedTasks);
      setTaskList(savedTasksArray);
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="flex justify-center min-h-screen">
        <div className="flex flex-col items-center w-full">
          <img src="/logo.png" alt="Logo" className="w-32 mt-16 mb-5" />
          <AddTodo taskList={taskList} setTaskList={setTaskList} />
          {taskList.length > 0 ? (
            <TodoList taskList={taskList} setTaskList={setTaskList} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
