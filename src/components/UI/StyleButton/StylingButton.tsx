import type { StylingButtonProps } from "../../../types";

const StylingButton: React.FC<StylingButtonProps> = ({
  onClick,
  className,
  children,
  darkMode,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center justify-center w-8 h-8 ${
          darkMode ? "bg-slate-600" : "bg-[#00D1C1]"
        }  border border-gray-300 rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-110 ${
          darkMode ? "hover:bg-slate-500" : "hover:bg-[#00D1C1]"
        }   hover:shadow-lg ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default StylingButton;
