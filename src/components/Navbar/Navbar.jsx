import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Moon,
} from "lucide-react";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchButton from "./SearchButton";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: .45 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#141418]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-10">

            <Logo />

            <div className="hidden lg:block">
              <NavLinks />
            </div>

          </div>

          {/* RIGHT */}

          <div className="hidden lg:flex items-center gap-3">

            <SearchButton />

            <button
              className="h-11 w-11 rounded-full
              bg-white/5
              border border-white/10
              hover:border-[#FF5E5E]
              hover:bg-[#FF5E5E]/10
              transition"
            >
              <Bell
                className="mx-auto"
                size={19}
              />
            </button>

            <button
              className="h-11 w-11 rounded-full
              bg-white/5
              border border-white/10
              hover:border-[#FFD464]
              hover:bg-[#FFD464]/10
              transition"
            >
              <Moon
                className="mx-auto"
                size={18}
              />
            </button>

            <UserMenu />

          </div>

          {/* MOBILE */}

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden h-11 w-11 rounded-full
            bg-white/5
            border border-white/10
            flex items-center justify-center"
          >
            <Menu size={22} />
          </button>

        </div>
      </motion.header>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="absolute right-0 top-0
              h-full
              w-[320px]
              bg-[#141418]
              border-l border-white/10"
            >

              <div className="h-20 px-6 flex items-center justify-between">

                <Logo />

                <button
                  onClick={() => setMobileOpen(false)}
                >
                  <X />
                </button>

              </div>

              <MobileMenu
                closeMenu={() => setMobileOpen(false)}
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
};

export default Navbar;