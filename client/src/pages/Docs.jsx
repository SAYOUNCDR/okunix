import React, { useState } from "react";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocContent from "../components/docs/DocContent";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Docs = () => {
  const [activeDoc, setActiveDoc] = useState("introduction");
  const [isDocsSidebarOpen, setIsDocsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const isPublic = !user;

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* Mobile Menu Toggle - Floating */}
      <button
        onClick={() => setIsDocsSidebarOpen(!isDocsSidebarOpen)}
        className="lg:hidden absolute top-4 right-4 z-40 p-2 bg-white rounded-md shadow-sm border border-gray-200 text-gray-500 hover:bg-gray-50"
      >
        {isDocsSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`
            absolute inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out border-r border-gray-200
            lg:relative lg:translate-x-0 h-full
            ${isDocsSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          `}
      >
        <DocsSidebar
          activeDoc={activeDoc}
          onSelect={(id) => {
            setActiveDoc(id);
            setIsDocsSidebarOpen(false);
          }}
          backLink={{
            href: isPublic ? "/" : "/dashboard",
            label: isPublic ? "Back to Home" : "Back to Dashboard",
          }}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isDocsSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsDocsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        <main className="flex-1 overflow-y-auto scroll-smooth p-0">
          <DocContent activeDoc={activeDoc} onNavigate={setActiveDoc} />
        </main>
      </div>
    </div>
  );
};

export default Docs;
