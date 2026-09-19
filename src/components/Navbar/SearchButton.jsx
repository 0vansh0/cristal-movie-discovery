import { Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";

const SearchButton = () => {

  const [open,setOpen]=useState(false);

  return (
    <>
      <button
        onClick={()=>setOpen(true)}
        className="
        flex
        items-center
        gap-3
        rounded-full
        border
        border-white/10
        bg-white/5
        px-5
        py-2.5
        backdrop-blur-xl
        transition
        duration-300
        hover:border-[#FF5E5E]
        hover:bg-white/10
        "
      >

        <Search size={17}/>

        <span className="text-sm text-zinc-300">

          Search

        </span>

        <kbd
          className="
          rounded-md
          border
          border-white/10
          bg-black/20
          px-2
          py-0.5
          text-[11px]
          text-zinc-400
          "
        >

          Ctrl K

        </kbd>

      </button>

      <SearchModal
      open={open}
      onClose={()=>setOpen(false)}
      />

    </>
  );

};

export default SearchButton;