import React from 'react'
async function getUser() {
  const res = await fetch(`http://synmac.acetians.in/api/company-info/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}
const page = async () => {
  const data = await getUser()



  const CountryCard = ({ country }: any) => {
    return (
      <div
        key={country.id}
        className="relative p-4 flex border bg-white border-gray-200 justify-between items-center rounded-md
      bg-center bg-no-repeat bg-cover
      transform transition-all duration-300 ease-in-out
      hover:-translate-y hover:scale-130 hover:shadow-xl  hover:z-10"
      >


        <div className="absolute inset-0 bg-black/30 rounded-md"></div>


        <div className="relative z-10">

          <h3 className={`text-xl font-semibold text-white}`}>
            {country.country_name}
          </h3>

          <p className={`text-sm font-semibold mt-1 text-white}`}>
            {country.country_email}
          </p>

        </div>


        <div className="relative z-10 text-4xl">
          {country.country_flag}
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

          {data?.data?.global_contacts.map((country: any, index: any) => (
            <CountryCard key={index} country={country} />
          ))}

        </div>

      </div>



    </div>
  )
}

export default page