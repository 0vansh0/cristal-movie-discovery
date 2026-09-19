import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Top10Card from "./Top10Card";
import Top10Background from "./Top10Background";

export default function Top10Slider({
  title = "Top 10 Today",
  movies = [],
}) {
  const sliderRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    const interval = setInterval(() => {
      slider.scrollBy({
        left: 300,
        behavior: "smooth",
      });

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 20
      ) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-16">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.35em] text-[#FF5E5E]">
            CRISTAL PICKS
          </p>

          <h2 className="mt-2 text-4xl font-black text-white">
            {title}
          </h2>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => scroll("left")}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              transition
              hover:bg-white/10
            "
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              transition
              hover:bg-white/10
            "
          >
            <ChevronRight />
          </button>

        </div>

      </div>

      {/* Slider */}

      <motion.div
        ref={sliderRef}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        className="
          flex
          gap-10
          overflow-x-auto
          scroll-smooth
          pb-6
          scrollbar-hide
        "
      >
        {movies.map((movie, index) => (
          <Top10Card
            key={movie.id}
            movie={movie}
            index={index}
          />
        ))}
      </motion.div>
      <Top10Background />
      <section className="relative overflow-hidden py-16"></section>

    </section>
  );
}