import { NavLink } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaFilm,
  FaTv,
  FaCompass,
  FaHeart,
  FaBookmark,
  FaCog,
  FaMoon,
  FaSun,
  FaSearch,
  FaSignOutAlt
} from "react-icons/fa";

import Avatar from "../common/Avatar";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

import "./MobileMenu.css";

export default function MobileMenu({

  open,

  onClose

}){

const { theme, toggleTheme } = useTheme();

const { user, logout } = useAuth();

if(!open) return null;

return(

<>

<div

className="mobile-overlay"

onClick={onClose}

/>

<div className="mobile-menu">

<div className="mobile-header">

<h2>

CRISTAL

</h2>

<button

className="close-btn"

onClick={onClose}

>

<FaTimes/>

</button>

</div>

<div className="mobile-profile">

<Avatar

image={user?.avatar}

name={user?.username}

size="large"

/>

<div>

<h3>

{user?.username || "Guest"}

</h3>

<p>

Movie Explorer

</p>

</div>

</div>

<nav className="mobile-nav">

<NavLink to="/" onClick={onClose}>

<FaHome/>

<span>

Home

</span>

</NavLink>

<NavLink to="/movies" onClick={onClose}>

<FaFilm/>

<span>

Movies

</span>

</NavLink>

<NavLink to="/tv" onClick={onClose}>

<FaTv/>

<span>

TV Shows

</span>

</NavLink>

<NavLink to="/explore" onClick={onClose}>

<FaCompass/>

<span>

Explore

</span>

</NavLink>

<NavLink to="/favorites" onClick={onClose}>

<FaHeart/>

<span>

Favorites

</span>

</NavLink>

<NavLink to="/watchlist" onClick={onClose}>

<FaBookmark/>

<span>

Watchlist

</span>

</NavLink>

<NavLink to="/search" onClick={onClose}>

<FaSearch/>

<span>

Search

</span>

</NavLink>

<NavLink to="/settings" onClick={onClose}>

<FaCog/>

<span>

Settings

</span>

</NavLink>

</nav>

<div className="mobile-actions">

<button

className="mobile-action-btn"

onClick={toggleTheme}

>

{

theme==="dark"

?

<FaSun/>

:

<FaMoon/>

}

<span>

Toggle Theme

</span>

</button>

<button

className="mobile-action-btn logout"

onClick={()=>{

logout();

onClose();

}}

>

<FaSignOutAlt/>

<span>

Logout

</span>

</button>

</div>

</div>

</>

);

}