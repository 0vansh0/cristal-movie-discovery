import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaHeart,
  FaBookmark,
  FaSignOutAlt,
  FaEdit,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./ProfilePage.css";
import { useFavorites } from "../context/FavoritesContext";
import { getProfile, logoutUser } from "../services/userService";

export default function ProfilePage() {
  const navigate = useNavigate();

  const {
    favorites = [],
    watchlist = [],
  } = useFavorites();

  const [user, setUser] = useState(null);

  /* =========================================================
     LOAD USER
  ========================================================= */

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const storedUser = localStorage.getItem("cristal-user");

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (active) setUser(parsed);
        }

        const remoteUser = await getProfile().catch(() => null);

        if (!active) return;

        if (remoteUser) {
          localStorage.setItem("cristal-user", JSON.stringify(remoteUser));
          setUser(remoteUser);
          return;
        }

        if (!storedUser) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Unable to load profile:", error);

        if (active) {
          navigate("/login");
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [navigate]);

  /* =========================================================
     LOGOUT
  ========================================================= */

  async function logout() {
    try {
      await logoutUser();
    } catch {
      // ignore logout errors and still clear local auth
    }

    localStorage.removeItem("cristal-user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("cristal_user");

    navigate("/login");
  }

  if (!user) {
    return null;
  }

  const name =
    user.name ||
    user.username ||
    user.displayName ||
    user.email?.split("@")[0] ||
    "User";

  const email =
    user.email ||
    "No email available";

  const avatar =
    user.photoURL ||
    user.avatar ||
    user.profileImage ||
    null;

  const initial =
    name.charAt(0).toUpperCase();

  return (
    <main className="profile-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="profile-background">
        <div className="profile-glow profile-glow-one" />
        <div className="profile-glow profile-glow-two" />
      </div>

      <section className="profile-container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          className="profile-header"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >

          <div>
            <span className="profile-eyebrow">
              CRISTAL ACCOUNT
            </span>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal
              CRISTAL experience.
            </p>
          </div>

          <button
            type="button"
            className="profile-edit-button"
          >
            <FaEdit />
            Edit Profile
          </button>

        </motion.div>

        {/* ===================================================
            PROFILE CARD
        =================================================== */}

        <motion.section
          className="profile-main-card"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.55,
          }}
        >

          <div className="profile-user">

            <div className="profile-avatar">

              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                />
              ) : (
                initial
              )}

            </div>

            <div className="profile-user-info">

              <h2>
                {name}
              </h2>

              <p>
                <FaEnvelope />
                {email}
              </p>

              <span className="profile-member">
                <FaCalendarAlt />
                CRISTAL Member
              </span>

            </div>

          </div>

        </motion.section>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="profile-stats">

          <motion.div
            className="profile-stat-card"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            whileHover={{
              y: -5,
            }}
          >

            <div className="profile-stat-icon">
              <FaHeart />
            </div>

            <strong>
              {favorites.length}
            </strong>

            <span>
              Favorites
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/favorites")
              }
            >
              View Favorites
            </button>

          </motion.div>

          <motion.div
            className="profile-stat-card"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            whileHover={{
              y: -5,
            }}
          >

            <div className="profile-stat-icon bookmark">
              <FaBookmark />
            </div>

            <strong>
              {watchlist.length}
            </strong>

            <span>
              Watchlist
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/watchlist")
              }
            >
              View Watchlist
            </button>

          </motion.div>

          <motion.div
            className="profile-stat-card"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            whileHover={{
              y: -5,
            }}
          >

            <div className="profile-stat-icon user">
              <FaUser />
            </div>

            <strong>
              {favorites.length +
                watchlist.length}
            </strong>

            <span>
              Saved Items
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/explore")
              }
            >
              Explore
            </button>

          </motion.div>

        </div>

        {/* ===================================================
            ACCOUNT ACTIONS
        =================================================== */}

        <motion.section
          className="profile-actions"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
        >

          <div>
            <h3>
              Account
            </h3>

            <p>
              Manage your CRISTAL
              account and preferences.
            </p>
          </div>

          <button
            type="button"
            className="profile-logout"
            onClick={logout}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </motion.section>

      </section>

    </main>
  );
}