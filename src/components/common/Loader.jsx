import React from "react";


import "./Loader.css";









export default function Loader({

type="spinner",

size="medium",

text,

fullScreen=false

}){





if(type==="skeleton"){



return (

<div

className="skeleton-loader"

>


<div className="skeleton-image">

</div>


<div className="skeleton-line">

</div>


<div className="skeleton-line small">

</div>


</div>

);


}









return (



<div

className={

`

loader-container

${fullScreen ? "fullscreen":""}

`

}

>



<div

className={

`

crystal-spinner

${size}

`

}

>

</div>





{

text &&

<p>

{text}

</p>

}



</div>



);
}



//__Movie_Card_Skeleton__

export function MovieSkeleton(){
return (
<div className="movie-skeleton">
<div className="poster-skeleton">
</div>
<div className="title-skeleton">
    
</div>
<div className="rating-skeleton">
</div>



</div>



);



}