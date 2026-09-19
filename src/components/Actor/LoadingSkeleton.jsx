import { motion } from "framer-motion";

const shimmer = {
  initial: {
    backgroundPosition: "-600px 0",
  },
  animate: {
    backgroundPosition: "600px 0",
    transition: {
      repeat: Infinity,
      duration: 1.4,
      ease: "linear",
    },
  },
};

function Skeleton({ className = "" }) {
  return (
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className={`
        overflow-hidden
        rounded-2xl
        bg-[length:600px_100%]
        bg-gradient-to-r
        from-white/[0.05]
        via-white/[0.12]
        to-white/[0.05]
        ${className}
      `}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">

      {/* Hero */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[42px]
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur-3xl
        "
      >
        <Skeleton className="h-[420px] w-full rounded-[34px]" />

        <div className="-mt-24 flex flex-col gap-8 lg:flex-row">

          <Skeleton className="h-56 w-56 rounded-full border-4 border-white/10" />

          <div className="flex-1 space-y-5 pt-20">

            <Skeleton className="h-12 w-72" />

            <Skeleton className="h-6 w-48" />

            <Skeleton className="h-4 w-full" />

            <Skeleton className="h-4 w-11/12" />

            <Skeleton className="h-4 w-3/4" />

            <div className="flex gap-4 pt-4">

              <Skeleton className="h-12 w-36 rounded-full" />

              <Skeleton className="h-12 w-36 rounded-full" />

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {Array.from({ length: 4 }).map((_, i) => (

          <div
            key={i}
            className="
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              p-7
              backdrop-blur-2xl
            "
          >
            <Skeleton className="h-16 w-16 rounded-2xl" />

            <Skeleton className="mt-6 h-5 w-28" />

            <Skeleton className="mt-4 h-10 w-24" />

          </div>

        ))}

      </section>

      {/* Biography */}

      <section
        className="
          rounded-[34px]
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-3xl
        "
      >

        <Skeleton className="mb-8 h-10 w-56" />

        <Skeleton className="mb-4 h-4 w-full" />

        <Skeleton className="mb-4 h-4 w-full" />

        <Skeleton className="mb-4 h-4 w-11/12" />

        <Skeleton className="mb-4 h-4 w-4/5" />

        <Skeleton className="h-4 w-3/4" />

      </section>

      {/* Credits */}

      <section>

        <Skeleton className="mb-8 h-10 w-56" />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          {Array.from({ length: 10 }).map((_, i) => (

            <div
              key={i}
              className="
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                p-4
                backdrop-blur-xl
              "
            >

              <Skeleton className="aspect-[2/3] w-full rounded-2xl" />

              <Skeleton className="mt-5 h-6 w-4/5" />

              <Skeleton className="mt-3 h-4 w-1/2" />

              <Skeleton className="mt-6 h-4 w-full" />

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}