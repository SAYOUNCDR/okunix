import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Password Validation Checkers
  const passwordChecks = useMemo(
    () => ({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    }),
    [password],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      setSuccess(true);
      // Wait a moment so user can read success message? Or show success UI instead of form
    } catch (err) {
      // Check if it's a Zod validation error with field-level details
      if (err.response?.data?.error?.fieldErrors?.password) {
        setError(err.response.data.error.fieldErrors.password.join(" "));
      } else if (err.response?.data?.error?.fieldErrors?.email) {
        setError(err.response.data.error.fieldErrors.email[0]);
      } else if (err.response?.data?.error?.fieldErrors?.username) {
        setError(err.response.data.error.fieldErrors.username[0]);
      } else {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess(false);
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (success) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Check your email">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Verification link sent!
          </h3>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to{" "}
            <span className="font-medium text-gray-900">{email}</span>. Please
            check your inbox to activate your account.
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              handleClose();
              onSwitchToLogin?.();
            }}
          >
            Back to Login
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create an account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            placeholder="User name"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            placeholder="you@example.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            placeholder="Min 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char"
            required
            minLength={6}
            disabled={loading}
          />

          {password.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div
                className={`flex items-center gap-1.5 ${passwordChecks.length ? "text-green-600" : "text-gray-500"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${passwordChecks.length ? "bg-green-500" : "bg-gray-300"}`}
                />
                6+ characters
              </div>
              <div
                className={`flex items-center gap-1.5 ${passwordChecks.uppercase ? "text-green-600" : "text-gray-500"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${passwordChecks.uppercase ? "bg-green-500" : "bg-gray-300"}`}
                />
                Uppercase letter
              </div>
              <div
                className={`flex items-center gap-1.5 ${passwordChecks.lowercase ? "text-green-600" : "text-gray-500"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${passwordChecks.lowercase ? "bg-green-500" : "bg-gray-300"}`}
                />
                Lowercase letter
              </div>
              <div
                className={`flex items-center gap-1.5 ${passwordChecks.number ? "text-green-600" : "text-gray-500"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${passwordChecks.number ? "bg-green-500" : "bg-gray-300"}`}
                />
                Number
              </div>
              <div
                className={`flex items-center gap-1.5 ${passwordChecks.special ? "text-green-600" : "text-gray-500"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${passwordChecks.special ? "bg-green-500" : "bg-gray-300"}`}
                />
                Special character
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500 leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link
            to="/terms"
            onClick={handleClose}
            className="text-orange-600 hover:text-orange-700"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            onClick={handleClose}
            className="text-orange-600 hover:text-orange-700"
          >
            Privacy Policy
          </Link>
          .
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          loading={loading}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              handleClose();
              onSwitchToLogin?.();
            }}
            className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </form>
    </Modal>
  );
};

export default RegisterModal;
