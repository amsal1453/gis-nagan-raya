import Navbar from "@/Components/LandingPage/Navbar";
import HeroSection from "@/Components/LandingPage/HeroSection";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Sistem Informasi Geografis" />
            <Navbar auth={auth} />
            <main>
            <HeroSection className="mt-0" />
            
            </main>
            
        </>
    );
}
