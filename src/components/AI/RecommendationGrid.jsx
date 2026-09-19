import {
  Star,
  Heart,
  Bookmark,
  Play,
  Sparkles,
} from "lucide-react";


import {
  motion,
} from "framer-motion";



export default function RecommendationGrid({

  movies = [],

  onFavorite,

  onWatchlist,

  onTrailer,

}) {



return (

<section

className="
rounded-[40px]
border
border-white/10
bg-white/5
p-8
backdrop-blur-3xl
"

>



{/* Header */}


<div

className="
mb-8
flex
items-center
gap-4
"

>

<div

className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-yellow-400/20
"

>

<Sparkles

className="
text-yellow-400
"

/>

</div>



<div>

<h2

className="
text-3xl
font-black
"

>

AI Recommendations

</h2>


<p

className="
text-zinc-400
"

>

Curated specially for you

</p>


</div>


</div>








{/* Movies */}



<div

className="
grid
gap-8
sm:grid-cols-2
xl:grid-cols-4
"

>


{

movies.map(
(movie,index)=>(


<motion.article


key={
movie.id || index
}


initial={{
opacity:0,
y:30
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index*.08
}}



whileHover={{
y:-10
}}


className="
overflow-hidden
rounded-[30px]
border
border-white/10
bg-black/30
"

>





{/* Poster */}



<div

className="
relative
"

>


<img

src={
movie.poster
}

alt={
movie.title
}


className="
h-80
w-full
object-cover
"

/>





{/* Match Score */}


<div

className="
absolute
right-4
top-4
rounded-full
bg-yellow-400
px-4
py-2
font-black
text-black
"

>

{movie.match || 95}%

Match

</div>



</div>







{/* Content */}



<div

className="
space-y-4
p-5
"

>


<h3

className="
text-xl
font-black
"

>

{
movie.title
}

</h3>




<div

className="
flex
items-center
gap-2
text-yellow-400
"

>

<Star

size={18}

fill="currentColor"

/>


{
movie.rating || 
movie.vote_average
}



</div>







{/* Genres */}


<div

className="
flex
flex-wrap
gap-2
"

>


{

movie.genres?.map(
genre=>(


<span

key={
genre
}

className="
rounded-full
bg-white/10
px-3
py-1
text-xs
"

>

{genre}

</span>


)

)

}



</div>







{/* AI Reason */}



<div

className="
rounded-2xl
bg-purple-500/10
p-4
"

>


<p

className="
text-sm
text-zinc-300
"

>

🧠

{

movie.reason ||

"AI selected this because it matches your taste."

}


</p>


</div>








{/* Actions */}



<div

className="
flex
gap-3
"

>


<button


onClick={()=>{

onFavorite?.(
movie
)

}}



className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
bg-white/10
py-3
transition
hover:bg-white/20
"

>


<Heart size={18}/>


</button>







<button


onClick={()=>{

onWatchlist?.(
movie
)

}}


className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
bg-white/10
py-3
transition
hover:bg-white/20
"

>


<Bookmark size={18}/>


</button>







<button


onClick={()=>{

onTrailer?.(
movie
)

}}


className="
flex
flex-1
items-center
justify-center
rounded-xl
bg-yellow-400
text-black
"

>


<Play

size={18}

fill="currentColor"

/>


</button>



</div>



</div>




</motion.article>


)

)

}



</div>






{
movies.length===0 &&

<div

className="
rounded-3xl
bg-white/5
p-12
text-center
"

>


<Sparkles

size={45}

className="
mx-auto
mb-4
text-zinc-500
"

/>


<h3

className="
text-2xl
font-black
"

>

No Recommendations Yet

</h3>


<p

className="
mt-2
text-zinc-400
"

>

Ask CRISTAL AI to discover movies.

</p>


</div>

}




</section>


);


}