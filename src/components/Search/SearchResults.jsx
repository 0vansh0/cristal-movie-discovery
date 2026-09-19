import { 
  motion, 
  AnimatePresence 
} from "framer-motion";


import SearchCard from "./SearchCard";

import SearchEmpty from "./SearchEmpty";

import SearchLoading from "./SearchLoading";



export default function SearchResults({

  results = [],

  loading = false,

  view = "grid",

  onMovieClick,

  onSelect,

}) {



const handleClick = 
onSelect || onMovieClick;



// ========================
// STATES
// ========================


if(loading){

return (

<SearchLoading

view={view}

/>

);

}



if(!results.length){

return (

<SearchEmpty />

);

}





// ========================
// ANIMATIONS
// ========================


const containerVariants = {

hidden:{},

show:{

transition:{

staggerChildren:0.06

}

}

};



const itemVariants = {


hidden:{

opacity:0,

y:30,

scale:0.96

},



show:{

opacity:1,

y:0,

scale:1,


transition:{

duration:0.35,

ease:"easeOut"

}

}

};






// ========================
// VIEW STYLE
// ========================


const viewClasses = {


grid:

`
grid
grid-cols-2
sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-5
xl:grid-cols-6
gap-6
`,



list:

`
flex
flex-col
gap-5
`,



compact:

`
grid
grid-cols-2
sm:grid-cols-4
md:grid-cols-5
lg:grid-cols-6
xl:grid-cols-8
gap-5
`


};





return (

<motion.section


initial="hidden"

animate="show"

variants={containerVariants}


className="
mt-10
"

>





{/* HEADER */}


<div

className="
mb-8
flex
items-center
justify-between
"

>


<h2

className="
text-2xl
font-black
tracking-tight
md:text-3xl
"

>

Search Results

</h2>




<div

className="
rounded-full
border
border-white/10
bg-white/5
px-4
py-2
text-sm
text-zinc-400
backdrop-blur-md
"

>

{

results.length.toLocaleString()

}

&nbsp;

Results

</div>



</div>








{/* RESULTS CONTAINER */}



<motion.div


layout


variants={containerVariants}


className={

viewClasses[view] ||

viewClasses.grid

}



>



<AnimatePresence mode="popLayout">


{

results.map((movie)=>{


return (

<motion.div


key={

`${movie.media_type || "movie"}-${movie.id}`

}



layout


variants={itemVariants}


initial="hidden"

animate="show"


exit={{

opacity:0,

scale:0.9

}}



onClick={()=>handleClick?.(movie)}



className="
cursor-pointer
"

>


<SearchCard


movie={movie}


view={view}



/>



</motion.div>

);


})

}



</AnimatePresence>



</motion.div>








{/* LOAD MORE INDICATOR */}



<div

id="search-load-more"

className="
mt-20
flex
justify-center
"

>


<motion.div


animate={{

opacity:[0.3,0.8,0.3]

}}



transition={{

duration:2,

repeat:Infinity

}}



className="
h-1.5
w-44
rounded-full
bg-gradient-to-r
from-transparent
via-[#FFD464]/50
to-transparent
"

>


</motion.div>


</div>




</motion.section>


);


}