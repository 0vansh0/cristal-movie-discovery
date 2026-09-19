import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaUser,
  FaChevronDown,
  FaHeart,
  FaPlus,
  FaCog,
} from "react-icons/fa";

import "./Navbar.css";
import ThemeToggle from "../common/ThemeToggle";
import cristalLogo from "../../assets/Cristal_icon.png";
import { useSearch } from "../../context/SearchContext";

const navItems = [
  { label: "Movies", to: "/", end: true },
  { label: "TV Shows", to: "/tv" },
  { label: "Anime", to: "/anime" },
  { label: "Trending", to: "/trending" },
  { label: "Explore", to: "/explore" },
];

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { query, updateQuery, search, history } = useSearch();
  const [searchFocused, setSearchFocused] = useState(false);
  const updateQueryRef = useRef(updateQuery);

  updateQueryRef.current = updateQuery;

  useEffect(() => {
    updateQueryRef.current(searchParams.get("q") || "");
  }, [location.search, searchParams]);

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();

    return history
      .filter((item) => !term || item.toLowerCase().includes(term))
      .slice(0, 5);
  }, [history, query]);

  function submitSearch(event) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;

    search(term);
    setSearchFocused(false);
  }

  function selectSuggestion(item) {
    updateQuery(item);
    search(item);
    setSearchFocused(false);
  }

  function navClass({ isActive }) {
    return `navbar-link${isActive ? " active" : ""}`;
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="navbar-menu"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        <NavLink to="/" className="navbar-brand" aria-label="CRISTAL home">
          <span className="navbar-brand-icon">
            <img src={cristalLogo} alt="CRISTAL" />
          </span>
        </NavLink>
      </div>

      <nav className="navbar-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navClass}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-right">
        <ThemeToggle />

        <form
          className={`navbar-search${searchFocused ? " is-focused" : ""}`}
          onSubmit={submitSearch}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => {
            window.setTimeout(() => setSearchFocused(false), 150);
          }}
        >
          <FaSearch className="navbar-search-icon" />
          <input
            type="search"
            placeholder="Search movies, TV shows..."
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            aria-label="Search movies and TV shows"
          />

          {searchFocused && suggestions.length > 0 && (
            <div className="navbar-search-suggestions">
              <div className="navbar-suggestions-title">
                {query.trim() ? "Search history" : "Recent searches"}
              </div>

              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="navbar-search-suggestion"
                  onMouseDown={() => selectSuggestion(item)}
                >
                  <FaSearch />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </form>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `navbar-icon-button${isActive ? " active" : ""}`
          }
          aria-label="Notifications"
        >
          <FaBell />
        </NavLink>

        <details className="navbar-account-menu">
          <summary className="navbar-account" aria-haspopup="menu">
            <span className="navbar-account-avatar">
              <FaUser />
            </span>
            <span className="navbar-account-text">Account</span>
            <FaChevronDown className="navbar-account-chevron" />
          </summary>

          <div className="navbar-account-panel">
            <div className="navbar-account-heading">
              <span className="navbar-account-heading-icon">
                <FaUser />
              </span>
              <div>
                <strong>My Account</strong>
                <span>Manage your CRISTAL profile</span>
              </div>
            </div>

            <div className="navbar-account-divider" />

            <NavLink to="/profile" className="navbar-account-panel-link">
              <FaUser /> <span>My Profile</span>
            </NavLink>
            <NavLink to="/favorites" className="navbar-account-panel-link">
              <FaHeart /> <span>Favorites</span>
            </NavLink>
            <NavLink to="/watchlist" className="navbar-account-panel-link">
              <FaPlus /> <span>My Watchlist</span>
            </NavLink>
            <NavLink to="/settings" className="navbar-account-panel-link">
              <FaCog /> <span>Settings</span>
            </NavLink>

            <div className="navbar-account-divider" />
            <NavLink to="/login" className="navbar-account-login">
              Login
            </NavLink>
          </div>
        </details>
      </div>
    </header>
  );
}