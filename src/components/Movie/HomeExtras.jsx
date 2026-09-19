import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaPlay, FaStar, FaUserPlus } from "react-icons/fa";
import {
  getNowPlayingMovies,
  getPopularPeople,
  getTrendingMovies,
  getUpcomingMovies,
} from "../../services/tmdbService";
import "./HomeExtras.css";

const posterUrl = (path, size = "w500") => path ? `https://image.tmdb.org/t/p/${size}${path}` : "/images/poster-placeholder.webp";
const moods = ["Drama", "Adventure", "Thriller", "Animation"];

function SectionHeading({ eyebrow, title, action }) {
  return <div className="extras-heading"><div><p>{eyebrow}</p><h2>{title} <span>›</span></h2></div>{action}</div>;
}

function CompactMovieCard({ movie, style }) {
  const title = movie.title || movie.name || "Untitled";
  return <Link to={`/movie/${movie.id}`} className="compact-movie" style={style}>
    <img src={posterUrl(movie.poster_path)} alt={title} />
    <div><p><FaStar /> {Number(movie.vote_average || 0).toFixed(1)}</p><strong>{title}</strong></div>
  </Link>;
}

export default function HomeExtras() {
  const [trending, setTrending] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExtras() {
      try {
        const [trendingResult, theatersResult, upcomingResult, peopleResult] = await Promise.allSettled([
          getTrendingMovies(), getNowPlayingMovies(), getUpcomingMovies(), getPopularPeople(),
        ]);
        const data = (result) => result.status === "fulfilled" && Array.isArray(result.value) ? result.value : [];
        const trendingData = data(trendingResult);
        const theatersData = data(theatersResult);
        const upcomingData = data(upcomingResult);
        const peopleData = data(peopleResult);

        const seenIds = new Set();
        const unique = (items) =>
          Array.isArray(items)
            ? items.filter((item) => item && item.id && !seenIds.has(item.id) && seenIds.add(item.id))
            : [];

        setTrending(unique(trendingData).slice(0, 8));
        setTheaters(unique(theatersData).slice(0, 8));
        setUpcoming(unique(upcomingData).slice(0, 4));
        setPeople(Array.isArray(peopleData) ? peopleData.slice(0, 6) : []);
      } catch (error) {
        console.error("Homepage sections loading error:", error);
      } finally { setLoading(false); }
    }
    loadExtras();
  }, []);

  const moodTiles = useMemo(() => moods.map((mood, index) => ({ mood, movie: trending[index] })), [trending]);
  if (loading) return <div className="extras-loading"><span /> Curating more for you...</div>;

  return <div className="home-extras">
    {trending.length > 0 && <section className="extras-section">
      <SectionHeading eyebrow="POPULAR WITH VIEWERS" title="Fan favourites" />
      <div className="compact-movie-row">{trending.map((movie, index) => <CompactMovieCard key={movie.id} movie={movie} style={{ "--delay": `${index * 65}ms` }} />)}</div>
    </section>}

    {moodTiles.some((tile) => tile.movie) && <section className="extras-section mood-section">
      <SectionHeading eyebrow="EXPLORE YOUR MOOD" title="Popular interests" />
      <div className="mood-grid">{moodTiles.map(({ mood, movie }, index) => movie && <Link className="mood-tile" key={mood} to={`/movie/${movie.id}`} style={{ "--delay": `${index * 85}ms` }}><img src={posterUrl(movie.backdrop_path || movie.poster_path, "w780")} alt="" /><span>{mood}</span><b>+</b></Link>)}</div>
    </section>}

    {theaters.length > 0 && <section className="extras-section">
      <SectionHeading eyebrow="PLAYING NEAR YOU" title="In theaters" action={<span className="heading-note"><FaCalendarAlt /> Current releases</span>} />
      <div className="compact-movie-row">{theaters.map((movie, index) => <CompactMovieCard key={movie.id} movie={movie} style={{ "--delay": `${index * 65}ms` }} />)}</div>
    </section>}

    {upcoming.length > 0 && <section className="extras-section">
      <SectionHeading eyebrow="FIRST LOOK" title="Upcoming movies" />
      <div className="trailer-grid">{upcoming.map((movie, index) => { const title = movie.title || "Untitled"; return <Link key={movie.id} to={`/movie/${movie.id}`} className="trailer-card" style={{ "--delay": `${index * 90}ms` }}><img src={posterUrl(movie.backdrop_path || movie.poster_path, "w780")} alt={title} /><span className="trailer-play"><FaPlay /></span><div><small>{(movie.release_date || "Coming soon").slice(0, 10)}</small><strong>{title}</strong></div></Link>; })}</div>
    </section>}

    {people.length > 0 && <section className="extras-section">
      <SectionHeading eyebrow="ON SCREEN" title="People to follow" />
      <div className="people-row">{people.map((person, index) => <article className="person-card" key={person.id} style={{ "--delay": `${index * 75}ms` }}><img src={posterUrl(person.profile_path)} alt={person.name} /><strong>{person.name}</strong><small>{person.known_for_department || "Artist"}</small><button type="button" aria-label={`Follow ${person.name}`}><FaUserPlus /></button></article>)}</div>
    </section>}

    <section className="extras-section editorial-section">
      <SectionHeading eyebrow="FROM CRISTAL" title="Film notes" />
      <div className="editorial-grid"><article><span>01</span><h3>Save what moves you.</h3><p>Your watchlist, favourites, and viewing history stay neatly connected in one place.</p></article><article><span>02</span><h3>Find a new obsession.</h3><p>Browse selected releases, popular stories, and upcoming cinema without the noise.</p></article><article><span>03</span><h3>Make it personal.</h3><p>Choose a country and let your homepage surface releases that fit your region.</p></article></div>
    </section>

    <section className="extras-section news-section">
      <SectionHeading eyebrow="THE LATEST" title="Top news" />
      <div className="news-grid">
        <article><span>01</span><div><small>CRISTAL UPDATE</small><h3>Build your watchlist around the movies everyone is talking about.</h3><p>Discover trending releases, fresh cinema, and hand-picked favourites from your home page.</p></div></article>
        <article><span>02</span><div><small>IN THEATERS</small><h3>See what is playing now, then save it for later.</h3><p>Use the theater section to browse current releases and jump straight to the full movie details.</p></div></article>
        <article><span>03</span><div><small>COMING SOON</small><h3>Keep upcoming releases on your radar.</h3><p>New titles are automatically pulled from TMDB and refreshed whenever you return to the page.</p></div></article>
      </div>
    </section>
  </div>;
}
