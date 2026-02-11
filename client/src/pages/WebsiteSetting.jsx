import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";
import { Cog, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WebsiteSetting = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        {/* Header Section */}
        <header className="px-8 py-6">
          <div className="mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          </div>

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-900">Dev Calendar</h1>
              <a
                href="https://devcalendar.sayoun.studio"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm flex items-center gap-1"
              >
                devcalendar.sayoun.studio
              </a>
            </div>

            <Button className="flex items-center gap-2">
              <Cog size={16} />
              Edit
            </Button>
          </div>
        </header>

        {/* Horizontal Line */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="flex-1 p-8">
          
        </div>
      </main>
    </div>
  );
};

export default WebsiteSetting;
