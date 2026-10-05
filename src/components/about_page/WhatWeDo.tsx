import { FaCheckCircle } from "react-icons/fa";

const WhatWeDo = ({ whatWeDo }: any) => {
  return (
    <div className="w-full bg-white text-black py-10 ">
      <div className="">

        {/* Title */}
        <div
          dangerouslySetInnerHTML={{ __html: whatWeDo?.content?.title || "" }}
          className="ql-editor"
        />


        <div
          dangerouslySetInnerHTML={{ __html: whatWeDo?.content?.subtitle || "" }}
          className="ql-editor mb-4"
        />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 ">


          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-md lg:max-w-none rounded-md overflow-hidden ">
              <img
                src={whatWeDo?.content?.br_image_url || "https://via.placeholder.com/600x700"}
                alt="What We Do"
                className="w-full h-auto object-cover "
              />
            </div>
          </div>


          <div className="flex flex-col">


            <div
              dangerouslySetInnerHTML={{ __html: whatWeDo?.content?.description || "" }}
              className="ql-editor text-sm sm:text-base text-gray-700 leading-relaxed mb-2"
            />

            


            {whatWeDo?.content?.list_item?.length > 0 && (
              <ul className="space-y-1 flex flex-row flex-wrap gap-4">
                {whatWeDo.content.list_item.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm sm:text-base text-gray-800"
                  >



                    <FaCheckCircle className=" text-[#cd2626] shrink-0" />


                    {/* Item text */}
                    <h2 className="font-medium leading-relaxed">{item}</h2>
                  </li>
                ))}
              </ul>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;