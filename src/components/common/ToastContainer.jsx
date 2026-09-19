import React from "react";


import {

useNotification

}

from "../../context/NotificationContext";


import "./ToastContainer.css";









export default function ToastContainer(){



const {

notifications,

removeNotification

}=useNotification();









return (



<div className="toast-container">



{

notifications.map((toast)=>(



<div


key={toast.id}


className={

`

crystal-toast

${toast.type}

`

}



>



<div className="toast-content">



<span className="toast-icon">


{

toast.type==="success"

&&

"✅"



}



{

toast.type==="error"

&&

"❌"



}



{

toast.type==="warning"

&&

"⚠️"



}



{

toast.type==="info"

&&

"ℹ️"



}



</span>





<p>

{toast.message}

</p>



</div>







<button


className="toast-close"


onClick={()=>


removeNotification(toast.id)

}


>

×

</button>







</div>



))



}



</div>



);



}