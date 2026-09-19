import { useEffect, useState } from "react";
import {
  FaApple,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCirclePlay,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFilm,
  FaGlobe,
  FaGoogle,
  FaPlay,
  FaStar,
} from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import cristalLogo from "../assets/Cristal_icon.png";
import "./Login.css";

const slides = [
  {
    id: 1,
    type: "MOVIE",
    title: "THE DARK KNIGHT",
    subtitle: "Some stories never fade.",
    description: "Enter a world of unforgettable characters, legendary performances and stories worth remembering.",
    image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 2,
    type: "TV SHOW",
    title: "STRANGER THINGS",
    subtitle: "The story continues.",
    description: "Discover worlds beyond imagination and follow the stories everyone is talking about.",
    image: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
  },
  {
    id: 3,
    type: "MOVIE",
    title: "DUNE: PART TWO",
    subtitle: "Witness the legend.",
    description: "Explore breathtaking cinema, powerful stories and characters that stay with you.",
    image: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    id: 4,
    type: "TV SHOW",
    title: "THE LAST OF US",
    subtitle: "Every story has a cost.",
    description: "Experience acclaimed shows and cinematic universes in one place.",
    image: "https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
  },
  {
    id: 5,
    type: "MOVIE",
    title: "OPPENHEIMER",
    subtitle: "The world forever changed.",
    description: "Find movies worth remembering and build your own personal cinematic universe.",
    image: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
  },
  {
    id: 6,
    type: "TV SHOW",
    title: "PEAKY BLINDERS",
    subtitle: "By order of the Peaky Blinders.",
    description: "Your next obsession is waiting. Discover stories tailored to your taste.",
    image: "https://image.tmdb.org/t/p/original/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
  },
];

