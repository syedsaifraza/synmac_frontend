// 'use client'
// import AboutPage from '@/components/AboutPage'
// import CerrierLife from '@/components/CerrierLife'
// import Header from '@/components/Header'
// import SynmacTeam from '@/components/SynamcTeams'
// import SynmacQualityPolicy from '@/components/SynmacQualityPolicy'
// import WhoWeAre from '@/components/WhoWeAre'
// import WorkingWithSynmac from '@/components/WorkingWithSynmac'
// import { BiAward, BiCheckShield, BiGlobe, BiTrendingUp, BiUserPlus, BiShield } from 'react-icons/bi'


// const page = () => {


//   const strengths = [
//     {
//       icon: BiShield,
//       title: "Quality Assurance",
//       desc: "We maintain effective EHS management system",
//     },
//     {
//       icon: BiAward,
//       title: "30+ Years Experience",
//       desc: "We train and educate our employees on time to time basis regarding the safety norms",
//     },
//     {
//       icon: BiGlobe,
//       title: "Global Reach",
//       desc: "Each of our production unit has been constructed with taking utmost care of environment and employee safety",
//     },
//     {
//       icon: BiUserPlus,
//       title: "Customer Focus",
//       desc: "Bilateral communication channels with employees, customers, suppliers & contractors",
//     },
//     {
//       icon: BiCheckShield,
//       title: "Safety Inspections",
//       desc: "Continuous safety inspections at all locations for correcting deviations",
//     },
//     {
//       icon: BiTrendingUp,
//       title: "Technical Support",
//       desc: "Dedicated technical support and custom solutions for every client",
//     },
//   ];


//   return (
//     <div>
//       <Header title={"About Us"} />
//       <div className='text-black flex flex-row p-14'>
//         {/* 
     
//         <SynmacTeam/>
//          */}

//         <div className=" w-full text-black  px-4">
//           <div className="max-w-6xl mx-auto">

//             <h2 className="text-3xl  text-[#cd2626] font-bold md:text-2xl mb-4">
//               Who We Are

//               <div className="w-25 h-1 bg-[#cd2626] mt-2"></div>

//             </h2>

//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//               A LEADER IN{" "}
//               SPECIALTY CHEMICAL PRODUCTION
//             </h2>

//             <div>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 At Synmac Chemicals, our number-one goal is to be a market leader in the specialty chemical sector. We accomplish this by creating custom solutions and quality products for our customers. Synmac focused on developing, manufacturing, and selling value-added performance additive for various industries, such as beet and cane sugar, paper and pulp, textiles, leather, detergent, hospitals, personal care, agricultural, and fuel ethanol. Synmac has an experience of over two decade in the field of specialty chemicals, the ability to find innovative solutions to customers needs, while addressing health, safety and environmental issues, is key to our growth.
//               </p>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Synmac an innovative specialty chemicals company, has developed a large number of products. We offer several product ranges serve for many sectors. Our chemical products and technical services enhance our customer processes, improve their product quality, and lower their cost .
//               </p>

//             </div>


//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//               Just For You
//             </h2>

//             <p className="text-gray-600 leading-relaxed mb-4">
//               We pride ourselves in delivering customized solutions, drawing from a wide range of chemistries and partnering closely with you to develop just the right product for your needs. Whether it’s taking a traditional chemistry to an advanced level of performance, or developing a product for an entirely new application, Responsiveness and speed are qualities that really set us apart. Our technical service representatives actively monitor how our products perform in your production setting and quickly respond if adjustments are needed.

//               “Our success is directly related to our customer’s success.

//               If our customers are not successful,

//               we cannot be successful.”
//             </p>

//           </div>





//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-3xl  text-[#cd2626] font-bold md:text-2xl mb-4">
//               Clientele List
//               <div className="w-25 h-1 bg-[#cd2626] mt-2"></div>

//             </h2>

//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//               Synmac Quality Policy

//             </h2>

//             <p className="text-gray-600 leading-relaxed mb-4">
//               We are committed to continuously improving the quality of our service. It is our duty to develop long term partnerships with each of our customers. We feel this is best achieved by delivering products and services 100% right the first time, on time, every time. To do this we will adhere to the following principles:
//             </p>

//             <ul>
//               <li>
//                 <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Suppliers</h1>
//                 <p className='text-gray-600 leading-relaxed mb-4 px-2' >Synmac will only purchase products from specifically approved plants and will only supply products to customers from plants whose products they have approved. We regularly visit our suppliers to evaluate them not only on the basis of ability to deliver satisfactory products on a timely and cost-efficient basis, but also on their commitment to operate in a safe and environmentally responsible manner.

