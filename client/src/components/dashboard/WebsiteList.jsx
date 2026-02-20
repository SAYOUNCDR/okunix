import { useNavigate } from "react-router-dom";
import Button from "../common/Button"; // Check Button import path
import { Copy, Check, Cog, Globe } from "lucide-react";
import useCopy from "../../hooks/useCopy";

const WebsiteList = ({ websites = [] }) => {
  const [copiedId, handleCopy] = useCopy();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {websites.length > 0 ? (
        <div className="divide-y divide-gray-100">
          <div className="grid grid-cols-12 px-4 sm:px-6 py-3 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-8 sm:col-span-5 pl-2">Name</div>
            <div className="hidden sm:block sm:col-span-5">Domain</div>
            <div className="col-span-4 sm:col-span-2 text-right pr-2">
              Action
            </div>
          </div>

          {websites.map((site, index) => (
            <div
              key={site._id || index}
              onClick={() => navigate(`/dashboard/detail/${site._id}`)}
              className="grid grid-cols-12 px-4 sm:px-6 py-5 items-center hover:bg-gray-50/80 transition-all duration-200 group border-b border-gray-50 last:border-b-0 cursor-pointer"
            >
              <div className="col-span-8 sm:col-span-5 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 uppercase group-hover:bg-white group-hover:shadow-md group-hover:shadow-gray-100 group-hover:text-gray-900 transition-all duration-300 border border-gray-100 group-hover:border-gray-200">
                  <span className="font-bold text-sm">
                    {(site.name || site.websiteName || "?").charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-semibold text-gray-900 truncate pr-4">
                    {site.name || site.websiteName}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono group/id h-5">
                    <span className="truncate max-w-20 sm:max-w-30">
                      {site.websiteId}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(site.websiteId);
                      }}
                      className="flex items-center justify-center w-5 h-5 -ml-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      title="Copy Website ID"
                    >
                      {copiedId === site.websiteId ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                    {copiedId === site.websiteId && (
                      <span className="text-green-600 text-[10px] font-medium animate-in fade-in slide-in-from-left-1 duration-200">
                        Copied
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Domain - Hidden on small screens, shown on sm+ */}
              <div
                className="hidden sm:block sm:col-span-5 text-gray-600 text-sm pl-0"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={`https://${site.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors py-1 px-2 -ml-2 rounded-lg group-hover:bg-gray-100"
                >
                  <Globe
                    size={14}
                    className="text-gray-300 group-hover:text-gray-500 transition-colors"
                  />
                  <span className="truncate">{site.domain}</span>
                </a>
              </div>

              {/* Action */}
              <div className="col-span-4 sm:col-span-2 flex justify-end pr-2">
                <Button
                  variant="ghost"
                  className="p-2!"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/setting/${site._id}`);
                  }}
                >
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
