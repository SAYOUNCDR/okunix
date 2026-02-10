import { Globe } from "lucide-react";

const SourcesSection = () => {
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

        <div className="space-y-1">
          {[
            { name: "t.co", count: 10, percent: "38%" },
            { name: "com.linkedin.android", count: 6, percent: "23%" },
            { name: "google.com", count: 5, percent: "19%" },
            { name: "sayoun.studio", count: 4, percent: "15%" },
            { name: "research.keabase.com", count: 1, percent: "4%" },
          ].map((source, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200">
                  <Globe size={16} />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {source.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">
                  {source.count}
                </span>
                <span className="text-gray-300 text-sm">|</span>
                <span className="text-sm text-gray-500 min-w-[3ch] text-right">
                  {source.percent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourcesSection;
