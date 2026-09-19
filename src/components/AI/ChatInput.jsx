import {
  useState,
  useRef,
} from "react";


import {
  Send,
  Mic,
  Sparkles,
} from "lucide-react";



export default function ChatInput({

  onSend,

  loading = false,

}) {



  const [message,setMessage] =
    useState("");



  const textareaRef =
    useRef(null);





  function resize(){

    const textarea =
      textareaRef.current;


    if(textarea){

      textarea.style.height =
      "auto";


      textarea.style.height =
      textarea.scrollHeight + "px";

    }

  }







  function sendMessage(){


    if(
      !message.trim()
      ||
      loading
    )
    return;



    onSend?.(
      message.trim()
    );


    setMessage("");



    if(textareaRef.current){

      textareaRef.current.style.height =
      "auto";

    }

  }








  function handleKey(e){


    if(
      e.key==="Enter"
      &&
      !e.shiftKey
    ){

      e.preventDefault();

      sendMessage();

    }


  }








  return (

    <section

      className="
      sticky
      bottom-0
      border-t
      border-white/10
      bg-black/30
      p-5
      backdrop-blur-xl
      "

    >



      <div

      className="
      flex
      items-end
      gap-3
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-3
      "

      >





        {/* AI Icon */}


        <div

        className="
        hidden
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        bg-purple-500/20
        sm:flex
        "

        >

          <Sparkles

          size={20}

          className="
          text-purple-400
          "

          />

        </div>







        {/* Text Input */}



        <textarea


          ref={textareaRef}


          value={message}


          onChange={e=>{

            setMessage(
              e.target.value
            );

            resize();

          }}


          onKeyDown={handleKey}



          placeholder="
          Ask CRISTAL AI anything...
          "


          rows={1}


          className="
          max-h-40
          min-h-[45px]
          flex-1
          resize-none
          bg-transparent
          px-3
          py-3
          outline-none
          "

        />








        {/* Voice Button */}



        <button


        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        bg-white/10
        transition
        hover:bg-white/20
        "

        >


          <Mic size={20}/>


        </button>







        {/* Send */}



        <button


        disabled={
          loading
          ||
          !message.trim()
        }


        onClick={sendMessage}


        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        bg-yellow-400
        text-black
        transition
        disabled:opacity-40
        "

        >


          <Send size={20}/>


        </button>





      </div>





      <p

      className="
      mt-3
      text-center
      text-xs
      text-zinc-500
      "

      >

        CRISTAL AI can recommend movies,
        explain stories and discover hidden gems.

      </p>



    </section>

  );

}