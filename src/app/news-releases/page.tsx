// 'use client'
// import Header from '@/components/component/Header'
// import Link from 'next/link'
// import { useState, useEffect, useRef } from 'react'
// import { LiaAngleRightSolid } from 'react-icons/lia'
// import { useSelector } from 'react-redux'

// const NewsReleases = () => {
//   const { industories, sub_industries, news } = useSelector((state: any) => state?.resources)

//   const [currentPage, setCurrentPage] = useState(1);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedIndustries, setSelectedIndustries] = useState<number[]>([]);
//   const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
//   const [selectedYears, setSelectedYears] = useState<number[]>([]);
//   const [filteredResources, setFilteredResources] = useState<any[]>([]);
//   const [activeFilterType, setActiveFilterType] = useState<string | null>(null);


//   const [isIndustriesExpanded, setIsIndustriesExpanded] = useState(false);
//   const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
//   const [isYearsExpanded, setIsYearsExpanded] = useState(false);

//   const itemsPerPage = 8;
//   const sidebarRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (news) {
//       setFilteredResources(news);
//     }
//   }, [news]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
//         setIsFilterOpen(false);
//         setActiveFilterType(null);
//         // Reset all expanded states
//         setIsIndustriesExpanded(false);
//         setIsTopicsExpanded(false);
//         setIsYearsExpanded(false);
//       }
//     };

//     if (isFilterOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isFilterOpen]);


//   const applyFiltersDirectly = (
//     industries: number[], 
//     topics: number[], 
//     years: number[]
//   ) => {
//     let filtered = [...news];

//     const hasIndustries = industries.length > 0;
//     const hasTopics = topics.length > 0;
//     const hasYears = years.length > 0;

//     if (!hasIndustries && !hasTopics && !hasYears) {
//       setFilteredResources(news);
//       setCurrentPage(1);
//       return;
//     }

//     filtered = filtered.filter((resource: any) => {
//       let matches = false;

//       if (hasIndustries && industries.includes(resource.industry_id)) {
//         matches = true;
//       }

//       if (!matches && hasTopics && resource.sub_industry_id && topics.includes(resource.sub_industry_id)) {
//         matches = true;
//       }

//       if (!matches && hasYears) {
//         const resourceYear = new Date(resource.created_at).getFullYear();
//         if (years.includes(resourceYear)) {
//           matches = true;
//         }
//       }

//       return matches;
//     });

//     setFilteredResources(filtered);
//     setCurrentPage(1);
//   };


//   const clearFilters = () => {
//     setSelectedIndustries([]);
//     setSelectedTopics([]);
//     setSelectedYears([]);
//     setFilteredResources(news || []);
//     setCurrentPage(1);
//   };


//   const handleIndustryChange = (industryId: number) => {
//     let newIndustries: number[];
//     if (selectedIndustries.includes(industryId)) {
//       newIndustries = selectedIndustries.filter(id => id !== industryId);
//     } else {
//       newIndustries = [...selectedIndustries, industryId];
//     }
//     setSelectedIndustries(newIndustries);
//     applyFiltersDirectly(newIndustries, selectedTopics, selectedYears);
//   };


//   const handleTopicChange = (topicId: number) => {
//     let newTopics: number[];
//     if (selectedTopics.includes(topicId)) {
//       newTopics = selectedTopics.filter(id => id !== topicId);
//     } else {
//       newTopics = [...selectedTopics, topicId];
//     }
//     setSelectedTopics(newTopics);
//     applyFiltersDirectly(selectedIndustries, newTopics, selectedYears);
//   };


//   const handleYearChange = (year: number) => {
//     let newYears: number[];
//     if (selectedYears.includes(year)) {
//       newYears = selectedYears.filter(y => y !== year);
//     } else {
//       newYears = [...selectedYears, year];
//     }
//     setSelectedYears(newYears);
//     applyFiltersDirectly(selectedIndustries, selectedTopics, newYears);
//   };


//   const openFilterSidebar = (filterType: string) => {
//     setActiveFilterType(filterType);

//     setIsIndustriesExpanded(filterType === 'industry');
//     setIsTopicsExpanded(filterType === 'topic');
//     setIsYearsExpanded(filterType === 'year');
//     setIsFilterOpen(true);
//   };


//   const toggleIndustries = () => {
//     setIsIndustriesExpanded(!isIndustriesExpanded);
//     if (!isIndustriesExpanded) {
//       setIsTopicsExpanded(false);
//       setIsYearsExpanded(false);
//       setActiveFilterType('industry');
//     }
//   };

