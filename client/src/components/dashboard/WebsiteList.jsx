import Button from "../common/Button"; // Check Button import path
import { Cog, Globe } from "lucide-react";

// Assuming Button is in  ../common/Button.jsx relative to components/dashboard/
// Double checking existing DashboardOverview.jsx import: import Button from "../common/Button";

const WebsiteList = ({ websites = [] }) => {
  return (
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
                <span className="font-medium text-gray-900">{site.name}</span>
              </div>
              <div className="col-span-6 text-gray-600 text-sm">
                {site.domain}
              </div>
              <div className="col-span-2 flex justify-end">
                <Button>
                  <Cog size={18} />
                </Button>
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
  );
};

export default WebsiteList;
