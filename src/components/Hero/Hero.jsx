import { useEffect, useState } from "react";

import HeroBackground from "./HeroBackground";
import HeroGradient from "./HeroGradient";
import HeroContent from "./HeroContent";
import HeroIndicators from "./HeroIndicators";
import HeroParticles from "./HeroParticles";

const FALLBACK = [
  {
    id: 1,
    title: "Spider-Man: Brand New Day",
    overview:
      "Peter Parker faces a new chapter as Spider-Man while balancing responsibility and sacrifice.",
    vote_average: 8.5,
    popularity: 950,
    release_date: "2026-07-31",
    backdrop_path: "/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg",
  },
  {
    id: 2,
    title: "The Batman Part II",
    overview:
      "Batman returns to Gotham where a mysterious new villain challenges everything he believes.",
    vote_average: 8.7,
    popularity: 1000,
    release_date: "2027-10-01",
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
  },
];

export default function Hero({ movies = FALLBACK }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[index];

  return (
    <section className="relative h-screen overflow-hidden bg-[#09090B]">
    <HeroBackground movie={movie} />

    <HeroGradient />

    <HeroParticles />

    <HeroContent movie={movie} />

    <HeroIndicators
        total={movies.length}
        active={index}
        setActive={setIndex}
    />

      {/* Slide Indicators */}

      <div className="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 gap-3">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 ${
              index === i
                ? "h-2 w-10 rounded-full bg-[#FF5E5E]"
                : "h-2 w-2 rounded-full bg-white/30"
            }`}
          />
        ))}
      </div>

    </section>
  );
}