import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaChevronRight, FaFilm, FaPlay, FaSearch, FaStar } from "react-icons/fa";
import MovieCard from "../components/Movie/MovieCard";
import {
  discoverByProvider,
  getCompanyDetails,
  getCompanyTitles,
  getImageUrl,
  getTrendingAll,
  getWatchProviders,
  searchMulti,
} from "../services/tmdbService";
import "./ExplorePage.css";

const regions = [
  { code: "IN", label: "India" },
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
];

const tabs = [
  { id: "all", label: "Everything" },
  { id: "movie", label: "Movies" },
  { id: "tv", label: "Series" },
];

const distributors = [
  { id: 2, name: "Walt Disney Pictures" },
  { id: 3, name: "Pixar" },
  { id: 4, name: "Paramount Pictures" },
  { id: 33, name: "Universal Pictures" },
  { id: 174, name: "Warner Bros. Pictures" },
  { id: 420, name: "Marvel Studios" },
  { id: 9993, name: "DC Entertainment" },
  { id: 10210, name: "Amazon MGM Studios" },
];

function getTitle(item) {
  return item?.title || item?.name || "Untitled";
}

function getYear(item) {
  return item?.release_date?.slice(0, 4) || item?.first_air_date?.slice(0, 4) || "";
}

function getDetailsPath(item) {
  if (item?.media_type === "tv") return `/tv/${item.id}`;
  if (item?.media_type === "person") return `/person/${item.id}`;
  return `/movie/${item.id}`;
}

function normalizeResults(data) {
  const list = Array.isArray(data) ? data : data?.results || [];
  const ids = new Set();
  return list.filter((item) => {
    if (!item?.id || ids.has(item.id)) return false;
    ids.add(item.id);
    return true;
  });
}

function Logo({ path, name, className = "" }) {
  if (path) {
    return <img className={className} src={getImageUrl(path, "w300")} alt={`${name} logo`} />;
  }
  return <span className={`platform-logo-fallback ${className}`}>{name?.charAt(0)?.toUpperCase() || "?"}</span>;
}

