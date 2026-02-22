import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Reusable modal for displaying extended lists of dashboard data
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function to close the modal
 * @param {string} title - The title of the modal (e.g. "All Sources")
 * @param {Array} data - The full dataset array to display
 * @param {function} renderItem - A render prop function that receives (item, index) and returns JSX for that row
 */
const DataModal = ({ isOpen, onClose, title, data = [], renderItem }) => {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close when clicking outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 flex-1 custom-scrollbar">
          {data.length > 0 ? (
            <div className="space-y-1">{data.map(renderItem)}</div>
          ) : (
            <div className="py-12 text-center text-sm text-gray-500">
              No data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataModal;
