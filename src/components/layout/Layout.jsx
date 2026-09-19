import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

import ToastContainer from "../common/ToastContainer";

import "./Layout.css";

export default function Layout() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, []);

    return (

        <div className="layout">

            <Sidebar />

            <MobileMenu

                open={mobileMenuOpen}

                onClose={() => setMobileMenuOpen(false)}

            />

            <div className="layout-content">

                <Navbar

                    onMenuClick={() =>

                        setMobileMenuOpen(true)

                    }

                />

                <main className="page-container">

                    <Outlet />

                </main>

                <Footer />

            </div>

            <ToastContainer />

        </div>

    );

}