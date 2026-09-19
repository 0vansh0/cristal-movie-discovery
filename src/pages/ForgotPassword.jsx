import {
  Mail,
  Film,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";


import {
  useState,
} from "react";


import {
  motion,
} from "framer-motion";



export default function ForgotPassword(){



const [email,setEmail] =
useState("");



const [loading,setLoading] =
useState(false);



const [success,setSuccess] =
useState(false);



const [error,setError] =
useState("");









async function handleSubmit(e){


e.preventDefault();



setError("");



if(!email){


setError(
"Please enter your email"
);


return;


}



try{


setLoading(true);



// API CALL READY

await new Promise(

resolve=>

setTimeout(resolve,1500)

);



setSuccess(true);



}

catch(err){


setError(
"Something went wrong"
);


}

finally{


setLoading(false);


}



}









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
"

>





<div

className="
absolute
h-96
w-96
rounded-full
bg-blue-500/20
blur-3xl
"

></div>









<motion.div


initial={{

opacity:0,
scale:.9

}}



animate={{

opacity:1,
scale:1

}}



className="
relative
w-full
max-w-md
rounded-[45px]
border
border-white/10
bg-white/5
p-10
backdrop-blur-3xl
"

>









<div

className="
flex
justify-center
"

>


<div

className="
flex
h-20
w-20
items-center
justify-center
rounded-3xl
bg-yellow-400
"

>


<Film

size={40}

className="
text-black
"

/>


</div>


</div>









{

success ?



<div

className="
mt-8
text-center
"

>


<CheckCircle

size={70}

className="
mx-auto
text-green-400
"

/>



<h1

className="
mt-6
text-3xl
font-black
"

>

Check Your Email

</h1>



<p

className="
mt-4
text-zinc-400
"

>

Password reset instructions have been sent.

</p>





<a

href="/login"

className="
mt-8
inline-flex
items-center
gap-2
rounded-2xl
bg-yellow-400
px-6
py-4
font-black
text-black
"

>


<ArrowLeft size={18}/>


Back To Login


</a>



</div>






:



<>



<h1

className="
mt-8
text-center
text-4xl
font-black
"

>

Forgot Password?

</h1>



<p

className="
mt-3
text-center
text-zinc-400
"

>

Enter your email to reset your account

</p>









{

error &&


<div

className="
mt-5
rounded-xl
bg-red-500/20
p-4
text-center
text-red-400
"

>

{error}

</div>


}









<form

onSubmit={handleSubmit}

className="
mt-8
space-y-6
"

>





<div

className="
flex
items-center
gap-3
rounded-2xl
border
border-white/10
bg-black/30
px-5
"

>


<Mail

size={20}

className="
text-zinc-400
"

/>



<input


type="email"


value={email}


onChange={

e=>

setEmail(
e.target.value
)

}



placeholder="
Email address
"


className="
flex-1
bg-transparent
py-4
outline-none
"

/>



</div>









<button


disabled={loading}



className="
flex
w-full
items-center
justify-center
gap-3
rounded-2xl
bg-yellow-400
py-4
font-black
text-black
"

>



{

loading

?

<Loader2

className="
animate-spin
"

/>


:

<>

<Send size={18}/>

Send Reset Link

</>

}



</button>



</form>








<a

href="/login"

className="
mt-8
flex
items-center
justify-center
gap-2
text-zinc-400
hover:text-white
"

>


<ArrowLeft size={18}/>


Back To Login


</a>




</>


}





</motion.div>






</main>


);


}