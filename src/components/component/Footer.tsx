import Link from "next/link";
import Logo from "../../../public/Img.png"
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

async function getUser() {
  const res = await fetch(`http://synmac.acetians.in /api/footer/`, {
    // next: { revalidate: 300 }
    cache: "no-store"
  });
  return res.json();
}


const Footer = async () => {

  const data = await getUser()
 

  return (
    <footer className="bg-[#171b1b]">
      <div className="container mx-auto lg:px-0 max-w-6xl py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">

           <div >
            <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2 ">
                        <Image src={Logo} alt="Logo" className="w-[35%]" /> 
                        <span className="font-extrabold text-xs text-black">beta</span>
                    </Link>
            <p className="text-sm font-semibold text-white/70 leading-relaxed mb-3">
              {/* {data?.data?.description} */}

              CREATE VALUE THROUGH  <span className="text-primary text-[#cd2626]">OUR PRODCUTS</span> 
            </p>
            
          </div>
          </div>

          <div className=" grid grid-cols-2 gap-3">
            <div>
               <div>
                  <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-white/50">QUICK LINKS</h4>
                  <ul className="space-y-2 text-sm">
                    {data?.data?.route_list.map((item: any , idx:number) => (
                      <li key={idx}><Link href={item.url} className="text-white/70 hover:text-primary transition-colors fonts">{item.name}</Link></li>
                    ))}
                  </ul>
                </div>
            </div>
            <div>
               <div>
                  <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-white/50">FOLLOW US</h4>
                 <div className="flex gap-3">


              {
                data?.data?.social_media_link.map((link: any,idx:number) => {
                  if (link.platform === "Facebook") {
                    return (
                      <Link key={idx} href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors">
                       <FaFacebook/>
                      </Link>
                    )
                  }
                  if (link.platform === "LinkedIn") {
                    return (
                      <Link key={link.platform} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors">
                    <FaLinkedin/>
                      </Link>
                    )
                  }
                  if (link.platform === "Twitter") {
                    return (
                      <Link key={link.platform} href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors">
                      <BsTwitterX />
                      </Link>
                    )
                  }
                  if (link.platform === "Instagram") {
                    return (
                      <Link key={link.platform} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors">
                        <FaInstagram/>
                      </Link>
                    )
                  }

                })
              }




            </div>
                </div>
            </div>
          </div>
          {/* <div>
            <h3 className="font-display text-xl font-bold mb-4 text-white">
              SYNMAC<span className="text-primary">.</span>
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-3">
              {data?.data?.description}
            </p>
            
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-white/50">Company</h4>
            <ul className="space-y-2 text-sm">
              {data?.data?.route_list.map((item: any,idx:number) => (
                <li key={idx}><Link href={item.url} className="text-white/70 hover:text-primary transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm tracking-wider uppercase text-white/50">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{data?.data?.email[0]}</li>
              <li>{data?.data?.email[1]}</li>
              <li>{data?.data?.contactno[0]}</li>
              <li>{data?.data?.contactno[1]}</li>
              <li>{data?.data?.address}</li>
            </ul>
          </div> */}


         
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
    <div className="grid grid-cols-2  mx-auto gap-4   max-w-6xl items-center ">
          <div className=" text-sm text-white/50 fonts">
          © {new Date().getFullYear()} {data?.data?.copyright_text}v1.0.4
        </div>


        <div className="  text-sm flex flex-row justify-end items-center gap-5 fonts text-white/50">
         <a className="border-r-2 px-4">TERMS OF SALE</a>
         <a  className="border-r-2 pr-4">PRIVACY STATEMENTS</a>
           <a>DISCLAIMER </a>
        </div>

        
        </div>

      </div>
    
    </footer>
  )

};

export default Footer;