//                 </p>
//               </li>

//               <li>
//                 <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Product Quality Improvement</h1>
//                 <p className='text-gray-600 leading-relaxed mb-4 px-2' >Synmac will continue our program of regular visits to our suppliers’ plants, and will continue to educate them on the quality of product and service required by our customers. Synmac uniquely able to do this, as almost all of our sales representatives are technically trained (chemists, chemical engineers, microbiologists, QC, etc.) most with in-plant or industrial laboratory experience. Synmac will also continue to search for new products, as well as for new sources for products where we feel our existing sources have lapsed in either product or delivery quality, and/or have failed to meet the needs of our customers or markets.



//                 </p>
//               </li>

//               <li>
//                 <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Samples</h1>
//                 <p className='text-gray-600 leading-relaxed mb-4 px-2' >We will only send production quality samples to customers and we will send lab-produced or pilot plant samples only by prior agreement. We will provide pre-shipment and co-shipment samples any time they are required. Samples will always be accompanied by appropriate Occupational Safety and Health Administration (OSHA) labels and Material Safety Data Sheets (MSDS’s).
//                 </p>
//               </li>

//               <li>
//                 <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Corrective Action
// </h1>
//                 <p className='text-gray-600 leading-relaxed mb-4 px-2' >In the event of a complaint, Synmac will take appropriate action to rectify the situation. This typically involves contacting the supplier or other persons involved including Synmac employees, to determine the best way to handle the situation and ensure compliance with our quality standards.

//                 </p>
//               </li>

//             </ul>


//           </div>



//           <div className="max-w-6xl mx-auto mb-5">
//             <h2 className="text-3xl  text-[#cd2626] font-bold md:text-2xl mb-4">
//               EHS Policy
//               <div className="w-25 h-1 bg-[#cd2626] mt-3"></div>

//             </h2>

//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//               Environment, Health & Safety Policy


//             </h2>

