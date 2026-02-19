import React from "react";
import {
  FileText,
  Code,
  Zap,
  BookOpen,
  Layers,
  Globe,
  HelpCircle,
  Database,
  Lock,
  Server,
  ArrowLeft,
} from "lucide-react";

// Documentation navigation structure
const SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction", icon: BookOpen },
      { id: "quickstart", label: "Quick Start", icon: Zap },
      { id: "installation", label: "Installation", icon: Layers },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { id: "dashboard", label: "Dashboard Overview", icon: FileText },
      { id: "websites", label: "Managing Websites", icon: Globe },
      { id: "analytics", label: "Analytics & Metrics", icon: Database },
    ],
  },
  {
    title: "API Reference",
    items: [
      { id: "authentication", label: "Authentication", icon: Lock },
      { id: "endpoints", label: "API Endpoints", icon: Server },
      { id: "errors", label: "Error Handling", icon: HelpCircle },
    ],
  },
];

const DocsSidebar = ({ activeDoc, onSelect, className, backLink }) => {
  return (
    <div
      className={`w-full h-full flex flex-col bg-slate-50 border-r border-gray-200 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 ${
        className || ""
      }`}
    >
      <div className="p-6">
        {backLink && (
          <a
            href={backLink.href}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {backLink.label}
          </a>
        )}

        <div className="space-y-8">
          {SECTIONS.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h4>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeDoc === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onSelect(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200 group text-left ${
                          isActive
                            ? "bg-white text-orange-600 shadow-sm ring-1 ring-gray-900/5"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                        }`}
                      >
                        <Icon
                          size={16}
                          className={`shrink-0 transition-colors ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                        />
                        <span className="truncate font-medium">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6">
        <div className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm">
          <h5 className="font-medium text-gray-900 text-sm mb-1">Need help?</h5>
          <p className="text-xs text-gray-500 mb-3">
            Can't find what you're looking for? Reach out to our support team.
          </p>
          <a
            href="mailto:support@okunix.com"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline inline-flex items-center gap-1"
          >
            Contact Support &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocsSidebar;
