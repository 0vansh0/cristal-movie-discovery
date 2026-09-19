import React, {
  Component,
} from "react";


import {
  AlertTriangle,
  RefreshCcw,
  Home,
  Film,
} from "lucide-react";





class ErrorBoundary extends Component {



constructor(props){


super(props);



this.state={


hasError:false,

error:null


};


}








static getDerivedStateFromError(error){



return {


hasError:true,

error


};



}








componentDidCatch(error,info){



console.error(

"CRISTAL ERROR:",

error,

info

);



}









handleReload(){



window.location.reload();



}









render(){



if(this.state.hasError){



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
bg-red-500/20
blur-3xl
"

></div>









<section

className="
relative
max-w-lg
rounded-[45px]
border
border-white/10
bg-white/5
p-12
text-center
backdrop-blur-3xl
"

>









<div

className="
mx-auto
flex
h-24
w-24
items-center
justify-center
rounded-3xl
bg-red-500/20
"

>


<AlertTriangle

size={45}

className="
text-red-400
"

/>


</div>









<h1

className="
mt-8
text-4xl
font-black
"

>

Something Went Wrong

</h1>









<p

className="
mt-4
text-zinc-400
"

>

The scene crashed unexpectedly.
Please try again.

</p>









<div

className="
mt-8
flex
flex-col
gap-4
sm:flex-row
sm:justify-center
"

>









<button


onClick={

()=>this.handleReload()

}



className="
flex
items-center
justify-center
gap-3
rounded-2xl
bg-yellow-400
px-7
py-4
font-black
text-black
"

>


<RefreshCcw size={20}/>


Reload


</button>









<a


href="/"



className="
flex
items-center
justify-center
gap-3
rounded-2xl
border
border-white/10
bg-white/5
px-7
py-4
font-bold
"

>


<Home size={20}/>


Home


</a>









</div>









<div

className="
mt-8
flex
items-center
justify-center
gap-2
text-zinc-500
"

>


<Film size={18}/>


CRISTAL Recovery Mode


</div>









</section>






</main>



);



}









return this.props.children;



}



}



export default ErrorBoundary;