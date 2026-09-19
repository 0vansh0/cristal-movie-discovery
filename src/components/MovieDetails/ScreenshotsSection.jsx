import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Images,
  X,
  ZoomIn,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export default function ScreenshotsSection({
  images = [],
}) {
  const [selected, setSelected] = useState(null);

  if (!images.length) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          rounded-[36px]
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-3xl
        "
      >
        {/* Header */}

        <div className="mb-8 flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/15
              p-3
              text-[#FFD464]
            "
          >
            <Images size={26} />
          </div>

          <div>

            <h2 className="text-3xl font-black">
              Screenshots
            </h2>

            <p className="mt-1 text-zinc-400">
              High quality movie stills
            </p>

          </div>

        </div>

        {/* Gallery */}

        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {images.slice(0, 12).map((image, index) => (

            <motion.button
              key={image.file_path}
              initial={{
                opacity: 0,
                scale: .95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * .05,
              }}
              whileHover={{
                y: -8,
              }}
              onClick={() => setSelected(image)}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
              "
            >

              <img
                src={`${IMAGE_URL}${image.file_path}`}
                alt={`Screenshot ${index + 1}`}
                loading="lazy"
                className="
                  aspect-video
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  bg-black/40
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              >
                <ZoomIn size={42} />
              </div>

            </motion.button>

          ))}

        </div>

      </motion.section>

      {/* Lightbox */}

      <AnimatePresence>

        {selected && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelected(null)}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/90
              p-8
            "
          >

            <motion.button
              whileHover={{
                rotate: 90,
              }}
              onClick={() => setSelected(null)}
              className="
                absolute
                right-8
                top-8
                rounded-full
                bg-white/10
                p-3
              "
            >
              <X />
            </motion.button>

            <motion.img
              initial={{
                scale: .8,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: .8,
              }}
              src={`${IMAGE_URL}${selected.file_path}`}
              alt="Screenshot"
              className="
                max-h-[90vh]
                max-w-[90vw]
                rounded-3xl
                object-contain
              "
            />

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}