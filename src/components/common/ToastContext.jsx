import {
  createContext,
  useContext,
  useState,
} from "react";


import {
  AnimatePresence,
} from "framer-motion";


import ToastNotification from "./ToastNotification";







const ToastContext =
createContext();








export function ToastProvider({

children

}){



const [toast,setToast] =
useState(null);









function showToast(

message,

type="success"

){



setToast({

message,

type

});





setTimeout(()=>{


setToast(null);


},3000);



}









function hideToast(){


setToast(null);


}









return (


<ToastContext.Provider


value={{

showToast,

hideToast

}}



>


{children}









<AnimatePresence>


{

toast &&



<ToastNotification


message={toast.message}


type={toast.type}


onClose={hideToast}


/>


}


</AnimatePresence>







</ToastContext.Provider>


);


}









export function useToast(){



return useContext(
ToastContext
);



}