import { Task } from "@/app/page";
import { useState } from "react";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";

export const TodoList = ({
  taskList,
  setTaskList,
}: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTaskName, setNewTaskName] = useState("");

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

  const clearTask = () => {
    setTaskList([]);
    localStorage.removeItem("taskLists");
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
    <div className="bg-[#F1ECE6] w-[465px] mt-4 rounded-2xl flex flex-col p-4 opacity-80">
      <ul>
        {taskList.map((task: Task) => (
          <li key={task.id} className="mb-4 border-b border-orange-300 pb-3">
            <div className="flex justify-between items-center">
              {isEditable && currentTask && currentTask.id === task.id ? (
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="bg-[#F1ECE6] w-full m-1 p-1 text-lg font-light rounded-md"
                  autoFocus
                />
              ) : (
                <span className="text-lg font-light">{task.name}</span>
              )}
              <div className="flex space-x-2 items-center">
                {isEditable && currentTask && currentTask.id === task.id ? (
                  <button
                    onClick={updateTask}
                    className="text-gray-500 text-md"
                    disabled={newTaskName.trim() === ""}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => enableEditing(task)}
                    className="w-8 h-8"
                  >
                    <MdEditNote className="text-gray-500" size={28} />
                  </button>
                )}
                <button onClick={() => deleteTask(task.id)} className="w-8 h-8">
                  <MdDeleteOutline className="text-orange-500" size={28} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <button
          onClick={clearTask}
          className="text-orange-500 px-0 py-2 mt-4 rounded flex flex-row items-center space-x-2"
        >
          <img className="w-4" src="/clear.png" alt="Clear Icon" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};
