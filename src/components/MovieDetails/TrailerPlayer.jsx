import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ExternalLink, PlayCircle } from "lucide-react";
import "./TrailerPlayer.css";

export default function TrailerPlayer({ trailer }) {
  const [loaded, setLoaded] = useState(false);

  if (!trailer?.key) {
    return <div className="trailer-empty"><AlertCircle size={27} /><div><h3>Trailer unavailable</h3><p>No official trailer was found for this title.</p></div></div>;
  }

  const title = trailer.name || trailer.title || "Official trailer";
  const type = trailer.type || "Trailer";
  const site = trailer.site || "YouTube";

  const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <motion.section
      className="trailer-player"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      aria-label={`${title} player`}
    >
      <div className="trailer-video">
        <div className={loaded ? "trailer-loading hidden" : "trailer-loading"}>
          <PlayCircle size={42} />
        </div>
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>

      <div className="trailer-details">
        <div>
          <h3>{title}</h3>
          <p>{type} · {site}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="trailer-link"
        >
          Open on YouTube <ExternalLink size={14} />
        </a>
      </div>
    </motion.section>
  );
}