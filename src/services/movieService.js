import api from "./api";





// ==========================
// FAVORITES
// ==========================



export async function addFavorite(movie){



const response =

await api.post(

"/users/favorites",

{

movieId:
movie.id,


title:
movie.title,


poster:
movie.poster_path,


releaseDate:
movie.release_date

}

);



return response.data;

}









export async function removeFavorite(movieId){



const response =

await api.delete(

`/users/favorites/${movieId}`

);



return response.data;

}









export async function getFavorites(){



const response =

await api.get(

"/users/favorites"

);



return response.data;

}









// ==========================
// WATCHLIST
// ==========================



export async function addToWatchlist(movie){



const response =

await api.post(

"/users/watchlist",

{


movieId:
movie.id,


title:
movie.title,


poster:
movie.poster_path,


type:"movie"


}

);



return response.data;

}









export async function removeFromWatchlist(movieId){



const response =

await api.delete(

`/users/watchlist/${movieId}`

);



return response.data;

}









export async function getWatchlist(){



const response =

await api.get(

"/users/watchlist"

);



return response.data;

}









// ==========================
// RATINGS
// ==========================



export async function rateMovie(

movieId,

rating

){



const response =

await api.post(

"/users/ratings",

{


movieId,


rating


}

);



return response.data;

}









export async function getMyRatings(){



const response =

await api.get(

"/users/ratings"

);



return response.data;

}









// ==========================
// REVIEWS
// ==========================



export async function addReview(data){



const response =

await api.post(

"/users/reviews",

data

);



return response.data;

}









export async function updateReview(

reviewId,

data

){



const response =

await api.put(

`/users/reviews/${reviewId}`,

data

);



return response.data;

}









export async function deleteReview(

reviewId

){



const response =

await api.delete(

`/users/reviews/${reviewId}`

);



return response.data;

}









export async function getMovieReviews(

movieId

){



const response =

await api.get(

`/users/reviews/movie/${movieId}`

);



return response.data;

}
















export async function getMyReviews(){



const response =

await api.get(

"/users/reviews"

);


return response.data;

}









// ==========================
// WATCH HISTORY
// ==========================



export async function addToHistory(movie){



const response =

await api.post(

"/users/history",

{


movieId:
movie.id,


title:
movie.title,


poster:
movie.poster_path


}

);



return response.data;

}









export async function getHistory(){



const response =

await api.get(

"/users/history"

);



return response.data;

}









export async function clearHistory(){



const response =

await api.delete(

"/users/history"

);



return response.data;

}









// ==========================
// CUSTOM LISTS
// ==========================



export async function createList(data){



const response =

await api.post(

"/lists",

data

);



return response.data;

}









export async function getLists(){



const response =

await api.get(

"/lists"

);



return response.data;

}









export async function addMovieToList(

listId,

movie

){



const response =

await api.post(

`/lists/${listId}/movies`,

{


movieId:
movie.id,


title:
movie.title,


poster:
movie.poster_path


}

);



return response.data;

}









export async function deleteList(

listId

){



const response =

await api.delete(

`/lists/${listId}`

);



return response.data;

}