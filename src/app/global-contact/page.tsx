import React from 'react'

const page = () => {



  const countryList = [
    { color: "text-white", name: "Australia", email: "australia@synmacs.com", flag: "🇦🇺", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRahSv17xAVDg2livLAa2VlZflBY3EydfWrVQ&s" },
    { color: "text-white", name: "Brazil", email: "brazil@synmacs.com", flag: "🇧🇷", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMPq0eQsMvhL-3yMZT6w3wNU8Zpn8D9TMPRw&s" },
    { color: "text-white", name: "Bangladesh", email: "bangladesh@synmacs.com", flag: "🇧🇩", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWnm4Hoq3dApp6MfTH45fjsZ5h7TVBdEjHA&s" },
    { color: "text-white", name: "Central America", email: "ca@synmacs.com", flag: "🌎", url: "" },
    { color: "text-white", name: "Canada", email: "canada@synmacs.com", flag: "🇨🇦", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp495AMLUOgsvWSAbnj45K7ezeNCjuQxWnAw&s" },
    { color: "text-white", name: "China", email: "china@synmacs.com", flag: "🇨🇳", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XZEP0qflB8ArnyHRF_cMb8mgNmqzImi-FQ&s" },
    { color: "text-white", name: "Egypt", email: "egypt@synmacs.com", flag: "🇪🇬", url: "https://cdn.britannica.com/85/185-050-6A8E2E8A/Flag-Egypt.jpg" },
    { color: "text-white", name: "Iran", email: "iran@synmacs.com", flag: "🇮🇷", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL8X7CU40041ItsPThQu76qQzkZXS2BBnmog&s" },
    { color: "text-white", name: "Indonesia", email: "indo@synmacs.com", flag: "🇮🇩", url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg" },
    { color: "text-white", name: "Kenya", email: "kenya@synmacs.com", flag: "🇰🇪", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrId0Awwhmml7OUTVhnQu67t51FydtnbD6w&s" },
    { color: "text-white", name: "Malaysia", email: "malasia@synmacs.com", flag: "🇲🇾", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMz1SIAm_bRd5BuVFYxuqx2X8INF5pJbQIZw&s" },
    { color: "text-white", name: "Nepal", email: "nepal@synmacs.com", flag: "🇳🇵", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYThRFopeBa4IBfaL32Z_8Vla-z_hP-2P54A&s" },
    { color: "text-white", name: "Pakistan", email: "pk@synmacs.com", flag: "🇵🇰", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSZ-KllEEhitIoBsdeNOm5FfWtgMb67JwRYg&s" },
    { color: "text-white", name: "Sudan", email: "sudan@synmacs.com", flag: "🌍", url: "https://cdn.britannica.com/96/4496-004-278A6211/Flag-Sudan.jpg" },
    { color: "text-white", name: "Uganda", email: "uganda@synmacs.com", flag: "🇺🇬", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/1280px-Flag_of_Uganda.svg.png" },
  ];


  const CountryCard = ({ country }: any) => {
    return (
      <div
        style={{ backgroundImage: `url(${country.url})` }}
        className="relative p-4 flex border bg-white border-gray-200 justify-between items-center rounded-md
      bg-center bg-no-repeat bg-cover
      transform transition-all duration-300 ease-in-out
      hover:-translate-y hover:scale-130 hover:shadow-xl  hover:z-10"
      >

       
        <div className="absolute inset-0 bg-black/30 rounded-md"></div>


        <div className="relative z-10">

          <h3 className={`text-xl font-semibold ${country.color || "text-white"}`}>
            {country.name}
          </h3>

          <p className={`text-sm font-semibold mt-1 ${country.color || "text-white"}`}>
            {country.email}
          </p>

        </div>

        
        <div className="relative z-10 text-4xl">
          {country.flag}
        </div>

      </div>
    );
  };

  return (
    <div>


      <div
        className="relative h-100 bg-fixed bg-center bg-cover flex items-center justify-center "
        style={{
          backgroundImage:
            'url("https://zsd-cdn.prod.dx.zndbx.cloud/Kontakt_standorte_5834bf06a3.jpg")',
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>


        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl text-white font-semibold tracking-wide mb-4">
            Global Contacts
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-6">
            We’d love to hear from you. Whether you have a question, feedback, or just
            want to say hello — feel free to reach out.
          </p>

        </div>
      </div>



      <div className="max-w-6xl mx-auto py-10 ">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {countryList.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}

        </div>

      </div>



    </div>
  )
}

export default page