//   const toggleTopics = () => {
//     setIsTopicsExpanded(!isTopicsExpanded);
//     if (!isTopicsExpanded) {
//       setIsIndustriesExpanded(false);
//       setIsYearsExpanded(false);
//       setActiveFilterType('topic');
//     }
//   };

//   const toggleYears = () => {
//     setIsYearsExpanded(!isYearsExpanded);
//     if (!isYearsExpanded) {
//       setIsIndustriesExpanded(false);
//       setIsTopicsExpanded(false);
//       setActiveFilterType('year');
//     }
//   };

//   // Pagination logic
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = filteredResources?.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredResources?.length / itemsPerPage);

//   const getPageNumbers = () => {
//     const maxPagesToShow = 4;
//     let pages = [];

//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       let startPage = Math.max(1, currentPage - 2);
//       let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//       if (endPage - startPage + 1 < maxPagesToShow) {
//         startPage = Math.max(1, endPage - maxPagesToShow + 1);
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//       }
//     }

//     return pages;
//   };

//   const visiblePages = getPageNumbers() || [];

//   const next = () => { 
//     if(currentPage === totalPages) return;
//     setCurrentPage(currentPage + 1);
//   }

//   const prev = () => {
//     if(currentPage === 1) return;
//     setCurrentPage(currentPage - 1);
//   }

//   if(!news?.length){
//     return (
//       <div>
//         <Header title={"News Releases"} description={"Access detailed guides, product information, and industry knowledge to help you understand, use, and choose the right chemical solutions for your business."} background_image={""} />
//         <div className="max-w-6xl mx-auto py-16 text-center">
//           <p>Loading resources...</p>
//         </div>
//       </div>
//     );
//   }

//   const availableYears = [...new Set<number>(news.map((resource: any) => 
//     new Date(resource.created_at).getFullYear()
//   ))].sort((a: number, b: number) => b - a);

//   // Get selected filters count
//   const getSelectedCount = (filterType: string) => {
//     if (filterType === 'industry') return selectedIndustries.length;
//     if (filterType === 'topic') return selectedTopics.length;
//     if (filterType === 'year') return selectedYears.length;
//     return 0;
//   };

//   const getSelectedDisplay = (filterType: string) => {
//     const count = getSelectedCount(filterType);
//     if (count === 0) return '';
//     return `(${count})`;
//   };

//   return (
//     <div>
//       <Header title={"News Releases"} description={"Access detailed guides, product information, and industry knowledge to help you understand, use, and choose the right chemical solutions for your business."} background_image={""} />

//       <div className="border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
//           <Link href="/" className="hover:text-[#cd2626] transition">Home</Link>
//           <LiaAngleRightSolid size={12} />
//           <h1 className="text-gray-600">News Releases</h1>
//         </div>
//       </div>

//       <div className="flex max-w-6xl mx-auto py-8 relative">

//         <div className="flex-1">
//           <div className='border-b border-gray-400 mb-4'>
//             <div className='text-3xl font-medium py-2'>
//               Results ({filteredResources.length}) <span className='text-lg font-semibold text-gray-500'>total</span>
//             </div>


//             <div className=' space-x-3 flex flex-row mb-2'>

//               <button 
//                 onClick={() => openFilterSidebar('year')}
//                 className='border border-gray-400 hover:bg-gray-100 p-2 cursor-pointer transition flex items-center gap-2'
//               >
//                 Year {getSelectedDisplay('year')}
//               </button>
//             </div>

//             <div className='flex flex-wrap flex-row gap-2'>








//             {(selectedIndustries.length > 0 || selectedTopics.length > 0 || selectedYears.length > 0) && (
//               <div className='flex flex-wrap gap-2 mb-4'>
//                 {selectedIndustries.map(id => {
//                   const industry = industories?.find((ind: any) => ind.id === id);
//                   return industry && (
//                     <span key={`ind-${id}`} className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
//                       {industry.name}
//                       <button onClick={() => handleIndustryChange(id)} className="hover:text-blue-900">×</button>
//                     </span>
//                   );
//                 })}
//                 {selectedTopics.map(id => {
//                   const topic = sub_industries?.find((sub: any) => sub.id === id);
//                   return topic && (
//                     <span key={`topic-${id}`} className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
//                       {topic.name}
//                       <button onClick={() => handleTopicChange(id)} className="hover:text-green-900">×</button>
//                     </span>
//                   );
//                 })}
//                 {selectedYears.map(year => (
//                   <span key={`year-${year}`} className='bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
//                     {year}
//                     <button onClick={() => handleYearChange(year)} className="hover:text-purple-900">×</button>
//                   </span>
//                 ))}
//               </div>
//             )}
//              <div className='pb-4 flex flex-wrap items-center gap-3'>
//               {(selectedIndustries.length > 0 || selectedTopics.length > 0 || selectedYears.length > 0) && (
//                 <button 
//                   onClick={clearFilters}
//                   className='text-sm text-red-600 hover:text-red-800'
//                 >
//                   Clear all filters
//                 </button>
//               )}
//             </div>


