import RatingBadge from "./RatingBadge";
import GenreBadge from "./GenreBadge";

import "./MovieInfo.css";

const formatMoney = (value) => {
  if (!value) return "N/A";
  return `$${value.toLocaleString()}`;
};

export default function MovieInfo({ movie }) {
  if (!movie) return null;

  return (
    <section className="movie-info-panel">

      <h1>{movie.title}</h1>

      {movie.tagline && (
        <p className="movie-tagline">
          "{movie.tagline}"
        </p>
      )}

      <div className="movie-meta">

        <RatingBadge
          rating={movie.vote_average}
          size="large"
        />

        <span>{movie.release_date}</span>

        <span>{movie.runtime} min</span>

        <span>{movie.original_language?.toUpperCase()}</span>

      </div>

      <div className="genre-list">

        {movie.genres?.map((genre) => (

          <GenreBadge

            key={genre.id}

            genre={genre}

          />

        ))}

      </div>

      <p className="movie-overview">

        {movie.overview}

      </p>

      <div className="movie-details-grid">

        <div>

          <strong>Status</strong>

          <span>{movie.status}</span>

        </div>

        <div>

          <strong>Budget</strong>

          <span>{formatMoney(movie.budget)}</span>

        </div>

        <div>

          <strong>Revenue</strong>

          <span>{formatMoney(movie.revenue)}</span>

        </div>

        <div>

          <strong>Popularity</strong>

          <span>{movie.popularity?.toFixed(0)}</span>

        </div>

      </div>

      {movie.homepage && (

        <a

          href={movie.homepage}

          target="_blank"

          rel="noreferrer"

          className="official-site"

        >

          Visit Official Website

        </a>

      )}

    </section>

  );

}