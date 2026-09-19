import {
  Sparkles,
  Flame,
  Heart,
  Brain,
  Trophy,
  Ghost,
  Rocket,
} from "lucide-react";

import {
  motion,
} from "framer-motion";



export default function SuggestionChips({

  onSelect

}) {



const suggestions = [

  {
    title:"Mind Bending Movies",
    icon:Brain,
    prompt:
    "Recommend mind bending movies like Inception"
  },


  {
    title:"Dark Thriller",
    icon:Ghost,
    prompt:
    "Suggest dark psychological thriller movies"
  },


  {
    title:"Feel Good Movies",
    icon:Heart,
    prompt:
    "Recommend emotional feel good movies"
  },


  {
    title:"Sci-Fi Universe",
    icon:Rocket,
    prompt:
    "Best science fiction movies"
  },


  {
    title:"Hidden Gems",
    icon:Sparkles,
    prompt:
    "Find underrated hidden gem movies"
  },


  {
    title:"Oscar Winners",
    icon:Trophy,
    prompt:
    "Recommend Oscar winning movies"
  },


  {
    title:"Trending Now",
    icon:Flame,
    prompt:
    "What movies are trending right now"
  }


];






return (


<section

className="
rounded-[35px]
border
border-white/10
bg-white/5
p-8
backdrop-blur-3xl
"

>


<div

className="
mb-6
flex
items-center
gap-3
"

>

<Sparkles

className="text-yellow-400"

/>


<h2

className="
text-2xl
font-black
"

>

Quick Discover

</h2>


</div>






<div

className="
grid
gap-4
sm:grid-cols-2
lg:grid-cols-3
"

>


{

suggestions.map(
(item,index)=>{


const Icon =
item.icon;



return (


<motion.button


key={
index
}


whileHover={{
scale:1.03
}}


whileTap={{
scale:.97
}}



onClick={()=>{

onSelect?.(
item.prompt
);

}}



className="
group
flex
items-center
gap-4
rounded-3xl
border
border-white/10
bg-black/20
p-5
text-left
transition
hover:bg-white/10
"

>



<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-purple-500/20
"

>

<Icon

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

{item.title}

</h3>


<p

className="
mt-1
text-xs
text-zinc-500
"

>

Ask AI

</p>


</div>



</motion.button>


)


}

)

}


</div>


</section>


);


}