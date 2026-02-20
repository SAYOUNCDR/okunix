import React from "react";
import Modal from "../common/Modal";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteWebsiteModal = ({ isOpen, onClose, websiteName, onConfirm, isLoading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isLoading && onClose()}
      title="Delete Website"
    >
      <div className="px-6 py-4">
        <div className="flex items-start gap-4 p-4 mb-6 transition-all border bg-red-50/50 border-red-100 rounded-2xl group hover:bg-red-50">
          <div className="flex items-center justify-center w-10 h-10 transition-transform bg-white rounded-full shadow-sm text-red-500 shrink-0 group-hover:scale-110">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-900">Permanent Action</h4>
            <p className="text-xs text-red-700/80 leading-relaxed font-medium">
              This will permanently delete all records and settings for this website. This cannot be undone.
            </p>
          </div>
        </div>

        <p className="px-1 mb-6 text-sm text-gray-600 leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-gray-900 underline decoration-red-200 underline-offset-4">{websiteName}</span>?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs font-bold text-gray-500 transition-all bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 hover:text-gray-700 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs font-bold text-white transition-all bg-red-600 rounded-xl hover:bg-red-700 active:scale-95 shadow-lg shadow-red-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            {isLoading ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWebsiteModal;
