import { useState } from "react";
import { Globe, Maximize2 } from "lucide-react";
import DataModal from "../common/DataModal";

const SourcesSection = ({ data = [], loading = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reusable render function for both the preview list and the modal
  const renderItem = (source, index) => (
    <div
      key={index}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-default"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200 shrink-0">
          <Globe size={16} />
        </div>
        <span className="text-sm font-medium text-gray-900 truncate">
          {source.name}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-bold text-gray-900">{source.count}</span>
        <span className="text-gray-300 text-sm">|</span>
        <span className="text-sm text-gray-500 min-w-[3ch] text-right">
          {source.percent}
        </span>
      </div>
    </div>
  );

  return (
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

        <div className="space-y-1 min-h-[160px]">
          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500 animate-pulse">
              Loading sources data...
            </div>
          ) : data.length > 0 ? (
            data.slice(0, 5).map(renderItem)
          ) : (
            <div className="py-12 text-center text-sm text-gray-500">
              No source data available.
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors border-t border-gray-50 pt-4 group cursor-pointer"
      >
        <Maximize2
          size={14}
          className="text-gray-400 group-hover:text-gray-900"
        />
        More
      </button>

      <DataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Sources"
        data={data}
        renderItem={renderItem}
      />
    </div>
  );
};

export default SourcesSection;
