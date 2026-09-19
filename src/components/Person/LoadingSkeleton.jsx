import { motion } from "framer-motion";

function Skeleton({ className = "" }) {
  return (
    <motion.div
      animate={{
        opacity: [0.35, 0.7, 0.35],
      }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        ease: "easeInOut",
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
    <div className="space-y-14">

      {/* Hero */}

      <section className="relative overflow-hidden rounded-[40px]">

        <Skeleton className="h-[520px] w-full rounded-[40px]" />

        <div className="absolute bottom-10 left-10 flex items-end gap-8">

          <Skeleton className="h-56 w-40 rounded-[32px]" />

          <div className="space-y-5">

            <Skeleton className="h-12 w-96" />

            <Skeleton className="h-6 w-48" />

            <div className="flex gap-3">

              <Skeleton className="h-10 w-28 rounded-full" />

              <Skeleton className="h-10 w-28 rounded-full" />

              <Skeleton className="h-10 w-28 rounded-full" />

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {[...Array(8)].map((_, i) => (

          <div
            key={i}
            className="
              rounded-[28px]
              border
              border-white/10
              bg-white/5
              p-6
            "
          >

            <Skeleton className="h-16 w-16 rounded-2xl" />

            <Skeleton className="mt-6 h-5 w-28" />

            <Skeleton className="mt-4 h-10 w-36" />

          </div>

        ))}

      </section>

      {/* Biography */}

      <section
        className="
          rounded-[32px]
          border
          border-white/10
          bg-white/5
          p-8
        "
      >

        <Skeleton className="h-10 w-72" />

        <div className="mt-8 space-y-4">

          {[...Array(8)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-5 w-full"
            />
          ))}

        </div>

      </section>

      {/* Filmography */}

      <section className="space-y-5">

        <Skeleton className="h-10 w-72" />

        {[...Array(6)].map((_, i) => (

          <div
            key={i}
            className="
              flex
              gap-5
              rounded-[28px]
              border
              border-white/10
              bg-white/5
              p-5
            "
          >

            <Skeleton className="h-36 w-24 rounded-xl" />

            <div className="flex-1 space-y-4">

              <Skeleton className="h-8 w-64" />

              <Skeleton className="h-5 w-48" />

              <Skeleton className="h-5 w-full" />

              <Skeleton className="h-5 w-11/12" />

            </div>

          </div>

        ))}

      </section>

      {/* Gallery */}

      <section>

        <Skeleton className="mb-8 h-10 w-56" />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

          {[...Array(8)].map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-[2/3]"
            />
          ))}

        </div>

      </section>

    </div>
  );
}