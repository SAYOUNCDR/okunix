import { useState } from "react";

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
      { name: "France", flag: "🇫🇷", count: 1, percent: "3%" },
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

export default LocationSection;
