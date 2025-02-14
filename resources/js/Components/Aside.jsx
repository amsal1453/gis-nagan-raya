import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { LIST_ASIDE } from '@/Constants/ListAside';
import { IoLogOutSharp } from 'react-icons/io5';
import { IoMenu, IoClose } from 'react-icons/io5';

const Aside = () => {
    const { auth } = usePage().props;
    const userRole = auth?.roles?.[0] || '';
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const filteredMenu = LIST_ASIDE.filter(item => {
        const hasPermission = item.permission.includes(userRole);
        return hasPermission;
    });

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white lg:hidden"
            >
                {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleMenu}
                />
            )}

            {/* Aside Content */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-primary overflow-y-auto mt-16 
                    transition-transform duration-300 ease-in-out z-40
                    w-72 lg:w-1/5 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="mt-10 bg-white">
                    <h1 className="text-xl font-semibold text-black pl-8">
                        MAIN NAVIGATION
                    </h1>
                </div>
                <div className="flex flex-col items-center w-full mt-5">
                    <ul className="w-full">
                        {filteredMenu.map((item, index) => (
                            <li key={index} className="w-full mb-4 text-base font-bold text-white">
                                {item.title === 'Logout' ? (
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center w-full px-4 py-2 transition duration-200 hover:bg-white hover:text-black hover:rounded"
                                        onClick={() => isMobile && toggleMenu()}
                                    >
                                        <IoLogOutSharp size={20} className="mr-2" /> {item.title}
                                    </Link>
                                ) : (
                                    <Link
                                        href={route(item.route)}
                                        className="flex items-center px-4 py-2 transition duration-200 hover:bg-white hover:text-black hover:rounded"
                                        onClick={() => isMobile && toggleMenu()}
                                    >
                                        <item.icon size={20} className="mr-2" /> {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Aside;