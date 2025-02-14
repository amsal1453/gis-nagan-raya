import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Contact = () => {
    const { scrollYProgress } = useScroll();

    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

    const ContactCard = ({ item, index }) => {
        const ref = React.useRef(null);
        const isInView = useInView(ref, { once: true, margin: "-100px" });

        return (
            <motion.div
                ref={ref}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                whileTap="tap"
                custom={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center transform-gpu"
            >
                <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "rgba(8, 36, 77, 0.1)" }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.svg
                        className="w-6 h-6"
                        style={{ color: "#08244d" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <motion.g variants={iconAnimation}>
                            {item.icon}
                        </motion.g>
                    </motion.svg>
                </motion.div>
                <motion.h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#08244d" }}
                >
                    {item.title}
                </motion.h3>
                <motion.p style={{ color: "#08244d" }}>{item.content}</motion.p>
            </motion.div>
        );
    };

    const FormSection = () => {
        const ref = React.useRef(null);
        const isInView = useInView(ref, { once: true, margin: "-100px" });

        return (
            <motion.div
                ref={ref}
                variants={formVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-2xl mx-auto"
            >
                {/* Rest of the form content remains the same */}
                <motion.div
                    className="bg-white p-8 rounded-lg shadow-lg"
                    whileHover={{ boxShadow: "0px 10px 30px rgba(0,0,0,0.15)" }}
                >
                    {/* Form content (same as before) */}
                    <motion.h2
                        className="text-2xl font-semibold mb-6"
                        style={{ color: "#08244d" }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -20 }
                        }
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Kirim Pesan
                    </motion.h2>
                    <form className="space-y-6">
                        {[
                            {
                                id: "name",
                                label: "Nama Lengkap",
                                type: "text",
                                placeholder: "Masukkan nama lengkap",
                            },
                            {
                                id: "email",
                                label: "Email",
                                type: "email",
                                placeholder: "Masukkan email",
                            },
                        ].map((field, index) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={
                                    isInView
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -20 }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: 0.3 + index * 0.1,
                                }}
                            >
                                <label
                                    htmlFor={field.id}
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: "#08244d" }}
                                >
                                    {field.label}
                                </label>
                                <motion.input
                                    type={field.type}
                                    id={field.id}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    style={{
                                        borderColor: "rgba(8, 36, 77, 0.2)",
                                        color: "#08244d",
                                    }}
                                    placeholder={field.placeholder}
                                    variants={inputVariants}
                                    whileFocus="focus"
                                />
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -20 }
                            }
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium mb-1"
                                style={{ color: "#08244d" }}
                            >
                                Pesan
                            </label>
                            <motion.textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                style={{
                                    borderColor: "rgba(8, 36, 77, 0.2)",
                                    color: "#08244d",
                                }}
                                placeholder="Tulis pesan Anda"
                                variants={inputVariants}
                                whileFocus="focus"
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full py-2 px-4 rounded-md transition-all duration-300"
                            style={{
                                backgroundColor: "#08244d",
                                color: "white",
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            Kirim Pesan
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        );
    };

    // Animation variants
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                when: "beforeChildren",
                staggerChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.8,
        },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: custom * 0.2,
            },
        }),
        hover: {
            scale: 1.05,
            y: -10,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    const formVariants = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    const iconAnimation = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            id="contact"
            className="min-h-screen"
            style={{ backgroundColor: "#08244d" }}
        >
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    style={{
                        opacity: headerOpacity,
                        y: headerY,
                    }}
                    className="text-center mb-12"
                >
                    <motion.h1
                        className="text-4xl font-bold text-white mb-4"
                        animate={{
                            scale: [1, 1.05, 1],
                            transition: { duration: 2, repeat: Infinity },
                        }}
                    >
                        Hubungi Kami
                    </motion.h1>
                    <motion.div
                        className="w-20 h-1 bg-white/80 mx-auto mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    />
                    <motion.p
                        className="text-gray-300 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        Kami siap membantu Anda. Silakan hubungi kami melalui
                        salah satu kontak di bawah ini.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: "Telepon",
                            content: "+62 123 456 789",
                            icon: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            ),
                        },
                        {
                            title: "Email",
                            content: "info@sigexample.com",
                            icon: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            ),
                        },
                        {
                            title: "Alamat",
                            content: "Jl. Contoh No. 123, Jakarta",
                            icon: (
                                <>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </>
                            ),
                        },
                    ].map((item, index) => (
                        <ContactCard key={index} item={item} index={index} />
                    ))}
                </div>

                <FormSection />
            </div>
        </motion.div>
    );
};

export default Contact;
