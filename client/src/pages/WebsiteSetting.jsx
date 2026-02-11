import Sidebar from "../components/layout/Sidebar";
import { ArrowLeft, Copy } from "lucide-react";
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
          </div>
        </header>

        {/* Horizontal Line */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="flex-1 p-8">
          {/* Website Id, domain, name div*/}
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-2">
              <h3>Website Id</h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg flex items-center justify-between">
                <p>ac6d1abf-aa4c-4c91-8b2a-d0d7b15de840</p>
                <Copy
                  size={16}
                  className="ml-2 text-gray-500 cursor-pointer hover:text-gray-900 transition-colors"
                />
              </div>
            </div>
            <div className="mb-2">
              <h3>Name</h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg">
                <p>Portfolio</p>
              </div>
            </div>
            <div className="mb-2">
              <h3>Domain</h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg">
                <p>sayoun.studio</p>
              </div>
            </div>

            <div>
              <button className="mt-4 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm">
                Save changes
              </button>
            </div>
          </div>

          {/* Tracking code dov */}
          <div></div>

          {/* Share div */}
          <div></div>

          {/* Danger zone div like reset website or delete website */}
        </div>
      </main>
    </div>
  );
};

export default WebsiteSetting;
