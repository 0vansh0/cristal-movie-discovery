import { motion } from "framer-motion";

// Compact line-art icons (16px x 16px)
const ICONS = {
  Action: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Adventure: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 8l-3.5 7L9 11.5 16 8z" /></svg>,
  Animation: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  Comedy: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M8 15s1.5 2 4 2 4-2 4-2" /><circle cx="9" cy="9" r="1" fill="currentColor" /><circle cx="15" cy="9" r="1" fill="currentColor" /></svg>,
  Crime: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Documentary: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="5" width="18" height="14" rx="2" /><path strokeLinecap="round" d="M7 5v14M17 5v14M3 10h18" /></svg>,
  Drama: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Family: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Fantasy: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  History: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" /></svg>,
  Horror: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 00-7 7c0 3 1.5 5 2.5 6.5V18h9v-2.5c1-1.5 2.5-3.5 2.5-6.5a7 7 0 00-7-7z" /></svg>,
  Music: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-2v13M9 19a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Mystery: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01" /></svg>,
  Romance: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  "Science Fiction": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" d="M12 2v3m0 14v3M2 12h3m14 0h3M5.636 5.636l2.122 2.122m8.484 8.484l2.122 2.122M5.636 18.364l2.122-2.122m8.484-8.484l2.122-2.122" /></svg>,
  "TV Movie": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="6" width="18" height="12" rx="2" /><path strokeLinecap="round" d="M8 3l4 3M16 3l-4 3" /></svg>,
  Thriller: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  War: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7M5 19l7-7 7 7" /></svg>,
  Western: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3a6 6 0 00-6 6v3a6 6 0 0012 0V9a6 6 0 00-6-6zM4 15h16" /></svg>,
  Default: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /></svg>,
};

// Neon Styles (Idle Hover & Active Glowing)
const NEON_STYLES = {
  Action: {
    idle: "hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]",
    active: "border-red-500 bg-red-500/15 text-red-400 shadow-[0_0_14px_rgba(239,68,68,0.45)]",
  },
  Adventure: {
    idle: "hover:border-orange-500 hover:text-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.4)]",
    active: "border-orange-500 bg-orange-500/15 text-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.45)]",
  },
  Animation: {
    idle: "hover:border-pink-500 hover:text-pink-400 hover:shadow-[0_0_12px_rgba(236,72,153,0.4)]",
    active: "border-pink-500 bg-pink-500/15 text-pink-400 shadow-[0_0_14px_rgba(236,72,153,0.45)]",
  },
  Comedy: {
    idle: "hover:border-yellow-400 hover:text-yellow-300 hover:shadow-[0_0_12px_rgba(250,204,21,0.4)]",
    active: "border-yellow-400 bg-yellow-400/15 text-yellow-300 shadow-[0_0_14px_rgba(250,204,21,0.45)]",
  },
  Crime: {
    idle: "hover:border-purple-500 hover:text-purple-400 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)]",
    active: "border-purple-500 bg-purple-500/15 text-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.45)]",
  },
  Documentary: {
    idle: "hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)]",
    active: "border-cyan-400 bg-cyan-400/15 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.45)]",
  },
  Drama: {
    idle: "hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]",
    active: "border-blue-500 bg-blue-500/15 text-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.45)]",
  },
  Fantasy: {
    idle: "hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_12px_rgba(251,191,36,0.4)]",
    active: "border-amber-400 bg-amber-400/15 text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.45)]",
  },
  Horror: {
    idle: "hover:border-rose-600 hover:text-rose-400 hover:shadow-[0_0_12px_rgba(225,29,72,0.5)]",
    active: "border-rose-600 bg-rose-600/15 text-rose-400 shadow-[0_0_14px_rgba(225,29,72,0.5)]",
  },
  Romance: {
    idle: "hover:border-rose-400 hover:text-rose-300 hover:shadow-[0_0_12px_rgba(251,113,133,0.4)]",
    active: "border-rose-400 bg-rose-400/15 text-rose-300 shadow-[0_0_14px_rgba(251,113,133,0.45)]",
  },
  "Science Fiction": {
    idle: "hover:border-indigo-400 hover:text-indigo-300 hover:shadow-[0_0_12px_rgba(129,140,248,0.4)]",
    active: "border-indigo-400 bg-indigo-400/15 text-indigo-300 shadow-[0_0_14px_rgba(129,140,248,0.45)]",
  },
  Default: {
    idle: "hover:border-white/40 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]",
    active: "border-white bg-white/15 text-white shadow-[0_0_14px_rgba(255,255,255,0.3)]",
  },
};

// Helper to normalize genre names
const getGenreKey = (name = "") => {
  if (/action/i.test(name)) return "Action";
  if (/adventure/i.test(name)) return "Adventure";
  if (/animation|anime/i.test(name)) return "Animation";
  if (/comedy/i.test(name)) return "Comedy";
  if (/crime/i.test(name)) return "Crime";
  if (/doc/i.test(name)) return "Documentary";
  if (/drama/i.test(name)) return "Drama";
  if (/family/i.test(name)) return "Family";
  if (/fantasy/i.test(name)) return "Fantasy";
  if (/history/i.test(name)) return "History";
  if (/horror/i.test(name)) return "Horror";
  if (/music/i.test(name)) return "Music";
  if (/mystery/i.test(name)) return "Mystery";
  if (/romance/i.test(name)) return "Romance";
  if (/sci|science/i.test(name)) return "Science Fiction";
  if (/tv movie/i.test(name)) return "TV Movie";
  if (/thriller/i.test(name)) return "Thriller";
  if (/war/i.test(name)) return "War";
  if (/western/i.test(name)) return "Western";
  return "Default";
};

const GenreButton = ({ genre, active, onClick }) => {
  const label = typeof genre === "object" ? genre.name : genre;
  const key = getGenreKey(label);

  const icon = ICONS[key] || ICONS.Default;
  const style = NEON_STYLES[key] || NEON_STYLES.Default;

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      aria-pressed={!!active}
      className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 whitespace-nowrap cursor-pointer backdrop-blur-md select-none ${
        active
          ? style.active
          : `border-white/10 bg-[#0f1420]/80 text-slate-400 ${style.idle}`
      }`}
    >
      <span
        className={`transition-transform duration-300 group-hover:scale-110 ${
          active ? "text-current" : "text-slate-400 group-hover:text-current"
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </motion.button>
  );
};

export default GenreButton;