import {
  createContext,
  useContext,
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";



const SearchContext =
createContext();






export function SearchProvider({
  children
}){


const navigate =
useNavigate();



const [query,setQuery] =
useState("");



const [history,setHistory] =
useState(()=>{


const saved =

localStorage.getItem(
"cristal-search-history"
);



return saved

?

JSON.parse(saved)

:

[];

});







// =========================
// UPDATE QUERY
// =========================


function updateQuery(value){


setQuery(value);


}








// =========================
// SAVE SEARCH
// =========================


function saveSearch(text){


if(!text.trim())
return;




const updated = [


text,


...history.filter(

item=>

item!==text

)


].slice(0,10);





setHistory(updated);



localStorage.setItem(

"cristal-search-history",

JSON.stringify(updated)

);



}









// =========================
// SEARCH FUNCTION
// =========================


function search(
text=query
){



if(!text.trim())
return;




saveSearch(text);



setQuery(text);



navigate(

`/search?q=${encodeURIComponent(text)}`

);



}
// =========================
// REMOVE HISTORY ITEM
// =========================


function removeHistory(item){


const updated =

history.filter(

searchItem =>

searchItem !== item

);



setHistory(updated);



localStorage.setItem(

"cristal-search-history",

JSON.stringify(updated)

);



}









// =========================
// CLEAR HISTORY
// =========================


function clearHistory(){


setHistory([]);



localStorage.removeItem(

"cristal-search-history"

);



}









// =========================
// SELECT HISTORY ITEM
// =========================


function selectHistory(item){


setQuery(item);


search(item);


}









const value = {


query,


history,


updateQuery,


search,


saveSearch,


removeHistory,


clearHistory,


selectHistory



};









return (

<SearchContext.Provider

value={value}

>

{children}

</SearchContext.Provider>

);


}









export function useSearch(){


return useContext(
SearchContext
);


}