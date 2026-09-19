import {
  List,
  Plus,
  Search,
  Trash2,
  Lock,
  Globe,
  Film,
  Sparkles,
} from "lucide-react";


import {
  useState,
} from "react";


import {
  motion,
} from "framer-motion";



export default function ListsPage(){



const [search,setSearch] =
useState("");



const [lists,setLists] =
useState([


{
id:1,

name:"Christopher Nolan Collection",

description:
"Mind bending movies with incredible storytelling",

movies:10,

privacy:"Public"

},



{
id:2,

name:"Weekend Watch",

description:
"Movies for relaxing weekends",

movies:8,

privacy:"Private"

},



{
id:3,

name:"My All Time Favorites",

description:
"My personal greatest movies",

movies:25,

privacy:"Public"

}



]);









function createList(){


const name =
prompt(
"Enter list name"
);



if(!name)
return;



setLists([

...lists,


{

id:Date.now(),

name,

description:
"New movie collection",

movies:0,

privacy:"Private"

}

]);



}









function deleteList(id){


setLists(

lists.filter(

list=>

list.id!==id

)

);


}









const filteredLists =

lists.filter(list=>

list.name
.toLowerCase()
.includes(

search.toLowerCase()

)

);









return (


<main

className="
min-h-screen
bg-black
px-6
py-10
text-white
"

>


<section

className="
mx-auto
max-w-7xl
"

>








{/* Header */}



<div

className="
flex
items-center
justify-between
"

>



<div

className="
flex
items-center
gap-4
"

>


<div

className="
flex
h-16
w-16
items-center
justify-center
rounded-3xl
bg-green-500/20
"

>


<List

size={32}

className="
text-green-400
"

/>


</div>







<div>


<h1

className="
text-4xl
font-black
"

>

My Lists

</h1>


<p

className="
text-zinc-400
"

>

Your custom movie collections

</p>


</div>



</div>









<button


onClick={
createList
}



className="
flex
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


<Plus size={20}/>


Create List


</button>



</div>









{/* Search */}



<div

className="
mt-10
flex
items-center
gap-3
rounded-3xl
border
border-white/10
bg-white/5
px-5
"

>


<Search

className="
text-zinc-400
"

/>



<input


value={
search
}


onChange={

e=>

setSearch(
e.target.value
)

}



placeholder="
Search your lists...
"


className="
flex-1
bg-transparent
py-5
outline-none
"

/>


</div>









{/* Lists */}



{

filteredLists.length>0 ?



<div

className="
mt-10
grid
gap-8
md:grid-cols-2
lg:grid-cols-3
"

>


{

filteredLists.map(

(list,index)=>(


<motion.article


key={
list.id
}



initial={{

opacity:0,
y:30

}}



animate={{

opacity:1,
y:0

}}



transition={{

delay:index*.1

}}



whileHover={{

y:-8

}}



className="
rounded-[35px]
border
border-white/10
bg-white/5
p-7
"

>






<div

className="
flex
items-center
justify-between
"

>


<div

className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-purple-500/20
"

>


<Film

className="
text-purple-400
"

/>


</div>







<button


onClick={()=>deleteList(list.id)}



className="
rounded-xl
bg-red-500/20
p-3
"

>


<Trash2

size={18}

/>


</button>



</div>









<h2

className="
mt-6
text-2xl
font-black
"

>

{list.name}

</h2>









<p

className="
mt-3
text-zinc-400
"

>

{list.description}

</p>









<div

className="
mt-6
flex
items-center
justify-between
"

>


<span

className="
flex
items-center
gap-2
rounded-full
bg-white/10
px-4
py-2
"

>


<Film size={16}/>

{list.movies} Movies


</span>







<span

className="
flex
items-center
gap-2
rounded-full
bg-white/10
px-4
py-2
"

>


{

list.privacy==="Public"

?

<Globe size={16}/>

:

<Lock size={16}/>

}


{list.privacy}


</span>



</div>








<button


className="
mt-6
w-full
rounded-xl
bg-purple-500/20
py-3
font-bold
"

>


Open Collection


</button>






</motion.article>


)


)


}



</div>



:



<div

className="
mt-10
rounded-[40px]
border
border-white/10
bg-white/5
p-16
text-center
"

>


<Sparkles

size={50}

className="
mx-auto
mb-5
text-zinc-500
"

/>


<h2

className="
text-3xl
font-black
"

>

No Lists Created

</h2>


<p

className="
mt-3
text-zinc-400
"

>

Create your first movie collection.

</p>


</div>



}








</section>


</main>


);


}