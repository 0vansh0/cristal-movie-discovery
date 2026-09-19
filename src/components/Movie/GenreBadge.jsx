import {
  motion
} from "framer-motion";





export default function GenreBadge({

genre,

size="medium",

active=false,

onClick

}){





if(!genre)

return null;






const sizes = {


small:

"px-3 py-1 text-xs",


medium:

"px-4 py-2 text-sm",


large:

"px-5 py-2.5 text-base"



};








return (

<motion.button


type="button"



whileHover={{

scale:1.05

}}



whileTap={{

scale:.95

}}



onClick={()=>onClick?.(genre)}



className={`
rounded-full
border
backdrop-blur-xl
transition
font-semibold
text-white

${sizes[size]}

${

active

?

"border-red-500 bg-red-600/30 text-red-300 shadow-[0_0_20px_rgba(239,68,68,.35)]"

:

"border-white/10 bg-white/5 hover:bg-white/15"

}

`}



>





{genre.name}



</motion.button>


);


}