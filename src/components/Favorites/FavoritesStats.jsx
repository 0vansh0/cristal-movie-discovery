import CircularProgress from "./CircularProgress";
import StatsGrid from "./StatsGrid";

export default function FavoritesStats() {
  return (
    <section className="mt-20">
      <div className="mb-10">
        <h2 className="text-4xl font-black">
          Collection Analytics
        </h2>

        <p className="mt-3 text-zinc-400">
          Discover insights about your favorite movies.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
        <CircularProgress />
        <StatsGrid />
      </div>
    </section>
  );
}