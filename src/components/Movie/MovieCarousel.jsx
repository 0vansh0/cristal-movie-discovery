import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import MovieCard from "./MovieCard";

import "./MovieCarousel.css";

export default function MovieCarousel({

title,

movies = [],

favorites = [],

watchlist = [],

onFavorite,

onWatchlist

}){

const sliderRef = useRef(null);

const scroll = (direction)=>{

if(!sliderRef.current) return;

const amount = 800;

sliderRef.current.scrollBy({

left: direction==="left" ? -amount : amount,

behavior:"smooth"

});

};

return(

<section className="movie-carousel-section">

<div className="carousel-header">

<h2>

{title}

</h2>

<div className="carousel-controls">

<button

onClick={()=>scroll("left")}

>

<FaChevronLeft/>

</button>

<button

onClick={()=>scroll("right")}

>

<FaChevronRight/>

</button>

</div>

</div>

<div

ref={sliderRef}

className="movie-carousel"

>

{

movies.map(movie=>(

<div

key={movie.id}

className="carousel-item"

>

<MovieCard

movie={movie}

isFavorite={favorites.includes(movie.id)}

isWatchlisted={watchlist.includes(movie.id)}

onFavorite={onFavorite}

onWatchlist={onWatchlist}

/>

</div>

))

}

</div>

</section>

);

}