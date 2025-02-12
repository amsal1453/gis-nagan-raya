import React from "react";

const Contact = () => {
    return (
        <div
            id="contact"
            className="min-h-screen"
            style={{ backgroundColor: "#08244d" }}
        >
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Hubungi Kami
                    </h1>
                    <div className="w-20 h-1 bg-white/80 mx-auto mb-8"></div>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Kami siap membantu Anda. Silakan hubungi kami melalui
                        salah satu kontak di bawah ini.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300"
                            style={{ backgroundColor: "rgba(8, 36, 77, 0.1)" }}
                        >
                            <svg
                                className="w-6 h-6"
                                style={{ color: "#08244d" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        </div>
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: "#08244d" }}
                        >
                            Telepon
                        </h3>
                        <p style={{ color: "#08244d" }}>+62 123 456 789</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: "rgba(8, 36, 77, 0.1)" }}
                        >
                            <svg
                                className="w-6 h-6"
                                style={{ color: "#08244d" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: "#08244d" }}
                        >
                            Email
                        </h3>
                        <p style={{ color: "#08244d" }}>info@sigexample.com</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: "rgba(8, 36, 77, 0.1)" }}
                        >
                            <svg
                                className="w-6 h-6"
                                style={{ color: "#08244d" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
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
                            </svg>
                        </div>
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: "#08244d" }}
                        >
                            Alamat
                        </h3>
                        <p style={{ color: "#08244d" }}>
                            Jl. Contoh No. 123, Jakarta
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2
                            className="text-2xl font-semibold mb-6"
                            style={{ color: "#08244d" }}
                        >
                            Kirim Pesan
                        </h2>
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: "#08244d" }}
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2"
                                    style={{
                                        borderColor: "rgba(8, 36, 77, 0.2)",
                                        color: "#08244d",
                                    }}
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: "#08244d" }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2"
                                    style={{
                                        borderColor: "rgba(8, 36, 77, 0.2)",
                                        color: "#08244d",
                                    }}
                                    placeholder="Masukkan email"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: "#08244d" }}
                                >
                                    Pesan
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2"
                                    style={{
                                        borderColor: "rgba(8, 36, 77, 0.2)",
                                        color: "#08244d",
                                    }}
                                    placeholder="Tulis pesan Anda"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 rounded-md hover:opacity-90 transition-opacity duration-300"
                                style={{
                                    backgroundColor: "#08244d",
                                    color: "white",
                                }}
                            >
                                Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
