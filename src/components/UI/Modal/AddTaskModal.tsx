import { Fragment, useRef } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { AddTaskModalProps } from "../../../types";

const AddTaskModal = ({
  open,
  setOpen,
  setNewTask,
  updateTask,
  newTask,
  darkMode,
}: AddTaskModalProps) => {
  const cancelButtonRef = useRef(null);

  const determineEmptyTask = () => {
    return Object.values(newTask).some((value) => value === "");
  };
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        open={open}
        initialFocus={cancelButtonRef}
        onClose={setOpen}
        className="relative z-50 "
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`mx-auto w-[380px] h-[300px] relative rounded ${
                  darkMode ? "bg-slate-500" : "bg-white"
                }  `}
              >
                <button
                  className="absolute top-[16px] right-[15px] p-0 m-[-10px]"
                  onClick={() => {
                    setOpen(false);
                  }}
                  ref={cancelButtonRef}
                >
                  <img
                    src="/icons/close_icon.svg"
                    alt="X icon"
                    height={0}
                    width={0}
                    className="h-[24px] w-[24px]"
                  />
                </button>
                <DialogTitle
                  className={` ${
                    darkMode ? "text-white" : "text-[#2D3748]"
                  } text-lg text-center  font-semibold mt-[30px] px-[25px]`}
                >
                  Add a new task
                </DialogTitle>
                <div className="px-3 mt-[15px] text-xxs h-[160px] overflow-scroll scrollbar-none flex flex-col items-center space-y-4">
                  <textarea
                    className="w-full h-[140px] p-2 border border-gray-300 outline-none rounded-md shadow-md"
                    placeholder="Enter a task description..."
                    onChange={(e) =>
                      setNewTask({
                        id: (Math.floor(Math.random() * 16) + 5).toString(),
                        content: e.target.value,
                      })
                    }
                  />
                  <button
                    className={`flex items-center justify-center h-12 ${
                      darkMode
                        ? "text-white bg-slate-600"
                        : "bg-[#00D1C1] text-[#2D3748]"
                    } border border-gray-300 rounded-md w-full shadow-md transition-all duration-300 ease-in-out ${
                      darkMode ? "hover:bg-slate-500" : "hover:bg-[#00B3A5]"
                    } hover:shadow-lg`}
                    disabled={determineEmptyTask()}
                    onClick={updateTask}
                  >
                    Submit
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTaskModal;
