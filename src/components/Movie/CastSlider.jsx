import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TMDB_IMAGE = "https://image.tmdb.org/t/p";

const image = (path, size = "w500") => {
  if (!path) return "/placeholder.jpg";
  return `${TMDB_IMAGE}/${size}${path}`;
};

export default function CastSlider({ cast = [], title = "Cast", onPersonClick }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  if (!Array.isArray(cast) || cast.length === 0) {
    return null;
  }

  return (
    <section className="cast-section">

      {/* HEADER */}
      <div className="cast-section-header">

        <div>
          <span className="cast-eyebrow">CAST</span>
          <h2>{title}</h2>
          <p>Meet the people behind the story</p>
        </div>

        <div className="cast-controls">

          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous cast"
          >
            <FaChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next cast"
          >
            <FaChevronRight />
          </button>

        </div>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="cast-slider"
      >

        {cast.map((person) => {

          if (!person?.id) return null;

          const name =
            person.name || "Unknown";

          const character =
            person.character || "Unknown role";

          return (
            <button
              type="button"
              key={person.id}
              className="cast-card"
              onClick={() => {
                console.log(
                  "Opening person:",
                  person.id,
                  name
                );

                if (onPersonClick) {
                  onPersonClick(person);
                }
              }}
            >

              <div className="cast-image-wrapper">

                <img
                  src={image(
                    person.profile_path,
                    "w500"
                  )}
                  alt={name}
                  loading="lazy"
                />

                <div className="cast-overlay">
                  <span>View profile</span>
                </div>

              </div>

              <div className="cast-card-info">

                <h3>{name}</h3>

                <p>
                  {character}
                </p>

              </div>

            </button>
          );
        })}

      </div>
    </section>
  );
}