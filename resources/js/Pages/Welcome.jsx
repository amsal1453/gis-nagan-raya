import Navbar from "@/Components/LandingPage/Navbar";
import HeroSection from "@/Components/LandingPage/HeroSection";
import { Head, Link } from "@inertiajs/react";
import PublicSpatialMap from "@/Components/LandingPage/PublicSpatialMap";


export default function Welcome({ auth, spatialData, villages, categories }) {
    return (
        <>
            <Head title="Sistem Informasi Geografis" />
            <Navbar auth={auth} />
            <main>
                <HeroSection className="mt-0" />
                
                <PublicSpatialMap
                spatialData={spatialData}
                villages={villages} 
                categories={categories}/>
            </main>
        </>
    );
}
