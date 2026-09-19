import { Link } from "react-router-dom";
import { FaPlay, FaInfoCircle, FaStar } from "react-icons/fa";

import { BACKDROP_BASE_URL } from "../../../config/apiConfig";
import "./HeroBanner.css";

export default function HeroBanner({

movie,

genres = [],

onTrailer

}) {

if (!movie) return null;

const backdrop = `${BACKDROP_BASE_URL}/original${movie.backdrop_path}`;

return (

<section
className="hero-banner"
style={{
backgroundImage: `url(${backdrop})`
}}
>

<div className="hero-overlay">

<div className="hero-content">

<p className="hero-tag">

Featured Movie

</p>

<h1>

{movie.title}

</h1>

<div className="hero-meta">

<span>

<FaStar />

{movie.vote_average?.toFixed(1)}

</span>

<span>

{movie.release_date?.split("-")[0]}

</span>

</div>

<div className="hero-genres">

{genres.map((genre) => (

<span
key={genre.id}
className="genre-chip"
>

{genre.name}

</span>

))}

</div>

<p className="hero-overview">

{movie.overview}

</p>

<div className="hero-buttons">

<button

className="watch-btn"

onClick={() => onTrailer?.(movie)}

>

<FaPlay />

Watch Trailer

</button>

<Link

to={`/movie/${movie.id}`}

className="details-btn"

>

<FaInfoCircle />

Details

</Link>

</div>

</div>

</div>

</section>

);

}