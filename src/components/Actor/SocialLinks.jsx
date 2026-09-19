import { motion } from "framer-motion";
import {
  Globe,
  ExternalLink,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiImdb, SiX } from "react-icons/si";

export default function SocialLinks({
  externalIds = {},
  homepage = "",
}) {
  const links = [
    {
      title: "IMDb",
      icon: <SiImdb size={26} />,
      color: "#F5C518",
      url: externalIds.imdb_id
        ? `https://www.imdb.com/name/${externalIds.imdb_id}`
        : null,
    },

    {
      title: "Instagram",
      icon: <FaInstagram size={24} />,
      color: "#E1306C",
      url: externalIds.instagram_id
        ? `https://instagram.com/${externalIds.instagram_id}`
        : null,
    },

    {
      title: "X",
      icon: <SiX size={22} />,
      color: "#ffffff",
      url: externalIds.twitter_id
        ? `https://x.com/${externalIds.twitter_id}`
        : null,
    },

    {
      title: "Facebook",
      icon: <FaFacebook size={24} />,
      color: "#1877F2",
      url: externalIds.facebook_id
        ? `https://facebook.com/${externalIds.facebook_id}`
        : null,
    },

    {
      title: "Website",
      icon: <Globe size={24} />,
      color: "#FFD464",
      url: homepage || null,
    },
  ];

  const availableLinks = links.filter(
    (item) => item.url
  );

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Social Links
        </h2>

        <p className="mt-2 text-zinc-400">
          Official profiles & external websites
        </p>

      </div>

      {/* Empty */}

      {availableLinks.length === 0 && (

        <div
          className="
            rounded-[32px]
            border
            border-dashed
            border-white/10
            bg-white/5
            p-14
            text-center
            backdrop-blur-3xl
          "
        >

          <Globe
            size={60}
            className="mx-auto text-zinc-500"
          />

          <h3 className="mt-6 text-2xl font-bold">
            No Social Profiles
          </h3>

          <p className="mt-3 text-zinc-400">
            This actor hasn't linked any
            official social accounts.
          </p>

        </div>

      )}

      {/* Grid */}

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
        "
      >

        {availableLinks.map((link) => (

          <motion.a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              p-8
              text-center
              backdrop-blur-3xl
              transition
            "
          >

            {/* Icon */}

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-white/10
                transition
                group-hover:scale-110
              "
              style={{
                color: link.color,
              }}
            >
              {link.icon}
            </div>

            {/* Title */}

            <h3 className="mt-6 text-xl font-bold">
              {link.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Open Profile
            </p>

            <motion.div
              whileHover={{
                x: 4,
              }}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#FFD464]
                px-5
                py-2
                font-semibold
                text-black
              "
            >
              Visit

              <ExternalLink size={16} />

            </motion.div>

          </motion.a>

        ))}

      </div>

    </section>
  );
}