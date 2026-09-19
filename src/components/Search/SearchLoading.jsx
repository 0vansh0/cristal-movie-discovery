import { motion } from "framer-motion";

export default function SearchLoading({
  view = "grid",
  count,
}) {
  const skeletons = Array.from({
    length:
      count ||
      (view === "compact"
        ? 18
        : view === "list"
        ? 6
        : 12),
  });

  if (view === "list") {
    return (
      <div className="mt-10 space-y-6">
        {skeletons.map((_, i) => (
          <ListSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (view === "compact") {
    return (
      <div
        className="
          mt-10
          grid
          grid-cols-2
          gap-5
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          2xl:grid-cols-8
        "
      >
        {skeletons.map((_, i) => (
          <CompactSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="
        mt-10
        grid
        gap-8
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      "
    >
      {skeletons.map((_, i) => (
        <GridSkeleton key={i} />
      ))}
    </div>
  );
}

/* -------------------------------- */

function GridSkeleton() {
  return (
    <motion.div
      animate={{
        opacity: [.45, 1, .45],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
      }}
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >
      <div className="aspect-[2/3] bg-zinc-800" />

      <div className="space-y-4 p-5">

        <div className="h-6 w-3/4 rounded-full bg-zinc-800"/>

        <div className="h-4 w-1/2 rounded-full bg-zinc-800"/>

        <div className="space-y-2">

          <div className="h-3 rounded-full bg-zinc-800"/>

          <div className="h-3 rounded-full bg-zinc-800"/>

          <div className="h-3 w-2/3 rounded-full bg-zinc-800"/>

        </div>

      </div>

    </motion.div>
  );
}

/* -------------------------------- */

function ListSkeleton() {
  return (
    <motion.div
      animate={{
        opacity: [.45, 1, .45],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
      }}
      className="
        flex
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/5
      "
    >
      <div className="h-[320px] w-[220px] bg-zinc-800"/>

      <div className="flex-1 space-y-5 p-8">

        <div className="h-8 w-1/2 rounded-full bg-zinc-800"/>

        <div className="h-4 w-1/3 rounded-full bg-zinc-800"/>

        <div className="space-y-3 pt-4">

          <div className="h-4 rounded-full bg-zinc-800"/>

          <div className="h-4 rounded-full bg-zinc-800"/>

          <div className="h-4 rounded-full bg-zinc-800"/>

          <div className="h-4 w-2/3 rounded-full bg-zinc-800"/>

        </div>

        <div className="flex gap-3 pt-8">

          <div className="h-11 w-11 rounded-full bg-zinc-800"/>

          <div className="h-11 w-11 rounded-full bg-zinc-800"/>

          <div className="h-11 w-40 rounded-full bg-zinc-800"/>

        </div>

      </div>

    </motion.div>
  );
}

/* -------------------------------- */

function CompactSkeleton() {
  return (
    <motion.div
      animate={{
        opacity: [.45, 1, .45],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
      }}
      className="
        overflow-hidden
        rounded-[24px]
        border
        border-white/10
        bg-white/5
      "
    >
      <div className="aspect-[2/3] bg-zinc-800"/>

      <div className="space-y-3 p-4">

        <div className="h-4 rounded-full bg-zinc-800"/>

        <div className="h-3 w-1/2 rounded-full bg-zinc-800"/>

      </div>

    </motion.div>
  );
}