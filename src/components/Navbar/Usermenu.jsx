import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  Heart,
  Clock3,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* Avatar */}

      <button
        onClick={() => setOpen(!open)}
        className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/5
        p-1.5
        pl-2
        pr-3
        backdrop-blur-xl
        hover:border-[#FF5E5E]
        transition"
      >

        <img
          src="https://api.dicebear.com/7.x/adventurer/svg?seed=Cristal"
          alt="avatar"
          className="h-9 w-9 rounded-full"
        />

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      <AnimatePresence>

        {open && (

          <motion.div

            initial={{
              opacity:0,
              y:10,
              scale:.95,
            }}

            animate={{
              opacity:1,
              y:0,
              scale:1,
            }}

            exit={{
              opacity:0,
              y:10,
              scale:.95,
            }}

            className="
            absolute
            right-0
            mt-4
            w-72
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#141418]/95
            backdrop-blur-2xl
            shadow-2xl
            "

          >

            {/* Top */}

            <div className="border-b border-white/10 p-5">

              <div className="flex items-center gap-4">

                <img
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=Cristal"
                  className="h-14 w-14 rounded-full"
                  alt=""
                />

                <div>

                  <h3 className="font-bold">

                    Guest User

                  </h3>

                  <p className="text-sm text-zinc-400">

                    Start your movie journey

                  </p>

                </div>

              </div>

            </div>

            {/* Menu */}

            <div className="p-2">

              <MenuItem
                icon={<User size={18}/>}
                text="Profile"
                to="/profile"
              />

              <MenuItem
                icon={<Heart size={18}/>}
                text="Watchlist"
                to="/watchlist"
              />

              <MenuItem
                icon={<Clock3 size={18}/>}
                text="History"
                to="/history"
              />

              <MenuItem
                icon={<Settings size={18}/>}
                text="Settings"
                to="/settings"
              />

            </div>

            {/* Logout */}

            <div className="border-t border-white/10 p-3">

              <button
                className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-red-400
                hover:bg-red-500/10"
              >

                <LogOut size={18}/>

                Logout

              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

function MenuItem({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="
      flex
      items-center
      gap-3
      rounded-xl
      px-3
      py-3
      text-zinc-300
      hover:bg-white/5
      hover:text-white
      transition"
    >
      {icon}
      {text}
    </Link>
  );
}

export default UserMenu;