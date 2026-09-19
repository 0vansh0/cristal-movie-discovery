import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="about-footer">
      <div className="about-footer-inner">
        <div className="about-footer-copy">
          © {currentYear} CRISTAL. Made for people who love stories.
        </div>

        <div className="about-footer-links">
          <Link to="/about">About</Link>

          <Link to="/about#experience">Experience</Link>

          <Link to="/about#features">Features</Link>

          <Link to="/about#technology">Technology</Link>

          <Link
            to="/movies"
            className="about-footer-cristal-link"
            aria-label="Open CRISTAL"
          >
            Open CRISTAL
            <ArrowUpRight size={13} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </footer>
  );
}