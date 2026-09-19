import {
  useEffect
} from "react";


import {
  AnimatePresence,
  motion
} from "framer-motion";


import {
  X
} from "lucide-react";





export default function Modal({

  isOpen,

  onClose,

  title,

  children,

  footer,

  size="medium",

  closeOnOutside=true

}) {





  // ESC CLOSE

  useEffect(()=>{


    const handleKeyDown=(e)=>{


      if(e.key==="Escape"){

        onClose?.();

      }


    };



    if(isOpen){

      document.addEventListener(
        "keydown",
        handleKeyDown
      );


      document.body.style.overflow="hidden";

    }



    return ()=>{


      document.removeEventListener(
        "keydown",
        handleKeyDown
      );


      document.body.style.overflow="auto";


    };


  },[isOpen,onClose]);








  const sizes={


    small:
    "max-w-sm",


    medium:
    "max-w-xl",


    large:
    "max-w-4xl",


    full:
    "max-w-7xl"

  };







  return (


    <AnimatePresence>


      {
        isOpen && (


          <motion.div


            initial={{
              opacity:0
            }}


            animate={{
              opacity:1
            }}


            exit={{
              opacity:0
            }}



            onClick={(e)=>{


              if(
                closeOnOutside &&
                e.target===e.currentTarget
              ){

                onClose?.();

              }


            }}



            className="
              fixed
              inset-0
              z-[999]
              flex
              items-center
              justify-center
              bg-black/70
              p-5
              backdrop-blur-md
            "


          >







            <motion.div


              initial={{

                scale:.9,

                y:30,

                opacity:0

              }}



              animate={{

                scale:1,

                y:0,

                opacity:1

              }}



              exit={{

                scale:.9,

                y:30,

                opacity:0

              }}



              transition={{

                duration:.25

              }}



              className={`

                relative

                w-full

                ${sizes[size]}

                overflow-hidden

                rounded-[32px]

                border

                border-white/10

                bg-[#111827]/90

                shadow-2xl

                backdrop-blur-3xl

              `}



            >







              {/* HEADER */}



              <div

                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  px-6
                  py-5
                "

              >



                <h2

                  className="
                    text-xl
                    font-black
                    text-white
                  "

                >

                  {title}

                </h2>





                <button


                  onClick={onClose}



                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-white
                    transition
                    hover:bg-white/20
                  "


                >


                  <X size={20}/>


                </button>




              </div>









              {/* BODY */}



              <div

                className="
                  max-h-[70vh]
                  overflow-y-auto
                  p-6
                "

              >

                {children}


              </div>










              {/* FOOTER */}



              {
                footer && (


                  <div

                    className="
                      border-t
                      border-white/10
                      px-6
                      py-5
                    "

                  >

                    {footer}

                  </div>


                )
              }





            </motion.div>





          </motion.div>


        )
      }


    </AnimatePresence>


  );


}