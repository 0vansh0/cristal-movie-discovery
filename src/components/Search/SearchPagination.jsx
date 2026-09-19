import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

export default function SearchPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        mt-14
        flex
        flex-wrap
        items-center
        justify-center
        gap-3
      "
    >
      {/* Previous */}

      <PageButton
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        <ChevronLeft size={18} />
      </PageButton>

      {/* Pages */}

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <div
              key={index}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                text-zinc-500
              "
            >
              <MoreHorizontal size={18} />
            </div>
          );
        }

        const active =
          currentPage === page;

        return (
          <motion.button
            key={page}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: .95,
            }}
            onClick={() =>
              onPageChange(page)
            }
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              font-semibold
              transition

              ${
                active
                  ? `
                    border-[#FFD464]
                    bg-[#FFD464]
                    text-black
                  `
                  : `
                    border-white/10
                    bg-white/5
                    text-zinc-300
                    hover:border-[#FFD464]/40
                    hover:bg-[#FFD464]/10
                  `
              }
            `}
          >
            {page}
          </motion.button>
        );
      })}

      {/* Next */}

      <PageButton
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        <ChevronRight size={18} />
      </PageButton>
    </motion.div>
  );
}

/* --------------------------
   Page Button
-------------------------- */

function PageButton({
  children,
  disabled,
  onClick,
}) {
  return (
    <motion.button
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.08,
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: .95,
            }
      }
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        transition

        ${
          disabled
            ? `
              cursor-not-allowed
              border-white/5
              bg-white/5
              text-zinc-600
            `
            : `
              border-white/10
              bg-white/5
              hover:border-[#FFD464]/40
              hover:bg-[#FFD464]/10
            `
        }
      `}
    >
      {children}
    </motion.button>
  );
}

/* --------------------------
   Pagination Logic
-------------------------- */

function getPages(current, total) {
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }

    return pages;
  }

  pages.push(1);

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(
    total - 1,
    current + 1
  );

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
}