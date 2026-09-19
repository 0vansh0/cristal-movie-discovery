import {
  Lock,
  Eye,
  EyeOff,
  Film,
  CheckCircle,
  Loader2,
} from "lucide-react";


import {
  useState,
} from "react";


import {
  motion,
} from "framer-motion";





export default function ResetPassword(){



const [showPassword,setShowPassword] =
useState(false);



const [showConfirm,setShowConfirm] =
useState(false);



const [loading,setLoading] =
useState(false);



const [success,setSuccess] =
useState(false);



const [error,setError] =
useState("");



const [password,setPassword] =
useState("");



const [confirmPassword,setConfirmPassword] =
useState("");









function strength(){


let score=0;



if(password.length>=8)
score++;



if(/[A-Z]/.test(password))
score++;



if(/[0-9]/.test(password))
score++;



if(/[^A-Za-z0-9]/.test(password))
score++;



return score;


}









async function handleSubmit(e){


e.preventDefault();



setError("");



if(
password!==confirmPassword
){


setError(
"Passwords do not match"
);


return;


}



if(password.length<8){


setError(
"Password must contain minimum 8 characters"
);


return;


}



try{


setLoading(true);



// Backend API ready
// await resetPassword(token,password)



await new Promise(

resolve=>

setTimeout(resolve,1500)

);



setSuccess(true);



}

catch(err){


setError(
"Password reset failed"
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
bg-purple-500/20
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

Password Updated

</h1>





<p

className="
mt-4
text-zinc-400
"

>

Your account is secure again.

</p>







<a

href="/login"

className="
mt-8
inline-block
rounded-2xl
bg-yellow-400
px-8
py-4
font-black
text-black
"

>


Login Now


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

Reset Password

</h1>



<p

className="
mt-3
text-center
text-zinc-400
"

>

Create a strong new password

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
space-y-5
"

>








{/* Password */}



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


<Lock size={20}/>



<input


type={

showPassword

?

"text"

:

"password"

}



value={password}


onChange={

e=>

setPassword(
e.target.value
)

}



placeholder="
New password
"


className="
flex-1
bg-transparent
py-4
outline-none
"

/>






<button


type="button"


onClick={()=>setShowPassword(!showPassword)}


>


{

showPassword

?

<EyeOff size={20}/>

:

<Eye size={20}/>

}


</button>



</div>









{/* Strength */}



<div

className="
flex
gap-2
"

>


{

[1,2,3,4].map(

item=>(


<div

key={item}


className={

`
h-2
flex-1
rounded-full
${
item<=strength()

?

"bg-yellow-400"

:

"bg-white/10"

}
`

}


/>


)


)

}



</div>









{/* Confirm */}



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


<Lock size={20}/>




<input


type={

showConfirm

?

"text"

:

"password"

}



value={confirmPassword}


onChange={

e=>

setConfirmPassword(
e.target.value
)

}



placeholder="
Confirm password
"


className="
flex-1
bg-transparent
py-4
outline-none
"

/>







<button


type="button"


onClick={()=>setShowConfirm(!showConfirm)}


>


{

showConfirm

?

<EyeOff size={20}/>

:

<Eye size={20}/>

}



</button>



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

<Loader2 className="animate-spin"/>

:

"Update Password"

}



</button>









</form>






</>


}





</motion.div>






</main>


);


}