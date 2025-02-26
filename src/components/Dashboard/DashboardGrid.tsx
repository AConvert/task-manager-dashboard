import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import type { Columns, DashboardGridProps } from "../../types";
import Tooltip from "../UI/Tooltip/Tooltip";
import type { Tasks } from "../../types";

const TasksBoard: React.FC<DashboardGridProps> = ({
  tasks,
  viewStyle,
  darkMode,
  setInitialTasksState,
}) => {
  const [taskBoard, setTaskBoard] = useState<Columns>({ ...tasks });

  useEffect(() => {
    setTaskBoard({ ...tasks });
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn) {
      const newColumnTasks = Array.from(taskBoard[sourceColumn]);
      const [movedTask] = newColumnTasks.splice(source.index, 1);
      newColumnTasks.splice(destination.index, 0, movedTask);

      setTaskBoard((prev) => ({ ...prev, [sourceColumn]: newColumnTasks }));
    } else {
      const sourceTasks = Array.from(taskBoard[sourceColumn]);
      const destTasks = Array.from(taskBoard[destColumn]);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      setTaskBoard((prev) => ({
        ...prev,
        [sourceColumn]: sourceTasks,
        [destColumn]: destTasks,
      }));
    }
  };

  const getListStyle = ({ isDraggingOver }: { isDraggingOver: boolean }) => ({
    background: isDraggingOver ? "#00D1C1" : darkMode ? "#45556c" : "#F8F9FA",
  });

  const handleDeleteTask = (taskId: string) => {
    const tasks = { ...taskBoard };
    const filterTask = Object.entries(tasks).map(([columnId, columnTasks]) => {
      const filteredTasks = columnTasks.filter((task) => task.id !== taskId);
      return { [columnId]: filteredTasks };
    });

    const updatedTaskBoard: Tasks = {
      pending: [],
      inProgress: [],
      completed: [],
      ...filterTask.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    };

    setInitialTasksState(updatedTaskBoard);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col mt-2 md:flex-row justify-around space-y-4 md:space-y-0 md:space-x-4">
        {Object.entries(taskBoard).map(([columnId, columnTasks]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${
                  darkMode ? "bg-slate-600" : "bg-gray-100"
                } border border-gray-300 p-4 rounded-md min-h-[200px] w-full md:w-1/3 shadow-md`}
                style={getListStyle(snapshot)}
              >
                <h2
                  className={`${
                    darkMode ? "text-white" : "text-[#00D1C1]"
                  } text-lg font-semibold mb-2`}
                >
                  {columnId === "pending"
                    ? "Pending"
                    : columnId === "inProgress"
                    ? "In Progress"
                    : "Completed"}
                </h2>
                <div
                  key={columnId}
                  className={`${
                    viewStyle === "listView"
                      ? "flex flex-col space-y-2"
                      : "grid grid-cols-2 gap-2 "
                  }`}
                >
                  {columnTasks.map((task, index) => (
                    <div>
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${
                              darkMode ? "bg-slate-500" : "bg-white"
                            }  relative border-gray-300 border h-36 p-3 rounded-md shadow-lg mb-2 cursor-grab w-full overflow-auto`}
                          >
                            <h1
                              className={`${
                                darkMode ? "text-white" : "text-[#00D1C1]"
                              } text-lg font-semibold underline pb-2`}
                            >
                              Task {task.id}
                            </h1>
                            <p
                              className={`${
                                darkMode ? "text-white" : "text-[#2D3748]"
                              } whitespace-normal break-words`}
                            >
                              {task.content}
                            </p>
                            <Tooltip title="Delete task" placement="left">
                              <div className="absolute bottom-3 right-3 ">
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="p-1 rounded-lg transition-all duration-300 ease-in-out hover:rounded-full hover:p-2 hover:bg-red-400"
                                >
                                  <img
                                    src="/icons/black_delete_icon.png"
                                    alt="delete icon"
                                    className="w-6 h-6"
                                  />
                                </button>
                              </div>
                            </Tooltip>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                </div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TasksBoard;
