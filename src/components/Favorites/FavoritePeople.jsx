import { motion } from "framer-motion";
import { Star, Film } from "lucide-react";

const directors = [
  {
    name: "Christopher Nolan",
    movies: 12,
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Denis Villeneuve",
    movies: 8,
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Steven Spielberg",
    movies: 7,
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "David Fincher",
    movies: 6,
    image: "https://i.pravatar.cc/150?img=14",
  },
];

const actors = [
  {
    name: "Leonardo DiCaprio",
    movies: 14,
    image: "https://i.pravatar.cc/150?img=21",
  },
  {
    name: "Ryan Gosling",
    movies: 10,
    image: "https://i.pravatar.cc/150?img=22",
  },
  {
    name: "Tom Hanks",
    movies: 9,
    image: "https://i.pravatar.cc/150?img=23",
  },
  {
    name: "Christian Bale",
    movies: 8,
    image: "https://i.pravatar.cc/150?img=24",
  },
];

export default function FavoritePeople() {
  return (
    <section className="mt-16">

      <div className="mb-8">
        <h2 className="text-3xl font-black">
          Favorite People
        </h2>

        <p className="mt-2 text-zinc-400">
          Directors and actors that dominate your collection.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <PeopleSection
          title="Favorite Directors"
          icon={<Film size={18} />}
          data={directors}
        />

        <PeopleSection
          title="Favorite Actors"
          icon={<Star size={18} />}
          data={actors}
        />

      </div>

    </section>
  );
}

function PeopleSection({
  title,
  icon,
  data,
}) {
  return (
    <div
      className="
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-white/10 p-3">
          {icon}
        </div>

        <h3 className="text-2xl font-bold">
          {title}
        </h3>

      </div>

      <div className="space-y-5">

        {data.map((person, index) => (

          <motion.div
            key={person.name}
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              scale: 1.02,
              x: 6,
            }}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              bg-white/5
              p-4
            "
          >

            <div className="flex items-center gap-4">

              <img
                src={person.image}
                alt={person.name}
                className="
                  h-16
                  w-16
                  rounded-full
                  border-2
                  border-white/10
                  object-cover
                "
              />

              <div>

                <h4 className="font-semibold">
                  {person.name}
                </h4>

                <p className="text-sm text-zinc-400">
                  {person.movies} favorite movies
                </p>

              </div>

            </div>

            <div className="rounded-full bg-gradient-to-r from-[#FF5E5E] to-[#FFD464] px-4 py-2 text-sm font-bold text-black">
              #{index + 1}
            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}