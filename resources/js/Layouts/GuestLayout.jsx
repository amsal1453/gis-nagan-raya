import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-[url('/bg.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden shadow-md   bg-[#ffff] sm:max-w-md sm:rounded-3xl z-10">
                {children}
            </div>
        </div>
    );
}
