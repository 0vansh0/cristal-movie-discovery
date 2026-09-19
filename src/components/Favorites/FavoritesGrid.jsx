import { AnimatePresence, motion } from "framer-motion";
import FavoriteCard from "./FavoriteCard";

export default function FavoritesGrid({
  movies = [],
  view = "grid",
}) {
  if (!movies.length) {
    return null;
  }

  const layout =
    view === "list"
      ? "flex flex-col gap-6"
      : view === "masonry"
      ? "columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6"
      : "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4";

  return (
    <AnimatePresence mode="popLayout">

      <motion.div
        layout
        className={layout}
      >
        {movies.map((movie) => (

          <motion.div
            key={movie.id}
            layout
            initial={{
              opacity: 0,
              scale: .95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .9,
            }}
            transition={{
              duration: .35,
            }}
            className={
              view === "masonry"
                ? "mb-6 break-inside-avoid"
                : ""
            }
          >
            <FavoriteCard
              movie={movie}
              view={view}
            />
          </motion.div>

        ))}
      </motion.div>

    </AnimatePresence>
  );
}