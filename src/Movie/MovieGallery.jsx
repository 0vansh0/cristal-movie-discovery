import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const IMAGE = "https://image.tmdb.org/t/p/original";

export default function MovieGallery({ images = [] }) {
  const [selected, setSelected] = useState(null);

  if (!images.length) return null;

  return (
    <section className="mt-24">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black">
          Gallery
        </h2>

        <span className="text-zinc-400">
          {images.length} Photos
        </span>

      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

        {images.slice(0, 12).map((image, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: .9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * .05,
            }}
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            onClick={() =>
              setSelected(`${IMAGE}${image.file_path}`)
            }
          >

            <img
              src={`${IMAGE}${image.file_path}`}
              alt=""
              className="aspect-video h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

          </motion.div>

        ))}

      </div>

      <AnimatePresence>

        {selected && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          >

            <motion.img
              initial={{ scale: .8 }}
              animate={{ scale: 1 }}
              exit={{ scale: .8 }}
              src={selected}
              className="max-h-[90vh] rounded-3xl"
            />

            <button
              onClick={() => setSelected(null)}
              className="absolute right-10 top-10 rounded-full bg-white/10 p-3"
            >
              <X />
            </button>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}