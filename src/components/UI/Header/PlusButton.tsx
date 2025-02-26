import AddTaskModal from "../Modal/AddTaskModal";
import { PlusButtonProps } from "../../../types";

const PlusButton: React.FC<PlusButtonProps> = ({
  setNewTask,
  openModal,
  setOpenModal,
  updateTask,
  newTask,
  darkMode,
}) => {
  return (
    <div className="relative">
      <button
        onClick={setOpenModal}
        className={`flex items-center justify-center w-12 h-12 ${
          darkMode ? "bg-slate-600" : "bg-[#00D1C1]"
        }  border border-gray-300 rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-110 ${
          darkMode ? "hover:bg-slate-500" : "hover:bg-[#00B3A5]"
        }  hover:shadow-lg`}
      >
        <img
          src={darkMode ? "/icons/white_plus_icon.png" : "/icons/plus_icon.png"}
          alt="plus icon"
          width={18}
          height={18}
          className="transition-transform duration-300 ease-in-out hover:rotate-90"
        />
      </button>

      {openModal && (
        <AddTaskModal
          open={openModal}
          setOpen={setOpenModal}
          setNewTask={setNewTask}
          updateTask={updateTask}
          newTask={newTask}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default PlusButton;
