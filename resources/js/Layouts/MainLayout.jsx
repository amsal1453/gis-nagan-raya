import Aside from '@/Components/Aside';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Fixed Navbar */}
            <div className="fixed top-0 z-50 w-full">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 pt-20"> {/* Tambahkan padding-top untuk Navbar */}
                {/* Fixed Aside */}
                <div className="fixed left-0 w-1/5 h-full ">
                    <Aside />
                </div>

                {/* Main Content and Footer */}
                <div className="relative flex flex-col flex-1 ml-[20%]"> {/* Sesuaikan margin-left dengan lebar Aside */}
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
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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