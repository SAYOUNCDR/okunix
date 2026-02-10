import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Button from "../common/Button";
import {
  Cog,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

const StatCard = ({ title, value, change, trend, trendColor }) => {
  const isUp = trend === "up";
  const colorClass =
    trendColor === "green" ? "text-emerald-600" : "text-red-600";
  const Icon = isUp ? ArrowUp : ArrowDown;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-start justify-between min-h-[120px]">
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

const TimeFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Last 24 hours");
  const options = [
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
    "Last 3 months",
  ];

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 h-9 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm min-w-[140px] justify-between"
      >
        <span className="text-sm font-medium text-gray-700">{selected}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 flex flex-col">
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

const DashboardDetail = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <header className="px-8 py-6">
          <div className="mb-6">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm">
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          </div>

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-900">Dev Calendar</h1>
              <a
                href="https://devcalendar.sayoun.studio"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm flex items-center gap-1"
              >
                devcalendar.sayoun.studio
              </a>
            </div>

            <Button className="flex items-center gap-2">
              <Cog size={16} />
              Edit
            </Button>
          </div>
        </header>

        {/* Horizontal Line */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* General Stats Section */}
          <div className="space-y-4">
            <div className="flex justify-end items-center gap-2">
              <button className="flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg cursor-pointer hover:bg-gray-50 shadow-sm">
                <ArrowLeft size={16} />
              </button>
              <button className="flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg cursor-pointer hover:bg-gray-50 shadow-sm">
                <ArrowRight size={16} />
              </button>
              <TimeFilter />
            </div>

            <div className="grid grid-cols-5 gap-4">
              <StatCard
                title="Visitors"
                value="15"
                change="15%"
                trend="up"
                trendColor="green"
              />

              <StatCard
                title="Visits"
                value="18"
                change="21%"
                trend="down"
                trendColor="red"
              />

              <StatCard
                title="Views"
                value="22"
                change="63%"
                trend="down"
                trendColor="red"
              />

              <StatCard
                title="Bounce rate"
                value="78%"
                change="37%"
                trend="up"
                trendColor="red"
              />

              <StatCard
                title="Visit duration"
                value="2m 48s"
                change="40%"
                trend="down"
                trendColor="red"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardDetail;
