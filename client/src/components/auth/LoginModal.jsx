import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login with:", { email, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome back">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-2">
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToRegister?.();
            }}
            className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </form>
    </Modal>
  );
};

export default LoginModal;
