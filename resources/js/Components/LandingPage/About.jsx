import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.3,
            },
        },
    };

    const headerVariants = {
        hidden: {
            opacity: 0,
            y: -50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const leftCardVariants = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const rightCardVariants = {
        hidden: {
            opacity: 0,
            x: 100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const CheckmarkIcon = () => (
        <svg
            className="w-6 h-6 text-white mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
    );

    const MissionListItem = ({ children }) => (
        <li className="flex items-start">
            <CheckmarkIcon />
            <span>{children}</span>
        </li>
    );

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            id="about"
            className="min-h-screen bg-gradient-to-r from-[#08244d] to-[#0A4D8C] overflow-x-hidden"
        >
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <motion.div
                    variants={headerVariants}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Tentang Kami
                    </h1>
                    <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
                    <p className="text-gray-200 max-w-2xl mx-auto text-lg">
                        Sistem Informasi Geografis kami menyediakan solusi
                        pemetaan dan analisis spasial yang komprehensif untuk
                        membantu Anda memahami data geografis dengan lebih baik.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Vision Card */}
                    <motion.div
                        variants={leftCardVariants}
                        className="p-6 bg-[#08244d] rounded-lg border-2 border-gray-700 transition-all duration-300 hover:scale-105 hover:bg-[#0A4D8C] hover:shadow-xl"
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#0A4D8C",
                            transition: { duration: 0.3 },
                        }}
                    >
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold text-white">
                                Visi Kami
                            </h2>
                        </div>
                        <div>
                            <p className="text-gray-200">
                                Menjadi platform terdepan dalam penyediaan
                                informasi geografis yang akurat, mudah diakses,
                                dan bermanfaat bagi seluruh pemangku kepentingan
                                dalam pengambilan keputusan berbasis data
                                spasial.
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                        variants={rightCardVariants}
                        className="p-6 bg-[#08244d] rounded-lg border-2 border-gray-700 transition-all duration-300 hover:scale-105 hover:bg-[#0A4D8C] hover:shadow-xl"
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#0A4D8C",
                            transition: { duration: 0.3 },
                        }}
                    >
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold text-white">
                                Misi Kami
                            </h2>
                        </div>
                        <div>
                            <ul className="text-gray-200 space-y-4">
                                <MissionListItem>
                                    Menyediakan data spasial yang akurat dan
                                    terbarukan
                                </MissionListItem>
                                <MissionListItem>
                                    Mengembangkan teknologi pemetaan yang
                                    inovatif
                                </MissionListItem>
                                <MissionListItem>
                                    Memberikan layanan analisis spasial yang
                                    komprehensif
                                </MissionListItem>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;