//                   </div>
//           </div>


//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//             {currentProducts?.map((res: any) => (
//               <div key={res.id} className='bg-gray-100 border border-gray-200 p-5 relative flex flex-col'>
//                 <img className='object-contain aspect-3/2 border border-gray-200 rounded-sm mb-4' src={res.blog_image_url}/>
//                 <div className='px-5'>



//                 <h1 className='text-xs font-semibold text-gray-500 mb-2 line-clamp-2'>BY: {res.author}</h1>
//                   <h1 className='text-xs font-semibold text-gray-500 mb-2 line-clamp-2'>{res.date}</h1>
//                 <p className='font-semibold text-gray-800 mb-2 line-clamp-4'>{res.title}</p>
//                 <div className='line-clamp-4 text-sm font-light text-gray-500 flex-1 '>
//                     {res.description}
//                 </div>
//                 <Link href={`/news-releases/${res.slug}`}  rel="noopener noreferrer" className='mt-4 border-b-2 py-1 hover:border-[#b62126]/40 cursor-pointer text-sm font-semibold border-[#b62126] transition-all duration-300 ease-in-out inline-block'>
//                   View more
//                 </Link>

//                   </div>
//               </div>

//             ))}
//           </div>

//           {filteredResources.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No resources found with the selected filters.</p>
//               <button 
//                 onClick={clearFilters}
//                 className="mt-4 text-[#b62126] hover:underline"
//               >
//                 Clear all filters
//               </button>
//             </div>
//           )}


//           {totalPages > 1 && (
//             <div className="flex gap-2 justify-center items-center text-xs mt-8 p-3">
//               <button
//                 onClick={prev}
//                 disabled={currentPage === 1}
//                 className={`h-6 w-12 border rounded-sm cursor-pointer ${
//                   currentPage === 1 
//                     ? 'bg-gray-300 text-gray-800 border-gray-300 cursor-not-allowed' 
//                     : 'bg-[#b62126] text-white border-[#b62126]'
//                 }`}
//               >
//                 Prev
//               </button>

//               {visiblePages.map((pageNum) => (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`h-6 w-6 border rounded-sm cursor-pointer ${
//                     currentPage === pageNum
//                       ? "bg-[#b62126] text-white border-[#b62126]"
//                       : "bg-white border-[#b62126]"
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               ))}

//               <button
//                 onClick={next}
//                 disabled={currentPage === totalPages}
//                 className={`h-6 w-12 border rounded-sm cursor-pointer ${
//                   currentPage === totalPages
//                     ? 'bg-gray-300 text-gray-800 border-gray-300 cursor-not-allowed'
//                     : 'bg-[#b62126] text-white border-[#b62126]'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>


//       {isFilterOpen && (
//         <>
//           <div 
//             className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
//             onClick={() => {
//               setIsFilterOpen(false);
//               setActiveFilterType(null);
//               setIsIndustriesExpanded(false);
//               setIsTopicsExpanded(false);
//               setIsYearsExpanded(false);
//             }}
//           />
//           <div 
//             ref={sidebarRef}
//             className="fixed right-30 top-0 w-96 bg-white h-full z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out"
//           >
//                 <div className="flex justify-between sticky top-0 bg-white items-center  p-4 ">
//                 <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
//                 <button 
//                   onClick={() => {
//                     setIsFilterOpen(false);
//                     setActiveFilterType(null);
//                     setIsIndustriesExpanded(false);
//                     setIsTopicsExpanded(false);
//                     setIsYearsExpanded(false);
//                   }}
//                   className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             <div className="p-5">







