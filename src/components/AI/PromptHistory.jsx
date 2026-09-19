import {
  Clock,
  Search,
  Trash2,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react";


import {
  useState,
} from "react";


import {
  motion,
} from "framer-motion";



export default function PromptHistory({

  history = [],

  onSelect,

  onDelete,

  onFavorite

}) {



const [query,setQuery] =
useState("");





const filteredHistory =
history.filter(item=>

item.prompt
.toLowerCase()
.includes(
query.toLowerCase()
)

);








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

<Clock

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

Prompt History

</h2>


<p

className="
text-zinc-400
"

>

Your AI discoveries

</p>


</div>


</div>









{/* Search */}



<div

className="
mb-8
flex
items-center
gap-3
rounded-2xl
border
border-white/10
bg-black/30
px-5
"

>


<Search

size={20}

className="
text-zinc-400
"

/>



<input


value={
query
}


onChange={
e=>
setQuery(
e.target.value
)
}


placeholder="
Search previous prompts...
"


className="
flex-1
bg-transparent
py-4
outline-none
"


/>


</div>









{/* History List */}



<div

className="
space-y-4
"

>


{

filteredHistory.length === 0 &&


<div

className="
rounded-3xl
bg-black/20
p-10
text-center
"

>


<Sparkles

size={40}

className="
mx-auto
mb-3
text-zinc-500
"

/>


<h3

className="
font-black
text-xl
"

>

No AI history

</h3>


<p

className="
mt-2
text-zinc-400
"

>

Start discovering movies with CRISTAL AI

</p>


</div>


}







{

filteredHistory.map(

(item,index)=>(


<motion.div


key={
item.id || index
}


initial={{
opacity:0,
x:-20
}}


animate={{
opacity:1,
x:0
}}



className="
flex
items-center
justify-between
gap-4
rounded-3xl
border
border-white/10
bg-black/20
p-5
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
h-12
w-12
items-center
justify-center
rounded-xl
bg-purple-500/20
"

>


<Sparkles

size={22}

className="
text-purple-400
"

/>


</div>







<div>


<h3

className="
font-bold
"

>

{
item.prompt
}

</h3>


<p

className="
mt-1
text-sm
text-zinc-500
"

>

{
item.date || 
"Recently"
}

</p>


</div>


</div>









{/* Actions */}



<div

className="
flex
gap-2
"

>


<button


onClick={()=>{

onSelect?.(
item.prompt
)

}}



className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-white/10
hover:bg-white/20
"

>

<RotateCcw size={18}/>

</button>







<button


onClick={()=>{

onFavorite?.(
item
)

}}


className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-yellow-400/20
"

>

<Star

size={18}

/>


</button>







<button


onClick={()=>{

onDelete?.(
item.id
)

}}



className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-red-500/20
"

>

<Trash2

size={18}

className="
text-red-400
"

/>


</button>






</div>




</motion.div>


)


)


}



</div>







</section>

);


}