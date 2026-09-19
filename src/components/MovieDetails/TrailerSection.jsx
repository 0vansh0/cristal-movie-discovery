import TrailerPlayer from "./TrailerPlayer";

export default function TrailerSection({ trailer }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Official Trailer
          </p>
          <h2 className="text-3xl font-bold text-white">
            Trailer Preview
          </h2>
        </div>
      </div>

      <TrailerPlayer trailer={trailer} />
    </section>
  );
}
