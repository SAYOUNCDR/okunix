import Sidebar from "../components/layout/Sidebar";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCopy from "../hooks/useCopy";
import { useAuth } from "../context/AuthContext";
import DangerModal from "../components/common/DangerModal";
import api from "../services/api";
import ChangeEmailModal from "../components/auth/ChangeEmailModal";

const UserSetting = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [copiedId, handleCopy] = useCopy();
  const accountId = user?._id || "N/A";

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { forgotPassword } = useAuth();

  const confirmDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await api.delete("/auth/delete-account");
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!user?.email) return;
    setIsSendingReset(true);
    try {
      await forgotPassword(user.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000); // Hide success message after 5 seconds
      setIsResetModalOpen(false);
    } catch (error) {
      console.error("Failed to send reset email:", error);
      alert("Failed to send password reset email. Please try again.");
    } finally {
      setIsSendingReset(false);
    }
  };

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
          </div>

          <div className="mt-8 mb-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-red-600">Danger Zone</h3>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm">Change password</h3>
                <p className="text-xs">Change your account password.</p>
              </div>
              <div>
                <button
                  onClick={() => setIsResetModalOpen(true)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
                >
                  Change password
                </button>
                {resetSent && (
                  <p className="text-xs text-green-600 mt-2">
                    Reset link sent to your email!
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm">Change email</h3>
                <p className="text-xs">Change your account email.</p>
              </div>
              <div>
                <button
                  onClick={() => setIsChangeEmailModalOpen(true)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
                >
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
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-900 transition-colors text-sm font-medium border border-red-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-red-50 shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DangerModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Change Password"
        description="We will send a secure password reset link to your registered email address."
        confirmText="Send Reset Link"
        message={`Are you sure you want to change your password, ${user?.username}?`}
        onConfirm={handleForgotPassword}
        isLoading={isSendingReset}
        color="orange"
      />

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
        description="This will permanently delete your account and all associated data, including websites and tracking stats. This action is irreversible."
        confirmText="Confirm Delete"
        message={`Are you sure you want to delete your account, ${user?.username}?`}
        onConfirm={confirmDeleteAccount}
        isLoading={isDeleting}
        color="red"
      />

      <ChangeEmailModal
        isOpen={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
      />
    </div>
  );
};

export default UserSetting;
