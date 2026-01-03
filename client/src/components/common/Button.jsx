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
    "px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 active:translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variants = {
    primary: `
      bg-[#F38020] 
      text-white 
      border-1 border-[#D66C15] 
      hover:bg-[#E6761B] 
      hover:shadow-[0_4px_0_0_#D66C15]
      hover:-translate-y-0.5
      active:shadow-none
      active:translate-y-1
    `,
    outline: `
      bg-transparent 
      text-[#F38020] 
      border-2 border-[#F38020]
      hover:bg-[#F38020]/10
    `,
    ghost: `
      bg-transparent 
      text-gray-600 
      hover:bg-gray-100
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
