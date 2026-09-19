import {
  Navigate,
  useLocation
} from "react-router-dom";


import {
  useAuth
} from "../context/AuthContext";





export default function ProtectedRoute({

children

}){


const {
user,
loading
} = useAuth();



const location =
useLocation();






// =========================
// AUTH CHECK LOADING
// =========================


if(loading){


return (

<div

className="
flex
h-screen
items-center
justify-center
bg-[#09090B]
text-white
text-xl
font-bold
"

>


Checking Authentication...

</div>


);


}









// =========================
// NOT LOGGED IN
// =========================


if(!user){


return (

<Navigate

to="/login"

replace

state={{

from:
location.pathname

}}


/>

);


}









// =========================
// AUTHORIZED
// =========================


return children;


}