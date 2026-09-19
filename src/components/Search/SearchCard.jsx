import {
  motion
} from "framer-motion";


import {
  FaStar,
  FaPlay,
  FaPlus
} from "react-icons/fa";


import {
  useState
} from "react";




const IMAGE_BASE =

"https://image.tmdb.org/t/p/";





export default function SearchCard({

movie,

view="grid",

onClick

}) {



const [

saved,

setSaved

]=useState(false);





const title =

movie.title ||

movie.name ||

"Unknown";





const poster =

movie.poster_path

?

`${IMAGE_BASE}w500${movie.poster_path}`

:

"https://placehold.co/500x750?text=No+Poster";






const year =

(

movie.release_date ||

movie.first_air_date ||

""

).slice(0,4);






const rating =

Number(

movie.vote_average || 0

).toFixed(1);






const type =

movie.media_type === "tv"

?

"TV"

:

"Movie";





return (

<motion.article


whileHover={{

y:-8

}}



className={

`

relative
overflow-hidden
rounded-2xl
bg-[#111827]
border
border-white/10
shadow-xl
transition

${

view==="list"

?

"flex gap-5 p-4"

:

""

}

`

}


>


{/* =====================
    LIST VIEW IMAGE
===================== */}


<div

className={

view==="list"

?

"w-32 shrink-0 overflow-hidden rounded-xl"

:

"relative"

}

>



<img


src={poster}


alt={title}


loading="lazy"


className={

view==="list"

?

`
h-full
w-full
object-cover
`

:

`
aspect-[2/3]
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-110
`

}


/>





{/* HOVER OVERLAY */}

{

view !== "list" && (


<motion.div


initial={{

opacity:0

}}



whileHover={{

opacity:1

}}



className="

absolute

inset-0

flex

items-center

justify-center

bg-black/60

opacity-0

transition

group-hover:opacity-100

"


>



<button


onClick={()=>onClick?.(movie)}


className="

flex

h-14

w-14

items-center

justify-center

rounded-full

bg-white

text-black

shadow-xl

transition

hover:scale-110

"


>


<FaPlay

className="ml-1"

/>



</button>


</motion.div>


)

}




{/* TYPE BADGE */}


<span

className="

absolute

left-3

top-3

rounded-full

bg-black/70

px-3

py-1

text-xs

font-semibold

text-white

backdrop-blur

"

>


{type}


</span>





{/* RATING */}


<span


className="

absolute

right-3

top-3

flex

items-center

gap-1

rounded-full

bg-yellow-500/90

px-3

py-1

text-xs

font-bold

text-black

"


>


<FaStar/>

{rating}


</span>





</div>








{/* =====================
    CONTENT
===================== */}



<div


className={

view==="list"

?

"flex flex-1 flex-col justify-between"

:

"p-4"

}



>




<h3


className="

line-clamp-1

text-base

font-bold

text-white

"


>


{title}


</h3>





<div


className="

mt-2

flex

items-center

gap-2

text-xs

text-zinc-400

"


>


<span>

{year || "N/A"}

</span>



<span>

•

</span>



<span>

{type}

</span>



</div>






{/* OVERVIEW ONLY LIST */}


{

view==="list" && movie.overview && (


<p


className="

mt-3

line-clamp-3

text-sm

leading-relaxed

text-zinc-400

"


>


{movie.overview}


</p>


)

}








{/* ACTIONS */}



<div


className="

mt-4

flex

items-center

justify-between

"


>



<button


onClick={(e)=>{


e.stopPropagation();


setSaved(!saved);


}}



className={

`

flex

items-center

gap-2

rounded-full

px-4

py-2

text-xs

font-semibold

transition


${

saved

?

"bg-emerald-500/20 text-emerald-300"

:

"bg-white/10 text-white hover:bg-white/20"

}

`

}



>


<FaPlus/>


{

saved

?

"Saved"

:

"Watchlist"

}


</button>





<button


onClick={()=>onClick?.(movie)}


className="

rounded-full

bg-white

px-4

py-2

text-xs

font-bold

text-black

transition

hover:scale-105

"


>


View


</button>



</div>




</div>





</motion.article>


);


}