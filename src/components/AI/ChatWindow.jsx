import {
  Bot,
  User,
  Sparkles,
} from "lucide-react";


import {
  motion,
} from "framer-motion";



export default function ChatWindow({

  messages = [],

  loading = false,

}) {



return (

<section

className="
relative
h-[650px]
overflow-hidden
rounded-[40px]
border
border-white/10
bg-white/5
backdrop-blur-3xl
"

>


{/* Header */}

<div

className="
flex
items-center
gap-4
border-b
border-white/10
p-6
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
bg-gradient-to-br
from-purple-500
to-yellow-400
"

>

<Bot
className="text-black"
/>

</div>



<div>

<h2
className="
text-2xl
font-black
"
>

CRISTAL AI

</h2>


<p
className="
text-sm
text-zinc-400
"
>

Your cinematic companion

</p>


</div>



</div>







{/* Messages */}


<div

className="
h-[520px]
space-y-6
overflow-y-auto
p-6
"

>


{
messages.length === 0 &&

<div

className="
flex
h-full
flex-col
items-center
justify-center
text-center
"

>


<Sparkles

size={50}

className="
mb-5
text-yellow-400
"

/>


<h3

className="
text-3xl
font-black
"

>

Ask me anything about movies

</h3>


<p
className="
mt-3
text-zinc-400
"
>

Example:
"Recommend mind bending movies"

</p>


</div>

}





{
messages.map(
(message,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.3
}}

className={

`
flex
gap-4

${
message.role==="user"

?

"justify-end"

:

"justify-start"

}

`

}


>


{
message.role==="ai"

&&

<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-purple-500/20
"

>

<Bot
size={20}
className="text-purple-400"
/>


</div>

}







<div

className={

`
max-w-[75%]
rounded-3xl
px-6
py-4

${
message.role==="user"

?

"bg-yellow-400 text-black"

:

"bg-white/10"

}

`

}

>


<p
className="
leading-7
"
>

{
message.content
}

</p>





{/* Movie Results */}

{
message.movies &&


<div

className="
mt-5
grid
gap-4
sm:grid-cols-2
"

>

{
message.movies.map(movie=>(


<div

key={movie.id}

className="
overflow-hidden
rounded-2xl
bg-black/30
"

>


<img

src={movie.poster}

alt={movie.title}

className="
h-48
w-full
object-cover
"

/>


<div
className="
p-4
"
>


<h4
className="
font-bold
"
>

{
movie.title
}

</h4>



<div
className="
mt-2
text-sm
text-zinc-400
"
>

⭐ {movie.rating}

</div>


</div>


</div>


))

}


</div>

}



</div>





{
message.role==="user"

&&

<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-yellow-400/20
"

>

<User

size={20}

className="text-yellow-400"

/>


</div>

}




</motion.div>


))

}







{/* AI Thinking */}


{
loading &&


<div

className="
flex
items-center
gap-3
"

>

<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-purple-500/20
"

>

<Bot
size={20}
/>


</div>




<div

className="
rounded-3xl
bg-white/10
px-6
py-4
"

>


<div
className="
flex
gap-2
"
>


<span
className="
animate-bounce
"
>
•
</span>


<span
className="
animate-bounce
delay-100
"
>
•
</span>


<span
className="
animate-bounce
delay-200
"
>
•
</span>



</div>


</div>


</div>


}



</div>



</section>


);


}