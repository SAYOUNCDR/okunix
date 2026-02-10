import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import Button from "../common/Button";
import BarChart from "../charts/BarChart";
import {
  Cog,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Globe,
} from "lucide-react";

import { useNavigate } from "react-router";

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
        className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 h-9 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm min-w-35 justify-between"
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

const LocationSection = () => {
  const [activeTab, setActiveTab] = useState("Countries");

  const tabs = ["Countries", "Regions", "Cities"];

  const data = {
    Countries: [
      { name: "India", flag: "🇮🇳", count: 25, percent: "83%" },
      { name: "Pakistan", flag: "🇵🇰", count: 1, percent: "3%" },
      { name: "Bangladesh", flag: "🇧🇩", count: 1, percent: "3%" },
      { name: "Philippines", flag: "🇵🇭", count: 1, percent: "3%" },
      { name: "United States", flag: "🇺🇸", count: 1, percent: "3%" },
    ],
    Regions: [
      { name: "Tamil Nadu", flag: "🇮🇳", count: 12, percent: "40%" },
      { name: "Maharashtra", flag: "🇮🇳", count: 8, percent: "27%" },
      { name: "Karnataka", flag: "🇮🇳", count: 5, percent: "16%" },
      { name: "Sindh", flag: "🇵🇰", count: 1, percent: "3%" },
      { name: "Dhaka", flag: "🇧🇩", count: 1, percent: "3%" },
    ],
    Cities: [
      { name: "Chennai", flag: "🇮🇳", count: 10, percent: "33%" },
      { name: "Mumbai", flag: "🇮🇳", count: 8, percent: "27%" },
      { name: "Bangalore", flag: "🇮🇳", count: 5, percent: "16%" },
      { name: "Karachi", flag: "🇵🇰", count: 1, percent: "3%" },
      { name: "Dhaka", flag: "🇧🇩", count: 1, percent: "3%" },
    ],
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-start">
        Location
      </h3>

      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative cursor-pointer ${
              activeTab === tab
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {activeTab === "Countries"
              ? "Country"
              : activeTab === "Regions"
                ? "Region"
                : "City"}
          </span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Visitors
          </span>
        </div>

        <div className="space-y-1">
          {data[activeTab].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-default"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.flag}</span>
                <span className="text-sm font-medium text-gray-900">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">
                  {item.count}
                </span>
                <span className="text-gray-300 text-sm">|</span>
                <span className="text-sm text-gray-500 min-w-[3ch] text-right">
                  {item.percent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        {/* Header Section */}
        <header className="px-8 py-6">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
            >
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

        <div className="flex-1 p-8">
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

          {/* Chart section  */}
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
              <div className="flex items-center gap-2">
                <ChartFilter />
              </div>
            </div>
            <div className="h-80 w-full">
              <BarChart />
            </div>
          </div>

          {/* Sources Section */}
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-start">
              Sources
            </h3>

            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Referrer
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Visitors
                </span>
              </div>

              <div className="space-y-1">
                {[
                  { name: "t.co", count: 10, percent: "38%" },
                  { name: "com.linkedin.android", count: 6, percent: "23%" },
                  { name: "google.com", count: 5, percent: "19%" },
                  { name: "sayoun.studio", count: 4, percent: "15%" },
                  { name: "research.keabase.com", count: 1, percent: "4%" },
                ].map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200">
                        <Globe size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {source.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">
                        {source.count}
                      </span>
                      <span className="text-gray-300 text-sm">|</span>
                      <span className="text-sm text-gray-500 min-w-[3ch] text-right">
                        {source.percent}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location section */}
          <LocationSection />
        </div>
      </main>
    </div>
  );
};

export default DashboardDetail;
