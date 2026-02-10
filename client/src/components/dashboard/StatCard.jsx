import { ArrowUp, ArrowDown } from "lucide-react";

const StatCard = ({ title, value, change, trend, trendColor }) => {
  const isUp = trend === "up";
  const colorClass =
    trendColor === "green" ? "text-emerald-600" : "text-red-600";
  const Icon = isUp ? ArrowUp : ArrowDown;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-start justify-between min-h-30">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 mt-2">{value}</div>
      <div
        className={`flex items-center mt-2 text-sm font-medium ${colorClass}`}
      >
        <Icon size={16} className="mr-1" />
        <span>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
