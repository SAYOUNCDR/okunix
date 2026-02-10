import { useState } from "react";
import { Maximize2 } from "lucide-react";

const EntryExitPages = () => {
  const [activeTab, setActiveTab] = useState("Path");

  const tabs = ["Path", "Entry", "Exit"];

  // Mock data based on the image
  const data = {
    Path: [
      { path: "/", count: 30, percent: "77%" },
      {
        path: "/blogs/dockerizing-nodejs-mongodb-persistent-storage",
        count: 3,
        percent: "8%",
      },
      { path: "/blogs", count: 2, percent: "5%" },
      { path: "/projects", count: 2, percent: "5%" },
      { path: "/contributions", count: 1, percent: "3%" },
      {
        path: "/blogs/jwt-auth-flow-access-refresh-expressjs",
        count: 1,
        percent: "3%",
      },
    ],
    Entry: [
      { path: "/", count: 25, percent: "83%" },
      {
        path: "/blogs/dockerizing-nodejs-mongodb-persistent-storage",
        count: 2,
        percent: "7%",
      },
      { path: "/projects", count: 2, percent: "7%" },
      { path: "/blogs", count: 1, percent: "3%" },
    ],
    Exit: [
      { path: "/", count: 20, percent: "66%" },
      { path: "/projects", count: 5, percent: "16%" },
      { path: "/blogs", count: 3, percent: "10%" },
      { path: "/contributions", count: 2, percent: "6%" },
    ],
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-start">
        Pages
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
            Path
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
              <div className="flex items-center gap-3 overflow-hidden">
                <span
                  className="text-sm font-medium text-gray-900 truncate"
                  title={item.path}
                >
                  {item.path}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
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

        <button className="flex items-center justify-center gap-2 mt-6 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer w-full py-2 hover:bg-gray-50 rounded-lg">
          <Maximize2 size={16} />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};

export default EntryExitPages;
