import { Link } from "react-router-dom";
import {
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";

import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="cristal-footer">
      {/* Ambient glow */}
      <div className="footer-glow footer-glow-one" />
      <div className="footer-glow footer-glow-two" />

      <div className="footer-inner">
        {/* =====================================================
            TOP
        ===================================================== */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-mark">C</span>
              <span>CRISTAL</span>
            </Link>

            <p>
              Discover stories worth remembering.
              <br />
              Your cinematic universe, reimagined.
            </p>

            <div className="footer-socials">
              <a
                href="https://github.com/0vansh0"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.instagram.com/0_vanshraj_0/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com/0_vanshraj_0"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* =====================================================
              DISCOVER
          ===================================================== */}
          <div className="footer-column">
            <h3>Discover</h3>

            <Link to="/movies">
              Movies
            </Link>

            <Link to="/tv">
              TV Shows
            </Link>

            <Link to="/trending">
              Trending
            </Link>

            <Link to="/top-rated">
              Top Rated
            </Link>

            <Link to="/explore">
              Explore
            </Link>
          </div>

          {/* =====================================================
              CRISTAL
          ===================================================== */}
          <div className="footer-column">
            <h3>CRISTAL</h3>

            <Link to="/watchlist">
              Watchlist
            </Link>

            <Link to="/favorites">
              Favorites
            </Link>

            <Link to="/watch-party">
              Watch Party
            </Link>

            <Link to="/wrapped">
              Your Wrapped
            </Link>
          </div>

          {/* =====================================================
              COMMUNITY
          ===================================================== */}
          <div className="footer-column">
            <h3>Community</h3>

            <Link to="/activity">
              Activity
            </Link>

            <Link to="/trivia">
              Cinematic Trivia
            </Link>

            <Link to="/badges">
              Badges
            </Link>

            <Link to="/friends">
              Friends
            </Link>

            <Link to="/blind-pick">
              Daily Blind Pick
            </Link>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} CRISTAL.
            Made with <FaHeart /> for cinema.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">
              Privacy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/contact">
              Contact
            </Link>
          </div>

          <button
            type="button"
            className="footer-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}