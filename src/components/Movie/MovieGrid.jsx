import {
  motion
} from "framer-motion";


import MediaCard from "./MovieCard";

import EmptyState from "../common/EmptyState";

import {
  MovieSkeleton
} from "../common/Loader";








export default function MovieGrid({

movies=[],

loading=false,

emptyTitle="No Movies Found",

emptyDescription="Try changing your filters or search query.",

onFavorite,

onWatchlist,

favorites=[],

watchlist=[]

}){







if(loading){


return (

<div

className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-5
xl:grid-cols-6
"

>





{

Array.from({

length:12

}).map((_,index)=>(


<MovieSkeleton

key={index}

/>


))


}



</div>


);


}








if(!movies.length){


return (

<EmptyState


icon="🎬"


title={emptyTitle}


description={emptyDescription}


/>

);


}










return (



<motion.div


initial="hidden"


animate="show"



variants={{

hidden:{},

show:{

transition:{

staggerChildren:.05

}

}

}}



className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-5
xl:grid-cols-6
2xl:grid-cols-7
"



>






{

movies.map((movie)=>(



<motion.div



key={movie.id}



variants={{

hidden:{

opacity:0,

y:30

},



show:{

opacity:1,

y:0

}



}}



>



<MediaCard


movie={movie}



isFavorite={

favorites.includes(movie.id)

}



isWatchlisted={

watchlist.includes(movie.id)

}



onFavorite={onFavorite}



onWatchlist={onWatchlist}



/>



</motion.div>



))


}






</motion.div>
);
}