function getRedirectPath(location) {
  const from = location.state?.from;
  if (typeof from === "string") return from;
  if (from?.pathname) return `${from.pathname}${from.search || ""}${from.hash || ""}`;
  return "/movies";
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const slide = slides[currentSlide];

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setCurrentSlide((value) => (value + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  function nextSlide() {
    setCurrentSlide((value) => (value + 1) % slides.length);
  }

  function previousSlide() {
    setCurrentSlide((value) => (value - 1 + slides.length) % slides.length);
  }

  function goToMovies() {
    navigate("/movies");
  }

  function goToRegister() {
    navigate("/register");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setEmailTouched(true);
    setLoginError("");

    if (!emailIsValid || !password) return;

    setIsSubmitting(true);
    try {
      await login(email.trim(), password, { remember });
      navigate(getRedirectPath(location), { replace: true });
    } catch (error) {
      setLoginError(error?.response?.data?.message || error?.message || "Unable to sign in. Check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="cristal-login">
      <div className="cinema-background" aria-hidden="true">
        <AnimatePresence mode="sync">
          <motion.div key={slide.id} className="cinema-slide" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }} style={{ backgroundImage: `url(${slide.image})` }} />
        </AnimatePresence>
        <div className="cinema-left-gradient" />
        <div className="cinema-center-gradient" />
        <div className="cinema-bottom-gradient" />
        <div className="cinema-red-glow" />
        <div className="cinema-grid" />
      </div>

      <header className="login-navbar">
        <div className="login-logo">
          <Link to="/" className="logo-c" aria-label="CRISTAL home"><img src={cristalLogo} alt="" /></Link>
        </div>
        <div className="login-nav-right">
          <label className="language-selector"><FaGlobe /><select aria-label="Choose language" defaultValue="en"><option value="en">EN</option><option value="hi">HI</option><option value="es">ES</option></select></label>
          <button type="button" className="nav-account" onClick={goToRegister}>Sign up</button>
        </div>
      </header>

      <section className="login-main">
        <div className="cinema-content">
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} className="cinema-copy" initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} transition={{ duration: 0.7 }}>
              <div className="cinema-kicker"><FaCirclePlay /><span>Your next story starts here</span></div>
              <h1>Enter the <span>cinema.</span></h1>
              <div className="current-movie"><div className="current-movie-line" /><div><small>Now featured · {slide.type}</small><strong>{slide.title}</strong><p>{slide.subtitle}</p></div></div>
              <p className="cinema-description">{slide.description}</p>
              <div className="cinema-actions"><button type="button" className="explore-cinema" onClick={goToMovies}><FaPlay /><span>Explore cinema</span><FaArrowRight /></button><div className="cinema-rating"><div className="rating-star"><FaStar /></div><div><strong>4.9</strong><span>Loved by movie lovers</span></div></div></div>
            </motion.div>
          </AnimatePresence>
          <div className="cinema-controls"><button type="button" className="slider-arrow" onClick={previousSlide} aria-label="Previous slide"><FaChevronLeft /></button><div className="slide-indicators">{slides.map((item, index) => <button type="button" key={item.id} onClick={() => setCurrentSlide(index)} className={index === currentSlide ? "active" : ""} aria-label={`Show slide ${index + 1}`} />)}</div><button type="button" className="slider-pause" onClick={() => setIsPaused((value) => !value)} aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}>{isPaused ? "▶" : "Ⅱ"}</button><button type="button" className="slider-arrow" onClick={nextSlide} aria-label="Next slide"><FaChevronRight /></button></div>
          <div className="film-strip" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <div className="film-frame" key={index}><span /><span /><span /><span /></div>)}</div>
        </div>

        <div className="login-card-wrapper">
          <motion.div className="login-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div className="card-glow" />
            <div className="login-card-icon"><FaFilm /></div>
            <div className="login-heading"><span>Welcome back</span><h2>Ready for <strong>another story?</strong></h2><p>Sign in and continue where your cinematic journey left off.</p></div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group"><label htmlFor="login-email">Email address</label><div className="form-input"><FaEnvelope className="field-icon" /><input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setEmailTouched(true); setLoginError(""); }} onBlur={() => setEmailTouched(true)} aria-invalid={emailTouched && !emailIsValid} autoComplete="email" required /></div>{emailTouched && !emailIsValid && <small className="field-error">Enter a valid email address.</small>}</div>
              <div className="form-group"><div className="password-heading"><label htmlFor="login-password">Password</label><Link to="/forgot-password" className="forgot-password">Forgot password?</Link></div><div className="form-input"><FaFilm className="field-icon" /><input id="login-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(event) => { setPassword(event.target.value); setLoginError(""); }} autoComplete="current-password" required /><button type="button" className="password-eye" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button></div></div>
              <label className="remember-me"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span className="custom-check">✓</span> Remember me</label>
              {loginError && <p className="form-error" role="alert">{loginError}</p>}
              <button type="submit" className="login-submit" disabled={isSubmitting} aria-busy={isSubmitting}><span>{isSubmitting ? "Signing in..." : "Enter CRISTAL"}</span><div><FaArrowRight /></div></button>
            </form>

            <div className="login-divider"><span /><small>OR CONTINUE WITH</small><span /></div>
            <div className="social-buttons"><button type="button" onClick={() => setLoginError("Google sign-in is not connected yet.")}><FaGoogle /><span>Continue with Google</span><FaArrowRight /></button><button type="button" onClick={() => setLoginError("Apple sign-in is not connected yet.")}><FaApple /><span>Continue with Apple</span><FaArrowRight /></button></div>
            <div className="create-account"><span>Don't have an account?</span><Link to="/register">Create your account <FaArrowRight /></Link></div>
            <button type="button" className="guest-link" onClick={goToMovies}>Browse catalog</button>
            <div className="security-message"><span>◈</span> Your account is protected with secure authentication.</div>
          </motion.div>
        </div>
      </section>

      <footer className="login-footer-bar"><span>© 2026 CRISTAL</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/help">Help</Link></div><span className="secure">● Secure connection</span></footer>
    </main>
  );
}