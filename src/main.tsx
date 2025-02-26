// main.tsx
import { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import type { Tasks } from "./types/index";
import { DarkModeProvider } from "./utils/context/DarkModeContext.tsx";

const initialTasks = {
  pending: [
    {
      id: "1",
      content: "Implement user authentication (login/signup)",
    },
    {
      id: "2",
      content: "Design the homepage layout",
    },
  ],
  inProgress: [
    {
      id: "3",
      content: "Develop the API for fetching user data",
    },
  ],
  completed: [
    {
      id: "4",
      content: "Set up the development environment",
    },
  ],
};

export const InitialTasksContext = createContext<Tasks>(initialTasks);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <InitialTasksContext.Provider value={initialTasks}>
        <App />
      </InitialTasksContext.Provider>
    </DarkModeProvider>
  </StrictMode>
);
