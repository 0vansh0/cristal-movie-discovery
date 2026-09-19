import { 
  useRef 
} from "react";

import { 
  motion 
} from "framer-motion";

import { 
  FaChevronLeft,
  FaChevronRight,
  FaStar
} from "react-icons/fa";

import { 
  useNavigate 
} from "react-router-dom";



const Top10Carousel = ({

title,

movies = []

}) => {


const sliderRef = useRef(null);

const navigate = useNavigate();



const scroll = (direction)=>{


if(!sliderRef.current)
return;



sliderRef.current.scrollBy({

left:
direction === "left"
?
-700
:
700,


behavior:"smooth"

});


};



if(!movies.length)
return null;



return (

<section

className="
relative
mb-12
"

>



{/* HEADER */}

<div

className="
mb-5
flex
items-center
justify-between
"

>


<h2

className="
text-2xl
font-bold
text-white
md:text-3xl
"

>

{title}

</h2>



<div

className="
flex
gap-3
"

>


<button

onClick={()=>scroll("left")}

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-white/20
bg-white/10
text-white
backdrop-blur-md
transition
hover:bg-red-600
"

>

<FaChevronLeft/>

</button>



<button

onClick={()=>scroll("right")}

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-white/20
bg-white/10
text-white
backdrop-blur-md
transition
hover:bg-red-600
"

>

<FaChevronRight/>

</button>


</div>


</div>





{/* MOVIE ROW */}

<div


ref={sliderRef}


className="
flex
gap-5
overflow-x-auto
scroll-smooth
pb-4
[scrollbar-width:none]
"

>


{

movies.map((movie,index)=>(


<motion.div


key={movie.id}


whileHover={{

scale:1.08,

y:-10

}}


transition={{

duration:.25

}}


onClick={()=>navigate(`/movie/${movie.id}`)}


className="
group
relative
min-w-[170px]
cursor-pointer
md:min-w-[220px]
"


>


{/* NUMBER */}

<div

className="
absolute
left-2
top-2
z-20
rounded-full
bg-black/70
px-3
py-1
text-sm
font-bold
text-white
"

>

#{index+1}

</div>



{/* POSTER */}

<div

className="
overflow-hidden
rounded-2xl
border
border-white/10
bg-white/5
shadow-xl
"

>


<img


src={

movie.poster_url ||

movie.poster_path

?

movie.poster_url ||

`https://image.tmdb.org/t/p/w500${movie.poster_path}`

:

"https://placehold.co/500x750"

}


alt={movie.title || movie.name}


loading="lazy"


className="
h-[250px]
w-full
object-cover
transition
duration-500
group-hover:brightness-75
md:h-[320px]
"


/>



{/* OVERLAY */}

<div

className="
absolute
inset-0
flex
items-end
rounded-2xl
bg-gradient-to-t
from-black
via-transparent
to-transparent
opacity-0
transition
group-hover:opacity-100
"

>


<div

className="
p-4
"

>


<div

className="
mb-2
flex
items-center
gap-2
text-sm
text-yellow-400
"

>

<FaStar/>

{

Number(
movie.vote_average || 0
).toFixed(1)

}

</div>



<p

className="
line-clamp-2
text-sm
font-semibold
text-white
"

>

{
movie.title ||
movie.name
}

</p>


</div>


</div>


</div>



</motion.div>


))

}


</div>



</section>

);

};


export default Top10Carousel;