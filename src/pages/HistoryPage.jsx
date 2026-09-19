import {
  Clock,
  Search,
  Play,
  Trash2,
  Calendar,
  Film,
  Sparkles,
} from "lucide-react";


import {
  useEffect,
  useState,
} from "react";


import {
  motion,
} from "framer-motion";

import { getHistory } from "../services/movieService";



export default function HistoryPage(){



const [search,setSearch] =
useState("");

const [loading, setLoading] = useState(true);





const [history,setHistory] =
useState([


{
id:1,

title:"Interstellar",

poster:
"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",

date:"Today",

duration:"2h 49m",

progress:100

},



{
id:2,

title:"Oppenheimer",

poster:
"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",

date:"Yesterday",

duration:"3h 10m",

progress:100

},



{
id:3,

title:"Inception",

poster:
"https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",

date:"August 1, 2026",

duration:"2h 28m",

progress:75

}



]);









useEffect(() => {
  let active = true;

  async function loadHistory() {
    try {
      const data = await getHistory();
      if (active) {
        setHistory(Array.isArray(data) ? data : []);
      }
    } catch {
      if (active) setHistory([]);
    } finally {
      if (active) setLoading(false);
    }
  }

  loadHistory();

  return () => {
    active = false;
  };
}, []);

function removeHistory(id){


setHistory(

history.filter(

movie=>

movie.id!==id

)

);


}









const filtered =

history.filter(movie=>

movie.title
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
bg-blue-500/20
"

>


<Clock

size={32}

className="
text-blue-400
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

Watch History

</h1>



<p

className="
text-zinc-400
"

>

Your cinematic journey

</p>


</div>



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
Search watched movies...
"


className="
flex-1
bg-transparent
py-5
outline-none
"

/>


</div>









{/* Timeline */}



<div className="mt-10 space-y-8">
  {loading ? (
    <div className='rounded-[40px] border border-white/10 bg-white/5 p-16 text-center'>
      <Sparkles size={50} className='mx-auto mb-5 text-zinc-500' />
      <h2 className='text-3xl font-black'>Loading your history...</h2>
    </div>
  ) : filtered.length > 0 ? (
    filtered.map((movie, index) => (
      <motion.article
        key={movie.id}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className='relative flex gap-6 rounded-[35px] border border-white/10 bg-white/5 p-6'
      >
        {/* Timeline Dot */}
        <div className='absolute left-0 top-10 h-5 w-5 rounded-full bg-blue-400' />

        <img
          src={movie.poster}
          alt={movie.title}
          className='h-48 w-32 rounded-3xl object-cover'
        />

        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-black'>{movie.title}</h2>
            <Calendar size={20} className='text-blue-400' />
          </div>

          <p className='mt-2 text-zinc-400'>Watched {movie.date}</p>

          <div className='mt-4 flex items-center gap-3 text-sm text-zinc-400'>
            <Film size={16} />
            {movie.duration}
          </div>

          <div className='mt-5'>
            <div className='mb-2 flex justify-between text-sm'>
              <span>Progress</span>
              <span>{movie.progress}%</span>
            </div>
            <div className='h-2 overflow-hidden rounded-full bg-white/10'>
              <div className='h-full rounded-full bg-blue-400' style={{ width: `${movie.progress}%` }} />
            </div>
          </div>

          <div className='mt-6 flex gap-3'>
            <button className='flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-black'>
              <Play size={18} fill='currentColor' />
              Continue
            </button>
            <button onClick={() => removeHistory(movie.id)} className='flex items-center gap-2 rounded-xl bg-red-500/20 px-5 py-3'>
              <Trash2 size={18} />
              Remove
            </button>
          </div>
        </div>
      </motion.article>
    ))
  ) : (
    <div className='rounded-[40px] border border-white/10 bg-white/5 p-16 text-center'>
      <Sparkles size={50} className='mx-auto mb-5 text-zinc-500' />
      <h2 className='text-3xl font-black'>No Watch History</h2>
      <p className='mt-3 text-zinc-400'>Start watching movies to build your timeline.</p>
    </div>
  )}
</div>

</section>


</main>


);


}