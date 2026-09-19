import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  name,
  type = "text",
  value = "",
  placeholder = "",
  icon = null,
  error = "",
  disabled = false,
  required = false,
  onChange,
  onKeyDown,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className={`w-full ${className}`}>

      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold text-zinc-300"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <motion.div
        whileTap={{ scale: 0.99 }}
        className="relative"
      >

        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
          className={`
            w-full
            h-12
            rounded-full

            border
            border-white/10

            bg-white/5

            text-white
            text-sm

            placeholder:text-zinc-500

            outline-none

            transition-all
            duration-300

            focus:border-yellow-400
            focus:bg-white/10
            focus:ring-2
            focus:ring-yellow-400/20

            ${icon ? "pl-12" : "pl-5"}

            ${
              type === "password"
                ? "pr-12"
                : "pr-5"
            }

            ${
              disabled
                ? "cursor-not-allowed opacity-60"
                : ""
            }
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-zinc-400
              transition
              hover:text-yellow-400
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{
            opacity: 0,
            y: -5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-2 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}