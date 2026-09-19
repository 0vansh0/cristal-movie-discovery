import { motion } from "framer-motion";



export default function SkeletonCard({

  type = "movie",

  count = 1

}) {



  return (

    <>

      {Array.from({ length: count }).map((_, index) => (


        <motion.div


          key={index}


          animate={{

            opacity:[0.4,0.8,0.4]

          }}


          transition={{

            duration:1.5,

            repeat:Infinity

          }}



          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
          "

        >




          {/* MOVIE / TV CARD */}


          {
            (type==="movie" || type==="tv") && (


              <>


                <div

                  className="
                    relative
                    aspect-[2/3]
                    overflow-hidden
                    bg-white/10
                  "

                >

                  <div

                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      animate-[shimmer_2s_infinite]
                      bg-gradient-to-r
                      from-transparent
                      via-white/10
                      to-transparent
                    "

                  />


                </div>





                <div

                  className="
                    space-y-4
                    p-5
                  "

                >


                  <div

                    className="
                      h-5
                      w-3/4
                      rounded-full
                      bg-white/10
                    "

                  />


                  <div

                    className="
                      h-4
                      w-1/2
                      rounded-full
                      bg-white/10
                    "

                  />



                  <div

                    className="
                      h-4
                      w-1/3
                      rounded-full
                      bg-white/10
                    "

                  />


                </div>


              </>

            )
          }








          {/* PERSON CARD */}


          {
            type==="person" && (


              <div

                className="
                  flex
                  items-center
                  gap-5
                  p-5
                "

              >


                <div

                  className="
                    h-20
                    w-20
                    rounded-full
                    bg-white/10
                  "

                />



                <div

                  className="
                    flex-1
                    space-y-3
                  "

                >


                  <div

                    className="
                      h-5
                      w-3/4
                      rounded-full
                      bg-white/10
                    "

                  />


                  <div

                    className="
                      h-4
                      w-1/2
                      rounded-full
                      bg-white/10
                    "

                  />


                </div>


              </div>


            )
          }









          {/* REVIEW CARD */}


          {
            type==="review" && (


              <div

                className="
                  space-y-5
                  p-6
                "

              >


                <div

                  className="
                    h-6
                    w-1/3
                    rounded-full
                    bg-white/10
                  "

                />



                <div

                  className="
                    h-4
                    w-full
                    rounded-full
                    bg-white/10
                  "

                />



                <div

                  className="
                    h-4
                    w-full
                    rounded-full
                    bg-white/10
                  "

                />



                <div

                  className="
                    h-4
                    w-2/3
                    rounded-full
                    bg-white/10
                  "

                />


              </div>


            )
          }





        </motion.div>


      ))}


    </>


  );

}