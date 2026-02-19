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
  const [isMobileOpen, setIsMobileOpen] = useState(false); // New state for mobile
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Globe, label: "Websites", path: "/websites" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button (Visible only on small screens) */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-gray-200 lg:hidden"
      >
        {isMobileOpen ? (
          <PanelLeftClose size={20} />
        ) : (
          <PanelLeftOpen size={20} />
        )}
      </button>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-16" : "lg:w-64"}
        w-64 ${className || ""}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
          {!isCollapsed || isMobileOpen ? (
            <div className="flex items-center gap-0.5 overflow-hidden w-full lg:w-auto pl-12 lg:pl-0">
              <div className="h-8 w-8 shrink-0">
                <img
                  src="/header.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg text-gray-900 truncate ml-2">
                kunix
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center mx-auto shrink-0">
              <img
                src="/header.png"
                alt=""
                className="w-8 h-8 object-contain"
              />
            </div>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const showLabel = isMobileOpen || !isCollapsed;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group whitespace-nowrap ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                } ${!showLabel ? "justify-center px-2" : ""}`}
                title={!showLabel ? item.label : ""}
              >
                <item.icon
                  size={20}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 group-hover:text-gray-900"
                  }`}
                />
                {showLabel && (
                  <span className="font-medium text-sm truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-3 relative shrink-0">
          {/* Profile Menu Dropdown (Drop-up) */}
          {isProfileMenuOpen && (
            <>
              {/* Overlay to close menu when clicking outside */}
              <div
                className="fixed inset-0 z-50"
                onClick={() => setIsProfileMenuOpen(false)}
              ></div>

              <div
                className={`absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 overflow-hidden z-50 ${
                  !isMobileOpen && isCollapsed
                    ? "left-14 w-48 bottom-0"
                    : "left-3 right-3 lg:w-56 lg:right-auto"
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
                <Link
                  to="/support"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <HelpCircle size={16} />
                  Support
                </Link>
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
            className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors relative z-50 ${
              !isMobileOpen && isCollapsed ? "justify-center" : ""
            }`}
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            title="User Profile"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-gray-600">
              <User size={16} />
            </div>
            {(isMobileOpen || !isCollapsed) && (
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.username || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            )}
            {(isMobileOpen || !isCollapsed) && (
              <ChevronUp
                size={16}
                className={`text-gray-400 transition-transform duration-200 shrink-0 ${isProfileMenuOpen ? "rotate-180" : ""}`}
              />
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className={`mt-2 w-full hidden lg:flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors ${
              isCollapsed ? "justify-center" : "justify-end"
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
    </>
  );
};

export default Sidebar;
