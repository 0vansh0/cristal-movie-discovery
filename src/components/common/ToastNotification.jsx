import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";


import {
  motion,
} from "framer-motion";







const styles = {


success:{

icon:CheckCircle,

color:"text-green-400",

bg:"bg-green-500/10"


},



error:{

icon:XCircle,

color:"text-red-400",

bg:"bg-red-500/10"


},



warning:{

icon:AlertTriangle,

color:"text-yellow-400",

bg:"bg-yellow-400/10"


},



info:{

icon:Info,

color:"text-blue-400",

bg:"bg-blue-500/10"


}


};









export default function ToastNotification({

type="success",

message,

onClose

}){



const Style =
styles[type];



const Icon =
Style.icon;







return (



<motion.div


initial={{

opacity:0,
x:100

}}



animate={{

opacity:1,
x:0

}}



exit={{

opacity:0,
x:100

}}



className="
fixed
right-6
top-6
z-[100]
flex
w-full
max-w-sm
items-center
gap-4
rounded-3xl
border
border-white/10
bg-black/70
p-5
shadow-2xl
backdrop-blur-3xl
"

>









<div

className={

`
flex
h-12
w-12
items-center
justify-center
rounded-2xl
${Style.bg}
`

}

>


<Icon

size={25}

className={Style.color}


/>


</div>









<p

className="
flex-1
text-sm
font-semibold
text-white
"

>

{message}

</p>









<button


onClick={onClose}



className="
rounded-xl
p-2
text-zinc-400
hover:bg-white/10
hover:text-white
"

>


<X size={18}/>


</button>







</motion.div>


);


}