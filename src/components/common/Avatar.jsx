import React from "react";


import "./Avatar.css";









export default function Avatar({

image,

name="User",

size="medium",

online=false,

border=true,

className=""

}){





// Create initials

const getInitials = ()=>{


return name

.split(" ")

.map(word=>word[0])

.join("")

.substring(0,2)

.toUpperCase();



};









return (



<div


className={

`

avatar-wrapper

${size}

${className}

`

}



>



{


image ? (



<img


src={image}


alt={name}


className={

border ?

"avatar-image bordered"

:

"avatar-image"

}


/>



)

:

(



<div

className="avatar-placeholder"

>

{

getInitials()

}

</div>



)



}







{

online &&

<span

className="online-status"

>

</span>

}



</div>



);



}