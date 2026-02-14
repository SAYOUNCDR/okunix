import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement register logic
    console.log("Register with:", { name, email, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create an account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
            placeholder="John Doe"
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
            placeholder="Min. 8 characters"
            required
            minLength={8}
          />
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
