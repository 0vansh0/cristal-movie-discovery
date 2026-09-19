import {
  useState,
  useEffect,
} from "react";



export default function useUser(){



const [user,setUser] =
useState(null);



const [favorites,setFavorites] =
useState([]);



const [watchlist,setWatchlist] =
useState([]);



const [ratings,setRatings] =
useState([]);



const [reviews,setReviews] =
useState([]);



const [history,setHistory] =
useState([]);



const [lists,setLists] =
useState([]);








// Load user data


useEffect(()=>{


const savedUser =
localStorage.getItem(
"cristal_user"
);



const savedData =
localStorage.getItem(
"cristal_user_data"
);



if(savedUser){

setUser(
JSON.parse(savedUser)
);

}



if(savedData){


const data =
JSON.parse(savedData);



setFavorites(
data.favorites || []
);


setWatchlist(
data.watchlist || []
);


setRatings(
data.ratings || []
);


setReviews(
data.reviews || []
);


setHistory(
data.history || []
);


setLists(
data.lists || []
);


}



},[]);









// Save all data


function saveData(updated){


localStorage.setItem(

"cristal_user_data",

JSON.stringify(updated)

);


}











// Update helper


function updateState(type,value){



const data = {


favorites,


watchlist,


ratings,


reviews,


history,


lists,


[type]:

value


};



saveData(data);



}





// =================
// FAVORITES
// =================



function addFavorite(movie){


const updated=[

...favorites,

movie

];


setFavorites(updated);



updateState(
"favorites",
updated
);


}






function removeFavorite(id){



const updated =

favorites.filter(

movie=>

movie.id!==id

);



setFavorites(updated);


updateState(
"favorites",
updated
);


}









// =================
// WATCHLIST
// =================



function addWatchlist(movie){



const updated=[

...watchlist,

movie

];



setWatchlist(updated);



updateState(
"watchlist",
updated
);


}








function removeWatchlist(id){



const updated =

watchlist.filter(

movie=>

movie.id!==id

);



setWatchlist(updated);



updateState(
"watchlist",
updated
);


}











// =================
// RATINGS
// =================



function addRating(movie){


const updated=[

...ratings,

movie

];



setRatings(updated);



updateState(
"ratings",
updated
);


}










function deleteRating(id){


const updated=

ratings.filter(

item=>

item.id!==id

);



setRatings(updated);



updateState(
"ratings",
updated
);



}











// =================
// REVIEWS
// =================



function addReview(review){



const updated=[

...reviews,

review

];



setReviews(updated);



updateState(
"reviews",
updated
);


}








function deleteReview(id){



const updated=

reviews.filter(

item=>

item.id!==id

);



setReviews(updated);



updateState(
"reviews",
updated
);


}











// =================
// HISTORY
// =================



function addHistory(movie){


const updated=[

movie,

...history

];



setHistory(updated);



updateState(
"history",
updated
);



}








function removeHistory(id){



const updated=

history.filter(

item=>

item.id!==id

);



setHistory(updated);



updateState(
"history",
updated
);



}











// =================
// LISTS
// =================



function createList(list){


const updated=[

...lists,

list

];



setLists(updated);



updateState(
"lists",
updated
);


}









function deleteList(id){



const updated=

lists.filter(

list=>

list.id!==id

);



setLists(updated);



updateState(
"lists",
updated
);


}











// Logout


function logout(){



localStorage.removeItem(
"cristal_user"
);



setUser(null);


}









return {


user,


setUser,


favorites,


watchlist,


ratings,


reviews,


history,


lists,


addFavorite,


removeFavorite,


addWatchlist,


removeWatchlist,


addRating,


deleteRating,


addReview,


deleteReview,


addHistory,


removeHistory,


createList,


deleteList,


logout


};



}