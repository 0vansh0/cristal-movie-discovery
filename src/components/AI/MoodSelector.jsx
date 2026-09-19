import {
  Smile,
  Heart,
  Brain,
  Ghost,
  Flame,
  CloudMoon,
  Search,
  Laugh,
} from "lucide-react";


import {
  motion,
} from "framer-motion";



export default function MoodSelector({

  onSelect

}) {



const moods = [


{
 name:"Happy",
 icon:Smile,
 color:"yellow",
 prompt:
 "Recommend happy and fun movies"
},


{
 name:"Emotional",
 icon:Heart,
 color:"pink",
 prompt:
 "Recommend emotional movies that touch the heart"
},



{
 name:"Mind Blowing",
 icon:Brain,
 color:"purple",
 prompt:
 "Recommend mind bending movies with twists"
},



{
 name:"Scary",
 icon:Ghost,
 color:"red",
 prompt:
 "Recommend scary horror movies"
},



{
 name:"Adrenaline",
 icon:Flame,
 color:"orange",
 prompt:
 "Recommend action packed adrenaline movies"
},



{
 name:"Romantic",
 icon:Heart,
 color:"rose",
 prompt:
 "Recommend romantic love story movies"
},



{
 name:"Relaxing",
 icon:CloudMoon,
 color:"blue",
 prompt:
 "Recommend calm relaxing movies"
},



{
 name:"Mystery",
 icon:Search,
 color:"green",
 prompt:
 "Recommend mystery detective movies"
},



];








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
gap-3
"

>


<Laugh

className="
text-yellow-400
"

/>



<div>

<h2

className="
text-3xl
font-black
"

>

How are you feeling?

</h2>



<p

className="
text-zinc-400
"

>

Choose your mood and let AI decide.

</p>


</div>



</div>







<div

className="
grid
gap-5
grid-cols-2
md:grid-cols-4
"

>


{

moods.map(
(mood,index)=>{


const Icon =
mood.icon;



return (


<motion.button


key={
index
}


whileHover={{
scale:1.08,
y:-5
}}


whileTap={{
scale:.95
}}



onClick={()=>{

onSelect?.(
mood.prompt
);

}}



className="
group
flex
flex-col
items-center
justify-center
gap-3
rounded-3xl
border
border-white/10
bg-black/20
p-6
transition
hover:bg-white/10
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

<Icon

size={28}

className="
text-purple-400
"

/>


</div>






<span

className="
font-bold
"

>

{mood.name}

</span>



</motion.button>


)

}

)


}


</div>





</section>


);


}