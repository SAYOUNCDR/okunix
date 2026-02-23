import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, login } = useAuth();
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
      // Automatically login after registration or show message to check email
      // For now, let's assume auto-login or redirect to login
      await login(email, password);
      onClose();
      navigate("/dashboard");
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create an account">
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
          <a href="/terms" className="text-orange-600 hover:text-orange-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-orange-600 hover:text-orange-700">
            Privacy Policy
          </a>
          .
        </div>

        <Button type="submit" variant="primary" className="w-full mt-2">
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
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
