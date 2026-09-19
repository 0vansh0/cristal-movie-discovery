import {

createContext,

useContext,

useState

}

from "react";



import {

TOAST_TYPES

}

from "../utils/constants";









const NotificationContext =

createContext();









export function NotificationProvider({

children

}){



const [notifications,setNotifications] =

useState([]);









// ==========================
// ADD NOTIFICATION
// ==========================


function showNotification(

message,

type = TOAST_TYPES.INFO,

duration = 3000

){



const id =

Date.now();





const notification = {


id,


message,


type


};









setNotifications(prev=>[

...prev,

notification

]);









// Auto remove


setTimeout(()=>{


removeNotification(id);


},duration);



}









// ==========================
// REMOVE
// ==========================


function removeNotification(

id

){



setNotifications(prev=>

prev.filter(

item=>

item.id !== id

)

);



}









// ==========================
// SHORTCUT METHODS
// ==========================


function success(

message

){



showNotification(

message,

TOAST_TYPES.SUCCESS

);



}









function error(

message

){



showNotification(

message,

TOAST_TYPES.ERROR

);



}









function warning(

message

){



showNotification(

message,

TOAST_TYPES.WARNING

);



}









function info(

message

){



showNotification(

message,

TOAST_TYPES.INFO

);



}









function clearNotifications(){



setNotifications([]);




}









return (

<NotificationContext.Provider

value={


{


notifications,


showNotification,

removeNotification,

clearNotifications,


success,

error,

warning,

info


}


}

>



{children}



</NotificationContext.Provider>

);



}









export function useNotification(){



return useContext(

NotificationContext

);



}