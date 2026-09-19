import {
  Star,
  Search,
  Trash2,
  Edit3,
  Sparkles,
  TrendingUp,
} from "lucide-react";


import {
  useState,
  useEffect,
} from "react";


import {
  motion,
} from "framer-motion";

import { getMyRatings, rateMovie } from "../services/movieService";


export default function RatingsPage(){



const [search,setSearch] =
useState("");



const [filter,setFilter] =
useState("All");

const [loading,setLoading] =
useState(true);

const [error,setError] =
useState("");



const [ratings,setRatings] =
useState([]);

useEffect(()=>{
let active = true;

async function loadRatings(){
try{
setLoading(true);
setError("");
const response = await getMyRatings();
const items = Array.isArray(response)
? response
: response?.ratings || response?.items || [];

if(active) setRatings(items);
}
catch(loadError){
if(active) setError(loadError?.message || "Unable to load your ratings.");
}
finally{
if(active) setLoading(false);
}
}

loadRatings();

return ()=>{
active = false;
};
},[]);

async function deleteRating(id){


setRatings(

ratings.filter(

movie=>

movie.id !== id

)

);

try{
await rateMovie(id, 0);
}
catch(deleteError){
setError(deleteError?.message || "Unable to update this rating.");
}


}









async function editRating(id){
const value =
prompt(
"Enter new rating (1-10)"
);



if(!value)
return;



setRatings(
ratings.map(movie=>movie.id===id
? {...movie, rating:Number(value)}
: movie)
);

try{
await rateMovie(id, Number(value));
}
catch(editError){
setError(editError?.message || "Unable to save this rating.");
}

}





const filteredRatings =

ratings

.filter(movie=>

movie.title
.toLowerCase()
.includes(
search.toLowerCase()
)

)



.filter(movie=>

filter==="All"

?

true

:

movie.rating >= Number(filter)

);








const average =


ratings.length

?

(
ratings.reduce(

(sum,movie)=>

sum + movie.rating,

0

)

/
ratings.length

).toFixed(1)


:

0;









return (


<main

className="
min-h-screen
bg-black
px-6
py-10
text-white
"

>



<section

className="
mx-auto
max-w-7xl
"
>


{loading && (
<p className="mb-6 text-sm text-zinc-400" role="status">
Loading your ratings...
</p>
)}

{error && (
<p className="mb-6 text-sm text-red-300" role="alert">
{error}
</p>
)}






{/* Header */}



<div

className="
flex
items-center
justify-between
"

>


<div

className="
flex
items-center
gap-4
"

>


<div

className="
flex
h-16
w-16
items-center
justify-center
rounded-3xl
bg-yellow-400/20
"

>

<Star

size={32}

className="
text-yellow-400
"

fill="currentColor"

/>

</div>







<div>


<h1

className="
text-4xl
font-black
"

>

My Ratings

</h1>



<p

className="
text-zinc-400
"

>

Your movie rating history

</p>


</div>



</div>







{/* Average */}



<div

className="
hidden
items-center
gap-3
rounded-3xl
bg-yellow-400/10
px-6
py-4
md:flex
"

>


<TrendingUp

className="
text-yellow-400
"

/>


<div>


<p

className="
text-sm
text-zinc-400
"

>

Average Score

</p>


<h2

className="
text-3xl
font-black
"

>

{average}/10

</h2>


</div>


</div>



</div>









{/* Search + Filter */}



<div

className="
mt-10
flex
flex-col
gap-5
md:flex-row
"

>



<div

className="
flex
flex-1
items-center
gap-3
rounded-3xl
border
border-white/10
bg-white/5
px-5
"

>


<Search

className="
text-zinc-400
"

/>



<input


value={
search
}


onChange={

e=>

setSearch(
e.target.value
)

}



placeholder="
Search rated movies...
"


className="
flex-1
bg-transparent
py-5
outline-none
"


/>


</div>








<select


value={
filter
}


onChange={

e=>

setFilter(
e.target.value
)

}



className="
rounded-3xl
border
border-white/10
bg-white/5
px-6
text-white
outline-none
"


>


<option value="All">
All Ratings
</option>


<option value="9">
9+ ⭐
</option>


<option value="8">
8+ ⭐
</option>


<option value="7">
7+ ⭐
</option>



</select>



</div>









{/* Rating Cards */}



{

filteredRatings.length > 0 ?


<div

className="
mt-10
grid
gap-8
sm:grid-cols-2
lg:grid-cols-4
"

>


{

filteredRatings.map(

(movie,index)=>(


<motion.article


key={
movie.id
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

y:-10

}}



className="
overflow-hidden
rounded-[35px]
border
border-white/10
bg-white/5
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
h-96
w-full
object-cover
"

/>








<div

className="
space-y-4
p-5
"

>



<h2

className="
text-xl
font-black
"

>

{movie.title}

</h2>








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



<span

className="
font-black
"

>

{movie.rating}/10

</span>


</div>









<span

className="
inline-block
rounded-full
bg-white/10
px-4
py-2
text-sm
"

>

{movie.genre}

</span>









<p

className="
text-sm
text-zinc-500
"

>

Rated on {movie.date}

</p>









<div

className="
flex
gap-3
"

>


<button


onClick={()=>editRating(movie.id)}



className="
flex
flex-1
items-center
justify-center
rounded-xl
bg-purple-500/20
py-3
"

>


<Edit3

size={18}

/>


</button>







<button


onClick={()=>deleteRating(movie.id)}



className="
flex
flex-1
items-center
justify-center
rounded-xl
bg-red-500/20
py-3
"

>


<Trash2

size={18}

/>


</button>



</div>





</div>






</motion.article>


)


)


}



</div>



:


<div

className="
mt-10
rounded-[40px]
border
border-white/10
bg-white/5
p-16
text-center
"

>


<Sparkles

size={50}

className="
mx-auto
mb-5
text-zinc-500
"

/>



<h2

className="
text-3xl
font-black
"

>

No Ratings Found

</h2>



<p

className="
mt-3
text-zinc-400
"

>

Rate movies to build your cinematic profile.

</p>


</div>



}





</section>


</main>


);


}