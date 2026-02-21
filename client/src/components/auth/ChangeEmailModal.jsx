import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const ChangeEmailModal = ({ isOpen, onClose }) => {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { changeEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await changeEmail(newEmail, password);
      setSuccess(true);
      setTimeout(() => {
        // usually it requires a logout or reload depending on logic.
        // the backend sends requireLogout: true
        if (response.requireLogout) {
          window.location.reload();
        } else {
          onClose();
        }
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSuccess(false);
      setNewEmail("");
      setPassword("");
      setError("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Change Email Address">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md">
            Email changed successfully! Please verify your new email and log in
            again. Redirecting...
          </div>
        )}

        {!success && (
          <>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Enter your new email address and current password to confirm the
                change. You will be logged out and asked to verify your new
                email.
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                placeholder="new@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 mt-2">
                Current Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={loading}
            >
              {loading ? "Updating..." : "Change Email"}
            </Button>
          </>
        )}
      </form>
    </Modal>
  );
};

export default ChangeEmailModal;
