import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  MonitorPlay,
  Crown,
  Download,
  Trash2,
  Github,
  Save,
} from "lucide-react";
import { FaChrome } from "react-icons/fa";

const settings = [
  {
    title: "Edit Profile",
    icon: User,
    description: "Update your profile information.",
  },
  {
    title: "Notifications",
    icon: Bell,
    description: "Manage push & email notifications.",
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    description: "Control visibility and security.",
  },
  {
    title: "Appearance",
    icon: Palette,
    description: "Light, Dark & Dynamic themes.",
  },
  {
    title: "Language",
    icon: Globe,
    description: "English, Hindi and more.",
  },
  {
    title: "Playback",
    icon: MonitorPlay,
    description: "Autoplay, subtitles and quality.",
  },
];

export default function ProfileSettings() {
  return (
    <section>

      <div className="mb-10">

        <h2 className="text-3xl font-black">
          Settings
        </h2>

        <p className="mt-2 text-zinc-400">
          Personalize your CRISTAL experience.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">

        {/* Left */}

        <div className="space-y-5">

          {settings.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * .07,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  backdrop-blur-2xl
                "
              >

                <div className="flex items-center gap-5">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5E5E] to-[#FFD464]">
                    <Icon className="text-black" />
                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {item.title}
                    </h3>

                    <p className="text-zinc-400">
                      {item.description}
                    </p>

                  </div>

                </div>

                <button className="rounded-xl bg-white/10 px-5 py-2 transition hover:bg-white/20">
                  Open
                </button>

              </motion.div>

            );

          })}

        </div>

        {/* Right */}

        <div className="space-y-6">

          {/* Premium */}

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF5E5E] via-[#FF9B5E] to-[#FFD464] p-[2px]"
          >

            <div className="rounded-[22px] bg-[#090D16] p-7">

              <div className="flex items-center gap-3">

                <Crown
                  size={30}
                  className="text-yellow-400"
                />

                <div>

                  <h3 className="text-2xl font-bold">
                    CRISTAL Premium
                  </h3>

                  <p className="text-zinc-400">
                    Unlock every premium feature.
                  </p>

                </div>

              </div>

              <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#FF5E5E] to-[#FFD464] py-3 font-bold text-black transition hover:scale-[1.02]">
                Upgrade Now
              </button>

            </div>

          </motion.div>

          {/* Connected Accounts */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

            <h3 className="mb-6 text-xl font-bold">
              Connected Accounts
            </h3>

            <div className="space-y-4">

              <button className="flex w-full items-center justify-between rounded-xl bg-white/5 p-4 hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <FaChrome />
                  Google
                </div>
                Connected
              </button>

              <button className="flex w-full items-center justify-between rounded-xl bg-white/5 p-4 hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <Github />
                  GitHub
                </div>
                Connect
              </button>

            </div>

          </div>

          {/* Actions */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

            <h3 className="mb-5 text-xl font-bold">
              Data
            </h3>

            <div className="space-y-4">

              <button className="flex w-full items-center gap-3 rounded-xl bg-white/5 p-4 hover:bg-white/10">
                <Download />
                Export Watch History
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl bg-white/5 p-4 hover:bg-white/10">
                <Save />
                Backup Settings
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl bg-red-500/20 p-4 text-red-400 hover:bg-red-500/30">
                <Trash2 />
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}