import { motion } from 'framer-motion';

const VARIANT_CLASSES = {
  primary:
    'inline-flex items-center justify-center rounded-full bg-imdb-yellow text-slate-900 font-semibold shadow-lg px-6 py-3 transition duration-200 hover:brightness-95',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 px-5 py-2 transition duration-200 hover:bg-white/10',
  ghost:
    'inline-flex items-center justify-center rounded-full bg-transparent text-slate-200 px-4 py-2 transition duration-200 hover:bg-white/5',
  // New glow variant: white pill with subtle animated glow
  glow:
    'inline-flex items-center justify-center gap-3 rounded-full bg-white text-slate-900 font-semibold px-6 py-3 transition duration-200 hover:brightness-95 button-glow',
};

const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const base = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
