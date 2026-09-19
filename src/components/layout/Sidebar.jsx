import { NavLink } from "react-router-dom";
import {
  FaBookmark,
  FaCompass,
  FaFire,
  FaHome,
  FaList,
  FaTimes,
  FaTv,
  FaFilm,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import "./Sidebar.css";

const menu = [
  { name: "Home", path: "/", icon: <FaHome />, end: true },
  { name: "Explore", path: "/explore", icon: <FaCompass /> },
  { name: "Movies", path: "/movies", icon: <FaFilm /> },
  { name: "TV Series", path: "/tv", icon: <FaTv /> },
  { name: "Trending", path: "/trending", icon: <FaFire /> },
  { name: "My List", path: "/favorites", icon: <FaList /> },
  { name: "Watchlist", path: "/watchlist", icon: <FaBookmark /> },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <motion.aside
            className="sidebar"
            aria-label="Main navigation"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
          >
            <div className="sidebar-header">
              <div className="sidebar-brand">
                <span className="sidebar-brand-mark">C</span>
                <span>CRISTAL</span>
              </div>

              <button
                type="button"
                className="sidebar-close-button"
                aria-label="Close sidebar"
                onClick={onClose}
              >
                <FaTimes />
              </button>
            </div>

            <nav className="sidebar-menu">
              <p className="sidebar-label">Browse</p>

              {menu.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-menu-link${isActive ? " is-active" : ""}`
                  }
                >
                  <span className="sidebar-menu-icon">{item.icon}</span>
                  <span className="sidebar-menu-text">{item.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="sidebar-footer">
              <p>
                Find something good.
                <br />
                Come back anytime.
              </p>
              <span>CRISTAL</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}