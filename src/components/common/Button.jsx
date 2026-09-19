import { motion } from "framer-motion";
import "./Button.css";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className = "",
}) {
  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.03,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.97,
      }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        cristal-btn
        ${variant}
        ${size}
        ${fullWidth ? "full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <span className="btn-loader"></span>
          Loading...
        </>
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </motion.button>
  );
}