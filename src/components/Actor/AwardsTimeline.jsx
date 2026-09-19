import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Star,
  Calendar,
  Medal,
} from "lucide-react";

export default function AwardsTimeline({
  awards = [],
}) {
  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="flex items-center gap-3 text-4xl font-black">

          <Award className="text-[#FFD464]" />

          Awards & Recognition

        </h2>

        <p className="mt-2 text-zinc-400">
          Career achievements and nominations
        </p>

      </div>

      {/* Empty State */}

      {awards.length === 0 && (

        <div
          className="
            rounded-[32px]
            border
            border-dashed
            border-white/10
            bg-white/5
            p-14
            text-center
            backdrop-blur-2xl
          "
        >

          <motion.div
            animate={{
              y:[0,-8,0],
            }}
            transition={{
              repeat:Infinity,
              duration:2,
            }}
          >

            <Trophy
              size={70}
              className="mx-auto text-[#FFD464]"
            />

          </motion.div>

          <h3 className="mt-6 text-2xl font-bold">
            No Awards Data Available
          </h3>

          <p className="mt-3 text-zinc-400 max-w-lg mx-auto">
            TMDB doesn't include actor awards.
            Connect an awards source such as IMDb
            or Wikidata to display Oscar, Emmy,
            BAFTA and Golden Globe achievements.
          </p>

        </div>

      )}

      {/* Timeline */}

      {awards.length > 0 && (

        <div className="relative">

          {/* Line */}

          <div
            className="
              absolute
              left-6
              top-0
              bottom-0
              w-[3px]
              bg-gradient-to-b
              from-[#FFD464]
              to-transparent
            "
          />

          <div className="space-y-8">

            {awards.map((award,index)=>(

              <motion.div
                key={index}
                initial={{
                  opacity:0,
                  x:40,
                }}
                whileInView={{
                  opacity:1,
                  x:0,
                }}
                viewport={{
                  once:true,
                }}
                transition={{
                  delay:index*.08,
                }}
                className="relative pl-20"
              >

                {/* Dot */}

                <div
                  className="
                    absolute
                    left-[9px]
                    top-6
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FFD464]
                    text-black
                  "
                >
                  <Medal size={18}/>
                </div>

                {/* Card */}

                <motion.div
                  whileHover={{
                    y:-5,
                  }}
                  className="
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/5
                    p-7
                    backdrop-blur-3xl
                  "
                >

                  <div className="flex flex-wrap items-center justify-between gap-4">

                    <div>

                      <h3 className="text-2xl font-bold">
                        {award.title}
                      </h3>

                      <p className="mt-2 text-zinc-400">
                        {award.organization}
                      </p>

                    </div>

                    <div
                      className="
                        rounded-full
                        bg-[#FFD464]
                        px-5
                        py-2
                        font-bold
                        text-black
                      "
                    >
                      {award.result}
                    </div>

                  </div>

                  <div className="mt-6 flex flex-wrap gap-5 text-zinc-400">

                    <div className="flex items-center gap-2">

                      <Calendar size={16}/>

                      {award.year}

                    </div>

                    <div className="flex items-center gap-2">

                      <Star size={16}/>

                      {award.category}

                    </div>

                  </div>

                  {award.description && (

                    <p className="mt-6 leading-8 text-zinc-300">

                      {award.description}

                    </p>

                  )}

                </motion.div>

              </motion.div>

            ))}

          </div>

        </div>

      )}

    </section>
  );
}