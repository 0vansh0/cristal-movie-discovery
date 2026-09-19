import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="about-navbar">
      <div className="about-navbar-inner">
        {/* Logo */}
        <Link to="/" className="about-logo" aria-label="CRISTAL home">
          <span className="about-logo-mark">C</span>
          <span className="about-logo-text">CRISTAL</span>
        </Link>

        {/* Navigation */}
        <nav className="about-nav" aria-label="Main navigation">
          <Link to="/about">About</Link>
          <Link to="/about#experience">Experience</Link>
          <Link to="/about#features">Features</Link>
          <Link to="/about#technology">Technology</Link>
        </nav>

        {/* Main CRISTAL */}
        <Link to="/movies" className="about-open-cristal">
          <span>Open CRISTAL</span>
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </Link>
      </div>
    </header>
  );
}