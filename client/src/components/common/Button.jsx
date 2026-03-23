import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  variant = "primary",
}) => {
  const baseStyles =
    "px-6 py-2 rounded-lg font-semibold transition-all duration-200 active:translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variants = {
    primary: `
      bg-linear-to-b from-orange-300 via-orange-400 to-orange-500 
      text-white 
      border-b border-orange-600 
      shadow-sm hover:shadow-md 
      text-shadow-2xs text-shadow-orange-700
    `,
    outline: `
      bg-transparent 
      text-orange-600 
      border-2 border-orange-500
      hover:bg-orange-50
    `,
    ghost: `
      bg-transparent 
      text-gray-600 
      hover:bg-orange-50
      hover:text-orange-600
    `,
  };

  return (
    <motion.button
      whileTap={!loading && !disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
