import {
  AlertTriangle,
  X,
} from "lucide-react";


import {
  motion,
  AnimatePresence,
} from "framer-motion";







export default function ConfirmModal({

open,

title="Are you sure?",

message="This action cannot be undone.",

confirmText="Confirm",

cancelText="Cancel",

onConfirm,

onCancel,

danger=true

}){



if(!open)
return null;









return (


<AnimatePresence>


<motion.div


initial={{

opacity:0

}}



animate={{

opacity:1

}}



exit={{

opacity:0

}}



className="
fixed
inset-0
z-[200]
flex
items-center
justify-center
bg-black/70
px-6
backdrop-blur-md
"

>









<motion.div


initial={{

scale:.8,
y:30

}}



animate={{

scale:1,
y:0

}}



exit={{

scale:.8,
y:30

}}



className="
relative
w-full
max-w-md
rounded-[40px]
border
border-white/10
bg-white/5
p-8
text-white
backdrop-blur-3xl
"

>









{/* Close Button */}



<button


onClick={onCancel}



className="
absolute
right-5
top-5
rounded-xl
p-2
text-zinc-400
hover:bg-white/10
hover:text-white
"

>


<X size={20}/>


</button>









{/* Icon */}



<div

className={

`
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-3xl
${
danger

?

"bg-red-500/20"

:

"bg-yellow-400/20"

}
`

}

>


<AlertTriangle


size={40}


className={

danger

?

"text-red-400"

:

"text-yellow-400"

}


/>


</div>









<h2

className="
mt-7
text-center
text-3xl
font-black
"

>

{title}

</h2>









<p

className="
mt-4
text-center
text-zinc-400
"

>

{message}

</p>









<div

className="
mt-8
flex
gap-4
"

>









<button


onClick={onCancel}



className="
flex-1
rounded-2xl
border
border-white/10
bg-white/5
py-4
font-bold
hover:bg-white/10
"

>


{cancelText}


</button>









<button


onClick={onConfirm}



className={

`
flex-1
rounded-2xl
py-4
font-black
text-black

${
danger

?

"bg-red-400"

:

"bg-yellow-400"

}

`

}


>


{confirmText}


</button>









</div>








</motion.div>






</motion.div>


</AnimatePresence>


);


}