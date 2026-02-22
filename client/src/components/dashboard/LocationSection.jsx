import { useState } from "react";
import { Maximize2 } from "lucide-react";

const LocationSection = ({
  data = { Countries: [], Regions: [], Cities: [] },
  loading = true,
}) => {
  const [activeTab, setActiveTab] = useState("Countries");

  const tabs = ["Countries", "Regions", "Cities"];

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
          {loading ? (
            <div className="py-4 text-center text-sm text-gray-500 animate-pulse">
              Loading location data...
            </div>
          ) : data[activeTab] && data[activeTab].length > 0 ? (
            data[activeTab].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-default"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.flag || "📍"}</span>
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
            ))
          ) : (
            <div className="py-4 text-center text-sm text-gray-500">
              No data available yet
            </div>
          )}
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

export default LocationSection;
