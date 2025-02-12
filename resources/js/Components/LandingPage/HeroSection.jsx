import React, { useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import Globe from "react-globe.gl";

const HeroSection = () => {
    const globeRef = useRef();

    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.0;

            // Fungsi animasi
            const animate = () => {
                controls.update();
                requestAnimationFrame(animate);
            };

            animate();

            // Cleanup function
            return () => {
                controls.autoRotate = false;
                controls.dispose();
            };
        }
    }, []);
    return (
        <section 
        id="/home"
        className="bg-gradient-to-r from-[#08244d] to-[#0A4D8C] h-[calc(100vh-800px)] min-h-screen flex items-center overflow-x-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="text-white text-center md:text-left px-4 md:px-0">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            Selamat Datang di Sistem Informasi Geografis
                        </h1>
                        <p className="text-base md:text-lg mb-6 md:mb-8 mx-auto md:mx-0 md:max-w-[90%]">
                            Temukan data spasial terkini dan informasi geografis
                            wilayah Nagan Raya secara lengkap dan akurat.
                        </p>
                        <Link
                            href={route("login")}
                            className="inline-block bg-white text-primary px-6 py-3 md:px-10 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-sm md:text-base shadow-md hover:shadow-lg"
                        >
                            Mulai Jelajahi
                        </Link>
                    </div>
                    <div className="md:mt-0 h-[500px] flex justify-center w-full overflow-hidden">
                        <Globe
                            ref={globeRef}
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                            backgroundColor="rgba(0,0,0,0)"
                            width={800}
                            height={600}
                            animateIn={true}
                            showGraticules={true}
                            atmosphereColor="#ffffff"
                            atmosphereAltitude={0.1}
                            enableGlobeRotation={true}
                            autoRotate={true}
                            autoRotateSpeed={0.5}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
