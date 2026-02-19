import Button from "../common/Button"; // Check Button import path
import { Cog, Globe } from "lucide-react";


const WebsiteList = ({ websites = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {websites.length > 0 ? (
        <div className="divide-y divide-gray-100">
          <div className="grid grid-cols-12 px-6 py-3 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Name</div>
            <div className="col-span-6">Domain</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {websites.map((site, index) => (
            <div
              key={site._id || index}
              className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-b-0"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 uppercase">
                  <span className="font-bold text-xs">
                    {(site.name || site.websiteName || "?").charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{site.name || site.websiteName}</span>
                  <span className="text-xs text-gray-400 font-mono hidden group-hover:block transition-all">{site.websiteId}</span>
                </div>
              </div>
              <div className="col-span-6 text-gray-600 text-sm">
                <a href={`https://${site.domain}`} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">
                    {site.domain}
                </a>
              </div>
              <div className="col-span-2 flex justify-end">
                <Button variant="ghost" className="p-2!">
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
        </div>
      )}
    </div>
  );
};

export default WebsiteList;
