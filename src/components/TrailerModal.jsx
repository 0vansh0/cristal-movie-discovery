import { motion, AnimatePresence } from 'framer-motion';
import Button from './UI/Button';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const TrailerModal = ({ isOpen, onClose, movieId }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setTrailerKey(null);
      setLoading(true);
      return;
    }

    const fetchTrailer = async () => {
      if (!movieId) return;
      try {
        const response = await api.get(`/movie/${movieId}/videos`);
        const trailer = response.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || null);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [isOpen, movieId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-4xl aspect-video bg-slate-950/95 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="flex items-center justify-center h-full text-white">
                Loading trailer...
              </div>
            ) : trailerKey ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailerKey)}?autoplay=1&rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
                className="w-full h-full"
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                No trailer available
              </div>
            )}

            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute top-4 right-4 text-3xl px-3 py-2"
            >
              ×
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;