import DashboardGrid from "./DashboardGrid";
import { DashboardProps } from "../../types";
import { useState } from "react";
import Tooltip from "../UI/Tooltip/Tooltip";
import StylingButton from "../UI/StyleButton/StylingButton";

const Dashboard: React.FC<DashboardProps> = ({
  initialTasks,
  isDarkModeOn,
  setInitialTasksState,
}) => {
  const [viewStyle, setViewStyle] = useState<string>(() => {
    const savedViewStyle = localStorage.getItem("viewStyle");
    return savedViewStyle ? JSON.parse(savedViewStyle) : "listView";
  });

  const handleViewStyle = () => {
    const newViewStyle = viewStyle === "listView" ? "gridView" : "listView";
    setViewStyle(newViewStyle);
    localStorage.setItem("viewStyle", JSON.stringify(newViewStyle));
  };

  return (
    <div>
      <section className="mt-2">
        <div
          className={`flex items-center justify-between ${
            isDarkModeOn ? "bg-slate-500" : "bg-[#00D1C1]"
          }   px-3 rounded-2xl`}
        >
          <h1
            className={`${
              isDarkModeOn ? "text-white" : "text-[#2D3748]"
            } text-lg py-2`}
          >
            Dashboard
          </h1>
          <section className="flex items-center space-x-4 mr-4">
            <Tooltip title="Change view style" placement="top">
              <div>
                <StylingButton
                  darkMode={isDarkModeOn}
                  onClick={handleViewStyle}
                >
                  <img
                    src={
                      isDarkModeOn
                        ? "/icons/white_grid_icon.png"
                        : "/icons/black_grid_icon.png"
                    }
                    alt="list icon"
                    width={16}
                    height={16}
                    className="opacity-50"
                  />
                </StylingButton>
              </div>
            </Tooltip>
          </section>
        </div>
        <DashboardGrid
          darkMode={isDarkModeOn}
          tasks={initialTasks}
          viewStyle={viewStyle}
          setInitialTasksState={setInitialTasksState}
        />
      </section>
    </div>
  );
};

export default Dashboard;
