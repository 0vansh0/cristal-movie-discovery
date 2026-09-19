import {
  Film,
  Home,
  Search,
  Clapperboard,
} from "lucide-react";


import {
  motion,
} from "framer-motion";



export default function NotFound(){



return (


<main

className="
min-h-screen
flex
items-center
justify-center
bg-black
px-6
text-white
overflow-hidden
"

>





{/* Background */}



<div

className="
absolute
h-[500px]
w-[500px]
rounded-full
bg-yellow-400/20
blur-3xl
"

></div>









<motion.section


initial={{

opacity:0,
y:40

}}



animate={{

opacity:1,
y:0

}}



className="
relative
max-w-xl
rounded-[45px]
border
border-white/10
bg-white/5
p-12
text-center
backdrop-blur-3xl
"

>








<div

className="
mx-auto
flex
h-24
w-24
items-center
justify-center
rounded-3xl
bg-yellow-400
"

>


<Film

size={45}

className="
text-black
"

/>


</div>









<h1

className="
mt-8
text-8xl
font-black
tracking-tighter
"

>

404

</h1>









<div

className="
mt-6
flex
items-center
justify-center
gap-3
"

>


<Clapperboard

className="
text-yellow-400
"

/>


<h2

className="
text-3xl
font-black
"

>

Scene Missing

</h2>


</div>









<p

className="
mt-5
text-lg
text-zinc-400
"

>

Looks like this scene does not exist
in the CRISTAL universe.

</p>









<div

className="
mt-10
flex
flex-col
gap-4
sm:flex-row
sm:justify-center
"

>









<a


href="/"



className="
flex
items-center
justify-center
gap-3
rounded-2xl
bg-yellow-400
px-7
py-4
font-black
text-black
"

>


<Home size={20}/>


Return Home


</a>









<a


href="/search"



className="
flex
items-center
justify-center
gap-3
rounded-2xl
border
border-white/10
bg-white/5
px-7
py-4
font-bold
"

>


<Search size={20}/>


Search Movies


</a>









</div>








</motion.section>






</main>


);


}