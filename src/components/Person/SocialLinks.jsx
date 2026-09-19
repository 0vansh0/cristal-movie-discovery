import { motion } from "framer-motion";
import {
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Link2,
} from "lucide-react";
import { FaXTwitter, FaImdb, FaTiktok } from "react-icons/fa6";

export default function SocialLinks({
  person,
  externalIds,
}) {
  if (!person && !externalIds) return null;

  const links = [
    {
      name: "Website",
      icon: Globe,
      color: "#FFD464",
      href: person?.homepage,
    },

    {
      name: "Instagram",
      icon: Instagram,
      color: "#E1306C",
      href: externalIds?.instagram_id
        ? `https://instagram.com/${externalIds.instagram_id}`
        : null,
    },

    {
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      href: externalIds?.facebook_id
        ? `https://facebook.com/${externalIds.facebook_id}`
        : null,
    },

    {
      name: "X",
      icon: FaXTwitter,
      color: "#ffffff",
      href: externalIds?.twitter_id
        ? `https://twitter.com/${externalIds.twitter_id}`
        : null,
    },

    {
      name: "IMDb",
      icon: FaImdb,
      color: "#F5C518",
      href: externalIds?.imdb_id
        ? `https://www.imdb.com/name/${externalIds.imdb_id}`
        : null,
    },

    {
      name: "TikTok",
      icon: FaTiktok,
      color: "#ffffff",
      href: externalIds?.tiktok_id
        ? `https://www.tiktok.com/@${externalIds.tiktok_id}`
        : null,
    },

    {
      name: "YouTube",
      icon: Youtube,
      color: "#FF0000",
      href: externalIds?.youtube_id
        ? `https://youtube.com/${externalIds.youtube_id}`
        : null,
    },
  ].filter((item) => item.href);

  if (!links.length) return null;

  return (
    <section className="space-y-10">

      <div>

        <h2 className="text-4xl font-black">
          Social Links
        </h2>

        <p className="mt-2 text-zinc-400">
          Official websites and verified profiles
        </p>

      </div>

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {links.map((item) => {

          const Icon = item.icon;

          return (

            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              whileTap={{
                scale: .97,
              }}
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-3xl
              "
            >

              {/* Glow */}

              <div
                className="
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  opacity-20
                  blur-3xl
                "
                style={{
                  background: item.color,
                }}
              />

              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                "
                style={{
                  background:
                    item.color + "20",
                }}
              >

                <Icon
                  size={34}
                  style={{
                    color: item.color,
                  }}
                />

              </div>

              <h3 className="mt-7 text-2xl font-black">

                {item.name}

              </h3>

              <p className="mt-2 text-zinc-400">

                Open Profile

              </p>

              <motion.div
                whileHover={{
                  x: 8,
                }}
                className="
                  mt-8
                  flex
                  items-center
                  gap-3
                  font-bold
                "
              >

                Visit

                <Link2 size={18} />

              </motion.div>

            </motion.a>

          );

        })}

      </div>

    </section>
  );
}