import Navbar from "@/Components/LandingPage/Navbar";
import HeroSection from "@/Components/LandingPage/HeroSection";
import { Head, Link } from "@inertiajs/react";
import PublicSpatialMap from "@/Components/LandingPage/PublicSpatialMap";
import About from "@/Components/LandingPage/About";
import Contact from "@/Components/LandingPage/Contact";
import Footer from "@/Components/LandingPage/Footer";


export default function Welcome({ auth, spatialData, villages, categories }) {
    console.log('spatialData' ,spatialData)
    return (
        <>
            <Head title="Sistem Informasi Geografis" />
            <Navbar auth={auth} />
            <main>
                <HeroSection className="mt-16 mb-8 md:mb-16" />

                <PublicSpatialMap
                    spatialData={spatialData}
                    villages={villages}
                    categories={categories}
                    className="mt-8"
                />

                <About />
                <Contact />
                <Footer />
            </main>
        </>
    );
}
