import {
  Search,
  X,
  Film,
  Clock,
} from "lucide-react";


import {
  useEffect,
  useRef,
  useState,
} from "react";


import {
  motion,
  AnimatePresence,
} from "framer-motion";


import {
  useNavigate,
} from "react-router-dom";








export default function SearchModal({

open,

onClose

}){



const inputRef =
useRef();



const navigate =
useNavigate();



const [query,setQuery] =
useState("");



const [recent,setRecent] =
useState(

JSON.parse(

localStorage.getItem(
"recentSearches"
)

)||[]

);









// Focus input


useEffect(()=>{


if(open){


setTimeout(()=>{


inputRef.current?.focus();


},100);


}



},[open]);









// ESC Close


useEffect(()=>{


function handleKey(e){



if(e.key==="Escape"){


onClose();


}



}



window.addEventListener(

"keydown",

handleKey

);



return ()=>{


window.removeEventListener(

"keydown",

handleKey

);



}



},[onClose]);









function searchMovie(){



if(!query.trim())
return;




const updated=[


query,


...recent.filter(

item=>item!==query

)

].slice(0,5);





setRecent(updated);



localStorage.setItem(

"recentSearches",

JSON.stringify(updated)

);



navigate(

`/search?q=${query}`

);



onClose();



}









return (


<AnimatePresence>


{

open &&



<motion.div


initial={{

opacity:0

}}



animate={{

opacity:1

}}



exit={{

opacity:0

}}



className="
fixed
inset-0
z-[150]
bg-black/70
backdrop-blur-md
px-6
"

>









<motion.div


initial={{

y:-50,
opacity:0

}}



animate={{

y:0,
opacity:1

}}



exit={{

y:-50,
opacity:0

}}



className="
mx-auto
mt-24
max-w-3xl
rounded-[40px]
border
border-white/10
bg-white/5
p-8
backdrop-blur-3xl
"

>









<div

className="
flex
items-center
gap-4
"

>


<Search

className="
text-yellow-400
"

/>



<input


ref={inputRef}


value={query}


onChange={

e=>

setQuery(
e.target.value
)

}



onKeyDown={

e=>{

if(e.key==="Enter")

searchMovie();


}

}



placeholder="
Search movies, actors, directors...
"


className="
flex-1
bg-transparent
text-xl
outline-none
text-white
"

/>







<button


onClick={onClose}



className="
rounded-xl
p-2
hover:bg-white/10
"

>


<X/>


</button>



</div>









{/* Recent Searches */}





{

recent.length>0 &&



<div

className="
mt-8
"

>


<h3

className="
mb-4
flex
items-center
gap-2
text-sm
text-zinc-400
"

>


<Clock size={16}/>


Recent Searches


</h3>









<div

className="
flex
flex-wrap
gap-3
"

>


{

recent.map(

(item,index)=>(



<button


key={index}


onClick={()=>{


setQuery(item);


navigate(

`/search?q=${item}`

);



onClose();


}}



className="
rounded-xl
border
border-white/10
bg-white/5
px-4
py-2
text-sm
hover:bg-white/10
"

>


{item}


</button>



)


)



}



</div>



</div>


}









{/* Empty Search */}



{

query &&



<div

className="
mt-8
flex
items-center
gap-4
rounded-2xl
bg-black/30
p-5
"

>


<div

className="
rounded-xl
bg-yellow-400/20
p-3
"

>


<Film

className="
text-yellow-400
"

/>


</div>




<div>


<p

className="
font-bold
"

>


Search for:

</p>


<p

className="
text-zinc-400
"

>

{query}

</p>


</div>



</div>


}









</motion.div>






</motion.div>


}



</AnimatePresence>


);


}