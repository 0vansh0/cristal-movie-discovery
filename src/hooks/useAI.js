import {
  useState,
  useEffect,
} from "react";


import {
  sendAIRequest,
} from "../services/aiService";




export default function useAI(){



const [messages,setMessages] =
useState([]);



const [loading,setLoading] =
useState(false);



const [recommendations,setRecommendations] =
useState([]);



const [history,setHistory] =
useState([]);




const [error,setError] =
useState(null);









// Load History


useEffect(()=>{


const saved =

localStorage.getItem(
"cristal_ai_history"
);



if(saved){

setHistory(
JSON.parse(saved)
);

}



},[]);









// Save History


function saveHistory(data){


const updated = [

data,

...history

];



setHistory(
updated
);



localStorage.setItem(

"cristal_ai_history",

JSON.stringify(
updated
)

);


}









// Send Prompt


async function askAI(prompt){



if(!prompt.trim())
return;




setError(null);



const userMessage = {


role:"user",


content:prompt


};





setMessages(prev=>[

...prev,

userMessage

]);





setLoading(true);







try{



const response =

await sendAIRequest(
prompt
);






const aiMessage = {


role:"ai",


content:
response.message || 
"Here are your recommendations.",


movies:
response.movies || []

};







setMessages(prev=>[

...prev,

aiMessage

]);







if(response.movies){


setRecommendations(
response.movies
);


}








saveHistory({

id:
Date.now(),


prompt,


date:
new Date()
.toLocaleDateString()

});







}

catch(err){



setError(

"Unable to connect with CRISTAL AI"

);



setMessages(prev=>[

...prev,

{

role:"ai",

content:
"Something went wrong. Try again."

}

]);


}

finally{


setLoading(false);


}



}









// Select old prompt


function selectPrompt(prompt){


askAI(prompt);


}









// Delete history


function deleteHistory(id){



const updated =

history.filter(

item=>

item.id !== id

);



setHistory(
updated
);



localStorage.setItem(

"cristal_ai_history",

JSON.stringify(
updated
)

);



}









// Clear Chat


function clearChat(){


setMessages([]);

setRecommendations([]);

}





return {


messages,


loading,


recommendations,


history,


error,


askAI,


selectPrompt,


deleteHistory,


clearChat



};



}