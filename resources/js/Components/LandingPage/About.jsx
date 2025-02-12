import React from "react";

const About = () => {
    return (
        <section
            id="about"
            className="min-h-screen bg-gradient-to-r from-[#08244d] to-[#0A4D8C]"
        >
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Tentang Kami
                    </h1>
                    <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
                    <p className="text-gray-200 max-w-2xl mx-auto text-lg">
                        Sistem Informasi Geografis kami menyediakan solusi
                        pemetaan dan analisis spasial yang komprehensif untuk
                        membantu Anda memahami data geografis dengan lebih baik.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Vision Card */}
                    <div className="p-6 bg-[#08244d] rounded-lg border-2 border-gray-700 transition-all duration-300 hover:scale-105 hover:bg-[#0A4D8C] hover:shadow-xl">
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
                    </div>

                    {/* Mission Card */}
                    <div className="p-6 bg-[#08244d] rounded-lg border-2 border-gray-700 transition-all duration-300 hover:scale-105 hover:bg-[#0A4D8C] hover:shadow-xl">
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold text-white">
                                Misi Kami
                            </h2>
                        </div>
                        <div>
                            <ul className="text-gray-200 space-y-4">
                                <li className="flex items-start">
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
                                    Menyediakan data spasial yang akurat dan
                                    terbarukan
                                </li>
                                <li className="flex items-start">
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
                                    Mengembangkan teknologi pemetaan yang
                                    inovatif
                                </li>
                                <li className="flex items-start">
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
                                    Memberikan layanan analisis spasial yang
                                    komprehensif
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
