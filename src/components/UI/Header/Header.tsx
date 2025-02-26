// Header.tsx
import Avatar from "./Avatar";
import PlusButton from "./PlusButton";
import type { HeaderProps } from "../../../types";
import { useState, useContext } from "react"; // Import useContext
import type { Task } from "../../../types";
import Tooltip from "../Tooltip/Tooltip";
import DarkModeContext from "../../../utils/context/DarkModeContext";

const Header: React.FC<HeaderProps> = ({ setInitialTasksState }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext) as {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  };

  const [newTask, setNewTask] = useState<Task>({
    id: "",
    content: "",
  });

  const handleUpdateTask = () => {
    setInitialTasksState((prevTasks) => ({
      ...prevTasks,
      pending: [...prevTasks.pending, newTask],
    }));
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div
      className={`p-4 ${
        isDarkMode ? "bg-slate-500" : "bg-[#F8F9FA]"
      }  dark:bg-slate-800 rounded-lg shadow-sm flex justify-between items-center`}
    >
      <div className="flex items-center space-x-4">
        <Avatar src="/images/avatar.jpg" />
        <h1 className={`${isDarkMode ? "text-white" : "text-[#2D3748]"}  `}>
          Hello, <span className="font-semibold">Angelo</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Tooltip title="Toggle Dark Mode" placement="left">
          <button onClick={toggleDarkMode}>{isDarkMode ? "🌙" : "☀️"}</button>
        </Tooltip>
        <Tooltip title="Create a new task" placement="left">
          <div>
            <PlusButton
              openModal={openModal}
              setOpenModal={handleOpenModal}
              setNewTask={setNewTask}
              updateTask={handleUpdateTask}
              newTask={newTask}
              darkMode={isDarkMode}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
