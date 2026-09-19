import {
  Outlet
} from "react-router-dom";


import {
  useState
} from "react";



import Navbar from "./Navbar";

import Sidebar from "./Sidebar";

import Footer from "./Footer";



import "./MainLayout.css";





export default function MainLayout(){


const [sidebarOpen,setSidebarOpen] = useState(false);



return (

<div

className="
min-h-screen
bg-[#09090b]
text-white
"

>



{/* NAVBAR */}

<Navbar

onMenuClick={()=>setSidebarOpen(true)}

/>






{/* SIDEBAR */}

<Sidebar

open={sidebarOpen}

onClose={()=>setSidebarOpen(false)}

/>








{/* MAIN CONTENT */}


<main

className="
pt-20
min-h-screen
"

>

<Outlet/>


</main>








{/* FOOTER */}

<Footer/>


</div>


);

}