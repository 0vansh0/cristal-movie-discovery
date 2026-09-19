import { motion } from "framer-motion";
import {
  Tv,
  PlayCircle,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export default function StreamingProviders({
  providers,
}) {
  if (!providers) return null;

  const stream = providers.flatrate || [];
  const rent = providers.rent || [];
  const buy = providers.buy || [];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: .8,
      }}
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

      <div className="mb-10 flex items-center gap-4">

        <div
          className="
            rounded-2xl
            bg-[#FFD464]/15
            p-3
            text-[#FFD464]
          "
        >
          <Tv size={28} />
        </div>

        <div>

          <h2 className="text-3xl font-black">
            Where To Watch
          </h2>

          <p className="mt-1 text-zinc-400">
            Stream • Rent • Buy
          </p>

        </div>

      </div>

      <div className="space-y-10">

        <ProviderGroup
          title="Streaming"
          icon={<PlayCircle size={18} />}
          items={stream}
          color="bg-green-500"
        />

        <ProviderGroup
          title="Rent"
          icon={<ShoppingBag size={18} />}
          items={rent}
          color="bg-blue-500"
        />

        <ProviderGroup
          title="Buy"
          icon={<ShoppingBag size={18} />}
          items={buy}
          color="bg-orange-500"
        />

      </div>

      {providers.link && (

        <motion.a
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: .95,
          }}
          href={providers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-10
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#FFD464]
            px-6
            py-3
            font-semibold
            text-black
          "
        >
          View All Providers

          <ExternalLink size={18} />

        </motion.a>

      )}

    </motion.section>
  );
}

function ProviderGroup({
  title,
  icon,
  items,
  color,
}) {
  if (!items.length) return null;

  return (
    <div>

      <div className="mb-5 flex items-center gap-3">

        <div
          className={`
            ${color}
            rounded-full
            p-2
            text-white
          `}
        >
          {icon}
        </div>

        <h3 className="text-xl font-bold">
          {title}
        </h3>

      </div>

      <div
        className="
          flex
          gap-5
          overflow-x-auto
          pb-2
        "
      >

        {items.map((provider, index) => (

          <motion.div
            key={provider.provider_id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * .05,
            }}
            whileHover={{
              y: -8,
            }}
            className="
              group
              w-32
              shrink-0
              rounded-3xl
              border
              border-white/10
              bg-black/30
              p-4
              text-center
              backdrop-blur-xl
            "
          >

            <img
              src={`${IMAGE_URL}${provider.logo_path}`}
              alt={provider.provider_name}
              className="
                mx-auto
                h-16
                w-16
                rounded-2xl
                object-cover
                transition
                duration-300
                group-hover:scale-110
              "
            />

            <h4 className="mt-4 line-clamp-2 text-sm font-semibold">
              {provider.provider_name}
            </h4>

          </motion.div>

        ))}

      </div>

    </div>
  );
}