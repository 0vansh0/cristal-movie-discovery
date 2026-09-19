import {
  memo,
  useState
} from "react";


import {
  motion
} from "framer-motion";





const PROFILE_BASE_URL =

"https://image.tmdb.org/t/p/w300";



const PLACEHOLDER =

"https://placehold.co/300x450/111827/ffffff?text=No+Image";









function CastCard({

person

}){


const [imageError,setImageError] =
useState(false);





const image =

!imageError && person.profile_path

?

`${PROFILE_BASE_URL}${person.profile_path}`

:

PLACEHOLDER;








return (

<motion.div

whileHover={{
y:-8,
scale:1.03
}}

transition={{
duration:.25
}}


className="
group
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/5
shadow-xl
backdrop-blur-xl
"

>





{/* IMAGE */}



<div className="
relative
aspect-[2/3]
overflow-hidden
"

>


<img

src={image}

alt={person.name || "Actor"}

loading="lazy"

onError={()=>setImageError(true)}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-110
"

/>





{/* IMAGE GRADIENT */}



<div className="
absolute
inset-x-0
bottom-0
h-32
bg-gradient-to-t
from-black
to-transparent
"

 />





</div>








{/* CONTENT */}



<div className="
space-y-1
p-4
"

>


<h3

className="
truncate
text-base
font-bold
text-white
"

>

{

person.name ||

"Unknown Actor"

}

</h3>





<p

className="
truncate
text-sm
text-gray-400
"

>

{

person.character ||

person.job ||

"Unknown Role"

}

</p>





</div>






</motion.div>


);


}




export default memo(CastCard);