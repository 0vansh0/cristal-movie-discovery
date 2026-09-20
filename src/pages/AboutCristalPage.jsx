import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Clapperboard,
  Compass,
  Heart,
  Layers3,
  Play,
  Search,
  Shuffle,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import Navbar from "../components/about/Navbar";
import ScrollProgress from "../components/about/ScrollProgress";
import Footer from "../components/about/Footer";

import "./AboutCristalPage.css";

/* =========================================================
   ANIMATION
   ========================================================= */

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerReveal = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* =========================================================
   FEATURE DATA
   ========================================================= */

const features = [
  {
    number: "01",
    title: "Discover",
    description:
      "Find something worth watching without already knowing what you want.",
    icon: Compass,
    className: "feature-large",
    image: "/discover.png",
  },

  {
    number: "02",
    title: "Search",
    description:
      "Jump from titles to people, genres, collections and more.",
    icon: Search,
    className: "feature-small",
    image: "/search.png",
  },

  {
    number: "03",
    title: "Your Library",
    description:
      "Keep movies and shows you want to return to.",
    icon: Heart,
    className: "feature-small",
    image: "/library.png",
  },

  {
    number: "04",
    title: "Explore",
    description:
      "Go deeper into universes, trends, genres and curated discoveries.",
    icon: Layers3,
    className: "feature-wide",
    image: "/explore.png",
  },
];

/* =========================================================
   TECHNOLOGY
   ========================================================= */

const technologies = [
  "React",
  "Vite",
  "JavaScript",
  "CSS",
  "TMDB API",
  "React Router",
  "Framer Motion",
];

/* =========================================================
   NAVIGATION
   ========================================================= */

const openCristal = () => {
  window.location.assign("/movies");
};

const openCristalAI = () => {
  window.location.assign("./AIPage");
};

const openMovies = () => {
  window.location.assign("./MoviesPage");
};

const scrollToExperience = () => {
  document
    .getElementById("experience")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
};

/* =========================================================
   PAGE
   ========================================================= */

