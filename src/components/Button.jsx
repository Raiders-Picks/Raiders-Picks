import React from "react";

const Button = ({ children, onClick, variant = "primary" }) => {
  const baseStyles =
    "relative px-6 py-3 sm:px-8 sm:py-4 lg:px-8 lg:py-2 rounded-xl font-semibold transition-all duration-300 overflow-hidden group text-lg lg:text-xl";

  const variantStyles = {
    primary:
      "bg-[#0f172a] text-white hover:bg-[#1e293b] border-2 border-[#f97316]",
    secondary:
      "bg-[#f97316] text-white hover:bg-orange-600 border-2 border-[#0f172a]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} animate-[pulse_3s_ease-in-out_infinite] cursor-pointer`}
    >
      <span className="relative z-10">{children}</span>

      {/* Glow background */}
      <span className="absolute inset-0 bg-[#f97316] opacity-20 blur-xl group-hover:opacity-40 transition-all" />

      {/* Stars / Glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1 left-2 w-2 h-2 bg-white rounded-full animate-ping" />
        <div className="absolute bottom-1 right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-200" />
      </div>
    </button>
  );
};

export default Button;
