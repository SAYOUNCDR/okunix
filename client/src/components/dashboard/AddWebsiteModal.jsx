import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import Button from "../common/Button";

const AddWebsiteModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && domain) {
      setError(null);
      setIsLoading(true);

      try {
        // onAdd should return a promise that resolves on success or rejects on error
        await onAdd({ name, domain });

        // Only clear and close on success
        setName("");
        setDomain("");
        onClose();
      } catch (err) {
        // Set error message from the rejected promise
        setError(err.toString());
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Add website</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-sm text-red-600 animate-in slide-in-from-top-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-gray-400"
              placeholder="My Portfolio"
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="domain"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Domain
            </label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-gray-400"
              placeholder="example.com"
            />
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-2">
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 h-10 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!name || !domain || isLoading}
              className="px-4 py-2 h-10 text-sm font-medium"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWebsiteModal;