export default function AboutCristalPage() {
  return (
    <div className="about-page">
      <ScrollProgress />

      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="about-hero" id="about">
          <div className="about-container about-hero-grid">

            {/* HERO COPY */}

            <motion.div
              className="about-hero-copy"
              initial="hidden"
              animate="visible"
              variants={reveal}
            >
              <div className="about-eyebrow">
                <span>THE STORY BEHIND CRISTAL</span>
              </div>

              <h1>
                A home for
                <br />
                <em>the stories</em>
                <br />
                you love.
              </h1>

              <p className="about-hero-description">
                CRISTAL brings movies, TV and anime discovery into one
                cinematic space — simple enough to browse, deep enough
                to keep exploring.
              </p>

              <div className="about-hero-actions">
                <button
                  type="button"
                  className="about-pill about-pill-primary"
                  Link to="/movies"
                  onClick={openCristal}
                >   
                  <Play
                    size={15}
                    fill="currentColor"
                  />

                  Open CRISTAL
                </button>

                <button
                  type="button"
                  className="about-pill about-pill-quiet"
                  onClick={scrollToExperience}
                >
                  Explore the story

                  <ArrowDown size={14} />
                </button>
              </div>
            </motion.div>

            {/* =================================================
                HERO VISUAL
            ================================================= */}

            <motion.div
              className="about-hero-visual"
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Ambient glow behind mockups */}

              <div
                className="hero-ambient-glow hero-ambient-glow-warm"
                aria-hidden="true"
              />

              <div
                className="hero-ambient-glow hero-ambient-glow-cool"
                aria-hidden="true"
              />

              {/* Main mockup */}

              <div className="hero-poster hero-poster-main">
                <img
                  src="/main_page.png"
                  alt="CRISTAL main page"
                />

                <div className="hero-poster-overlay" />

                <div className="hero-poster-caption">
                  <span>CRISTAL</span>

                  <strong>
                    DISCOVER SOMETHING
                  </strong>
                </div>
              </div>

              {/* Small floating label */}

              <motion.div
                className="hero-floating-card"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Clapperboard size={17} />

                <span>
                  Made for movie lovers
                </span>
              </motion.div>

              {/* Secondary mockup */}

              <motion.div
                className="hero-poster-small"
                animate={{
                  y: [0, 6, 0],
                  rotate: [-5, -4, -5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/anime_page.png"
                  alt="CRISTAL anime page"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            ABOUT
        ===================================================== */}

        <section className="about-section">
          <div className="about-container">

            <motion.div
              className="about-section-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={reveal}
            >
              <span className="section-kicker">
                01 / ABOUT
              </span>

              <div>
                <h2>
                  More than a place to search.
                </h2>

                <p>
                  CRISTAL is built around one simple idea:
                  finding something great to watch should be
                  part of the experience.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="about-story-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
            >
              <div className="story-image">
                <img
                  src="/explore_page.png"
                  alt="CRISTAL explore page"
                />

                <span>
                  THE CINEMATIC EXPERIENCE
                </span>
              </div>

              <div className="story-copy">
                <p className="story-lead">
                  There are thousands of things to watch.
                  The difficult part is finding the one
                  that feels right.
                </p>

                <p>
                  CRISTAL connects discovery, search and
                  personal libraries in one place.
                  You can start with a movie, an actor,
                  a genre or simply a feeling — then keep
                  following whatever catches your attention.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            EXPERIENCE / BENTO
        ===================================================== */}

        <section
          className="about-section"
          id="experience"
        >
          <div className="about-container">

            <motion.div
              className="about-section-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={reveal}
            >
              <span className="section-kicker">
                02 / EXPERIENCE
              </span>

              <div>
                <h2>
                  Designed around curiosity.
                </h2>

                <p>
                  Every part of CRISTAL is there to make
                  the next discovery a little easier.
                </p>
              </div>
            </motion.div>

            <div
              className="feature-bento"
              id="features"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.article
                    key={feature.number}
                    className={`feature-card ${feature.className}`}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    variants={staggerReveal}
                  >
                    <img
                      className="feature-card-image"
                      src={feature.image}
                      alt={`${feature.title} page`}
                    />

                    <div className="feature-card-image-overlay" />

                    <div
                      className="feature-card-glow"
                      aria-hidden="true"
                    />

                    <div className="feature-card-top">
                      <span>
                        {feature.number}
                      </span>

                      <div className="feature-icon">
                        <Icon
                          size={20}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="feature-card-content">
                      <h3>
                        {feature.title}
                      </h3>

                      <p>
                        {feature.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      className="feature-card-arrow"
                      size={19}
                      strokeWidth={1.5}
                    />
                  </motion.article>
                );
              })}

              {/* Visual spotlight */}

              <motion.article
                className="feature-visual-card"
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={reveal}
              >
                <img
                  src="/trending_page.png"
                  alt="CRISTAL trending page"
                />

                <div className="feature-visual-overlay" />

                <div className="feature-visual-copy">
                  <Sparkles
                    size={18}
                    strokeWidth={1.5}
                  />

                  <div>
                    <span>
                      THE IDEA
                    </span>

                    <strong>
                      Sometimes the best movie
                      is the one you weren't
                      looking for.
                    </strong>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* =====================================================
            CRISTAL AI
        ===================================================== */}

        <section
          className="about-section cristal-ai-section"
          id="cristal-ai"
        >
          <div className="about-container">

            <motion.div
              className="about-section-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={reveal}
            >
              <span className="section-kicker">
                03 / CRISTAL AI
              </span>

              <div>
                <h2>
                  When you know the feeling,
                  <br />
                  but not the title.
                </h2>

                <p>
                  CRISTAL AI helps turn a vague movie-night
                  feeling into a place to start.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="ai-story"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
            >

              {/* AI VISUAL */}

              <div className="ai-story-visual">
                <div
                  className="ai-orbit ai-orbit-one"
                  aria-hidden="true"
                />

                <div
                  className="ai-orbit ai-orbit-two"
                  aria-hidden="true"
                />

                <div className="ai-story-icon">
                  <WandSparkles
                    size={38}
                    strokeWidth={1.2}
                  />
                </div>

                <span className="ai-story-label">
                  CRISTAL AI
                </span>

                <img
                  className="ai-story-image"
                  src="/ai.png"
                  alt="CRISTAL AI page"
                />
              </div>

              {/* AI COPY */}

              <div className="ai-story-copy">
                <p className="ai-story-lead">
                  Tell it what you feel like watching.
                </p>

                <p>
                  Maybe you want something quiet after
                  a long day. Maybe you want a clever
                  thriller with a little humour.
                </p>

                <p>
                  Or maybe you only know that you have
                  about two hours and don't want to think
                  too much.
                </p>

                <p>
                  CRISTAL AI turns that kind of
                  conversation into a starting point
                  for discovery.
                </p>

                <button
                  type="button"
                  className="about-feature-link"
                  onClick={openCristalAI}
                >
                  <span>
                    Try CRISTAL AI
                  </span>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.6}
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            SURPRISE ME
        ===================================================== */}

        <section
          className="about-section surprise-section"
          id="surprise-me"
        >
          <div className="about-container">

            <motion.div
              className="surprise-me"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
            >

              {/* SURPRISE COPY */}

              <div className="surprise-copy">
                <span className="section-kicker">
                  04 / SURPRISE ME
                </span>

                <h2>
                  Sometimes,
                  <br />
                  <em>don't choose.</em>
                </h2>

                <p>
                  Not every movie night needs a search bar.
                  Surprise Me is for when you just want
                  CRISTAL to pick something and see where
                  the night goes.
                </p>

                <p className="surprise-small-copy">
                  One click. No overthinking. Just another
                  story to discover.
                </p>

                <button
                  type="button"
                  className="about-feature-link surprise-link"
                  onClick={openMovies}
                >
                  <span>
                    Let CRISTAL surprise you
                  </span>

                  <Shuffle
                    size={16}
                    strokeWidth={1.6}
                  />
                </button>
              </div>

              {/* SURPRISE VISUAL */}

              <div className="surprise-visual">
                <motion.div
                  className="surprise-poster surprise-poster-one"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [-7, -5, -7],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="/discover.png"
                    alt="CRISTAL discovery"
                  />
                </motion.div>

                <motion.div
                  className="surprise-poster surprise-poster-two"
                  animate={{
                    y: [0, 8, 0],
                    rotate: [6, 4, 6],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  <img
                    src="/trending_page.png"
                    alt="CRISTAL trending"
                  />
                </motion.div>

                <motion.div
                  className="surprise-symbol"
                  animate={{
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Shuffle
                    size={30}
                    strokeWidth={1.2}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            WHAT YOU CAN DO
        ===================================================== */}

        <section
          className="about-section"
          id="what-you-can-do"
        >
          <div className="about-container">

            <motion.div
              className="about-section-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={reveal}
            >
              <span className="section-kicker">
                05 / WHAT YOU CAN DO
              </span>

              <div>
                <h2>
                  Everything connects.
                </h2>

                <p>
                  Search something specific or follow
                  the trail somewhere unexpected.
                </p>
              </div>
            </motion.div>

            <div className="cinema-strip">

              <motion.div
                className="cinema-strip-image"
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <img
                  src="/tv_show.png"
                  alt="CRISTAL TV shows page"
                />
              </motion.div>

              <div className="cinema-strip-copy">
                <span>
                  ONE PLACE
                </span>

                <h3>
                  Movies.
                  <br />
                  Shows.
                  <br />
                  Anime.
                </h3>

                <p>
                  A single experience for discovering
                  what to watch, keeping what you love
                  and exploring everything around it.
                </p>

                <button
                  type="button"
                  className="about-feature-link"
                  onClick={openMovies}
                >
                  <span>
                    Start exploring
                  </span>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.6}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TECHNOLOGY
        ===================================================== */}

        <section
          className="about-section"
          id="technology"
        >
          <div className="about-container">

            <motion.div
              className="about-section-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={reveal}
            >
              <span className="section-kicker">
                06 / TECHNOLOGY
              </span>

              <div>
                <h2>
                  Simple technology.
                  <br />
                  Thoughtful experience.
                </h2>

                <p>
                  Modern frontend tools keep the
                  experience fast, flexible and easy
                  to evolve.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="tech-layout"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
            >
              <div className="tech-copy">
                <p>
                  CRISTAL is built with React and Vite,
                  using reusable components, client-side
                  navigation and the TMDB API to bring
                  movie and television information into
                  the experience.
                </p>

                <p>
                  Framer Motion adds the small movements
                  and transitions that make the interface
                  feel alive without getting in the way.
                </p>
              </div>

              <div className="tech-list">
                {technologies.map(
                  (technology, index) => (
                    <div
                      className="tech-item"
                      key={technology}
                    >
                      <span>
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <strong>
                        {technology}
                      </strong>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="about-cta">
          <div className="about-container">

            <motion.div
              className="about-cta-inner"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={reveal}
            >
              <span className="section-kicker">
                07 / BEGIN
              </span>

              <h2>
                Your next
                <br />
                <em>story</em> is waiting.
              </h2>

              <p>
                Explore movies, shows and everything
                in between with CRISTAL.
              </p>

              <button
                type="button"
                className="about-pill about-pill-primary"
                onClick={openCristal}
                href="/"
              >
                <Play
                  size={15}
                  fill="currentColor"
                />

                Open CRISTAL

                <ArrowUpRight
                  size={15}
                />
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}