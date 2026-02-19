import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "../common/Button";

const AddWebsiteModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && domain) {
      onAdd({ name, domain });
      setName("");
      setDomain("");
      onClose(); // Close modal after adding
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Add website</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
              onClick={onClose}
              className="px-4 py-2 h-10 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!name || !domain}
              className="px-4 py-2 h-10 text-sm font-medium"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWebsiteModal;
