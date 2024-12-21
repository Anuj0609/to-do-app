import Accordion from "@/components/Accordion";
import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { TaskProvider } from "@/context/TaskContext";

export default function Home() {
  return (
    <TaskProvider>
      <Header />
      <TaskInput />
      <Accordion />
      <TaskList />
    </TaskProvider>
  );
}
