import {
  Film
} from "lucide-react";


import {
  motion
} from "framer-motion";







export default function LoadingScreen(){


return (

<div

className="
fixed
inset-0
z-[999]
flex
items-center
justify-center
overflow-hidden
bg-[#050505]
text-white
"

>



{/* Ambient Background */}

<motion.div


animate={{

scale:[1,1.4,1],

opacity:[0.2,0.5,0.2]

}}



transition={{

duration:4,

repeat:Infinity

}}



className="
absolute
h-[500px]
w-[500px]
rounded-full
bg-red-500/20
blur-[120px]
"

/>







<motion.div


animate={{

rotate:360

}}



transition={{

duration:40,

repeat:Infinity,

ease:"linear"

}}



className="
absolute
h-[700px]
w-[700px]
rounded-full
border
border-white/5
"

/>








{/* Main Card */}


<motion.div



initial={{

opacity:0,

scale:.85,

y:30

}}



animate={{

opacity:1,

scale:1,

y:0

}}



transition={{

duration:.6

}}



className="
relative
flex
w-[90%]
max-w-md
flex-col
items-center
rounded-[40px]
border
border-white/10
bg-white/5
p-10
text-center
shadow-2xl
backdrop-blur-3xl
"

>







{/* Logo */}



<motion.div



animate={{

rotate:[0,10,-10,0]

}}



transition={{

duration:3,

repeat:Infinity

}}



className="
flex
h-28
w-28
items-center
justify-center
rounded-3xl
bg-white
shadow-[0_0_50px_rgba(255,255,255,.25)]
"

>


<Film

size={55}

className="text-black"

/>


</motion.div>







<h1

className="
mt-8
text-4xl
font-black
tracking-[0.3em]
"

>

CRISTAL

</h1>






<p

className="
mt-3
text-sm
text-zinc-400
"

>

Entering cinematic universe...

</p>








{/* Loading Bar */}



<div

className="
mt-8
h-2
w-full
overflow-hidden
rounded-full
bg-white/10
"

>


<motion.div


animate={{

x:["-100%","200%"]

}}



transition={{

duration:1.4,

repeat:Infinity,

ease:"linear"

}}



className="
h-full
w-1/2
rounded-full
bg-gradient-to-r
from-red-500
via-yellow-400
to-red-500
"

/>


</div>







<p

className="
mt-5
text-xs
text-zinc-500
"

>

Loading movies • actors • stories

</p>





</motion.div>




</div>

);

}