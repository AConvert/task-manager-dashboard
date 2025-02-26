export type Task = {
  id: string;
  content: string;
};

export type Columns = {
  [key: string]: Task[];
};

export type Tasks = {
  pending: Task[];
  inProgress: Task[];
  completed: Task[];
};

export type DashboardProps = {
  initialTasks: Tasks;
  isDarkModeOn: boolean;
  setInitialTasksState: React.Dispatch<React.SetStateAction<Tasks>>;
};

export type DashboardGridProps = {
  tasks: Tasks;
  viewStyle: string;
  darkMode: boolean;
  setInitialTasksState: React.Dispatch<React.SetStateAction<Tasks>>;
};

export type HeaderProps = {
  setInitialTasksState: React.Dispatch<React.SetStateAction<Tasks>>;
};

export type PlusButtonProps = {
  openModal: boolean;
  setOpenModal: () => void;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  updateTask: () => void;
  newTask: object;
  darkMode: boolean;
};

export type AddTaskModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  updateTask: () => void;
  newTask: object;
  darkMode: boolean;
};

export type StylingButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  darkMode: boolean;
};
