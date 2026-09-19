import {
  useState,
} from "react";


import {
  Film,
  Rocket,
  Brain,
  Laugh,
  Ghost,
  Heart,
  Shield,
  Drama,
  Sparkles,
  Palette,
} from "lucide-react";


import {
  motion,
} from "framer-motion";



export default function GenreSelector({

  onGenerate

}) {



const [selected,setSelected] =
useState([]);





const genres = [


{
name:"Action",
icon:Shield
},


{
name:"Sci-Fi",
icon:Rocket
},


{
name:"Thriller",
icon:Brain
},


{
name:"Comedy",
icon:Laugh
},


{
name:"Horror",
icon:Ghost
},


{
name:"Romance",
icon:Heart
},


{
name:"Crime",
icon:Film
},


{
name:"Drama",
icon:Drama
},


{
name:"Fantasy",
icon:Sparkles
},


{
name:"Animation",
icon:Palette
}


];









function toggleGenre(genre){


if(
selected.includes(genre)
){

setSelected(

selected.filter(
item=>item!==genre
)

);

}

else{


setSelected([

...selected,

genre

]);


}


}








function generate(){


if(selected.length===0)
return;



const prompt =

`
Recommend movies with genres:
${selected.join(", ")}
`;



onGenerate?.(
prompt
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

<Film

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

Choose Genres

</h2>


<p

className="
text-zinc-400
"

>

Select multiple genres for AI discovery

</p>


</div>



</div>









<div

className="
grid
grid-cols-2
gap-4
sm:grid-cols-3
lg:grid-cols-5
"

>


{

genres.map(
(item,index)=>{


const Icon =
item.icon;


const active =
selected.includes(
item.name
);



return (


<motion.button


key={
index
}


whileHover={{
scale:1.05
}}


whileTap={{
scale:.95
}}



onClick={()=>{

toggleGenre(
item.name
);

}}



className={

`
flex
flex-col
items-center
gap-3
rounded-3xl
border
p-5
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


<Icon

size={28}

className={

active

?

"text-yellow-400"

:

"text-zinc-400"

}

/>



<span

className="
font-bold
"

>

{item.name}

</span>



</motion.button>


)


}

)

}



</div>









{/* Selected */}



{

selected.length>0 &&


<div

className="
mt-8
rounded-3xl
bg-purple-500/10
p-5
"

>


<p

className="
mb-3
text-sm
text-zinc-400
"

>

Selected Genres

</p>



<div

className="
flex
flex-wrap
gap-3
"

>


{

selected.map(
genre=>(


<span

key={
genre
}


className="
rounded-full
bg-white/10
px-4
py-2
"

>

{genre}

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


Generate AI Recommendations


</button>





</section>


);


}