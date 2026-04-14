

const WhoWeAre = () => {



    return (
        <div className="py-12 px-4 md:px-20 bg-white">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        A LEADER IN{" "}
                        <span className="text-[#cd2626]">SPECIALTY CHEMICAL</span> PRODUCTION
                    </h2>
                    <div className="w-16 h-0.5 bg-[#cd2626] mx-auto mt-3"></div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    <div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            At Synmac Chemicals, our number-one goal is to be a market leader in the specialty chemical sector.
                            We accomplish this by creating custom solutions and quality products for our customers. Synmac
                            focused on developing, manufacturing, and selling value-added performance additive for various industries.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Synmac has an experience of over two decade in the field of specialty chemicals. The ability to
                            find innovative solutions to customers needs, while addressing health, safety and environmental
                            issues, is key to our growth.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Synmac, an innovative specialty chemicals company, has developed a large number of products.
                            We offer several product ranges serving many sectors. Our chemical products and technical services
                            enhance our customer processes, improve their product quality, and lower their cost.
                        </p>
                    </div>


                    <div className="bg-gray-200 h-80 rounded-lg overflow-hidden shadow-md">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwcoKGThYs9a-JVBEK0C3_ZuLes_CP8rzLHg&s"
                            alt="Synmac Chemicals Factory"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>





            </div>
        </div>
    );
};

export default WhoWeAre;