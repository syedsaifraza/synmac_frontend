import React from "react";
import {
    BiAward,
    BiGlobe,
    BiShield,
    BiUserPlus,
    BiCheckShield,
    BiTrendingUp,
} from "react-icons/bi";

const CerrierLife = () => {
    const strengths = [
        {
            icon: BiShield,
            title: "Quality Assurance",
            desc: "We maintain effective EHS management system",
        },
        {
            icon: BiAward,
            title: "30+ Years Experience",
            desc: "We train and educate our employees on time to time basis regarding the safety norms",
        },
        {
            icon: BiGlobe,
            title: "Global Reach",
            desc: "Each of our production unit has been constructed with taking utmost care of environment and employee safety",
        },
        {
            icon: BiUserPlus,
            title: "Customer Focus",
            desc: "Bilateral communication channels with employees, customers, suppliers & contractors",
        },
        {
            icon: BiCheckShield,
            title: "Safety Inspections",
            desc: "Continuous safety inspections at all locations for correcting deviations",
        },
        {
            icon: BiTrendingUp,
            title: "Technical Support",
            desc: "Dedicated technical support and custom solutions for every client",
        },
    ];

    return (
        <div className="py-16 px-6 md:px-20 bg-white">
            {/* EHS Policy Section */}
            <div className="text-center mb-16">

                <h2 className="font-display text-3xl md:text-4xl font-bold">
                    <span className="text-[#cd2626]">EHS Policy  <svg
                        className="absolute -bottom-2 left-0 w-full"
                        height="8"
                        viewBox="0 0 200 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 5.5C67 -1.5 133 -1.5 199 5.5"
                            stroke="#cd2626"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg></span> Excellence
                </h2>
                <div className="w-20 h-1 bg-[#cd2626] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* About Synmac Section */}
            <div className="text-center mb-20 max-w-5xl mx-auto">


                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    The Company is committed to provide and maintain a safe and healthy work environment by establishing safe operating procedures and practices that protect employees from ill health and injury and it is committed to conservation of resources and continual improvement of processes and activities in order to minimise impact on environment, prevent pollution and protect the environment.
                </p>
            </div>

            {/* Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {strengths.map((item, idx) => (
                    <div
                        key={idx}
                        className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className="w-16 h-16 rounded-xl bg-[#cd2626]/10 flex items-center justify-center mb-5 group-hover:bg-[#cd2626] transition-colors duration-300">
                            <item.icon
                                className="text-[#cd2626] group-hover:text-white transition-colors duration-300"
                                size={34}
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#cd2626] transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CerrierLife;