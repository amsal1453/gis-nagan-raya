import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
    // Use separate controls for different animation groups
    const containerControls = useAnimation();
    const headerControls = useAnimation();
    const leftCardControls = useAnimation();
    const rightCardControls = useAnimation();

    // Improve InView detection with multiple refs
    const [containerRef, containerInView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [headerRef, headerInView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const [cardsRef, cardsInView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    // Trigger animations more reliably based on view status
    useEffect(() => {
        if (containerInView) {
            containerControls.start("visible");
        }
    }, [containerControls, containerInView]);

    useEffect(() => {
        if (headerInView) {
            headerControls.start("visible");
        }
    }, [headerControls, headerInView]);

    useEffect(() => {
        if (cardsInView) {
            // Sequence the animations with a slight delay
            leftCardControls.start("visible");
            setTimeout(() => {
                rightCardControls.start("visible");
            }, 150);
        }
    }, [leftCardControls, rightCardControls, cardsInView]);

    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const headerVariants = {
        hidden: {
            opacity: 0,
            y: -30,
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
            x: -50,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const rightCardVariants = {
        hidden: {
            opacity: 0,
            x: 50,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15,
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
        <motion.li
            className="flex items-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <CheckmarkIcon />
            <span>{children}</span>
        </motion.li>
    );

    return (
        <motion.section
            ref={containerRef}
            initial="hidden"
            animate={containerControls}
            variants={containerVariants}
            id="about"
            className="min-h-screen bg-gradient-to-r from-[#08244d] to-[#0A4D8C] overflow-hidden"
        >
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <motion.div
                    ref={headerRef}
                    initial="hidden"
                    animate={headerControls}
                    variants={headerVariants}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Tentang Kami
                    </h1>
                    <motion.div
                        className="w-20 h-1 bg-white mx-auto mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    ></motion.div>
                    <motion.p
                        className="text-gray-200 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Sistem Informasi Geografis kami menyediakan solusi
                        pemetaan dan analisis spasial yang komprehensif untuk
                        membantu Anda memahami data geografis dengan lebih baik.
                    </motion.p>
                </motion.div>

                {/* Main Content */}
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
                    {/* Vision Card */}
                    <motion.div
                        initial="hidden"
                        animate={leftCardControls}
                        variants={leftCardVariants}
                        className="p-6 bg-[#08244d] rounded-lg border-2 border-gray-700 transition-all duration-300 hover:shadow-xl"
                        whileHover={{
                            scale: 1.03,
                            backgroundColor: "#0A4D8C",
                            transition: { duration: 0.2 },
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
                        initial="hidden"
                        animate={rightCardControls}
                        variants={rightCardVariants}
                        className="p-6 bg-[#08244d] rounded-lg border-2 border-gray-700 transition-all duration-300 hover:shadow-xl"
                        whileHover={{
                            scale: 1.03,
                            backgroundColor: "#0A4D8C",
                            transition: { duration: 0.2 },
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
