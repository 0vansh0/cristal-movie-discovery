import {
  useState,
} from "react";


import {
  Play,
  Tv,
  Check,
  Sparkles,
  Search,
} from "lucide-react";


import {
  motion,
} from "framer-motion";



export default function StreamingSelector({

  onGenerate

}) {



const [selected,setSelected] =
useState([]);





const platforms = [


{
name:"Netflix",
icon:"🍿",
description:"Movies & Originals"
},


{
name:"Prime Video",
icon:"▶️",
description:"Amazon Library"
},


{
name:"Disney+",
icon:"✨",
description:"Marvel & Family"
},


{
name:"Apple TV+",
icon:"",
description:"Premium Originals"
},


{
name:"HBO Max",
icon:"🎬",
description:"Award Winning"
},


{
name:"YouTube Movies",
icon:"▶",
description:"Rent & Buy"
},


{
name:"Free Streaming",
icon:"🆓",
description:"No Subscription"
}


];








function toggle(platform){


if(
selected.includes(platform)
){


setSelected(

selected.filter(
item=>item!==platform
)

);


}

else{


setSelected([

...selected,

platform

]);


}


}








function generate(){


if(selected.length===0)
return;



onGenerate?.(

`
Recommend movies available on:
${selected.join(", ")}
`

);


}









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

<Tv

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

Where Do You Watch?

</h2>



<p

className="
text-zinc-400
"

>

Choose streaming platforms

</p>


</div>



</div>









{/* Providers */}



<div

className="
grid
gap-5
sm:grid-cols-2
lg:grid-cols-3
"

>


{

platforms.map(
(platform,index)=>{


const active =
selected.includes(
platform.name
);



return (


<motion.button


key={
index
}


whileHover={{
scale:1.04
}}


whileTap={{
scale:.96
}}



onClick={()=>{

toggle(
platform.name
)

}}



className={

`
relative
rounded-3xl
border
p-6
text-left
transition


${
active

?

"border-yellow-400 bg-yellow-400/20"

:

"border-white/10 bg-black/20"

}

`

}



>


{
active &&


<div

className="
absolute
right-4
top-4
flex
h-7
w-7
items-center
justify-center
rounded-full
bg-yellow-400
text-black
"

>

<Check

size={16}

/>

</div>


}





<div

className="
text-4xl
"

>

{platform.icon}

</div>




<h3

className="
mt-4
text-xl
font-black
"

>

{platform.name}

</h3>




<p

className="
mt-2
text-sm
text-zinc-400
"

>

{platform.description}

</p>



</motion.button>


)


}

)

}


</div>









{/* Selected Platforms */}


{

selected.length>0 &&


<div

className="
mt-8
rounded-3xl
bg-yellow-400/10
p-5
"

>


<div

className="
flex
items-center
gap-2
"

>

<Search

size={18}

/>


<span>

Selected Platforms

</span>


</div>





<div

className="
mt-4
flex
flex-wrap
gap-3
"

>


{

selected.map(
item=>(


<span

key={
item
}

className="
rounded-full
bg-white/10
px-4
py-2
"

>

{item}

</span>


)

)

}


</div>



</div>


}









<button


onClick={generate}



disabled={
selected.length===0
}


className="
mt-8
flex
w-full
items-center
justify-center
gap-3
rounded-2xl
bg-yellow-400
py-4
font-black
text-black
disabled:opacity-40
"

>


<Sparkles/>

Find Movies On My Platforms


</button>





</section>

);


}