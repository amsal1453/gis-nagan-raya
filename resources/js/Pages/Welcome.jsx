import Navbar from "@/Components/LandingPage/Navbar";
import HeroSection from "@/Components/LandingPage/HeroSection";
import { Head, Link } from "@inertiajs/react";
import PublicSpatialMap from "@/Components/LandingPage/PublicSpatialMap";
import About from "@/Components/LandingPage/About";
import Contact from "@/Components/LandingPage/Contact";
import Footer from "@/Components/LandingPage/Footer";

import { motion, AnimatePresence } from "framer-motion";

export default function Welcome({ auth, spatialData, villages, categories }) {
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 0.8,
                staggerChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            y: -20
        }
    };

    const elementVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <Head title="Sistem Informasi Geografis" />
                <Navbar auth={auth} />
                <main>
                    <motion.div variants={elementVariants}>
                        <HeroSection className="mt-16 mb-8 md:mb-16" />
                    </motion.div>

                    <motion.div variants={elementVariants}>
                        <PublicSpatialMap
                            spatialData={spatialData}
                            villages={villages}
                            categories={categories}
                            className="mt-8"
                        />
                    </motion.div>

                    <motion.div variants={elementVariants}>
                        <About />
                    </motion.div>

                    <motion.div variants={elementVariants}>
                        <Contact />
                    </motion.div>
                    <Footer />
                </main>
            </motion.div>
        </AnimatePresence>
    );
}

