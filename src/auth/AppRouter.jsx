import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



import ProtectedRoute from "./ProtectedRoute";



// Public Pages

import Home from "../pages/Home";

import Genres from "../pages/Genres";

import SearchPage from "../pages/SearchPage";

import MovieDetailsPage from "../pages/MovieDetailsPage";

import PersonPage from "../pages/PersonPage";

import Login from "../pages/Login";

import Signup from "../pages/Signup";

import ForgotPassword from "../pages/ForgotPassword";

import ResetPassword from "../pages/ResetPassword";




// User Pages

import ProfilePage from "../pages/ProfilePage";

import SettingsPage from "../pages/SettingsPage";

import FavoritesPage from "../pages/FavoritesPage";

import WatchlistPage from "../pages/WatchlistPage";

import RatingsPage from "../pages/RatingsPage";

import ReviewsPage from "../pages/ReviewsPage";

import HistoryPage from "../pages/HistoryPage";

import ListsPage from "../pages/ListsPage";




// Error

import NotFound from "../pages/NotFound";







export default function AppRouter(){



return (



<BrowserRouter>


<Routes>









{/* =====================
PUBLIC ROUTES
===================== */}





<Route

path="/"

element={<Home/>}

/>






<Route

path="/movies"

element={<Genres/>}

/>






<Route

path="/tv"

element={<SearchPage/>}

/>






<Route

path="/search"

element={<SearchPage/>}

/>







<Route

path="/movie/:id"

element={<MovieDetailsPage/>}

/>







<Route

path="/person/:id"

element={<PersonPage/>}

/>









{/* =====================
AUTH ROUTES
===================== */}





<Route

path="/login"

element={<Login/>}

/>






<Route

path="/signup"

element={<Signup/>}

/>






<Route

path="/forgot-password"

element={<ForgotPassword/>}

/>






<Route

path="/reset-password/:token"

element={<ResetPassword/>}

/>









{/* =====================
PRIVATE ROUTES
===================== */}





<Route element={<ProtectedRoute/>}>







<Route

path="/profile"

element={<ProfilePage/>}

/>







<Route

path="/settings"

element={<SettingsPage/>}

/>







<Route

path="/favorites"

element={<FavoritesPage/>}

/>







<Route

path="/watchlist"

element={<WatchlistPage/>}

/>







<Route

path="/ratings"

element={<RatingsPage/>}

/>







<Route

path="/reviews"

element={<ReviewsPage/>}

/>







<Route

path="/history"

element={<HistoryPage/>}

/>







<Route

path="/lists"

element={<ListsPage/>}

/>







</Route>









{/* 404 */}





<Route

path="*"

element={<NotFound/>}

/>









</Routes>



</BrowserRouter>



);


}