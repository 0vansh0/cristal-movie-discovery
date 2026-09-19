import {
  motion
} from "framer-motion";





export default function EmptyState({

icon="📭",

title="Nothing Found",

description="There is no data available right now.",

actionText,

onAction,

className=""

}){





return (

<motion.section



initial={{

opacity:0,

scale:.95

}}



animate={{

opacity:1,

scale:1

}}



transition={{

duration:.4

}}



className={`

flex

min-h-[300px]

flex-col

items-center

justify-center

gap-5

rounded-3xl

border

border-white/10

bg-white/5

p-8

text-center

backdrop-blur-xl

${className}

`

}

>









{/* ICON */}



<motion.div


animate={{

y:[0,-8,0]

}}



transition={{

repeat:Infinity,

duration:2

}}



className="
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-white/10
text-5xl
"

>

{icon}

</motion.div>









{/* TITLE */}



<h2

className="
text-2xl
font-black
text-white
md:text-3xl
"

>

{title}

</h2>









{/* DESCRIPTION */}



<p

className="
max-w-md
text-sm
leading-relaxed
text-gray-400
md:text-base
"

>

{description}

</p>









{/* ACTION BUTTON */}



{

actionText && (



<motion.button



whileHover={{

scale:1.05

}}



whileTap={{

scale:.95

}}



onClick={onAction}



className="
rounded-full
bg-white
px-6
py-3
font-bold
text-black
transition
hover:bg-gray-200
"

>


{actionText}



</motion.button>



)

}





</motion.section>


);


}