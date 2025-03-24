import { Link, usePage, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { LIST_ASIDE } from "@/Constants/ListAside";
import { IoMenu, IoClose } from "react-icons/io5";

const Aside = () => {
    const { auth } = usePage().props;
    const userRole = auth?.roles?.[0] || "";
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
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Filter menu items based on user role
    const regularMenuItems = LIST_ASIDE.filter((item) => {
        const hasPermission = item.permission.includes(userRole);
        return hasPermission;
    });



    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("photo", file);

            router.post(route("profile.photo.update"), formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    alert("Profile photo updated successfully");
                },
                onError: () => {
                    alert("Failed to update profile photo");
                },
            });
        }
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
                className={`fixed top-0 left-0 h-screen bg-primary z-40
                    transition-transform duration-300 ease-in-out
                    w-72 lg:w-1/5 flex flex-col
                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Profile Section - Fixed at top */}
                <div className="flex flex-col items-center pt-4 pb-4 mt-16">
                    <div className="relative group">
                        <img
                            src={auth.user.profile_photo_url}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white"
                        />
                        <label
                            htmlFor="profile-photo"
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                        >
                            <span className="text-white text-sm">
                                Change Photo
                            </span>
                        </label>
                        <input
                            type="file"
                            id="profile-photo"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleProfilePhotoChange(e)}
                        />
                    </div>
                    <h2 className="mt-4 text-white font-semibold">
                        {auth.user.name}
                    </h2>
                    <p className="text-gray-300 text-sm">{auth.user.email}</p>
                </div>

                <div className="bg-white">
                    <h1 className="text-xl font-semibold text-black pl-8 py-2">
                        MAIN NAVIGATION
                    </h1>
                </div>

                {/* Scrollable Menu Items Area */}
                <div className="flex-1 overflow-y-auto pb-20">
                    <div className="flex flex-col items-center w-full mt-5">
                        <ul className="w-full">
                            {regularMenuItems.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="w-full mb-4 text-[15px] font-bold text-white"
                                    >
                                        <Link
                                            href={
                                                item.title === "Logout"
                                                    ? route("logout")
                                                    : route(item.route)
                                            }
                                            method={
                                                item.title === "Logout"
                                                    ? "post"
                                                    : undefined
                                            }
                                            as={
                                                item.title === "Logout"
                                                    ? "button"
                                                    : undefined
                                            }
                                            className="flex items-center w-full px-4 py-2 transition duration-200 hover:bg-white hover:text-black hover:rounded"
                                            onClick={() =>
                                                isMobile && toggleMenu()
                                            }
                                        >
                                            <item.icon
                                                size={20}
                                                className="mr-2"
                                            />{" "}
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Aside;
