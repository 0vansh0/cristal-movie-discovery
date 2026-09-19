import {
  motion
} from "framer-motion";


import MediaCard from "./MovieCard";






export default function SimilarMovies({

title="🎬 You May Also Like",

movies=[]

}) {



if(!movies.length)

return null;






return (

<section

className="
space-y-6
movie-centered-block
"

>





{/* HEADER */}



<div className="
flex
items-center
justify-between
"

>


<h2

className="
text-3xl
font-black
text-white
"

>

{title}

</h2>




<span

className="
rounded-full
border
border-white/10
bg-white/5
px-4
py-2
text-sm
text-gray-400
"

>

{movies.length} Movies

</span>



</div>









{/* MOVIE CAROUSEL */}



<div

className="
flex
gap-6
overflow-x-auto
pb-6
scroll-smooth
[&::-webkit-scrollbar]:hidden
"

>



{

movies
.slice(0,15)
.map((movie,index)=>(



<motion.div


key={movie.id}



initial={{

opacity:0,

y:30

}}



animate={{

opacity:1,

y:0

}}



transition={{

delay:index*0.05

}}



whileHover={{

y:-10

}}



className="
min-w-[170px]
sm:min-w-[190px]
md:min-w-[210px]
"

>



<MediaCard

movie={movie}

/>



</motion.div>



))

}



</div>







</section>


);

}
