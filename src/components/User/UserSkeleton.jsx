import { motion } from "framer-motion";

function Skeleton({ className = "" }) {
  return (
    <motion.div
      animate={{
        opacity: [0.35, 0.75, 0.35],
      }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        rounded-3xl
        bg-gradient-to-r
        from-zinc-800
        via-zinc-700
        to-zinc-800
        ${className}
      `}
    />
  );
}

export default function UserSkeleton() {
  return (
    <div className="space-y-14">

      {/* Hero */}

      <section className="relative overflow-hidden rounded-[40px]">

        <Skeleton className="h-[420px] w-full rounded-[40px]" />

        <div className="absolute bottom-10 left-10 flex items-end gap-8">

          <Skeleton className="h-44 w-44 rounded-full" />

          <div className="space-y-5">

            <Skeleton className="h-12 w-72" />

            <Skeleton className="h-6 w-96" />

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
          lg:grid-cols-3
          xl:grid-cols-5
        "
      >

        {[...Array(10)].map((_, i) => (

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

            <Skeleton className="mt-6 h-5 w-32" />

            <Skeleton className="mt-4 h-10 w-28" />

          </div>

        ))}

      </section>

      {/* Continue Watching */}

      <section>

        <Skeleton className="mb-8 h-10 w-72" />

        <div className="flex gap-8 overflow-hidden">

          {[...Array(3)].map((_, i) => (

            <Skeleton
              key={i}
              className="h-72 min-w-[420px]"
            />

          ))}

        </div>

      </section>

      {/* Activity */}

      <section>

        <Skeleton className="mb-8 h-10 w-60" />

        <div className="space-y-6">

          {[...Array(5)].map((_, i) => (

            <div
              key={i}
              className="
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-6
              "
            >

              <Skeleton className="h-8 w-60" />

              <Skeleton className="mt-5 h-5 w-full" />
              <Skeleton className="mt-3 h-5 w-[90%]" />
              <Skeleton className="mt-3 h-5 w-[70%]" />

            </div>

          ))}

        </div>

      </section>

      {/* Cards */}

      <section>

        <Skeleton className="mb-8 h-10 w-56" />

        <div
          className="
            grid
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >

          {[...Array(8)].map((_, i) => (

            <div
              key={i}
              className="
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-5
              "
            >

              <Skeleton className="aspect-[2/3]" />

              <Skeleton className="mt-5 h-8 w-48" />

              <Skeleton className="mt-4 h-5 w-28" />

              <Skeleton className="mt-4 h-5 w-full" />

            </div>

          ))}

        </div>

      </section>

      {/* Achievement */}

      <section>

        <Skeleton className="mb-8 h-10 w-72" />

        <div
          className="
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {[...Array(6)].map((_, i) => (

            <div
              key={i}
              className="
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-8
              "
            >

              <Skeleton className="h-20 w-20 rounded-full" />

              <Skeleton className="mt-6 h-8 w-56" />

              <Skeleton className="mt-5 h-5 w-full" />
              <Skeleton className="mt-3 h-5 w-[85%]" />

              <Skeleton className="mt-8 h-3 w-full rounded-full" />

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}