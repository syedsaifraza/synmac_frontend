'use client'
import Header from '@/components/component/Header'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { LiaAngleRightSolid } from 'react-icons/lia'
import { useSelector } from 'react-redux'

const SuccessStories = () => {
  const { industories, sub_industries, success } = useSelector((state: any) => state?.resources)

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [filteredResources, setFilteredResources] = useState<any[]>([]);
  const [activeFilterType, setActiveFilterType] = useState<string | null>(null);
  const [isIndustriesExpanded, setIsIndustriesExpanded] = useState(false);
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);

  const itemsPerPage = 9; // Show 9 items per page (3 columns x 3 rows)
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Get the main featured story (first one) and the sidebar stories (next 3)
  const mainStory = success && success.length > 0 ? success[0] : null;
  const sidebarStories = success && success.length > 4 ? success.slice(1, 4) : [];
  const restStories = success && success.length > 4 ? success.slice(4) : [];

  useEffect(() => {
    if (success) {
      // Filter the rest stories (excluding the first 4)
      setFilteredResources(success.slice(4));
    }
  }, [success]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
        setActiveFilterType(null);
        setIsIndustriesExpanded(false);
        setIsTopicsExpanded(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  const applyFiltersDirectly = (
    industries: number[],
    topics: number[]
  ) => {
    let filtered = [...(success || [])].slice(4); // Start from the 5th item

    const hasIndustries = industries.length > 0;
    const hasTopics = topics.length > 0;

    if (!hasIndustries && !hasTopics) {
      setFilteredResources(success?.slice(4) || []);
      setCurrentPage(1);
      return;
    }

    filtered = filtered.filter((resource: any) => {
      let matches = false;

      if (hasIndustries && industries.includes(resource.industry_id)) {
        matches = true;
      }

      if (!matches && hasTopics && resource.sub_industry_id && topics.includes(resource.sub_industry_id)) {
        matches = true;
      }

      return matches;
    });

    setFilteredResources(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedIndustries([]);
    setSelectedTopics([]);
    setFilteredResources(success?.slice(4) || []);
    setCurrentPage(1);
  };

  const handleIndustryChange = (industryId: number) => {
    let newIndustries: number[];
    if (selectedIndustries.includes(industryId)) {
      newIndustries = selectedIndustries.filter(id => id !== industryId);
    } else {
      newIndustries = [...selectedIndustries, industryId];
    }
    setSelectedIndustries(newIndustries);
    applyFiltersDirectly(newIndustries, selectedTopics);
  };

  const handleTopicChange = (topicId: number) => {
    let newTopics: number[];
    if (selectedTopics.includes(topicId)) {
      newTopics = selectedTopics.filter(id => id !== topicId);
    } else {
      newTopics = [...selectedTopics, topicId];
    }
    setSelectedTopics(newTopics);
    applyFiltersDirectly(selectedIndustries, newTopics);
  };

  const openFilterSidebar = (filterType: string) => {
    setActiveFilterType(filterType);
    setIsIndustriesExpanded(filterType === 'industry');
    setIsTopicsExpanded(filterType === 'topic');
    setIsFilterOpen(true);
  };

  const toggleIndustries = () => {
    setIsIndustriesExpanded(!isIndustriesExpanded);
    if (!isIndustriesExpanded) {
      setIsTopicsExpanded(false);
      setActiveFilterType('industry');
    }
  };

  const toggleTopics = () => {
    setIsTopicsExpanded(!isTopicsExpanded);
    if (!isTopicsExpanded) {
      setIsIndustriesExpanded(false);
      setActiveFilterType('topic');
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredResources?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredResources?.length / itemsPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 4;
    let pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getPageNumbers() || [];

  const next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  }

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }

  if (!success?.length) {
    return (
      <div>
        <Header title={"Success Stories"} description={"Access detailed guides, product information, and industry knowledge to help you understand, use, and choose the right chemical solutions for your business."} background_image={""} />
        <div className="max-w-6xl mx-auto py-16 text-center">
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
    
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-fixed bg-cover bg-no-repeat bg-center flex items-center bg-[#ff0100]"
        style={{ backgroundImage: `url(${"https://www.azumuta.com/wp-content/uploads/2024/05/petrochemical-industry-with-twilight-sky-2-1536x1024-1.jpeg"})` }} >
        <div className="absolute inset-0 bg-[#750909e8]"></div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              Success Stories
            </h1>
            <div className="my-2 max-w-80 text-sm mb-4 font-medium relative space-y-1">
              <p>Real challenges. Practical solutions. Measurable impact.</p>
              <span className="absolute left-0 -bottom-3 h-0.5 bg-[#cd2626] transition-all duration-300 w-20"></span>
            </div>
            <div className="my-2 max-w-80 text-sm mb-4 relative font-medium space-y-1">
              <p>Discover how organizations across industries achieved measurable results with Synmac chemicals, technologies, and expertise.</p>
              <span className="absolute left-0 -bottom-3 h-0.5 bg-[#cd2626] transition-all duration-300 w-20"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b  border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
          <Link href="/" className="hover:text-[#cd2626] transition">Home</Link>
          <LiaAngleRightSolid size={12} />
          <h1 className="text-gray-600">Success Stories</h1>
        </div>
        
      </div>

      


      <div className='my-5 max-w-6xl mx-auto'>


     

     
        {/* <div className="border-b border-gray-200 mb-4">
          <div className="text-3xl font-medium py-2">
            Results ({filteredResources.length}) <span className='text-lg font-semibold text-gray-500'>total</span>
          </div>

          <div className='space-x-3 flex flex-row mb-2'>
            <button 
              onClick={() => openFilterSidebar('industry')}
              className='border border-gray-400 hover:bg-gray-100 p-2 cursor-pointer transition flex items-center gap-2'
            >
              Industry {selectedIndustries.length > 0 && `(${selectedIndustries.length})`}
            </button> 
            <button 
              onClick={() => openFilterSidebar('topic')}
              className='border border-gray-400 hover:bg-gray-100 p-2 cursor-pointer transition flex items-center gap-2'
            >
              Topic {selectedTopics.length > 0 && `(${selectedTopics.length})`}
            </button>
          </div>

        
          <div className='flex flex-wrap gap-2 mb-2'>
            {selectedIndustries.map(id => {
              const industry = industories?.find((ind: any) => ind.id === id);
              return industry && (
                <span key={`ind-${id}`} className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
                  {industry.name}
                  <button onClick={() => handleIndustryChange(id)} className="hover:text-blue-900">×</button>
                </span>
              );
            })}
            {selectedTopics.map(id => {
              const topic = sub_industries?.find((sub: any) => sub.id === id);
              return topic && (
                <span key={`topic-${id}`} className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
                  {topic.name}
                  <button onClick={() => handleTopicChange(id)} className="hover:text-green-900">×</button>
                </span>
              );
            })}
          </div>

          <div className='pb-4 flex flex-wrap items-center gap-3'>
            {(selectedIndustries.length > 0 || selectedTopics.length > 0) && (
              <button 
                onClick={clearFilters}
                className='text-sm text-red-600 hover:text-red-800'
              >
                Clear all filters
              </button>
            )}
          </div>
        </div> */}
         

    
      <div className=" grid grid-cols-5 gap-4 my-4 px-4 sm:px-6 lg:px-0">

        
       
        <div className="col-span-5 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 bg-white rounded-md overflow-hidden shadow border border-gray-200">
          <div className="relative">
            <img
              src={mainStory?.success_story_image_url || "/placeholder-image.jpg"}
              alt={mainStory?.title || "Success Story"}
              className="w-full h-full aspect-square object-cover"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-1 flex-col justify-between">
            <div>
              <p className="text-red-600 text-xs font-semibold uppercase mb-2">
                {mainStory?.industry_name || "Featured Story"}
              </p>
              <Link href={`/success-stories/${mainStory?.slug}`}>
                <h2 className="text-xl md:text-2xl font-bold leading-tight hover:text-[#cd2626] transition">
                  {mainStory?.title}
                </h2>
              </Link>
              <p className="text-gray-600 mt-4 text-sm line-clamp-4">
                {mainStory?.description}
              </p>
            </div>
            <Link 
              href={`/success-stories/${mainStory?.slug}`}
              className="mt-4 border-b-2 py-1 hover:border-[#b62126]/40 cursor-pointer text-sm font-semibold border-[#b62126] transition-all duration-300 ease-in-out inline-block w-fit"
            >
              Read Full Story →
            </Link>
          </div>
        </div>

      
        <div className="col-span-5 lg:col-span-2 flex flex-col gap-2">
          {sidebarStories.map((item:any, index:any) => (
            <Link
            href={`/success-stories/${item?.slug}`}
              key={item.id || index}
              className="grid grid-cols-3 border border-gray-200 h-28 rounded-md overflow-hidden bg-white shadow -sm hover:shadow-md"
            >
              <img
                src={item?.success_story_image_url || "/placeholder-image.jpg"}
                alt={item?.title || "Success Story"}
                className="h-full object-cover"
              />
              <div className="col-span-2 p-3 flex flex-col justify-between">
                <div>
                  
                  <Link href={`/success-stories/${item?.slug}`}>
                    <h3 className="font-semibold text-xs hover:text-[#cd2626] transition">
                      {item?.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {item?.description}
                  </p>
                </div>
                <Link 
                  href={`/success-stories/${item?.slug}`}
                  className="mt-1 text-[#b62126] text-xs font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>

      

   
      <div className="max-w-6xl mx-auto  px-4 sm:px-6 lg:px-0">
         <div className="grid grid-cols-2 lg:grid-cols-3   gap-2">
          {currentProducts.map((item:any, index:any) => (
            <Link
            href={`/success-stories/${item?.slug}`}
              key={item.id || index}
              className="grid grid-cols-3 border border-gray-200 h-28 rounded-md overflow-hidden bg-white shadow -sm hover:shadow-md"
            >
              <img
                src={item?.success_story_image_url || "/placeholder-image.jpg"}
                alt={item?.title || "Success Story"}
                className="h-full object-cover"
              />
              <div className="col-span-2 p-3 flex flex-col justify-between">
                <div>
                  
                  <Link href={`/success-stories/${item?.slug}`}>
                    <h3 className="font-semibold line-clamp-2 lg:line-clamp-3 text-xs hover:text-[#cd2626] transition">
                      {item?.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {item?.description}
                  </p>
                </div>
                <Link 
                  href={`/success-stories/${item?.slug}`}
                  className="mt-1 text-[#b62126] text-xs font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </Link>
          ))}
        </div>
    
  

    

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No resources found with the selected filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[#b62126] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

     
        {totalPages > 1 && (
          <div className="flex gap-2 justify-center items-center text-xs mt-8 p-3">
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className={`h-6 w-12 border rounded-sm cursor-pointer ${currentPage === 1
                  ? 'bg-gray-300 text-gray-800 border-gray-300 cursor-not-allowed'
                  : 'bg-[#b62126] text-white border-[#b62126] hover:bg-[#a01d1d]'
                }`}
            >
              Prev
            </button>

            {visiblePages.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`h-6 w-6 border rounded-sm cursor-pointer ${currentPage === pageNum
                    ? "bg-[#b62126] text-white border-[#b62126]"
                    : "bg-white border-[#b62126] hover:bg-gray-100"
                  }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={next}
              disabled={currentPage === totalPages}
              className={`h-6 w-12 border rounded-sm cursor-pointer ${currentPage === totalPages
                  ? 'bg-gray-300 text-gray-800 border-gray-300 cursor-not-allowed'
                  : 'bg-[#b62126] text-white border-[#b62126] hover:bg-[#a01d1d]'
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

         
      </div>

    
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={() => {
              setIsFilterOpen(false);
              setActiveFilterType(null);
              setIsIndustriesExpanded(false);
              setIsTopicsExpanded(false);
            }}
          />
          <div
            ref={sidebarRef}
            className="fixed right-0 top-0 w-96 bg-white h-full z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out shadow-xl"
          >
            <div className="flex justify-between sticky top-0 bg-white items-center p-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                  setActiveFilterType(null);
                  setIsIndustriesExpanded(false);
                  setIsTopicsExpanded(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              {/* Industries Filter */}
              <div className="mb-6 border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={toggleIndustries}
                  className={`flex justify-between items-center w-full p-4 transition-colors hover:bg-gray-50`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-700">Industries</h3>
                    
                  </div>
                  <span className="text-gray-500 text-xl font-bold transition-transform duration-200">
                    {isIndustriesExpanded ? '−' : '+'}
                  </span>
                </button>
                {isIndustriesExpanded && (
                  <div className="space-y-2 max-h-60 overflow-y-auto p-4 pt-2 bg-gray-50">
                    {industories?.map((indus: any) => (
                      <label key={indus.id} className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(indus.id)}
                          onChange={() => handleIndustryChange(indus.id)}
                          className="w-4 h-4 text-[#b62126] rounded border-gray-300 focus:ring-[#b62126] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{indus.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Topics Filter */}
              {sub_industries && sub_industries.length > 0 && (
                <div className="mb-6 border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={toggleTopics}
                    className={`flex justify-between items-center w-full p-4 transition-colors hover:bg-gray-50`}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-700">Topics</h3>
                     
                    </div>
                    <span className="text-gray-500 text-xl font-bold transition-transform duration-200">
                      {isTopicsExpanded ? '−' : '+'}
                    </span>
                  </button>
                  {isTopicsExpanded && (
                    <div className="space-y-2 max-h-60 overflow-y-auto p-4 pt-2 bg-gray-50">
                      {sub_industries.map((sub: any) => (
                        <label key={sub.id} className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedTopics.includes(sub.id)}
                            onChange={() => handleTopicChange(sub.id)}
                            className="w-4 h-4 text-[#b62126] rounded border-gray-300 focus:ring-[#b62126] focus:ring-2"
                          />
                          <span className="text-sm text-gray-700">{sub.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}


              {(selectedIndustries.length > 0 || selectedTopics.length > 0) && (
                <button
                  onClick={() => {
                    clearFilters();
                    setIsFilterOpen(false);
                  }}
                  className="w-full py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SuccessStories