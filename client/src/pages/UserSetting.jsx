import Sidebar from "../components/layout/Sidebar";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCopy from "../hooks/useCopy";
import { useAuth } from "../context/AuthContext";

const UserSetting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copiedId, handleCopy] = useCopy();
  const accountId = user?._id || "N/A";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <header className="px-8 py-6">
          <div className="mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
          </div>

          <div className="flex justify-between items-start px-2">
            <h3 className="text-2xl">Settings</h3>
          </div>
        </header>

        <div className="flex-1 px-8">
          <div className="mt-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Account Id
              </h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg flex items-center justify-between">
                <p className="text-gray-600 font-mono text-sm">{accountId}</p>
                <button
                  onClick={() => handleCopy(accountId)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedId ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-gray-500 cursor-pointer hover:text-gray-900 transition-colors"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Name</h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg">
                <p className="text-gray-600">{user?.username || "N/A"}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Email
              </h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg">
                <p className="text-gray-600">{user?.email || "N/A"}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Data Region
              </h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg">
                <p className="text-gray-600">US</p>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-red-600">Danger Zone</h3>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm">Change password</h3>
                <p className="text-xs">Change your account password.</p>
              </div>
              <div>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm">
                  Change password
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm">Change email</h3>
                <p className="text-xs">Change your account email.</p>
              </div>
              <div>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm">
                  Change email
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm">Delete account</h3>
                <p className="text-xs">
                  Your account along with all your data will be deleted.
                </p>
              </div>
              <div>
                <button className="flex items-center gap-2 text-red-500 hover:text-red-900 transition-colors text-sm font-medium border border-red-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-red-50 shadow-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserSetting;
