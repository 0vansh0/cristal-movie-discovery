import {
  Star,
  Heart,
  Play,
  Sparkles,
  Users,
  Brain,
} from "lucide-react";


import {
  motion,
} from "framer-motion";



export default function SimilarMovies({

  movies = [],

  sourceMovie,

  onFavorite,

  onTrailer

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
bg-purple-500/20
"

>

<Sparkles

className="
text-purple-400
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

Movies Like This

</h2>



<p

className="
text-zinc-400
"

>

AI discovered similar cinematic experiences

</p>


</div>


</div>









{/* Source Movie */}



{
sourceMovie &&


<div

className="
mb-8
flex
items-center
gap-5
rounded-3xl
bg-black/30
p-5
"

>


<img

src={
sourceMovie.poster
}

className="
h-24
w-16
rounded-xl
object-cover
"

/>




<div>


<p

className="
text-sm
text-zinc-400
"

>

Based on

</p>



<h3

className="
text-xl
font-black
"

>

{
sourceMovie.title
}

</h3>


</div>


</div>


}










{/* Similar Grid */}



<div

className="
grid
gap-7
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

delay:index*.1

}}



whileHover={{

y:-8

}}



className="
overflow-hidden
rounded-[30px]
border
border-white/10
bg-black/30
"

>







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
h-72
w-full
object-cover
"

/>





{/* Similarity */}



<div

className="
absolute
right-4
top-4
rounded-full
bg-purple-500
px-4
py-2
font-black
"

>

{movie.similarity || 90}%

</div>


</div>









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

{movie.title}

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

size={17}

fill="currentColor"

/>


{
movie.rating ||
movie.vote_average
}


</div>









{/* AI Explanation */}



<div

className="
space-y-3
rounded-2xl
bg-purple-500/10
p-4
"

>



<div

className="
flex
items-center
gap-2
text-sm
"

>

<Brain

size={16}

/>


AI Match

</div>





<p

className="
text-sm
text-zinc-300
"

>

{
movie.reason ||

"Similar story, atmosphere and themes"

}

</p>



</div>










{/* Shared Info */}



<div

className="
space-y-2
text-sm
text-zinc-400
"

>


{
movie.sharedThemes &&

<div
className="
flex
gap-2
"

>

<Sparkles size={15}/>

{movie.sharedThemes}

</div>

}





{
movie.sharedCast &&

<div

className="
flex
gap-2
"

>

<Users size={15}/>

{movie.sharedCast}

</div>

}



</div>










{/* Actions */}



<div

className="
mt-5
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
rounded-xl
bg-white/10
py-3
"

>

<Heart size={18}/>

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

No Similar Movies Found

</h3>


<p

className="
mt-2
text-zinc-400
"

>

AI will discover movies after analysis.

</p>


</div>


}





</section>


);


}