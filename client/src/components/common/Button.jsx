import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary", // primary, outline, ghost
}) => {
  const baseStyles =
    "px-6 py-2 rounded-lg font-semibold transition-all duration-200 active:translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variants = {
    primary: `
      bg-linear-to-b from-yellow-200 via-yellow-300 to-yellow-400 
      text-black 
      border-b border-amber-500 
      shadow-sm hover:shadow-md 
      text-shadow-2xs text-shadow-amber-400
    `,
    outline: `
      bg-transparent 
      text-yellow-600 
      border-2 border-yellow-500
      hover:bg-yellow-50
    `,
    ghost: `
      bg-transparent 
      text-gray-600 
      hover:bg-yellow-50
      hover:text-yellow-600
    `,
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
