import {
  Search,
  Star,
  Heart,
  MessageCircle,
  Edit3,
  Trash2,
  Sparkles,
} from "lucide-react";


import {
  useEffect,
  useState,
} from "react";


import {
  motion,
} from "framer-motion";

import { getMyReviews } from "../services/movieService";



export default function ReviewsPage(){



const [search,setSearch] =
useState("");
const [loading, setLoading] = useState(true);




const [reviews,setReviews] =
useState([


{
id:1,

title:"Interstellar",

poster:
"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",

rating:9,

review:
"A masterpiece of storytelling. The emotional depth and visuals are unforgettable.",

likes:245,

comments:32

},



{
id:2,

title:"Inception",

poster:
"https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",

rating:10,

review:
"Christopher Nolan created a perfect mind bending experience.",

likes:421,

comments:56

},



{
id:3,

title:"The Dark Knight",

poster:
"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",

rating:10,

review:
"One of the greatest superhero movies ever made.",

likes:512,

comments:90

}



]);









useEffect(() => {
  let active = true;

  async function loadReviews() {
    try {
      const data = await getMyReviews();
      if (active) {
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch {
      if (active) setReviews([]);
    } finally {
      if (active) setLoading(false);
    }
  }

  loadReviews();

  return () => {
    active = false;
  };
}, []);

function deleteReview(id){


setReviews(

reviews.filter(

item=>

item.id!==id

)

);


}









function editReview(id){


const text =
prompt(
"Edit your review"
);



if(!text)
return;



setReviews(

reviews.map(item=>

item.id===id

?

{

...item,

review:text

}

:

item


)

);



}









const filteredReviews =

reviews.filter(item=>

item.title
.toLowerCase()
.includes(

search.toLowerCase()

)

);









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








{/* Header */}



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
bg-purple-500/20
"

>


<Sparkles

size={32}

className="
text-purple-400
"

/>


</div>







<div>


<h1

className="
text-4xl
font-black
"

>

My Reviews

</h1>


<p

className="
text-zinc-400
"

>

Your cinematic thoughts and opinions

</p>


</div>



</div>









{/* Search */}



<div

className="
mt-10
flex
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
Search reviews...
"


className="
flex-1
bg-transparent
py-5
outline-none
"


/>



</div>









{/* Reviews */}



{loading ? (
  <div className="rounded-[35px] border border-white/10 bg-white/5 p-10 text-center text-zinc-300">
    Loading your reviews...
  </div>
) : filteredReviews.length > 0 ?



<div

className="
mt-10
space-y-8
"

>


{

filteredReviews.map(

(review,index)=>(


<motion.article


key={
review.id
}



initial={{

opacity:0,
x:-30

}}



animate={{

opacity:1,
x:0

}}



transition={{

delay:index*.1

}}



className="
flex
flex-col
gap-6
rounded-[35px]
border
border-white/10
bg-white/5
p-6
md:flex-row
"

>





<img

src={
review.poster
}


alt={
review.title
}


className="
h-64
w-44
rounded-3xl
object-cover
"

/>









<div

className="
flex-1
"

>



<h2

className="
text-3xl
font-black
"

>

{review.title}

</h2>









<div

className="
mt-3
flex
items-center
gap-2
text-yellow-400
"

>


<Star

size={20}

fill="currentColor"

/>



<span

className="
font-black
"

>

{review.rating}/10

</span>



</div>









<p

className="
mt-5
leading-relaxed
text-zinc-300
"

>

"{review.review}"

</p>









<div

className="
mt-6
flex
flex-wrap
gap-5
text-zinc-400
"

>


<span

className="
flex
items-center
gap-2
"

>

<Heart

size={18}

className="
text-red-400
"

/>


{review.likes}

</span>






<span

className="
flex
items-center
gap-2
"

>


<MessageCircle

size={18}
/>


{review.comments}

</span>



</div>









<div

className="
mt-6
flex
gap-4
"

>


<button


onClick={()=>editReview(review.id)}



className="
flex
items-center
gap-2
rounded-xl
bg-purple-500/20
px-5
py-3
"

>

<Edit3 size={18}/>

Edit

</button>







<button


onClick={()=>deleteReview(review.id)}



className="
flex
items-center
gap-2
rounded-xl
bg-red-500/20
px-5
py-3
"

>


<Trash2 size={18}/>

Delete

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

No Reviews Yet

</h2>


<p

className="
mt-3
text-zinc-400
"

>

Share your cinematic opinions.

</p>


</div>



}





</section>


</main>


);


}