//             <p className="text-gray-600 leading-relaxed mb-4">
//               The Company is committed to provide and maintain a safe and healthy work environment by establishing safe operating procedures and practices that protect employees from ill health and injury and it is committed to conservation of resources and continual improvement of processes and activities in order to minimise impact on environment, prevent pollution and protect the environment.
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {strengths.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//                 >
//                   <div className="w-12 h-12 rounded-xl bg-[#cd2626]/10 flex items-center justify-center mb-5 group-hover:bg-[#cd2626] transition-colors duration-300">
//                     <item.icon
//                       className="text-[#cd2626] group-hover:text-white transition-colors duration-300"
//                       size={20}
//                     />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#cd2626] transition-colors">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-500 leading-relaxed">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>




//         </div>

//         <div className='w-1/4 border border-gray-100 rounded-md p-3'>
//           <h2 className="text-xl  text-[#cd2626] font-bold md:text-xl mb-2">
//             About us
//           </h2>

//           <ul className='space-y-2'>
//             <li className='bg-gray-50 p-2 cursor-pointer'>Who We Are</li>
//             <li className='bg-gray-50 p-2 text-[#cd2626] cursor-pointer'>EHS Policy</li>
//             <li className='bg-gray-50 p-2 cursor-pointer'>Quality Policy</li>
//           </ul>
//         </div>

//         {/* <WhoWeAre /> */}
//         {/* <CerrierLife />
//            <AboutPage />
//         <SynmacQualityPolicy/>
//           <WorkingWithSynmac/> */}
//       </div>
//     </div>
//   )
// }

// export default page












'use client'
import AboutPage from '@/components/AboutPage'
import CerrierLife from '@/components/CerrierLife'
import Header from '@/components/Header'
import SynmacTeam from '@/components/SynamcTeams'
import SynmacQualityPolicy from '@/components/SynmacQualityPolicy'
import WhoWeAre from '@/components/WhoWeAre'
import WorkingWithSynmac from '@/components/WorkingWithSynmac'
import { BiAward, BiCheckShield, BiGlobe, BiTrendingUp, BiUserPlus, BiShield } from 'react-icons/bi'
import { useEffect, useRef } from 'react'


const page = () => {


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

  // Refs for each section
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const ehsPolicyRef = useRef<HTMLDivElement>(null);
  const qualityPolicyRef = useRef<HTMLDivElement>(null);

  // Smooth scroll function
  const scrollToSection = (sectionRef: any) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Function to handle active link highlighting while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'whoWeAre', ref: whoWeAreRef },
        { id: 'ehsPolicy', ref: ehsPolicyRef },
        { id: 'qualityPolicy', ref: qualityPolicyRef },
      ];

      // Get current scroll position
      const scrollPosition = window.scrollY + 150; // offset for better UX

      // Find which section is currently in view
      let activeSection = '';
      for (const section of sections) {
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          const sectionBottom = sectionTop + section.ref.current.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            activeSection = section.id;
            break;
          }
        }
      }

      // Update active link styles
      const whoWeAreLink = document.getElementById('link-whoWeAre');
      const ehsPolicyLink = document.getElementById('link-ehsPolicy');
      const qualityPolicyLink = document.getElementById('link-qualityPolicy');

      if (whoWeAreLink && ehsPolicyLink && qualityPolicyLink) {
        // Reset all links to default style
        whoWeAreLink.classList.remove('text-[#cd2626]', 'font-semibold');
        whoWeAreLink.classList.add('text-gray-700');
        ehsPolicyLink.classList.remove('text-[#cd2626]', 'font-semibold');
        ehsPolicyLink.classList.add('text-gray-700');
        qualityPolicyLink.classList.remove('text-[#cd2626]', 'font-semibold');
        qualityPolicyLink.classList.add('text-gray-700');

        // Set active link style
        if (activeSection === 'whoWeAre') {
          whoWeAreLink.classList.add('text-[#cd2626]', 'font-semibold');
          whoWeAreLink.classList.remove('text-gray-700');
        } else if (activeSection === 'ehsPolicy') {
          ehsPolicyLink.classList.add('text-[#cd2626]', 'font-semibold');
          ehsPolicyLink.classList.remove('text-gray-700');
        } else if (activeSection === 'qualityPolicy') {
          qualityPolicyLink.classList.add('text-[#cd2626]', 'font-semibold');
          qualityPolicyLink.classList.remove('text-gray-700');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial active link
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Header title={"About Us"} />
      <div className='text-black flex flex-row p-14'>
        {/* Main Content */}
        <div className="w-full text-black px-4">
          <div className="max-w-6xl mx-auto">
            {/* Who We Are Section */}
            <div id="whoWeAre" ref={whoWeAreRef}>
              <h2 className="text-3xl text-[#cd2626] font-bold md:text-2xl mb-4">
                Who We Are
                <div className="w-25 h-1 bg-[#cd2626] mt-2"></div>
              </h2>

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                A LEADER IN{" "}
                SPECIALTY CHEMICAL PRODUCTION
              </h2>

              <div>
                <p className="text-gray-600 leading-relaxed mb-4 discription">
                  At Synmac Chemicals, our number-one goal is to be a market leader in the specialty chemical sector. We accomplish this by creating custom solutions and quality products for our customers. Synmac focused on developing, manufacturing, and selling value-added performance additive for various industries, such as beet and cane sugar, paper and pulp, textiles, leather, detergent, hospitals, personal care, agricultural, and fuel ethanol. Synmac has an experience of over two decade in the field of specialty chemicals, the ability to find innovative solutions to customers needs, while addressing health, safety and environmental issues, is key to our growth.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4 discription">
                  Synmac an innovative specialty chemicals company, has developed a large number of products. We offer several product ranges serve for many sectors. Our chemical products and technical services enhance our customer processes, improve their product quality, and lower their cost .
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                Just For You
              </h2>

              <p className="text-gray-600 leading-relaxed mb-4">
                We pride ourselves in delivering customized solutions, drawing from a wide range of chemistries and partnering closely with you to develop just the right product for your needs. Whether it’s taking a traditional chemistry to an advanced level of performance, or developing a product for an entirely new application, Responsiveness and speed are qualities that really set us apart. Our technical service representatives actively monitor how our products perform in your production setting and quickly respond if adjustments are needed.

                “Our success is directly related to our customer’s success.

                If our customers are not successful,

                we cannot be successful.”
              </p>
            </div>

            {/* Quality Policy Section */}
            <div id="qualityPolicy" ref={qualityPolicyRef}>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl text-[#cd2626] font-bold md:text-2xl mb-4">
                  Clientele List
                  <div className="w-25 h-1 bg-[#cd2626] mt-2"></div>
                </h2>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  Synmac Quality Policy
                </h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  We are committed to continuously improving the quality of our service. It is our duty to develop long term partnerships with each of our customers. We feel this is best achieved by delivering products and services 100% right the first time, on time, every time. To do this we will adhere to the following principles:
                </p>

                <ul>
                  <li>
                    <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Suppliers</h1>
                    <p className='text-gray-600 leading-relaxed mb-4 px-2'>Synmac will only purchase products from specifically approved plants and will only supply products to customers from plants whose products they have approved. We regularly visit our suppliers to evaluate them not only on the basis of ability to deliver satisfactory products on a timely and cost-efficient basis, but also on their commitment to operate in a safe and environmentally responsible manner.
                    </p>
                  </li>

                  <li>
                    <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Product Quality Improvement</h1>
                    <p className='text-gray-600 leading-relaxed mb-4 px-2'>Synmac will continue our program of regular visits to our suppliers’ plants, and will continue to educate them on the quality of product and service required by our customers. Synmac uniquely able to do this, as almost all of our sales representatives are technically trained (chemists, chemical engineers, microbiologists, QC, etc.) most with in-plant or industrial laboratory experience. Synmac will also continue to search for new products, as well as for new sources for products where we feel our existing sources have lapsed in either product or delivery quality, and/or have failed to meet the needs of our customers or markets.
                    </p>
                  </li>

                  <li>
                    <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Samples</h1>
                    <p className='text-gray-600 leading-relaxed mb-4 px-2'>We will only send production quality samples to customers and we will send lab-produced or pilot plant samples only by prior agreement. We will provide pre-shipment and co-shipment samples any time they are required. Samples will always be accompanied by appropriate Occupational Safety and Health Administration (OSHA) labels and Material Safety Data Sheets (MSDS’s).
                    </p>
                  </li>

                  <li>
                    <h1 className="text-2xl md:text-xl font-semibold text-gray-800 mb-2">&middot; Corrective Action
                    </h1>
                    <p className='text-gray-600 leading-relaxed mb-4 px-2'>In the event of a complaint, Synmac will take appropriate action to rectify the situation. This typically involves contacting the supplier or other persons involved including Synmac employees, to determine the best way to handle the situation and ensure compliance with our quality standards.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* EHS Policy Section */}
            <div id="ehsPolicy" ref={ehsPolicyRef}>
              <div className="max-w-6xl mx-auto mb-5">
                <h2 className="text-3xl text-[#cd2626] font-bold md:text-2xl mb-4">
                  EHS Policy
                  <div className="w-25 h-1 bg-[#cd2626] mt-3"></div>
                </h2>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  Environment, Health & Safety Policy
                </h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  The Company is committed to provide and maintain a safe and healthy work environment by establishing safe operating procedures and practices that protect employees from ill health and injury and it is committed to conservation of resources and continual improvement of processes and activities in order to minimise impact on environment, prevent pollution and protect the environment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {strengths.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#cd2626]/10 flex items-center justify-center mb-5 group-hover:bg-[#cd2626] transition-colors duration-300">
                        <item.icon
                          className="text-[#cd2626] group-hover:text-white transition-colors duration-300"
                          size={20}
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
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className='w-1/4 border border-gray-100 rounded-md p-3 self-start sticky top-25'>
          <h2 className="text-xl text-[#cd2626] font-bold md:text-xl mb-2">
            About us
          </h2>

          <ul className='space-y-2'>
            <li
              id="link-whoWeAre"
              className='bg-gray-50 p-2 cursor-pointer hover:bg-gray-100 transition-colors text-gray-700'
              onClick={() => scrollToSection(whoWeAreRef)}
            >
              Who We Are
            </li>
            <li
              id="link-ehsPolicy"
              className='bg-gray-50 p-2 cursor-pointer hover:bg-gray-100 transition-colors text-gray-700'
              onClick={() => scrollToSection(ehsPolicyRef)}
            >
              EHS Policy
            </li>
            <li
              id="link-qualityPolicy"
              className='bg-gray-50 p-2 cursor-pointer hover:bg-gray-100 transition-colors text-gray-700'
              onClick={() => scrollToSection(qualityPolicyRef)}
            >
              Quality Policy
            </li>
          </ul>
        </div>

        {/* <WhoWeAre /> */}
        {/* <CerrierLife />
           <AboutPage />
        <SynmacQualityPolicy/>
          <WorkingWithSynmac/> */}
      </div>
    </div>
  )
}

export default page