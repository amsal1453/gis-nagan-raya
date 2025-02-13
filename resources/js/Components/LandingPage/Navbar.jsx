import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Navbar({ auth }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const menuToggle = document.getElementById("menu-toggle");
        const menu = document.getElementById("menu");

        const toggleMenu = () => {
            menu.classList.toggle("hidden");
        };

        menuToggle.addEventListener("click", toggleMenu);

        return () => {
            menuToggle?.removeEventListener("click", toggleMenu);
        };
    }, []);

    return (
        <>
            <div className="h-16"></div>

            <nav
                className={`fixed w-full top-0 transition-all duration-300 z-[1000] ${
                    isScrolled
                        ? "bg-primary/95 backdrop-blur-sm shadow-lg mx-4 mt-2 rounded-2xl border border-white/10"
                        : "bg-primary"
                }`}
            >
                <div
                    className={`container mx-auto px-4 ${
                        isScrolled ? "max-w-[98%]" : ""
                    }`}
                >
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <img
                                src="/lambang.png"
                                alt="Logo"
                                className="h-5 sm:h-7 mr-1"
                            />
                            <span
                                className={`${
                                    isScrolled
                                        ? "text-white drop-shadow-md"
                                        : "text-white/90"
                                } text-xs sm:text-base md:text-xl font-bold tracking-tight`}
                            >
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
                                href="/#home"
                                className={`${
                                    isScrolled
                                        ? "text-white hover:bg-white/10 rounded-lg font-medium"
                                        : "text-white/90 hover:bg-blue-600 rounded-lg"
                                } px-3 py-2 transition-all`}
                            >
                                Home
                            </a>
                            <a
                                href="#spatial-data"
                                className={`${
                                    isScrolled
                                        ? "text-white hover:bg-white/10 rounded-lg font-medium"
                                        : "text-white/90 hover:bg-blue-600 rounded-lg"
                                } px-3 py-2 transition-all`}
                            >
                                Spatial Data
                            </a>
                            <a
                                href="/#about"
                                className={`${
                                    isScrolled
                                        ? "text-white hover:bg-white/10 rounded-lg font-medium"
                                        : "text-white/90 hover:bg-blue-600 rounded-lg"
                                } px-3 py-2 transition-all`}
                            >
                                About
                            </a>
                            <a
                                href="/#contact"
                                className={`${
                                    isScrolled
                                        ? "text-white hover:bg-white/10 rounded-lg font-medium"
                                        : "text-white/90 hover:bg-blue-600 rounded-lg"
                                } px-3 py-2 transition-all`}
                            >
                                Contact
                            </a>
                            {!auth.user ? (
                                <a
                                    href="/login"
                                    className={`${
                                        isScrolled
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-blue-500 hover:bg-blue-600 text-white"
                                    } px-4 py-2 rounded-lg transition-all`}
                                >
                                    Login
                                </a>
                            ) : (
                                <span
                                    className={`${
                                        isScrolled
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    } px-4 py-2 rounded-lg transition-all`}
                                >
                                    <Link href="/dashboard">Dashboard</Link>
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={`lg:hidden absolute w-[calc(100%-2rem)] left-4 top-full ${
                            isScrolled
                                ? "bg-primary/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 mt-2"
                                : "bg-primary"
                        }`}
                        id="menu"
                    >
                        <div className="container mx-auto px-4 py-2">
                            <a
                                href="/#home"
                                className="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                            >
                                Home
                            </a>
                            <a
                                href="#spatial-data"
                                className="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                            >
                                Spatial Data
                            </a>
                            <a
                                href="/#about"
                                className="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                            >
                                About
                            </a>
                            <a
                                href="/#contact"
                                className="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                            >
                                Contact
                            </a>
                            {!auth.user ? (
                                <Link
                                    href="/login"
                                    className="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                                >
                                    Login
                                </Link>
                            ) : (
                                <Link
                                    href="/dashboard"
                                    className="block text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
