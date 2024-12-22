import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
  category: string;
  task: string;
  id: string;
  completed: boolean;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  categories: string[];
  addTask: (task: string, category: string) => void;
  toggleTaskCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (
    id: string,
    updatedTask: string,
    updatedCategory: string
  ) => void;
  clearAllTasks: () => void;
}

const defaultContextValue: TaskContextType = {
  tasks: [],
  categories: [
    "Recet Task",
    "Work",
    "Personal",
    "Home",
    "Fitness",
    "Shopping",
    "Family",
    "Study",
    "Finance",
    "Travel",
    "Health",
    "Goals",
    "Events",
    "Projects",
    "Miscellaneous",
  ],
  addTask: () => {},
  toggleTaskCompleted: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  clearAllTasks: () => {},
};

const TaskContext = createContext<TaskContextType>(defaultContextValue);

export const useTask = () => useContext(TaskContext);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories] = useState<string[]>([
    "Work",
    "Personal",
    "Home",
    "Fitness",
    "Shopping",
    "Hobbies",
    "Family",
    "Study",
    "Finance",
    "Travel",
    "Health",
    "Goals",
    "Events",
    "Projects",
    "Miscellaneous",
  ]);

  useEffect(() => {
    const saveTasks = localStorage.getItem("tasks");
    if (saveTasks) {
      setTasks(JSON.parse(saveTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task: string, category: string) => {
    setTasks((prevTasks) => [
      {
        task,
        category,
        completed: false,
        id: uuidv4(),
        createdAt: new Date().toLocaleDateString(),
      },
      ...prevTasks,
    ]);
  };

  const toggleTaskCompleted = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

 const handleDelete = (id: string) => {
   setTasks((prevTasks) => {
     const updatedTasks = prevTasks.filter((task) => task.id !== id);
     localStorage.setItem("tasks", JSON.stringify(updatedTasks));
     return updatedTasks;
   });
 };


  const handleEdit = (
    id: string,
    updatedTask: string,
    updatedCategory: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, task: updatedTask, category: updatedCategory }
          : task
      )
    );
  };

  const clearAllTasks = () => setTasks([]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        addTask,
        toggleTaskCompleted,
        handleDelete,
        handleEdit,
        clearAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
