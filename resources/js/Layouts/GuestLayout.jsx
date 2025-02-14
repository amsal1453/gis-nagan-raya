import ApplicationLogo from '@/Components/ApplicationLogo';
import Navbar from "@/Components/Navbar";
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#08244d] to-[#0A4D8C]">
            <Navbar />
            
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
