// App.tsx
import Header from "./components/UI/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { useContext, useState } from "react";
import { InitialTasksContext } from "./main";
import type { Tasks } from "./types";
import DarkModeContext from "./utils/context/DarkModeContext";

function App() {
  const initialTasks = useContext<Tasks>(InitialTasksContext);
  const [initialTasksState, setInitialTasksState] = useState(initialTasks);
  const darkModeContext = useContext(DarkModeContext);
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;

  return (
    <div>
      <section
        className={`${isDarkMode ? "dark: bg-slate-900" : "bg-slate-100"}
         min-h-screen`}
      >
        <div className="pt-2 mx-3">
          <Header setInitialTasksState={setInitialTasksState} />
          <Dashboard
            isDarkModeOn={isDarkMode}
            initialTasks={initialTasksState}
            setInitialTasksState={setInitialTasksState}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
