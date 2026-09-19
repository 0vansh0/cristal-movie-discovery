import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Mic,
  Loader2,
  Command,
} from "lucide-react";

export default function SearchBar({
  value = "",
  onChange,
  onSearch,
  onVoice,
  loading = false,
  placeholder = "Search movies, TV shows, people...",
}) {
  const inputRef = useRef(null);

  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Ctrl + K

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, []);

  // Debounce

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(query);
    }, 350);

    return () => clearTimeout(timer);
  }, [query, onChange]);

  const clearSearch = () => {
    setQuery("");
    onChange?.("");
    inputRef.current?.focus();
  };

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <motion.form
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .6,
      }}
      onSubmit={submit}
      className="
        relative
        mt-10
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-[#FFD464]/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          flex
          items-center
          rounded-full
          border
          border-white/10
          bg-white/5
          px-6
          py-4
          backdrop-blur-3xl
        "
      >
        {/* Search Icon */}

        <Search
          size={24}
          className="text-zinc-400"
        />

        {/* Input */}

        <input
          ref={inputRef}
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder={placeholder}
          className="
            flex-1
            bg-transparent
            px-5
            text-lg
            outline-none
            placeholder:text-zinc-500
          "
        />

        {/* Ctrl + K */}

        <div
          className="
            mr-4
            hidden
            items-center
            gap-1
            rounded-lg
            border
            border-white/10
            bg-black/30
            px-3
            py-2
            text-xs
            text-zinc-400
            md:flex
          "
        >
          <Command size={14} />
          K
        </div>

        {/* Loading */}

        {loading && (
          <Loader2
            size={22}
            className="mr-4 animate-spin text-[#FFD464]"
          />
        )}

        {/* Clear */}

        {query && (
          <motion.button
            whileTap={{
              scale: .9,
            }}
            type="button"
            onClick={clearSearch}
            className="
              mr-3
              rounded-full
              p-2
              hover:bg-white/10
            "
          >
            <X size={20}/>
          </motion.button>
        )}

        {/* Voice */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: .95,
          }}
          type="button"
          onClick={onVoice}
          className="
            mr-3
            rounded-full
            bg-white/10
            p-3
            hover:bg-[#FFD464]
            hover:text-black
          "
        >
          <Mic size={20}/>
        </motion.button>

        {/* Search */}

        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: .95,
          }}
          type="submit"
          className="
            rounded-full
            bg-[#FFD464]
            px-8
            py-3
            font-semibold
            text-black
          "
        >
          Search
        </motion.button>
      </div>
    </motion.form>
  );
}