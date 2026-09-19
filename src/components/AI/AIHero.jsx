import {
  Sparkles,
  Search,
  Bot,
  Send,
} from "lucide-react";

import {
  useState,
} from "react";


import {
  motion,
} from "framer-motion";



export default function AIHero({
  onSearch
}) {


  const [prompt,setPrompt] =
    useState("");




  function submit(){

    if(!prompt.trim())
      return;


    onSearch?.(prompt);


    setPrompt("");

  }




  const suggestions = [

    "Recommend movies like Interstellar",

    "Best thriller movies",

    "Hidden cinematic gems",

    "Movies for tonight",

    "Best Oscar winners"

  ];





  return (

    <section
      className="
      relative
      overflow-hidden
      rounded-[50px]
      border
      border-white/10
      bg-white/5
      p-10
      backdrop-blur-3xl
      "
    >



      {/* Background Glow */}


      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-purple-500/20
        via-transparent
        to-yellow-400/20
        blur-3xl
        "
      />






      <div
        className="
        relative
        z-10
        mx-auto
        max-w-4xl
        text-center
        "
      >




        {/* AI Avatar */}


        <motion.div

          animate={{
            y:[0,-15,0],
            rotate:[0,5,-5,0]
          }}

          transition={{
            duration:5,
            repeat:Infinity
          }}

          className="
          mx-auto
          mb-8
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-purple-500
          to-yellow-400
          shadow-2xl
          "

        >

          <Bot
            size={55}
            className="
            text-black
            "
          />

        </motion.div>







        <div
          className="
          mb-5
          flex
          justify-center
          gap-2
          "
        >

          <Sparkles
            className="
            text-yellow-400
            "
          />


          <span
            className="
            font-bold
            text-yellow-400
            "
          >

            AI POWERED

          </span>


        </div>







        <h1
          className="
          text-6xl
          font-black
          tracking-tight
          "
        >

          CRISTAL AI


        </h1>




        <p
          className="
          mt-5
          text-xl
          text-zinc-400
          "
        >

          Your personal cinema assistant.
          Discover movies using intelligence.

        </p>









        {/* Search Box */}


        <div
          className="
          mt-10
          flex
          items-center
          gap-3
          rounded-3xl
          border
          border-white/10
          bg-black/30
          p-3
          "
        >


          <Search
            className="
            ml-4
            text-zinc-400
            "
          />



          <input

            value={prompt}

            onChange={
              e=>
              setPrompt(
                e.target.value
              )
            }


            onKeyDown={
              e=>{
                if(e.key==="Enter")
                  submit();
              }
            }


            placeholder="
            Ask AI: Recommend a movie...
            "


            className="
            flex-1
            bg-transparent
            px-3
            py-4
            outline-none
            "
          />





          <button

            onClick={submit}

            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-yellow-400
            text-black
            "

          >

            <Send size={22}/>


          </button>



        </div>









        {/* Suggestions */}


        <div
          className="
          mt-8
          flex
          flex-wrap
          justify-center
          gap-3
          "
        >


          {
            suggestions.map(
              item=>(


              <button

                key={item}

                onClick={()=>{

                  setPrompt(item);

                  onSearch?.(item);

                }}


                className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                text-sm
                transition
                hover:bg-white/10
                "

              >

                {item}


              </button>


            ))
          }


        </div>



      </div>



    </section>

  );

}