import React from "react";
import Button from "../common/Button";
import Sidebar from "../layout/Sidebar";
import { Plus, Search, Globe } from "lucide-react";

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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {websites.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-6 py-3 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-6">Domain</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>

                {/* Rows */}
                {websites.map((site, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition-colors group"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <span className="font-bold text-xs">
                          {site.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {site.name}
                      </span>
                    </div>
                    <div className="col-span-6 text-gray-600 text-sm">
                      {site.domain}
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-md hover:bg-gray-100">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <Globe size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">
                  No websites found
                </h3>
                <p className="text-sm mt-1 mb-6">
                  Get started by adding your first website.
                </p>
                <Button variant="outline">Add Website</Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;
