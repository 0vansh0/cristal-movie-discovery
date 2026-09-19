import React, { Suspense, useMemo } from "react";
import { Heart, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import usePerson from "../hooks/usePerson";
import { useFavorites } from "../hooks/useFavorites";
import LoadingSkeleton from "../components/Person/LoadingSkeleton";
import PersonHero from "../components/Person/PersonHero";
import PersonalInfo from "../components/Person/PersonalInfo";
import CareerStats from "../components/Person/CareerStats";
import Filmography from "../components/Person/Filmography";
import DirectedMovies from "../components/Person/DirectedMovies";
import ProducedMovies from "../components/Person/ProducedMovies";
import WrittenMovies from "../components/Person/WrittenMovies";
import Cinematography from "../components/Person/Cinematography";
import Awards from "../components/Person/Awards";
import SocialLinks from "../components/Person/SocialLinks";
import FloatingActions from "../components/Person/FloatingActions";
import "./PersonPage.css";

const Gallery = React.lazy(() => import("../components/Person/Gallery"));
const CrewTimeline = React.lazy(() => import("../components/Person/CrewTimeline"));
const CollaboratorsGraph = React.lazy(() => import("../components/Person/CollaboratorsGraph"));
const CareerTrajectory = React.lazy(() => import("../components/Person/CareerTrajectory"));
const FranchiseHubs = React.lazy(() => import("../components/Person/FranchiseHubs"));
const MediaVault = React.lazy(() => import("../components/Person/MediaVault"));
const FanConsensus = React.lazy(() => import("../components/Person/FanConsensus"));
const PerformanceRatings = React.lazy(() => import("../components/Person/PerformanceRatings"));

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function getMediaType(item) {
  if (!item) return "movie";
  if (item.media_type === "tv" || item.first_air_date || item.name) return "tv";
  return "movie";
}

function normalizeCredit(item) {
  if (!item?.id) return null;
  return { ...item, media_type: getMediaType(item) };
}

function StatusState({ title, message, actionLabel, onAction, icon }) {
  return <div className="person-status-page"><div className="person-status-card">{icon}<h1>{title}</h1><p>{message}</p>{onAction && <button type="button" onClick={onAction}>{actionLabel}</button>}</div></div>;
}

export default function PersonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { person, loading, error } = usePerson(id);
  const favorites = useFavorites();
  const details = person?.details || null;

  const movies = useMemo(() => safeArray(person?.movies), [person?.movies]);
  const tvShows = useMemo(() => safeArray(person?.tvShows), [person?.tvShows]);
  const cast = useMemo(() => safeArray(person?.cast), [person?.cast]);
  const crew = useMemo(() => safeArray(person?.crew), [person?.crew]);
  const directed = useMemo(() => safeArray(person?.directed), [person?.directed]);
  const produced = useMemo(() => safeArray(person?.produced), [person?.produced]);
  const written = useMemo(() => safeArray(person?.written), [person?.written]);
  const cinematography = useMemo(() => safeArray(person?.cinematography), [person?.cinematography]);
  const awards = useMemo(() => safeArray(person?.awards), [person?.awards]);
  const images = useMemo(() => safeArray(person?.images), [person?.images]);

  const allCredits = useMemo(() => {
    const source = person?.allCredits?.length ? person.allCredits : [...movies, ...tvShows];
    const unique = new Map();
    source.map(normalizeCredit).filter(Boolean).forEach((item) => unique.set(`${item.media_type}-${item.id}`, item));
    return [...unique.values()];
  }, [person?.allCredits, movies, tvShows]);

  const filmography = useMemo(() => {
    const unique = new Map();
    [...movies, ...tvShows].map(normalizeCredit).filter(Boolean).forEach((item) => unique.set(`${item.media_type}-${item.id}`, item));
    return [...unique.values()];
  }, [movies, tvShows]);

  const collaborators = useMemo(() => safeArray(person?.collaborators || person?.coStars || person?.coStarsAndDirectors), [person?.collaborators, person?.coStars, person?.coStarsAndDirectors]);
  const trajectory = useMemo(() => safeArray(person?.careerTrajectory || person?.trajectory), [person?.careerTrajectory, person?.trajectory]);
  const franchises = useMemo(() => safeArray(person?.franchises || person?.franchiseHubs), [person?.franchises, person?.franchiseHubs]);
  const mediaVault = useMemo(() => safeArray(person?.mediaVault || person?.media), [person?.mediaVault, person?.media]);
  const consensus = useMemo(() => safeArray(person?.fanConsensus || person?.reviews), [person?.fanConsensus, person?.reviews]);
  const performanceRatings = useMemo(() => safeArray(person?.performanceRatings || person?.performanceRatingsData), [person?.performanceRatings, person?.performanceRatingsData]);

  const goMedia = (mediaId, type) => {
    if (mediaId) navigate(`/${type === "tv" ? "tv" : "movie"}/${mediaId}`);
  };

  function personRecord() {
    return { id: details.id, name: details.name, profile_path: details.profile_path, media_type: "person" };
  }

  function handleFavorite() {
    if (!details?.id) return;
    if (favorites?.has && favorites?.add && favorites?.remove) {
      favorites.has(details.id) ? favorites.remove(details.id) : favorites.add(personRecord());
      return;
    }
    const key = "cristal-person-favorites";
    const current = safeArray(JSON.parse(localStorage.getItem(key) || "[]"));
    const exists = current.some((item) => Number(item.id) === Number(details.id));
    localStorage.setItem(key, JSON.stringify(exists ? current.filter((item) => Number(item.id) !== Number(details.id)) : [...current, personRecord()]));
    window.dispatchEvent(new Event("cristal:favorites"));
  }

  function handleWatchlist() {
    if (!details?.id) return;
    const key = "watchlist";
    const current = safeArray(JSON.parse(localStorage.getItem(key) || "[]"));
    const exists = current.some((item) => Number(item.id) === Number(details.id) && item.media_type === "person");
    const next = exists ? current.filter((item) => !(Number(item.id) === Number(details.id) && item.media_type === "person")) : [...current, personRecord()];
    localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new Event("cristal:watchlist"));
  }

  function handleGallery() {
    document.getElementById("person-gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) return await navigator.share({ title: details?.name || "CRISTAL profile", text: `Explore ${details?.name || "this profile"} on CRISTAL.`, url });
      if (navigator.clipboard && window.isSecureContext) return await navigator.clipboard.writeText(url);
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    } catch (shareError) {
      if (shareError?.name !== "AbortError") console.warn("Share failed", shareError);
    }
  }

  if (loading) return <div className="person-page-shell"><LoadingSkeleton /></div>;
  if (error) return <StatusState icon={<RefreshCw size={27} />} title="Could not load this profile" message="Something went wrong while fetching the details. Please try again." actionLabel="Go back" onAction={() => navigate(-1)} />;
  if (!details) return <StatusState icon={<ArrowLeft size={27} />} title="Person not found" message="There is no profile available for this link." actionLabel="Go back" onAction={() => navigate(-1)} />;

  const featureFallback = <div className="person-feature-fallback">Loading section…</div>;

  return <main className="person-page"><PersonHero person={details} images={images} /><div className="person-content"><PersonalInfo person={details} /><CareerStats person={details} credits={allCredits} cast={cast} crew={crew} />{performanceRatings.length > 0 && <Suspense fallback={featureFallback}><PerformanceRatings person={details} ratings={performanceRatings} credits={cast} onSelect={goMedia} /></Suspense>}{filmography.length > 0 && <Filmography credits={filmography} onSelect={goMedia} sortOptions={[{ id: "highest-rated", label: "Highest rated" }, { id: "box-office", label: "Box office" }, { id: "chronological", label: "Chronological" }]} roleFilters={[{ id: "lead", label: "Lead" }, { id: "supporting", label: "Supporting" }, { id: "voice", label: "Voice" }, { id: "cameo", label: "Cameo" }]} mediaFilters={[{ id: "all", label: "All" }, { id: "movie", label: "Movies" }, { id: "tv", label: "TV" }]} />}{trajectory.length > 0 && <Suspense fallback={featureFallback}><CareerTrajectory person={details} data={trajectory} credits={filmography} /></Suspense>}{collaborators.length > 0 && <Suspense fallback={featureFallback}><CollaboratorsGraph person={details} collaborators={collaborators} credits={allCredits} onSelect={goMedia} /></Suspense>}{franchises.length > 0 && <Suspense fallback={featureFallback}><FranchiseHubs person={details} franchises={franchises} credits={allCredits} onSelect={goMedia} /></Suspense>}{directed.length > 0 && <DirectedMovies credits={directed} onMovieClick={goMedia} />}{produced.length > 0 && <ProducedMovies credits={produced} onMovieClick={goMedia} />}{written.length > 0 && <WrittenMovies credits={written} onMovieClick={goMedia} />}{cinematography.length > 0 && <Cinematography credits={cinematography} onMovieClick={goMedia} />}{crew.length > 0 && <Suspense fallback={featureFallback}><CrewTimeline credits={crew} onSelect={goMedia} /></Suspense>}{awards.length > 0 && <Awards awards={awards} person={details} />}{mediaVault.length > 0 && <Suspense fallback={featureFallback}><MediaVault person={details} media={mediaVault} /></Suspense>}{consensus.length > 0 && <Suspense fallback={featureFallback}><FanConsensus person={details} reviews={consensus} credits={allCredits} onSelect={goMedia} /></Suspense>}{images.length > 0 && <div id="person-gallery"><Suspense fallback={featureFallback}><Gallery images={images} /></Suspense></div>}<SocialLinks person={details} externalIds={person?.externalIds} /><footer className="person-footer"><Heart size={13} fill="currentColor" /> Made with care for cinema.</footer></div><FloatingActions onFavorite={handleFavorite} onWatchlist={handleWatchlist} onGallery={handleGallery} onShare={handleShare} onRandom={() => navigate(`/person/${Math.floor(Math.random() * 100000) + 1}`)} /></main>;
}