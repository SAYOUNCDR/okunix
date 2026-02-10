import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ChartFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Day");
  const options = ["Day", "Hour"];

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 h-9 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm min-w-25 justify-between"
      >
        <span className="text-sm font-medium text-gray-700">{selected}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 flex flex-col">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className={`text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                selected === option
                  ? "text-gray-900 font-medium bg-gray-50"
                  : "text-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartFilter;
