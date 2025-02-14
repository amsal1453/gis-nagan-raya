import Aside from "@/Components/Aside";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React from "react";

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Fixed Navbar */}
            <div className="fixed top-0 z-50 w-full">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 pt-16">
                {/* Aside is now self-contained with its own responsive logic */}
                <Aside />

                {/* Main Content and Footer */}
                <div
                    className="relative flex flex-col flex-1 transition-all duration-300
                    lg:ml-[20%] w-full"
                >
                    {/* Background Image with Opacity */}
                    <div
                        className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center"
                        aria-hidden="true"
                    ></div>
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        aria-hidden="true"
                    ></div>

                    {/* Main Content */}
                    <main className="relative z-10 flex-1 p-4 lg:p-8 overflow-y-auto">
                        <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
                            {children}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="relative z-10">
                        <Footer />
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
