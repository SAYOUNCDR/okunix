import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  HelpCircle,
  FileText,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Globe, label: "Websites", path: "/websites" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col relative z-40 ${
        isCollapsed ? "w-16" : "w-64"
      } ${className || ""}`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-bold text-lg text-gray-900 truncate">
              OkUnix
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">O</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon
                size={20}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 group-hover:text-gray-900"
                }`}
              />
              {!isCollapsed && (
                <span className="font-medium text-sm truncate">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-3 relative">
        {/* Profile Menu Dropdown (Drop-up) */}
        {isProfileMenuOpen && (
          <>
            {/* Overlay to close menu when clicking outside */}
            <div
              className="fixed inset-0 z-50"
              onClick={() => setIsProfileMenuOpen(false)}
            ></div>

            <div
              className={`absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 overflow-hidden z-60 ${
                isCollapsed ? "left-14 w-48 bottom-0" : "left-3 w-56"
              }`}
            >
              <div className="px-4 py-3 border-b border-gray-100 block md:hidden">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.username || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <Link
                to="/dashboard/setting/user"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <Settings size={16} />
                Settings
              </Link>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <FileText size={16} />
                Documentation
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <HelpCircle size={16} />
                Support
              </a>
              <div className="h-px bg-gray-100 my-1"></div>
              <button
                onClick={() => {
                  logout();
                  setIsProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </>
        )}

        <div
          className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors relative z-51 ${
            isCollapsed ? "justify-center" : ""
          }`}
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          title="User Profile"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-gray-600">
            <User size={16} />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <ChevronUp
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`}
            />
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className={`mt-2 w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors ${
            isCollapsed ? "" : "justify-end"
          }`}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
