import {
  Outlet
} from "react-router-dom";


import {
  useState
} from "react";



import Navbar from "../layout/Navbar";

import Sidebar from "../layout/Sidebar";

import Footer from "../layout/Footer";



import "../layout/MainLayout.css";





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