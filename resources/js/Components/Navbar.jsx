import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-primary p-4">
            <div className="container mx-auto flex justify-between items-center">
                
                <Link href="/" className="flex items-center space-x-3">
                    <img 
                        src="/lambang.png" // Ganti dengan path logo Anda
                        alt="Logo SIG" 
                        className="h-8 w-8 sm:h-10 sm:w-10"
                    />
                    <span className="text-white text-lg font-bold hidden sm:block">
                        SIG Nagan Raya
                    </span>
                </Link>

            </div>
        </nav>
    );
}
