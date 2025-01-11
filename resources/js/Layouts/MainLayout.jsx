import Aside from '@/Components/Aside';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen bg-gray-100 ">
            {/* Fixed Navbar */}
            <div className="fixed top-0 z-50 w-full">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 mt-20">
                <Aside />
                <div className="relative flex flex-col flex-1">
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
                    <main className="relative z-10 flex-1 p-8 overflow-y-auto">
                        <div className="container mx-auto">
                            <div className="p-6 rounded-lg shadow-sm bg-primary">
                                {children}
                            </div>
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
