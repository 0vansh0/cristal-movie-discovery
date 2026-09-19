import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  Copy,
  ArrowUp,
  Check,
  Bookmark,
} from "lucide-react";

const FAVORITE_KEY = "cristal_actor_favorites";
const BOOKMARK_KEY = "cristal_actor_bookmarks";

export default function ActorFloatingActions({
  actor,
}) {
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [bookmarked, setBookmarked] =
    useState(false);

  useEffect(() => {
    const listener = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener(
      "scroll",
      listener
    );

    return () =>
      window.removeEventListener(
        "scroll",
        listener
      );
  }, []);

  useEffect(() => {
    if (!actor?.id) return;

    const favorites = JSON.parse(
      localStorage.getItem(FAVORITE_KEY) || "[]"
    );
    const bookmarks = JSON.parse(
      localStorage.getItem(BOOKMARK_KEY) || "[]"
    );

    setFavorite(
      favorites.includes(actor.id)
    );
    setBookmarked(
      bookmarks.includes(actor.id)
    );
  }, [actor?.id]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      window.location.href
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toggleFavorite = () => {
    if (!actor?.id) return;

    const favorites = JSON.parse(
      localStorage.getItem(FAVORITE_KEY) || "[]"
    );
    const updated = favorite
      ? favorites.filter((id) => id !== actor.id)
      : [...new Set([...favorites, actor.id])];

    localStorage.setItem(
      FAVORITE_KEY,
      JSON.stringify(updated)
    );
    setFavorite(!favorite);
  };

  const toggleBookmark = () => {
    if (!actor?.id) return;

    const bookmarks = JSON.parse(
      localStorage.getItem(BOOKMARK_KEY) || "[]"
    );
    const updated = bookmarked
      ? bookmarks.filter((id) => id !== actor.id)
      : [...new Set([...bookmarks, actor.id])];

    localStorage.setItem(
      BOOKMARK_KEY,
      JSON.stringify(updated)
    );
    setBookmarked(!bookmarked);
  };

  const share = async () => {
    if (navigator.share) {
      navigator.share({
        title: actor?.name,
        url: window.location.href,
      });

      return;
    }

    copyLink();
  };

  return (
    <AnimatePresence>

      {showTop && (

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 60,
          }}
          className="
            fixed
            bottom-8
            right-8
            z-50
            flex
            flex-col
            gap-4
          "
        >

          <ActionButton
            active={favorite}
            tooltip={
              favorite ? "Unfavorite" : "Favorite"
            }
            onClick={toggleFavorite}
          >
            <Heart
              fill={
                favorite
                  ? "currentColor"
                  : "none"
              }
            />
          </ActionButton>

          <ActionButton
            active={bookmarked}
            tooltip={
              bookmarked
                ? "Remove Bookmark"
                : "Bookmark"
            }
            onClick={toggleBookmark}
          >
            <Bookmark
              fill={
                bookmarked
                  ? "currentColor"
                  : "none"
              }
            />
          </ActionButton>

          <ActionButton
            tooltip="Share"
            onClick={share}
          >
            <Share2 />
          </ActionButton>

          <ActionButton
            tooltip={
              copied
                ? "Copied!"
                : "Copy Link"
            }
            onClick={copyLink}
          >
            {copied ? (
              <Check />
            ) : (
              <Copy />
            )}
          </ActionButton>

          <ActionButton
            tooltip="Back to Top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <ArrowUp />
          </ActionButton>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

function ActionButton({
  children,
  tooltip,
  onClick,
  active,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.94,
      }}
      className="group relative"
    >

      <button
        onClick={onClick}
        className={`
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          backdrop-blur-3xl
          transition-all
          ${
            active
              ? "border-[#FFD464] bg-[#FFD464] text-black"
              : "border-white/10 bg-white/10 text-white hover:bg-[#FFD464] hover:text-black"
          }
        `}
      >
        {children}
      </button>

      {/* Tooltip */}

      <div
        className="
          absolute
          right-20
          top-1/2
          hidden
          -translate-y-1/2
          whitespace-nowrap
          rounded-full
          bg-black
          px-4
          py-2
          text-sm
          group-hover:block
        "
      >
        {tooltip}
      </div>

    </motion.div>
  );
}