function FeaturedHero({ movies, activeIndex, onPrevious, onNext, onSelect }) {
  if (!movies.length) {
    return (
      <section className="explore-featured-empty">
        <FaFilm />
        <h2>No picks yet</h2>
      </section>
    );
  }

  const movie = movies[activeIndex % movies.length];
  const title = getTitle(movie);
  const imagePath = movie.backdrop_path || movie.poster_path;

  return (
    <section className="featured-cinema">
      <div
        className="featured-cinema-bg"
        style={{ backgroundImage: imagePath ? `url(${getImageUrl(imagePath, "original")})` : undefined }}
      />
      <div className="featured-cinema-overlay" />

      <div className="featured-cinema-content">
        <div className="featured-cinema-copy">
          <p className="featured-kicker">HANDPICKED</p>
          <h1>{title}</h1>

          <div className="featured-meta">
            {getYear(movie) && <span>{getYear(movie)}</span>}
            <span><FaStar /> {Number(movie.vote_average || 0).toFixed(1)}</span>
            <span>{movie.media_type === "tv" ? "Series" : "Film"}</span>
          </div>

          {movie.overview && <p className="featured-overview">{movie.overview}</p>}

          <div className="featured-actions">
            <Link className="featured-play" to={getDetailsPath(movie)}>
              <FaPlay /> Open title
            </Link>
            <button className="featured-details" type="button" onClick={() => onSelect()}>
              Search this
            </button>
          </div>
        </div>

        {movie.poster_path && (
          <Link className="featured-poster-wrap" to={getDetailsPath(movie)} aria-label={`Open ${title}`}>
            <img className="featured-poster" src={getImageUrl(movie.poster_path, "w500")} alt={title} />
          </Link>
        )}
      </div>

      {movies.length > 1 && (
        <div className="featured-navigation">
          <button type="button" onClick={onPrevious} aria-label="Previous title"><FaArrowLeft /></button>
          <div className="featured-dots">
            {movies.slice(0, 6).map((item, index) => (
              <button
                key={`${item.media_type}-${item.id}`}
                type="button"
                className={index === activeIndex % 6 ? "active" : ""}
                onClick={() => onSelect(index)}
                aria-label={`Show title ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={onNext} aria-label="Next title"><FaArrowRight /></button>
        </div>
      )}
    </section>
  );
}

function ExploreTitleCard({ item }) {
  const title = getTitle(item);
  const poster = item.poster_path ? getImageUrl(item.poster_path, "w500") : "/placeholder-poster.png";

  return (
    <Link className="explore-title-card" to={getDetailsPath(item)}>
      <div className="explore-title-poster">
        <img src={poster} alt={title} loading="lazy" />
        <span className="explore-card-rating">
          <FaStar /> {Number(item.vote_average || 0).toFixed(1)}
        </span>
      </div>
      <div className="explore-card-meta">
        <strong>{title}</strong>
        <span>{getYear(item) || "New"} · {item.media_type === "tv" ? "Series" : "Film"}</span>
      </div>
    </Link>
  );
}

export default function ExplorePage() {
  const [region, setRegion] = useState("IN");
  const [providers, setProviders] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [titles, setTitles] = useState([]);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeHero, setActiveHero] = useState(0);
  const [loading, setLoading] = useState(true);
  const [titlesLoading, setTitlesLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getWatchProviders(region)
      .then((data) => {
        if (active) setProviders(normalizeResults(data));
      })
      .catch(() => {
        if (!active) return;
        setProviders([]);
        setError("Streaming services are unavailable right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [region]);

  useEffect(() => {
    let active = true;

    getTrendingAll()
      .then((data) => {
        if (!active) return;
        setRecommendations(
          normalizeResults(data)
            .filter((item) => item.poster_path || item.backdrop_path)
            .slice(0, 12)
        );
      })
      .catch(() => {
        if (active) setRecommendations([]);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (recommendations.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % recommendations.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [recommendations.length]);

  useEffect(() => {
    let active = true;

    Promise.all(
      distributors.map(async (company) => {
        try {
          const details = await getCompanyDetails(company.id);
          return {
            ...company,
            name: details?.name || company.name,
            logo_path: details?.logo_path || "",
          };
        } catch {
          return company;
        }
      })
    ).then((result) => {
      if (active) setCompanies(result);
    });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    const value = query.trim();

    if (value.length < 2) {
      setSuggestions([]);
      return undefined;
    }

    let active = true;

    const timer = window.setTimeout(() => {
      searchMulti(value)
        .then((data) => {
          if (!active) return;
          setSuggestions(
            normalizeResults(data)
              .filter((item) => ["movie", "tv", "person"].includes(item.media_type))
              .slice(0, 6)
          );
        })
        .catch(() => {
          if (active) setSuggestions([]);
        });
    }, 300);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (!selected) return undefined;

    let active = true;
    setTitlesLoading(true);

    const loader = selected.kind === "provider" ? discoverByProvider : getCompanyTitles;

    const params =
      selected.kind === "provider"
        ? { providerId: selected.id, region, mediaType: tab }
        : { companyId: selected.id, mediaType: tab };

    loader(params)
      .then((data) => {
        if (active) setTitles(normalizeResults(data));
      })
      .catch(() => {
        if (active) setTitles([]);
      })
      .finally(() => {
        if (active) setTitlesLoading(false);
      });

    return () => { active = false; };
  }, [selected, region, tab]);

  const shownProviders = useMemo(
    () => providers.filter((item) => item.provider_name).slice(0, 8),
    [providers]
  );

  const selectedHero = recommendations[activeHero] || null;

  function openCollection(item, kind) {
    setSelected({
      ...item,
      id: kind === "provider" ? item.provider_id : item.id,
      name: kind === "provider" ? item.provider_name : item.name,
      kind,
    });
    setTab("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseSuggestion(item) {
    setQuery("");
    setSuggestions([]);
    window.location.assign(getDetailsPath(item));
  }

  if (selected) {
    return (
      <main className="platform-explore-page collection-page">
        <button
          type="button"
          className="platform-explore-back"
          onClick={() => {
            setSelected(null);
            setTitles([]);
          }}
        >
          <FaArrowLeft /> Back to Explore
        </button>

        <section className="collection-hero">
          <div className="collection-logo">
            <Logo path={selected.logo_path} name={selected.name} />
          </div>
          <div>
            <p>{selected.kind === "provider" ? "STREAMING" : "STUDIO"}</p>
            <h1>{selected.name}</h1>
            {selected.kind === "provider" && (
              <span>{regions.find((item) => item.code === region)?.label || region}</span>
            )}
          </div>
        </section>

        <div className="collection-toolbar">
          <div className="media-tabs">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                className={tab === item.id ? "is-active" : ""}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {selected.kind === "provider" && (
            <select value={region} onChange={(event) => setRegion(event.target.value)} aria-label="Choose country">
              {regions.map((item) => (
                <option key={item.code} value={item.code}>{item.label}</option>
              ))}
            </select>
          )}
        </div>

        {titlesLoading ? (
          <div className="platform-explore-status">Loading...</div>
        ) : titles.length ? (
          <div className="platform-title-grid">
            {titles.map((title) => (
              <MovieCard key={`${title.media_type || "movie"}-${title.id}`} movie={title} />
            ))}
          </div>
        ) : (
          <div className="platform-explore-status">Nothing here yet.</div>
        )}
      </main>
    );
  }

  return (
    <main className="platform-explore-page">
      <section className="explore-hero-new">
        <FeaturedHero
          movies={recommendations}
          activeIndex={activeHero}
          onPrevious={() =>
            setActiveHero((current) =>
              current === 0 ? recommendations.length - 1 : current - 1
            )
          }
          onNext={() =>
            setActiveHero((current) => (current + 1) % recommendations.length)
          }
          onSelect={(index) => {
            if (typeof index === "number") {
              setActiveHero(index);
              return;
            }
            if (selectedHero) setQuery(getTitle(selectedHero));
          }}
        />
      </section>

      <section className="explore-intro">
        <p>EXPLORE</p>
        <h2>Good things to watch.</h2>
      </section>

      <section className="global-search enhanced-search">
        <FaSearch />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movies, series, people..."
          aria-label="Search"
        />

        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}

        {query.length > 1 && (
          <div className="smart-suggestions">
            {suggestions.length ? (
              suggestions.map((item) => (
                <button
                  key={`${item.media_type}-${item.id}`}
                  type="button"
                  onClick={() => chooseSuggestion(item)}
                >
                  <span>
                    {item.media_type === "tv" ? "Series" : item.media_type === "person" ? "Person" : "Film"}
                  </span>
                  <strong>{getTitle(item)}</strong>
                  <FaChevronRight />
                </button>
              ))
            ) : (
              <p>No results.</p>
            )}
          </div>
        )}
      </section>

      <section className="platform-explore-section providers-section">
        <div className="platform-explore-heading">
          <div>
            <p>WHERE TO WATCH</p>
            <h2>Streaming services</h2>
          </div>

          <select value={region} onChange={(event) => setRegion(event.target.value)} aria-label="Choose country">
            {regions.map((item) => (
              <option key={item.code} value={item.code}>{item.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="platform-explore-status">Loading services...</div>
        ) : error ? (
          <div className="platform-explore-status">{error}</div>
        ) : (
          <div className="provider-hubs">
            {shownProviders.map((provider) => (
              <button
                key={provider.provider_id}
                type="button"
                className="provider-hub"
                onClick={() => openCollection(provider, "provider")}
              >
                <Logo
                  path={provider.logo_path}
                  name={provider.provider_name}
                  className="platform-brand-logo"
                />
                <span>{provider.provider_name}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="platform-explore-section picks-section">
        <div className="editorial-heading">
          <div>
            <p>STAFF PICKS</p>
            <h2>Worth a look</h2>
          </div>
          <span>Handpicked</span>
        </div>

        <div className="explore-title-grid editorial-grid">
          {recommendations.slice(0, 10).map((item) => (
            <ExploreTitleCard key={`${item.media_type}-${item.id}`} item={item} />
          ))}
        </div>
      </section>

      <section className="platform-explore-section studios-section">
        <div className="editorial-heading">
          <div>
            <p>FROM THE STUDIOS</p>
            <h2>Browse by studio</h2>
          </div>
        </div>

        <div className="distributor-rail">
          {companies.map((company) => (
            <button
              key={company.id}
              type="button"
              className="distributor-chip"
              onClick={() => openCollection(company, "company")}
            >
              <Logo path={company.logo_path} name={company.name} />
              <span>{company.name}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="explore-footer-note">
        <span>Take your time.</span>
      </footer>
    </main>
  );
}
