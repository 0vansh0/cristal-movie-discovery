import { motion } from "framer-motion";

function Skeleton({
  className = "",
}) {
  return (
    <motion.div
      animate={{
        opacity: [0.35, 0.7, 0.35],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
      }}
      className={`
        rounded-2xl
        bg-gradient-to-r
        from-zinc-800
        via-zinc-700
        to-zinc-800
        ${className}
      `}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-10">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden rounded-[40px]">

        <Skeleton className="h-[650px] w-full rounded-[40px]" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070B11] via-transparent to-transparent" />

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            grid
            gap-10
            p-10
            lg:grid-cols-[320px_1fr]
          "
        >

          {/* Poster */}

          <Skeleton className="aspect-[2/3] w-full rounded-[36px]" />

          {/* Info */}

          <div className="space-y-5">

            <Skeleton className="h-12 w-80" />

            <Skeleton className="h-6 w-60" />

            <Skeleton className="h-5 w-full" />

            <Skeleton className="h-5 w-5/6" />

            <Skeleton className="h-5 w-2/3" />

            <div className="flex gap-3 pt-4">

              <Skeleton className="h-12 w-36 rounded-full" />

              <Skeleton className="h-12 w-36 rounded-full" />

              <Skeleton className="h-12 w-36 rounded-full" />

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <div className="grid gap-6 md:grid-cols-3">

        {[...Array(3)].map((_, i) => (

          <Skeleton
            key={i}
            className="h-40 w-full rounded-[32px]"
          />

        ))}

      </div>

      {/* ================= CAST ================= */}

      <section>

        <Skeleton className="mb-8 h-10 w-52" />

        <div className="flex gap-6 overflow-hidden">

          {[...Array(6)].map((_, i) => (

            <Skeleton
              key={i}
              className="
                aspect-[3/4]
                w-52
                shrink-0
                rounded-[30px]
              "
            />

          ))}

        </div>

      </section>

      {/* ================= TRAILER ================= */}

      <section>

        <Skeleton className="mb-6 h-10 w-48" />

        <Skeleton
          className="
            aspect-video
            w-full
            rounded-[32px]
          "
        />

      </section>

      {/* ================= SCREENSHOTS ================= */}

      <section>

        <Skeleton className="mb-6 h-10 w-56" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {[...Array(6)].map((_, i) => (

            <Skeleton
              key={i}
              className="
                aspect-video
                rounded-[28px]
              "
            />

          ))}

        </div>

      </section>

      {/* ================= REVIEWS ================= */}

      <section>

        <Skeleton className="mb-6 h-10 w-44" />

        {[...Array(3)].map((_, i) => (

          <Skeleton
            key={i}
            className="
              mb-5
              h-52
              rounded-[30px]
            "
          />

        ))}

      </section>

      {/* ================= SIMILAR MOVIES ================= */}

      <section>

        <Skeleton className="mb-6 h-10 w-72" />

        <div className="flex gap-6 overflow-hidden">

          {[...Array(5)].map((_, i) => (

            <Skeleton
              key={i}
              className="
                aspect-[2/3]
                w-56
                shrink-0
                rounded-[30px]
              "
            />

          ))}

        </div>

      </section>

    </div>
  );
}