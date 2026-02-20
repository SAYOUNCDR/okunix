import React from "react";
import Modal from "./Modal";
import { AlertTriangle, AlertCircle, Trash2, RefreshCw } from "lucide-react";

const DangerModal = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  isLoading,
  color = "red", // 'red' or 'orange'
  message,
}) => {
  const configs = {
    red: {
      bg: "bg-red-50/50",
      border: "border-red-100",
      iconContainer: "text-red-500",
      titleText: "text-red-900",
      descText: "text-red-700/80",
      buttonBg: "bg-red-600 hover:bg-red-700 shadow-red-100",
      icon: <AlertTriangle size={20} />,
      actionIcon: <Trash2 size={14} />,
    },
    orange: {
      bg: "bg-orange-50/50",
      border: "border-orange-100",
      iconContainer: "text-orange-500",
      titleText: "text-orange-900",
      descText: "text-orange-700/80",
      buttonBg: "bg-orange-500 hover:bg-orange-600 shadow-orange-100",
      icon: <AlertCircle size={20} />,
      actionIcon: <RefreshCw size={14} />,
    },
  };

  const config = configs[color] || configs.red;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isLoading && onClose()}
      title={title}
    >
      <div className="px-6 py-4">
        <div className={`flex items-start gap-4 p-4 mb-6 transition-all border ${config.bg} ${config.border} rounded-2xl group`}>
          <div className={`flex items-center justify-center w-10 h-10 transition-transform bg-white rounded-full shadow-sm ${config.iconContainer} shrink-0 group-hover:scale-110`}>
            {config.icon}
          </div>
          <div>
            <h4 className={`text-sm font-bold ${config.titleText}`}>{title}</h4>
            <p className={`text-xs ${config.descText} leading-relaxed font-medium`}>
              {description}
            </p>
          </div>
        </div>

        {message && (
          <p className="px-1 mb-6 text-sm text-gray-600 leading-relaxed italic">
            {message}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs font-bold text-gray-500 transition-all bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 hover:text-gray-700 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 text-xs font-bold text-white transition-all ${config.buttonBg} rounded-xl active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              config.actionIcon
            )}
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DangerModal;
