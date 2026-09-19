import {
  Bot,
  Brain,
  Search,
  Sparkles,
  Film,
  Check,
} from "lucide-react";


import {
  motion,
} from "framer-motion";


import {
  useEffect,
  useState,
} from "react";



export default function AIThinking({

  message =
  "CRISTAL AI is thinking..."

}) {



const steps = [

  {
    text:"Understanding your preferences",
    icon:Brain
  },


  {
    text:"Analyzing cinematic patterns",
    icon:Search
  },


  {
    text:"Comparing genres and themes",
    icon:Film
  },


  {
    text:"Building personalized recommendations",
    icon:Sparkles
  }

];





const [active,setActive] =
useState(0);






useEffect(()=>{


const timer =
setInterval(()=>{


setActive(prev=>{


if(prev < steps.length-1)

return prev+1;


return prev;


});


},1200);



return ()=>clearInterval(timer);


},[]);








return (

<section

className="
relative
overflow-hidden
rounded-[40px]
border
border-white/10
bg-white/5
p-10
backdrop-blur-3xl
"

>





{/* Background Animation */}



<div

className="
absolute
inset-0
bg-gradient-to-br
from-purple-500/20
via-transparent
to-yellow-400/20
blur-3xl
"

/>










<div

className="
relative
z-10
mx-auto
max-w-xl
text-center
"

>





{/* AI Icon */}



<motion.div


animate={{

scale:[1,1.1,1],

rotate:[0,10,-10,0]

}}


transition={{

duration:3,

repeat:Infinity

}}



className="
mx-auto
mb-8
flex
h-28
w-28
items-center
justify-center
rounded-full
bg-gradient-to-br
from-purple-500
to-yellow-400
shadow-2xl
"

>


<Bot

size={55}

className="
text-black
"

/>


</motion.div>







<h2

className="
text-4xl
font-black
"

>

{message}

</h2>






<div

className="
mt-3
flex
justify-center
gap-1
"

>


<span className="animate-bounce">
•
</span>

<span className="animate-bounce delay-100">
•
</span>

<span className="animate-bounce delay-200">
•
</span>


</div>









{/* Steps */}



<div

className="
mt-10
space-y-4
text-left
"

>


{

steps.map(
(step,index)=>{


const Icon =
step.icon;



const completed =
index < active;



const current =
index === active;



return (


<motion.div


key={
index
}


animate={{

opacity:
current || completed
?
1
:
0.4

}}



className={

`
flex
items-center
gap-4
rounded-2xl
border
p-5

${
current

?

"border-yellow-400 bg-yellow-400/10"

:

"border-white/10 bg-black/20"

}

`

}



>


<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-white/10
"

>


{

completed ?


<Check

size={20}

className="
text-green-400
"

/>


:

<Icon

size={20}

className="
text-purple-400
"

/>


}



</div>





<span

className="
font-semibold
"

>

{step.text}

</span>



</motion.div>


)


}

)


}



</div>








{/* AI Brain Waves */}



<div

className="
mt-10
flex
justify-center
gap-2
"

>


{

Array.from({
length:8
})
.map((_,i)=>(


<motion.span


key={i}


animate={{

height:[
10,
40,
10
]

}}


transition={{

duration:1,

repeat:Infinity,

delay:i*.1

}}



className="
w-2
rounded-full
bg-purple-400
"

style={{

height:"20px"

}}


/>


))


}


</div>





</div>



</section>


);


}