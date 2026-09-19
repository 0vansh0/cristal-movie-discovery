import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-0 z-50 grid place-items-center bg-slate-950/95 text-white"
      >
        <div className="relative flex flex-col items-center gap-8 rounded-[32px] border border-white/10 bg-black/80 px-8 py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-3xl">
          <div className="flex items-center gap-3 rounded-full bg-imdb-yellow/10 px-5 py-3 text-sm uppercase tracking-[0.28em] text-imdb-yellow shadow-[0_20px_60px_rgba(245,197,24,0.16)]">
            <span className="h-2.5 w-2.5 rounded-full bg-imdb-yellow animate-pulse" />
            CineVerse Launch
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
            <div className="h-14 w-14 rounded-full border-4 border-white/10 border-t-imdb-yellow animate-spin" />
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <p className="text-lg font-semibold text-white">Loading cinematic discovery...</p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Premium transitions are almost ready</p>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Preloader;
