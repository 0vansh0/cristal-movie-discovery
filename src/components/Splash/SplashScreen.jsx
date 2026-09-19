import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CrystalLogo from "./CrystalLogo";
import SplashParticles from "./SplashParticles";
import SplashGlow from "./SplashGlow";
import SplashLoader from "./SplashLoader";
import SplashText from "./SplashText";

export default function SplashScreen({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);

      setTimeout(() => {
        onFinish?.();
      }, 1200);
    }, 3200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#09090B]"
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(20px)",
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Aurora Glow */}
          <SplashGlow />

          {/* Floating Particles */}
          <SplashParticles />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Main Content */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
              }}
            >
              <CrystalLogo />
            </motion.div>

            <SplashText />

            <SplashLoader />
          </div>

          {/* Cinematic Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.15, 0],
            }}
            transition={{
              duration: 3,
            }}
            className="absolute inset-0 bg-white pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}