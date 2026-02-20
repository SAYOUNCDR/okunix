import React, { useState } from "react";
import {
  Chrome,
  Monitor,
  Smartphone,
  Tablet,
  Command,
  HardDrive,
  Maximize2,
} from "lucide-react";

const EnvironmentSection = () => {
  const [activeTab, setActiveTab] = useState("Browsers");

  const tabs = ["Browsers", "OS", "Devices"];

  const data = {
    Browsers: [
      { name: "Chrome", count: 21, percent: "91%", icon: Chrome },
    ],
    OS: [
      { name: "Windows", count: 18, percent: "78%", icon: Monitor },
      { name: "macOS", count: 4, percent: "17%", icon: Command },
      { name: "Linux", count: 1, percent: "5%", icon: HardDrive },
    ],
    Devices: [
      { name: "Desktop", count: 20, percent: "87%", icon: Monitor },
      { name: "Mobile", count: 3, percent: "13%", icon: Smartphone },
    ],
  };

  function GlobeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-start">
        Environment
      </h3>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-100 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === tab
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700 hover:shadow-gray-200"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {activeTab === "OS" ? activeTab : activeTab.slice(0, -1)}
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
                <div className="p-2 bg-gray-50 text-gray-600 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200">
                  <item.icon size={16} />
                </div>
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

      <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors border-t border-gray-50 pt-4 group">
        <Maximize2
          size={14}
          className="text-gray-400 group-hover:text-gray-900"
        />
        More
      </button>
    </div>
  );
};

export default EnvironmentSection;
