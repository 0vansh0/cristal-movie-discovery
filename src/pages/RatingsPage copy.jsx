import {
  useMemo,
  useState,
} from "react";

import {
  Star,
  Search,
  Film,
  Tv,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";


import RatingsGrid from "../components/User/RatingsGrid";

import {
  useUser,
} from "../hooks/useUser";



export default function RatingsPage(){

  const {
    ratings,
  } = useUser();



  const [search,setSearch] =
    useState("");


  const [type,setType] =
    useState("all");


  const [sort,setSort] =
    useState("highest");






  const averageRating =
    ratings.length
      ?
      (
        ratings.reduce(
          (sum,item)=>
          sum + item.userRating,
          0
        )
        /
        ratings.length
      )
      .toFixed(1)

      :
      "0.0";






  const filteredRatings =
    useMemo(()=>{


      let data =
        [...ratings];



      // Search


      if(search){

        data =
        data.filter(item =>

          (
            item.title ||
            item.name
          )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        );

      }




      // Type


      if(type !== "all"){

        data =
        data.filter(
          item =>
          item.media_type === type
        );

      }






      // Sort


      if(sort === "highest"){

        data.sort(
          (a,b)=>
          b.userRating -
          a.userRating
        );

      }


      if(sort === "lowest"){

        data.sort(
          (a,b)=>
          a.userRating -
          b.userRating
        );

      }




      return data;


    },[
      ratings,
      search,
      type,
      sort
    ]);







  return (

    <main
      className="
        mx-auto
        max-w-7xl
        space-y-12
        p-6
      "
    >





      {/* Header */}


      <section
        className="
          rounded-[40px]
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
            flex-col
            gap-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >


          <div>


            <div
              className="
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-yellow-400/20
              "
            >

              <Star
                fill="currentColor"
                className="text-yellow-400"
                size={34}
              />

            </div>



            <h1
              className="
                text-5xl
                font-black
              "
            >

              My Ratings

            </h1>



            <p
              className="
                mt-3
                text-zinc-400
              "
            >

              Your personal movie scoring history.

            </p>


          </div>






          {/* Average */}


          <div
            className="
              rounded-[30px]
              bg-yellow-400/10
              p-8
              text-center
            "
          >

            <p className="text-zinc-400">

              Average Rating

            </p>


            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-3
                text-5xl
                font-black
                text-yellow-400
              "
            >

              <Star
                fill="currentColor"
              />


              {averageRating}


            </div>


          </div>


        </div>


      </section>







      {/* Filters */}


      <section
        className="
          rounded-[30px]
          border
          border-white/10
          bg-white/5
          p-6
          backdrop-blur-3xl
        "
      >


        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
          "
        >



          {/* Search */}


          <div
            className="
              flex-1
              flex
              items-center
              gap-3
              rounded-xl
              bg-white/10
              px-5
            "
          >

            <Search size={20}/>


            <input

              value={search}

              onChange={
                e=>
                setSearch(
                  e.target.value
                )
              }

              placeholder="
                Search ratings...
              "

              className="
                w-full
                bg-transparent
                py-4
                outline-none
              "

            />


          </div>







          {/* Type */}


          <div className="flex gap-3">


            <button

              onClick={()=>
                setType("all")
              }

              className="
                rounded-xl
                bg-white/10
                px-5
              "

            >

              All

            </button>



            <button

              onClick={()=>
                setType("movie")
              }

              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white/10
                px-5
              "

            >

              <Film size={16}/>

              Movies

            </button>




            <button

              onClick={()=>
                setType("tv")
              }

              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-white/10
                px-5
              "

            >

              <Tv size={16}/>

              TV

            </button>


          </div>







          {/* Sort */}


          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <SlidersHorizontal size={18}/>


            <select

              value={sort}

              onChange={
                e=>
                setSort(
                  e.target.value
                )
              }

              className="
                rounded-xl
                bg-white/10
                px-5
                py-3
              "

            >

              <option value="highest">
                Highest Rated
              </option>


              <option value="lowest">
                Lowest Rated
              </option>


            </select>


          </div>


        </div>


      </section>








      {/* Stats */}


      <section
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >


        <div className="glass-card">

          <TrendingUp/>

          <h3>
            Total Ratings
          </h3>

          <strong>
            {ratings.length}
          </strong>

        </div>



        <div className="glass-card">

          <Star/>

          <h3>
            Average Score
          </h3>

          <strong>
            {averageRating}
          </strong>

        </div>



        <div className="glass-card">

          <Film/>

          <h3>
            Movies Rated
          </h3>

          <strong>
            {
              ratings.filter(
                x=>x.media_type==="movie"
              ).length
            }
          </strong>

        </div>


      </section>






      {/* Grid */}


      <RatingsGrid

        items={
          filteredRatings
        }

      />


    </main>

  );

}