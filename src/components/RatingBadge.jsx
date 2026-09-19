import {
  motion
} from "framer-motion";





export default function RatingBadge({

source="tmdb",

value=0,

max=10,

size="normal"

}){






const rating =

Number(value || 0).toFixed(1);






const percentage =

(Number(value)/Number(max))*100;







function getStyle(){


if(source==="imdb"){


return {

icon:"⭐",

label:"IMDb",

color:"text-yellow-400",

bg:"bg-yellow-400/20"

};


}




if(source==="rt"){


return {


icon:"🍅",

label:"RT",

color:

percentage>=75

?

"text-green-400"

:

"text-red-400",


bg:

percentage>=75

?

"bg-green-500/20"

:

"bg-red-500/20"


};


}







if(source==="meta"){


return {


icon:"M",

label:"Metacritic",

color:"text-green-300",

bg:"bg-green-500/20"


};


}







return {


icon:"★",

label:"TMDB",

color:"text-orange-400",

bg:"bg-orange-500/20"


};



}








const style=getStyle();








return (


<motion.div


initial={{

opacity:0,

scale:.8

}}



animate={{

opacity:1,

scale:1

}}



transition={{

duration:.25

}}



className={`
inline-flex
items-center
gap-2
rounded-full
border
border-white/10
${style.bg}
px-3
py-1.5
font-bold
backdrop-blur-xl
${

size==="large"

?

"text-base"

:

"text-xs"

}
`}



>





<span>

{style.icon}

</span>






<span

className={style.color}

>

{rating}

</span>






<span

className="
text-gray-400
"

>

/

{max}

</span>





</motion.div>


);


}