//                <div className="mb-6 border border-gray-400 overflow-hidden">
//                 <button 
//                   onClick={toggleYears}
//                   className={`flex justify-between items-center w-full p-4 `}
//                 >
//                   <div className="flex items-center gap-2">
//                     <h3 className="font-semibold text-gray-700">Year</h3>
//                     {selectedYears.length > 0 && (
//                       <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-0.5">
//                         {selectedYears.length}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-gray-500 text-xl font-bold transition-transform duration-200">
//                     {isYearsExpanded ? '−' : '+'}
//                   </span>
//                 </button>
//                 {isYearsExpanded && (
//                   <div className="space-y-2 max-h-60 overflow-y-auto p-4 pt-2 bg-white">
//                     {availableYears.map((year: number) => (
//                       <label key={year} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
//                         <input
//                           type="checkbox"
//                           checked={selectedYears.includes(year)}
//                           onChange={() => handleYearChange(year)}
//                           className="w-4 h-4 text-[#b62126] rounded border-gray-300 focus:ring-[#b62126] focus:ring-2"
//                         />
//                         <span className="text-sm text-gray-700">{year}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>


//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// export default NewsReleases




















"use client";
import Header from "@/components/component/Header";
import CardFeature from "@/components/ui/CardFeature";
import Loader from "@/components/ui/Loader";
import MainFeatureCard from "@/components/ui/MainFeatureCard";
import OnlyHomePath from "@/components/ui/OnlyHomePath";
import Link from "next/link";
import { useSelector } from "react-redux";



const page = () => {
  const { news } = useSelector(
    (state: any) => state?.resources,
  );



  if (!news) {
    return (
      <div>
        <Header
          className="bg-linear-to-r from-[#5c0606]  via-[#5c0606]70 via-80% to-[#5c0606]/70 to-100%"
          title={"News Release"}
        description="Stay informed with our latest news, press releases, company announcements, product launches, industry updates, and key developments shaping the future of chemical solutions."
          background_image={"https://cdn.prod.website-files.com/68e00ded1f2318dde69565bd/6904fe6ebbd3f3a82c055e46_blog_header_6.27.24.jpeg"}
        />

        <Loader text={"News Release"} />
      </div>
    );
  }


    if (news.length === 0) {
    return (
      <div>
        <Header
          className="bg-linear-to-r from-[#5c0606]  via-[#5c0606]70 via-80% to-[#5c0606]/70 to-100%"
          title={"News Release"}
        description="Stay informed with our latest news, press releases, company announcements, product launches, industry updates, and key developments shaping the future of chemical solutions."
          background_image={"https://cdn.prod.website-files.com/68e00ded1f2318dde69565bd/6904fe6ebbd3f3a82c055e46_blog_header_6.27.24.jpeg"}
        />
        <div className="p-10 text-center font- text-xl">
<h1 className="text-2xl md:text-2xl tracking-tight bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            No News Found
          </h1>
        </div>
       
      </div>
    );
  }




  return (
    <div>
      <Header
        className="bg-linear-to-r from-[#5c0606]  via-[#5c0606]70 via-80% to-[#5c0606]/70 to-100%"
      title={"News Release"}
       description="Stay informed with our latest news, press releases, company announcements, product launches, industry updates, and key developments shaping the future of chemical solutions."
        background_image={"https://cdn.prod.website-files.com/68e00ded1f2318dde69565bd/6904fe6ebbd3f3a82c055e46_blog_header_6.27.24.jpeg"}
      />

      <OnlyHomePath text={"News Release"}/>





      <div className="flex max-w-6xl flex-col mx-auto py-4 space-y-3">



        <div className="flex flex-col lg:flex-row gap-3">

         
           <MainFeatureCard
            slug={news[1]?.slug}
            image={news[1]?.news_image_url}
            description={news[0]?.description}
            title={news[0]?.title}
            link={`/news-releases/${news[0]?.slug}`}
          />

    

          


          <div className="lg:w-2/5 grid grid-cols-1 justify-between gap-3">

            {news?.slice(1,4)?.map((item: any, index: number) => (

              <CardFeature                key={index}
                index={index}
                title={item.title}
                image={item?.news_image_url}
                description={item.description}
                url={`/news-releases/${item.slug}`}

              />

            ))}

          </div>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {news?.slice(4,)?.map((res: any, indx: any) => (
            <div>
              <CardFeature
                key={indx}
                index={indx}
                title={res.title}
                image={res?.news_image_url}
                description={res.description}
                url={`/news-releases/${res.slug}`}
              />
            </div>

          ))}
        </div>

      </div>


    </div>
  );
};

export default page;

