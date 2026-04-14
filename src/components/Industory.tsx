

'use client'

import { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaLongArrowAltLeft, FaLongArrowAltRight, FaPlay } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { LiaAngleDownSolid, LiaAngleRightSolid, LiaAngleUpSolid } from "react-icons/lia";




const Industory = () => {


  const [play, setPlay] = useState(false);


  const faqs = [
    {
      question: "How can AI improve food safety?",
      answer: "AI-powered vision systems can detect contaminants, monitor temperature, and track expiration dates in real-time across production lines."
    },
    {
      question: "What are the benefits of supply chain digitization?",
      answer: "Real-time tracking, reduced waste, improved traceability from farm to fork, and better demand forecasting for perishable goods."
    },
    {
      question: "How does automation help beverage production?",
      answer: "Automated bottling, labeling, and quality control systems increase throughput, reduce human error, and maintain consistency."
    },
    {
      question: "What is smart inventory management?",
      answer: "IoT sensors and AI predict stock levels, automate reordering, and reduce spoilage by optimizing storage conditions."
    },
    {
      question: "How can data analytics improve menu planning?",
      answer: "Analytics track customer preferences, seasonal trends, and nutritional data to optimize offerings and reduce food waste."
    }
  ];

  function FAQAccordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index:any) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">  Answers to Your Most Important Questions</h2>

          <div className="">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-600  overflow-hidden"
              >

                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-4 text-left  font-semibold text-lg bg-white hover:bg-gray-50"
                >
                  {faq.question}
                  <span className="text-xl">
                    {activeIndex === index ? (<LiaAngleUpSolid />) : (<LiaAngleDownSolid />)}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`px-4 transition-all duration-300 ${activeIndex === index ? "max-h-40 py-3" : "max-h-0 overflow-hidden"
                    }`}
                >
                  <p className="text-gray-600 text-md">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    );
  }


  const data = [
    {
      margin: "ml-20",
      title: "Nestlé",
      desc: "Reduces supply chain waste by 35% with AI-powered demand forecasting",
      img: "/img1.jpg",
    },
    {
      title: "Coca-Cola",
      desc: "Optimizes production lines with real-time IoT monitoring across 200+ plants",
      img: "/img2.jpg",
    },
    {
      title: "Danone",
      desc: "Ensures dairy quality with blockchain traceability from farm to shelf",
      img: "/img3.jpg",
    },
    {
      title: "PepsiCo",
      desc: "AI-driven inventory management reduces spoilage by 28% in warehouses",
      img: "/img1.jpg",
    },
    {
      title: "Heineken",
      desc: "Smart brewing automation increases efficiency while maintaining traditional quality",
      img: "/img2.jpg",
    },
    {
      title: "Unilever",
      desc: "Digital twins optimize recipe scaling and ingredient sourcing globally",
      img: "/img3.jpg",
    },
    {
      title: "Kraft Heinz",
      desc: "Computer vision systems detect packaging defects at 200 units per minute",
      img: "/img1.jpg",
    },
    {
      title: "Tyson Foods",
      desc: "Predictive maintenance reduces equipment downtime by 40% in processing facilities",
      img: "/img2.jpg",
    },
    {
      margin: "mr-20",
      title: "Starbucks",
      desc: "Personalized recommendations drive 22% increase in customer loyalty program engagement",
      img: "/img3.jpg",
    },
  ];


  function CustomerStories() {
    const scrollRef = useRef<any>(null);

    const scroll = (direction:any) => {
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    return (
      <div className="   py-10">


        <div className="flex justify-between items-center mb-6 px-20 ">
          <h2 className="text-3xl font-semibold">Features</h2>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-2 text-4xl"
            >
              <IoIosArrowRoundBack />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 text-4xl"
            >
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto  scroll-smooth no-scrollbar"
        >
          {data.map((item, i) => (
            <div
              key={i}
              className={`min-w-75 ${item?.margin} h-100 relative rounded-sm overflow-hidden `}
            >

              <img
                src={"https://images.stockcake.com/public/3/e/8/3e83452c-6b60-479a-9161-56d0ddecf7a7_large/electronic-circuit-closeup-stockcake.jpg"}
                alt={item.title}
                className="w-full h-full object-cover "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 hover:scale-100 transition duration-500">
                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm mt-1">
                  {item.desc}
                </p>


              </div>
            </div>
          ))}
        </div>
      </div>)
  }

  function CustomerStories1() {
    const scrollRef = useRef<any>(null);

    const scroll = (direction:any) => {
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    const guidesData = [
      {
        title: "The Food & Beverage Leader's AI Readiness Checklist",
        desc: "AI opportunity is transforming food production. Are you ready? Don't risk falling behind on safety, traceability, and waste reduction.",
        link: "#"
      },
      {
        title: "Farm to Fork: Complete Traceability Guide",
        desc: "Learn how blockchain and IoT create transparent supply chains from farm to table, ensuring food safety and building consumer trust.",
        link: "#"
      },
      {
        title: "Reducing Food Waste with Smart Inventory",
        desc: "Discover how predictive analytics and real-time monitoring can cut spoilage by up to 40% across your cold chain and warehouse operations.",
        link: "#"
      },
      {
        title: "Quality Control Automation for Food Processing",
        desc: "Computer vision and AI-powered inspection systems that detect defects, contaminants, and inconsistencies at high speeds.",
        link: "#"
      },
      {
        title: "Sustainable Packaging & Production Guide",
        desc: "Reduce environmental impact with eco-friendly packaging solutions and energy-efficient production processes powered by AI.",
        link: "#"
      },
      {
        title: "Cold Chain Management Best Practices",
        desc: "Maintain optimal temperature from production to delivery with IoT sensors, real-time alerts, and predictive maintenance.",
        link: "#"
      },
      {
        title: "Personalized Nutrition & Menu Optimization",
        desc: "Use customer data and AI to create personalized meal recommendations and reduce menu waste in food service operations.",
        link: "#"
      },
      {
        title: "Compliance & Food Safety Standards Guide",
        desc: "Navigate FDA, FSSAI, and global food safety regulations with automated documentation and real-time compliance monitoring.",
        link: "#"
      },
      {
        title: "Demand Forecasting for Perishable Goods",
        desc: "Advanced analytics that predict consumer demand, optimize production schedules, and minimize overstock and shortages.",
        link: "#"
      }
    ];

    return (
      <div className="py-10">
        <div className="flex justify-between items-center mb-6 px-20">
          <h2 className="text-3xl font-semibold">Guides</h2>
          <div className="flex gap-3">
            <button onClick={() => scroll("left")} className="p-2 text-4xl">
              <IoIosArrowRoundBack />
            </button>
            <button onClick={() => scroll("right")} className="p-2 text-4xl">
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {guidesData.map((guide, i) => (
            <div
              key={i}
              className={`min-w-75 ${i === 0 ? "ml-20" : i === guidesData.length - 1 ? "mr-20" : ""} h-50 border border-gray-200 relative overflow-hidden rounded-sm`}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-4 hover:scale-100 transition duration-500">
                <div className="p-2">
                  <h3 className="font-semibold text-xl line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-md mt-2 line-clamp-3">
                    {guide.desc}
                  </p>
                  <a href={guide.link} className="text-blue-600 text-sm mt-2 inline-block">
                    Check Guide →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }



  function ResourcesSection() {
    return (
      <div className="bg-gray-100 py-16">
        <div className=" px-4 flex flex-row  gap-10">


          <div className="flex items-center justify-center w-2/4 px-20 ">
            <h2 className="text-3xl font-semibold leading-snug ">
              Resources to stay ahead
            </h2>
          </div>


          <div className="space-y-8 border-l pl-6 grid grid-cols-2 w-full gap-4">

            <div className="p-2">
              <h3 className="font-semibold text-xl">
                The Food & Beverage Leader's AI Readiness Checklist
              </h3>
              <p className="text-gray-600 text-md mt-2">
                AI opportunity is transforming food production. Are you ready? Don't risk falling
                behind, missing critical safety insights, and exposing supply chain gaps.
              </p>
              <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                Check Documents →
              </a>
            </div>

            <div className="p-2">
              <h3 className="font-semibold text-xl">
                It's time to modernize your food supply chain for AI
              </h3>
              <p className="text-gray-600 text-md mt-2">
                How do you turn AI potential into reality? By making supply chain
                infrastructure a catalyst for traceability, freshness, safety, and growth.
              </p>
              <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                Check Documents →
              </a>
            </div>






            <div className="p-2">
              <h3 className="font-semibold text-xl">
                IDC Spotlight: Accelerate Growth in Food & Beverage
              </h3>
              <p className="text-gray-600 text-md mt-2">
                The need to modernize food production infrastructure has never been more
                urgent. This IDC paper unpacks the challenges businesses face with spoilage.
              </p>
              <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                Check Documents →
              </a>
            </div>

            <div className="p-2">
              <h3 className="font-semibold text-xl">
                IDC infographic: Strategic Food Supply Chain Transformation
              </h3>
              <p className="text-gray-600 text-md mt-2">
                Discover how unified, AI-powered platforms with integrated traceability
                drive growth and operational efficiency from farm to fork.
              </p>
              <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
                Check Documents →
              </a>
            </div>




          </div>




        </div>
      </div>
    );
  }


  const subIndustries = [
    {
      title: "Dairy & Alternatives",
      desc: "Optimize cold chain logistics, reduce spoilage, and ensure quality from farm to shelf.",
      img: "https://www.safefood.net/getmedia/2eb5cb9d-11df-4705-8e97-3f302f1a6c62/alt-dairy-products.jpg",
    },
    {
      title: "Beverages",
      desc: "Smart bottling, recipe optimization, and predictive maintenance for production lines.",
      img: "https://midaswellnesshub.com/wp-content/uploads/2025/12/571b3ecb0e3c4b0ab1d6723d72df48c0_1080w.jpg",
    },
    {
      title: "Snacks & Confectionery",
      desc: "AI-powered quality control, packaging automation, and demand forecasting.",
      img: "https://www.confectioneryproduction.com/wp-content/uploads/pic1-snacks1.jpg",
    },
    {
      title: "Fresh Produce",
      desc: "Harvest prediction, ripening optimization, and waste reduction through smart inventory.",
      img: "https://images.aptean.com/apteanmarketimages/5BxDJOBOYKyH2SFKOmAcgW/7300fdab56e0b54729e89929bf74a033/card-why-you-need-a-specialized-fresh-produce-erp.jpg",
    },
    {
      title: "Meat & Seafood",
      desc: "Temperature monitoring, shelf-life prediction, and blockchain traceability solutions.",
      img: "https://www.campdenbri.co.uk/images/raw-meat-fish-medium.jpg",
    },
  ];



  function SolutionsSection() {
    const [showAll, setShowAll] = useState(false);

    const visibleData = showAll ? subIndustries : subIndustries.slice(0, 3);

    return (
      <div className="bg-[#333737] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">


          <h2 className="text-3xl md:text-4xl mb-10">
            Browse different food & beverage segments and find the best solutions for you
          </h2>


          <div className="grid md:grid-cols-3 gap-8">
            {visibleData.map((item, i) => (
              <div
                key={i}
                className="bg-[#333737]  overflow-hidden"
              >

                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-70 object-cover"
                />


                <div className="py-6 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-white text-md mt-2 line-clamp-3 overflow-hidden">
                      {item.desc}
                    </p>
                  </div>


                  <div className="bg-blue-500 w-10  h-10 flex items-center justify-center rounded-full text-3xl">
                    <IoIosArrowRoundForward />
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="flex mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>

        </div>
      </div>
    );
  }


  function SolutionsSection1() {
    const [showAll, setShowAll] = useState(false);

    const visibleData = showAll ? subIndustries : subIndustries.slice(0, 3);

    return (
      <div className=" text-black py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl mb-4">
            Browse different food & beverage segments and find the best solutions for you
          </h2>

          <p className="text-gray-600 text-lg">We're accelerating a sustainable food future with smart production, reduced waste, and complete traceability from farm to fork. Our AI-powered solutions help food and beverage companies optimize every step of the journey.</p>


          {/* Cards */}
          <div className="my-6 rouned-md p-3 border border-gray-300 bg-white">
            {visibleData.slice(0, 1).map((item, i) => (
              <div
                key={i}
                className=" flex flex-row  gap-4 overflow-hidden"
              >


                <div className=" flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      We're accelerating a sustainable food future with the Smart Production Platform
                    </h3>
                    <p className="text-gray-600 mt-2 text-md line-clamp-3 overflow-hidden">
                      The Smart Production Platform allows food manufacturers to offer sustainably sourced products with complete carbon footprint transparency and farm-to-fork traceability certificate.
                    </p>
                  </div>



                </div>
                <img
                  src={"https://commonthreadco.com/cdn/shop/articles/2022_Food_Beverage_Industry_Report-V2_1200x.jpg?v=1650920884"}
                  alt={item.title}
                  className="w-full h-70 object-cover"
                />

              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }



  function CareerSection() {
    return (
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>


            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Food and Beverages
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              Explore a wide range of delicious food and refreshing beverages crafted to satisfy every taste. Experience quality, flavor, and freshness in every bite.
            </p>

            {/* CTA */}
            <button className="flex items-center gap-3 group">
              <span className="text-lg">Conntect us</span>

              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 transition">
                →
              </div>
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src="https://synmac-backend.serverscripts.in/storage/media/1776162255_Future-of-food-industry-blog.webp"
              alt="career"
              className="w-full h-87 object-contain"
            />
          </div>

        </div>
      </div>
    );
  }




  return (
    <div>


      <div
        className="relative h-100 bg-fixed px-20 bg-cover flex items-center"
        style={{
          backgroundImage:
            'url("https://synmac-backend.serverscripts.in/storage/media/1776145327_electronicHeroSection.jpeg")',
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>


        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl md:text-5xl max-w-xl  text-white font-semibold tracking-wide mb-4">
            Food & Beverage Solutions
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
            Transform your food and beverage operations with AI-powered solutions. From farm to fork, we help you reduce waste, ensure safety, and optimize production..
          </p>


        </div>
      </div>
      <div className="border border-gray-900 px-25 py-2">
        <div className="flex flex-row gap-1 items-center font-semibold">
          <h1>Home</h1>
          <LiaAngleRightSolid />
          <h1>Industries</h1>
          <LiaAngleRightSolid />
          <h1>Food & Beverage</h1>
        </div>



      </div>

      {SolutionsSection()}
      {SolutionsSection1()}

      <div className="max-w-6xl mx-auto  py-10 text-center">

        <div className="grid md:grid-cols-2 gap-8">


          <div className="text-left">

            <div
              className="relative cursor-pointer rounded-sm overflow-hidden"
              onClick={() => setPlay(true)}
            >
              {!play ? (
                <>
                  <img
                    src="https://trendzmena.com/wp-content/uploads/2023/05/GreenRed_Peppers.jpg"
                    alt="thumbnail"
                    className="w-full h-80 object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/30 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-xl">
                      <FaPlay />
                    </div>
                  </div>
                </>
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-80 object-cover"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              )}
            </div>

            <h3 className="mt-4 text-xl font-semibold">Smart Food Processing</h3>
            <p className="text-gray-600 mt-2 text-md">
              Deliver consistent quality with intelligent processing purpose-built for
              high throughput, simplified operations, and food safety at scale.
            </p>

            <button
              onClick={() => setPlay(true)}

              className="text-blue-600 mt-3 inline-block text-sm font-medium"
            >
              Watch Video
            </button>
          </div>

          <div className="text-left">
            <div
              className="relative cursor-pointer rounded-sm overflow-hidden"
              onClick={() => setPlay(true)}
            >
              {!play ? (
                <>
                  <img
                    src="https://www.hlb-mauritius.com/wp-content/uploads/2022/09/Building-a-Sustainable-Supply-Chain.png"
                    alt="thumbnail"
                    className="w-full h-80 object-cover"
                  />


                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/30 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-xl">
                      <FaPlay />
                    </div>
                  </div>
                </>
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-80 object-cover"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              )}
            </div>
            <h3 className="mt-4 text-xl font-semibold">Sustainable Supply Chain</h3>
            <p className="text-gray-600 mt-2 text-md">
              Accelerate sustainability with a modular and validated design that
              combines traceability, cold chain monitoring, and waste reduction.
            </p>

            <button
              onClick={() => setPlay(true)}

              className="text-blue-600 mt-3 inline-block text-sm font-medium"
            >
              Watch Video
            </button>
          </div>

        </div>
      </div>


      {ResourcesSection()}

      {CustomerStories()}
      {CustomerStories1()}
      {CareerSection()}
      {FAQAccordion()}


    </div>
  )
}

export default Industory