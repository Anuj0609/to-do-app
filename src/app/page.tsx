"use client";
import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
}

export default function Home() {
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTaskName, setNewTaskName] = useState("");

  const addTask = () => {
    if (inputTask.trim()) {
      const newTask: Task = {
        name: inputTask,
        id: Math.floor(Math.random() * 99999),
      };
      const updatedTask = [...taskList, newTask];
      localStorage.setItem("taskLists", JSON.stringify(updatedTask));
      setTaskList(updatedTask);
      setInputTask("");
    }
  };

  const getTask = () => {
    const list = localStorage.getItem("taskLists");
    if (list) {
      setTaskList(JSON.parse(list));
    } else setTaskList([]);
  };

  useEffect(() => {
    getTask();
  }, []);

  const clearTask = () => {
    setTaskList([]);
    localStorage.removeItem("taskLists");
  };

  const deleteTask = (id: number) => {
    const updatedTask = taskList.filter((task: Task) => task.id !== id);
    localStorage.setItem("taskLists", JSON.stringify(updatedTask));
    setTaskList(updatedTask);
  };

  const enableEditing = (task: Task) => {
    setIsEditable(true);
    setCurrentTask(task);
    setNewTaskName(task.name);
  };

  const updateTask = () => {
    const updatedTask = taskList.map((task: Task) =>
      task.id === currentTask!.id ? { ...task, name: newTaskName } : task
    );
    localStorage.setItem("taskLists", JSON.stringify(updatedTask));
    setTaskList(updatedTask);
    setIsEditable(false);
    setCurrentTask(null);
    setNewTaskName("");
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <h2>TO-Do-LIST</h2>
        <div>
          <input
            type="text"
            placeholder="Add your Task"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul>
          {taskList.map((task: Task) => (
            <li key={task.id}>
              {isEditable && currentTask && currentTask.id === task.id ? (
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
              ) : (
                <h5>{task.name}</h5>
              )}
              <div>
                {isEditable && currentTask && currentTask.id === task.id ? (
                  <button onClick={updateTask}>Save</button>
                ) : (
                  <button onClick={() => enableEditing(task)}>Edit</button>
                )}
                <button onClick={() => deleteTask(task.id)}>deleteTask</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={clearTask}>Clear All</button>
      </div>
    </div>
  );
}
