import { NavLink } from "react-router-dom";
import {
  Home,
  Clapperboard,
  Grid2X2,
  Bookmark,
  User,
  Search,
  TrendingUp,
} from "lucide-react";

const menu = [
  {
    title: "Home",
    icon: Home,
    path: "/",
  },
  {
    title: "Movies",
    icon: Clapperboard,
    path: "/movies",
  },
  {
    title: "Genres",
    icon: Grid2X2,
    path: "/genres",
  },
  {
    title: "Trending",
    icon: TrendingUp,
    path: "/trending",
  },
  {
    title: "Watchlist",
    icon: Bookmark,
    path: "/watchlist",
  },
  {
    title: "Search",
    icon: Search,
    path: "/search",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

const MobileMenu = ({ closeMenu }) => {
  return (
    <div className="flex flex-col px-5 pb-8">

      <div className="mt-5 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-[#FF5E5E]/15 text-[#FF5E5E]"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>

            </NavLink>
          );

        })}

      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#FF5E5E]/20 via-[#E23C64]/20 to-[#B0183D]/20 p-5">

        <p className="text-sm text-zinc-400">
          Featured
        </p>

        <h3 className="mt-2 text-lg font-bold">
          Discover Movies
        </h3>

        <p className="mt-2 text-sm text-zinc-300">
          Explore trending movies, TV shows and build your own cinematic profile.
        </p>

        <button
          className="
          mt-5
          w-full
          rounded-xl
          bg-[#FF5E5E]
          py-3
          font-semibold
          text-white
          transition
          hover:bg-[#E23C64]"
        >
          Explore Now
        </button>

      </div>

    </div>
  );
};

export default MobileMenu;