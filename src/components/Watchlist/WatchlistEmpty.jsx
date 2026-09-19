import { motion } from "framer-motion";
import {
  Film,
  Search,
  Sparkles,
  BookmarkPlus,
} from "lucide-react";

export default function WatchlistEmpty() {
  return (
    <section className="py-24">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-3xl
          p-14
          text-center
        "
      >

        {/* Background Glow */}

        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E5E]/10 via-transparent to-[#FFD464]/10"/>

        {/* Floating Circles */}

        {[...Array(10)].map((_, i)=>(
          <motion.div
            key={i}
            animate={{
              y:[0,-20,0],
              opacity:[.2,.6,.2]
            }}
            transition={{
              repeat:Infinity,
              duration:5+i
            }}
            className="absolute h-3 w-3 rounded-full bg-white"
            style={{
              left:`${Math.random()*100}%`,
              top:`${Math.random()*100}%`
            }}
          />
        ))}

        <motion.div
          animate={{
            rotate:[0,5,-5,0]
          }}
          transition={{
            repeat:Infinity,
            duration:5
          }}
          className="
            mx-auto
            flex
            h-32
            w-32
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#FF5E5E]
            via-[#FF9B5E]
            to-[#FFD464]
          "
        >

          <Film
            size={55}
            className="text-black"
          />

        </motion.div>

        <h2 className="mt-10 text-5xl font-black">

          Your Watchlist is Empty

        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">

          Start discovering amazing movies and build your own
          personalized cinematic collection.

        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <motion.button
            whileHover={{
              scale:1.05
            }}
            whileTap={{
              scale:.95
            }}
            className="
              flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-8
              py-4
              font-bold
              text-black
            "
          >

            <Search size={20}/>

            Explore Movies

          </motion.button>

          <motion.button
            whileHover={{
              scale:1.05
            }}
            className="
              flex
              items-center
              gap-3
              rounded-full
              bg-white/10
              px-8
              py-4
              backdrop-blur-xl
            "
          >

            <Sparkles size={20}/>

            AI Recommendations

          </motion.button>

          <motion.button
            whileHover={{
              scale:1.05
            }}
            className="
              flex
              items-center
              gap-3
              rounded-full
              bg-white/10
              px-8
              py-4
              backdrop-blur-xl
            "
          >

            <BookmarkPlus size={20}/>

            Import Collection

          </motion.button>

        </div>

      </motion.div>

    </section>
  );
}