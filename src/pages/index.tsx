import Accordion from "@/components/Accordion";
import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { TaskProvider } from "@/context/TaskContext";

export default function Home() {
  return (
    <TaskProvider>
      <div className=" flex flex-col items-center p-4 w-screen">
        <Header />
        <div className="flex flex-row w-screen">
          <div className="w-1/2">
            <Accordion />
          </div>
          <div className="w-1/2">
            <TaskInput />
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}
