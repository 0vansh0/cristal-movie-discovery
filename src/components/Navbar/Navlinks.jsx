import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  House,
  Clapperboard,
  Grid2x2,
  Bookmark,
  User,
} from "lucide-react";

const links = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Movies",
    path: "/movies",
    icon: Clapperboard,
  },
  {
    name: "Genres",
    path: "/genres",
    icon: Grid2x2,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: Bookmark,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

const NavLinks = () => {
  return (
    <nav className="flex items-center gap-2">

      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.path}
            to={link.path}
            className="relative"
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ y: -2 }}
                className={`
                  relative
                  flex
                  items-center
                  gap-2
                  rounded-full
                  px-4
                  py-2.5
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-[#FF5E5E]/15 text-[#FF5E5E]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Icon size={17} />

                <span className="text-sm font-semibold">
                  {link.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="
                      absolute
                      left-3
                      right-3
                      -bottom-1
                      h-[3px]
                      rounded-full
                      bg-[#FF5E5E]
                    "
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        );
      })}

    </nav>
  );
};

export default NavLinks;