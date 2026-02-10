import Button from "../components/common/Button";
import Sidebar from "../components/layout/Sidebar";
import WebsiteList from "../components/dashboard/WebsiteList";
import { Plus, Search } from "lucide-react";

const DashboardOverview = () => {
  // Mock data for websites
  const websites = [
    { name: "Dev Calendar", domain: "devcalendar.sayoun.studio" },
    { name: "Portfolio", domain: "sayoun.studio" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Area */}
        <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={18} />
            <span>Add Website</span>
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search websites..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Websites List */}
          <WebsiteList websites={websites} />
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;
