import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Navbar({ auth }) {
    useEffect(() => {
        const menuToggle = document.getElementById("menu-toggle");
        const menu = document.getElementById("menu");

        const toggleMenu = () => {
            menu.classList.toggle("hidden");
        };

        menuToggle.addEventListener("click", toggleMenu);

        // Cleanup event listener on component unmount
        return () => {
            menuToggle.removeEventListener("click", toggleMenu);
        };
    }, []);

    return (
        <nav className="bg-primary" id="">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img
                            src="/lambang.png"
                            alt="Logo"
                            className="h-8 sm:h-10 mr-2"
                        />
                        <span className="text-white sm:text-2xl text-md font-bold">
                            Sistem Informasi Geografis
                        </span>
                    </div>
                    <div className="block lg:hidden">
                        <button
                            className="text-white focus:outline-none"
                            id="menu-toggle"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex space-x-4">
                        <a
                            href="/"
                            className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                        >
                            Home
                        </a>
                        <a
                            href="/spatial-data"
                            className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                        >
                            Spatial Data
                        </a>
                        <a
                            href="/about"
                            className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                        >
                            About
                        </a>
                        <a
                            href="/contact"
                            className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                        >
                            Contact
                        </a>
                        {!auth.user ? (
                            <a
                                href="/login"
                                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                            >
                                Login
                            </a>
                        ) : (
                            <span className="text-whitebg-blue-500 hover:bg-blue-600 px-4 py-2 rounded ">
                                <Link href="/dashboard">Dashboard</Link>
                            </span>
                        )}
                    </div>
                </div>
                <div className="lg:hidden" id="menu">
                    <a
                        href="/"
                        className="block text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                    >
                        Home
                    </a>
                    <a
                        href="/spatial-data"
                        className="block text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                    >
                        Spatial Data
                    </a>
                    <a
                        href="/about"
                        className="block text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                    >
                        About
                    </a>
                    <a
                        href="/contact"
                        className="block text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded"
                    >
                        Contact
                    </a>
                    {!auth.user ? (
                        <a href="/login" className="block text-white px-3 py-2">
                            Login
                        </a>
                    ) : (
                        <span className="text-whitebg-blue-500 hover:bg-blue-600 px-4 py-2 rounded ">
                            <Link href="/dashboard">Dashboard</Link>
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
}
