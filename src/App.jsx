import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./auth/ProtectedRoute";

/* =========================================================
   LAZY LOADED PAGES
   ========================================================= */

const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const TVPage = lazy(() => import("./pages/TVShowsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const AIPage = lazy(() => import("./pages/AIPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const TrendingPage = lazy(() => import("./pages/TrendingPage"));
const Genres = lazy(() => import("./pages/Genres"));
const AnimePage = lazy(() => import("./pages/AnimePage"));
const PersonDetailsPage = lazy(() => import("./pages/PersonDetailsPage"));
const UniversePage = lazy(() => import("./pages/UniversePage"));
const AboutCristalPage = lazy(() => import("./pages/AboutCristalPage"));

/*
  These pages may not exist yet.

  Once you send me the relevant files, we'll replace these
  temporary route components with your real implementations.
*/
const RatingsPage = lazy(() => import("./pages/RatingsPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const ListsPage = lazy(() => import("./pages/ListsPage"));
const ActorDetailsPage = lazy(() => import("./pages/ActorPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword"));
const SignupPage = lazy(() => import("./pages/Signup"));

/* =========================================================
   LOADING SCREEN
   ========================================================= */

function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#ffd21c]"
          aria-hidden="true"
        />

        <span className="text-sm text-white/45">
          Loading...
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   404 PAGE
   ========================================================= */

function NotFoundPage() {
  return (
    <section
      className="flex min-h-[70vh] items-center justify-center px-6"
      aria-labelledby="not-found-title"
    >
      <div className="text-center">

        <div className="mb-5 text-7xl font-black tracking-tighter text-[#ffd21c]/15">
          404
        </div>

        <h1
          id="not-found-title"
          className="text-3xl font-black tracking-tight text-white"
        >
          Scene Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">
          Looks like this scene isn't part of the movie.
          The page you're looking for doesn't exist.
        </p>

        <a
          href="/"
          className="
            mt-7
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-[#ffd21c]
            px-5
            py-3
            text-sm
            font-bold
            text-black
            transition
            hover:-translate-y-0.5
            hover:brightness-105
            focus:outline-none
            focus:ring-2
            focus:ring-[#ffd21c]/60
            focus:ring-offset-2
            focus:ring-offset-black
          "
        >
          Back to CRISTAL
        </a>

      </div>
    </section>
  );
}

/* =========================================================
   ROUTE ERROR FALLBACK
   ========================================================= */

function RouteErrorFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center px-6"
      role="alert"
    >
      <div className="text-center">

        <div className="mb-3 text-3xl">
          🎬
        </div>

        <h2 className="text-xl font-bold text-white">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-white/45">
          We couldn't load this page.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="
            mt-5
            rounded-xl
            border
            border-white/10
            bg-white/4
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-white/8
          "
        >
          Try again
        </button>

      </div>
    </div>
  );
}

/* =========================================================
   APP CONTENT
   ========================================================= */

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  /*
    Authentication pages use their own full-screen layout.
  */
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  const isNotificationsPage =
    location.pathname === "/notifications";

  const isAboutPage =
    location.pathname === "/" || location.pathname === "/about";

  /*
    Close mobile sidebar whenever navigation happens.
  */
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  /* =======================================================
     AUTH LAYOUT
     ======================================================= */

  if (isAuthPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Routes>
      </Suspense>
    );
  }

  if (isAboutPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AboutCristalPage />} />
          <Route path="/about" element={<AboutCristalPage />} />
        </Routes>
      </Suspense>
    );
  }

  /* =======================================================
     MAIN APPLICATION
     ======================================================= */

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: "var(--bg, #080a0d)",
        color: "var(--text, #f7f7f8)",
      }}
    >

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
      />

      <main className="min-h-screen pt-20.5">

        <Suspense fallback={<PageLoader />}>

          <Routes>

            {/* =================================================
                HOME
            ================================================= */}

            {/* =================================================
                MOVIES
            ================================================= */}

            <Route
              path="/movies"
              element={<MoviesPage />}
            />

            {/* =================================================
                TV
            ================================================= */}

            <Route
              path="/tv"
              element={<TVPage />}
            />

            <Route
              path="/tv/:id"
              element={<MovieDetailsPage />}
            />

            {/* =================================================
                ANIME
            ================================================= */}

            <Route
              path="/anime"
              element={<AnimePage />}
            />

            {/* =================================================
                SEARCH
            ================================================= */}

            <Route
              path="/search"
              element={<SearchPage />}
            />

            {/* =================================================
                EXPLORE
            ================================================= */}

            <Route
              path="/explore"
              element={<ExplorePage />}
            />

            <Route
              path="/universe/:universe"
              element={<UniversePage />}
            />

            {/* =================================================
                TRENDING
            ================================================= */}

            <Route
              path="/trending"
              element={<TrendingPage />}
            />

            {/* =================================================
                GENRES
            ================================================= */}

            <Route
              path="/genres"
              element={<Genres />}
            />

            {/* =================================================
                AI
            ================================================= */}

            <Route
              path="/ai"
              element={<AIPage />}
            />

            {/* =================================================
                MOVIE DETAILS
            ================================================= */}

            <Route
              path="/movie/:id"
              element={<MovieDetailsPage />}
            />

            {/* =================================================
                PEOPLE / ACTORS
            ================================================= */}

            <Route
              path="/person/:id"
              element={<PersonDetailsPage />}
            />

            <Route
              path="/actor/:id"
              element={<ActorDetailsPage />}
            />

            {/* =================================================
                PROTECTED — WATCHLIST
            ================================================= */}

            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <WatchlistPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — FAVORITES
            ================================================= */}

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — RATINGS
            ================================================= */}

            <Route
              path="/ratings"
              element={
                <ProtectedRoute>
                  <RatingsPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — REVIEWS
            ================================================= */}

            <Route
              path="/reviews"
              element={
                <ProtectedRoute>
                  <ReviewsPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — HISTORY
            ================================================= */}

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — LISTS
            ================================================= */}

            <Route
              path="/lists"
              element={
                <ProtectedRoute>
                  <ListsPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — PROFILE
            ================================================= */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — SETTINGS
            ================================================= */}

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROTECTED — NOTIFICATIONS
            ================================================= */}

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                REAL 404
            ================================================= */}

            <Route
              path="*"
              element={<NotFoundPage />}
            />

          </Routes>

        </Suspense>

        {!isNotificationsPage && <Footer />}

      </main>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  return <AppContent />;
}