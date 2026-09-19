import { FaStar } from "react-icons/fa";

import "./RatingBadge.css";

export default function RatingBadge({

rating = 0,

size = "medium",

showText = true

}) {

const score = Number(rating).toFixed(1);

function getClass() {

if (rating >= 8) return "excellent";

if (rating >= 6) return "good";

if (rating >= 4) return "average";

return "poor";

}

return (

<div

className={`rating-badge ${size} ${getClass()}`}

>

<FaStar />

{showText && (

<span>

{score}

</span>

)}

</div>

);

}