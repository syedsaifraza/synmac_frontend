'use client';


export default function Header({ title, description, background_image, }: { title: string, description: string, background_image: string ,   }) {
  return (

    <>


      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh ] bg-fixed bg-cover bg-no-repeat bg-center flex items-center bg-[#ff0100]"
        style={{ backgroundImage: `url(${background_image || null})` }} >



        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto w-full text-white ">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight">
              {title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: description || "" }} className="mt-4 text-lg md:text-xl fonts" />
          </div>
        </div>



      </div>

      
    </>

  );
}





// 'use client';

// export default function Header({ title, description, background_image }: { 
//   title: string, 
//   description: string, 
//   background_image: string 
// }) {
//   const content = `
//     <div>
//       <h3><br />
// <img src="https://www.solenis.com/contentassets/091af422977341bdad45e268f27cd48c/img-20260422-wa0000.jpg" style="float:left; height:133px; margin-left:10px; margin-right:10px; width:200px" /><strong>To date, more than</strong> 110 thousand upcycled items&nbsp;have been reintroduced into hotel operations across T&uuml;rkiye and the MiddlEast through&nbsp; &nbsp;production workshops established in Hatay, Ankara, and Istanbul/Pendik. The SERA Foundation plays a critical role in building the&nbsp; &nbsp; &nbsp;infrastructure&nbsp; needed to ensure the program&rsquo;s long‑term success.</h3>

// <h3>&nbsp;As momentum continues to grow, Diversey plans to expand Linens For Life across the Middle East, Africa, and beyond by 2026, further&nbsp; &nbsp; &nbsp; strengthening its contribution to circular economy practices and social impact.&nbsp;In collaboration with the SERA Foundation, the Linens&nbsp; &nbsp; &nbsp; &nbsp;For Life program focuses on climate action and women</h3>
//     </div>
//   `;

//   return (
//     <div 
//       className="relative  bg-fixed bg-cover bg-no-repeat bg-center flex items-center bg-[#ff0100]"
//       style={{ backgroundImage: `url(${background_image || ''})` }}
//     >
//       <div className="absolute inset-0 bg-black/60"></div>

//       <div className="relative z-10 px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto w-full text-white">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
//             {title}
//           </h1>
          
//           <div 
//             dangerouslySetInnerHTML={{ __html: content }} 
//             className="mt-4 text-base md:text-lg space-y-4"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }