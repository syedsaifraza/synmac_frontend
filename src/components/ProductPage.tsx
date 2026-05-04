'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import { DocumentRequestModal } from './DocumentRequestModal'
import Product_Section from './Product_Section'
import Link from 'next/link'
import { IoIosArrowRoundForward } from 'react-icons/io'


const ProductPage = ({ productData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    client_country: "",
    company_name: "",
    company_address: "",
    purposes: [],
    purpose_other_text: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<any>(null)

  // Function to check if there's a pending request
  const hasPendingRequest = useCallback((productId: any, documentType: any) => {
    const pendingRequests = localStorage.getItem(`doc_request_${productId}_${documentType}`)
    if (pendingRequests) {
      const requestData = JSON.parse(pendingRequests)
      const hoursSinceRequest = (Date.now() - requestData.timestamp) / (1000 * 60 * 60)
      return hoursSinceRequest < 24
    }
    return false
  }, [])

  // Save request to localStorage
  const saveRequestToLocalStorage = (productId: number, documentType: string) => {
    const requestData = { timestamp: Date.now(), status: 'pending' }
    localStorage.setItem(`doc_request_${productId}_${documentType}`, JSON.stringify(requestData))
  }

  // Remove request from localStorage (for re-request)
  const removeRequestFromLocalStorage = (productId: number, documentType: string) => {
    localStorage.removeItem(`doc_request_${productId}_${documentType}`)
  }

  // Handle document click
  const handleDocumentClick = (e: React.MouseEvent, docType: 'tds' | 'msds', docUrl: string) => {
    const isLocked = docType === 'tds' ? productData?.is_tds_locked : productData?.is_msds_locked
    const hasDoc = docType === 'tds' ? productData?.tds_doc : productData?.msds_doc

    if (!hasDoc) {
      e.preventDefault()
      return
    }

    // If document is unlocked, allow direct access
    if (hasDoc && !isLocked) {
      window.open(docUrl, '_blank')
      return
    }

    // If document is locked, check for pending request
    if (hasDoc && isLocked) {
      e.preventDefault()
      
      // Check if there's already a pending request
      if (hasPendingRequest(productData?.id, docType)) {
        setSelectedDocument({
          productId: productData?.id,
          productName: productData?.name,
          documentType: docType,
          documentUrl: docUrl
        })
        setIsModalOpen(true)
        setSubmitMessage(null)
      } else {
        setSelectedDocument({
          productId: productData?.id,
          productName: productData?.name,
          documentType: docType,
          documentUrl: docUrl
        })
        setIsModalOpen(true)
        setSubmitMessage(null)
        // Reset form when opening modal
        setFormData({
          client_name: "",
          client_email: "",
          client_phone: "",
          client_country: "",
          company_name: "",
          company_address: "",
          purposes: [],
          purpose_other_text: "",
          message: ""
        })
      }
    }
  }

  // Handle form change
  const handleFormChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Handle submit request
  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDocument) return

    setIsSubmitting(true)
    setSubmitMessage(null)

    const requestData = {
      product_id: selectedDocument.productId,
      client_name: formData.client_name,
      client_email: formData.client_email,
      client_phone: formData.client_phone,
      client_country: formData.client_country,
      company_name: formData.company_name,
      company_address: formData.company_address,
      purposes: formData.purposes,
      purpose_other_text: formData.purpose_other_text,
      message: formData.message,
      document_type: selectedDocument.documentType,
      request_status: "pending"
    }

    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        saveRequestToLocalStorage(selectedDocument.productId, selectedDocument.documentType)
        setSubmitMessage({ type: 'success', text: 'Request submitted successfully! You will receive access via email shortly.' })

        setTimeout(() => {
          setIsModalOpen(false)
          setSelectedDocument(null)
          setSubmitMessage(null)
        }, 2000)
      } else {
        throw new Error('Failed to submit request')
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Failed to submit request. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle re-request
  const handleReRequest = (productId: number, documentType: string) => {
    removeRequestFromLocalStorage(productId, documentType)
    // Reset form for new request
    setFormData({
      client_name: "",
      client_email: "",
      client_phone: "",
      client_country: "",
      company_name: "",
      company_address: "",
      purposes: [],
      purpose_other_text: "",
      message: ""
    })
    setSubmitMessage(null)
    // Keep modal open so user can submit new request immediately
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDocument(null)
    setSubmitMessage(null)
  }

  const [showAll, setShowAll] = useState(false);
  
    if (!productData.relatedProduct || productData.relatedProduct.length === 0) return null;
  
    const visibleData = showAll
      ? productData.relatedProduct
      : productData.relatedProduct.slice(0, 3);
  

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Description Section */}
        <div className="text-black py-8 sm:py-12 lg:py-16">
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: productData?.description || "" }} />
        </div>

        {/* Document Buttons */}
        {(productData?.tds_doc || productData?.msds_doc) && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
            {/* TDS Button */}
            {productData?.tds_doc && (
              <a
                href={!productData?.is_tds_locked ? productData.tds_doc : "#"}
                onClick={(e) => handleDocumentClick(e, 'tds', productData.tds_doc)}
                target={!productData?.is_tds_locked ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base
                  ${productData?.is_tds_locked
                    ? "bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 border-gray-200"
                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}
              >
                {productData?.is_tds_locked ? <FaLock /> : <FaLockOpen />}
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Technical Data Sheet (TDS)
                {hasPendingRequest(productData?.id, 'tds') && productData?.is_tds_locked && (
                  <span className="text-xs ml-2 text-amber-600">(Request Pending)</span>
                )}
              </a>
            )}

            {/* MSDS Button */}
            {productData?.msds_doc && (
              <a
                href={!productData?.is_msds_locked ? productData.msds_doc : "#"}
                onClick={(e) => handleDocumentClick(e, 'msds', productData.msds_doc)}
                target={!productData?.is_msds_locked ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base
                  ${productData?.is_msds_locked
                    ? "bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 border-gray-200"
                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}
              >
                {productData?.is_msds_locked ? <FaLock /> : <FaLockOpen />}
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Material Safety Data Sheet (MSDS)
                {hasPendingRequest(productData?.id, 'msds') && productData?.is_msds_locked && (
                  <span className="text-xs ml-2 text-amber-600">(Request Pending)</span>
                )}
              </a>
            )}
          </div>
        )}

        {/* Uses and Benefits Section */}
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Uses Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100 bg-linear-to-r from-gray-50/40 to-white">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight">
                  Uses
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Common applications</p>
              </div>
              <ul className="divide-y divide-gray-50">
                {productData?.usecases?.map((use: any, index: number) => (
                  <li key={index} className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span dangerouslySetInnerHTML={{ __html: use.title || "" }} className="flex-1"></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100 bg-linear-to-r from-gray-50/40 to-white">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 tracking-tight">
                  Benefits
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Performance advantages</p>
              </div>
              <ul className="divide-y divide-gray-50">
                {productData?.benefits?.map((prod: any, index: number) => (
                  <li key={index} className="px-4 sm:px-6 py-3 sm:py-3.5 text-gray-700 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span dangerouslySetInnerHTML={{ __html: prod.title || "" }} className="flex-1"></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-[#f7f7f7] text-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        
        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
         Related Products
        </h2>

      
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleData.map((item: any, i: number) => {

            
            const params = new URLSearchParams();

            if (item?.name) params.set("productname", item.name);
            if (item?.id) params.set("productid", item.id);
            if (item?.industry_name) params.set("industryname", item.industry_name);
            if (item?.sub_industry_name) params.set("subindustryname", item.sub_industry_name);
            if (item?.product_category_name) params.set("productcategoryname", item.product_category_name);

            const url = `/product?${params.toString()}`;

            return (
              <Link
                key={i}
                href={url}
                className="group block bg-white rounded-xl overflow-hidden"
              >

                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

              
                <div className="p-5 flex items-start gap-4">

                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-700 transition">
                      {item.name}
                    </h3>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.hero_background_description || ""
                      }}
                      className="text-gray-500 text-sm line-clamp-3"
                    />
                  </div>

                 
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#cd2626] shrink-0 mt-0.5 group-hover:translate-x-1 transition">
                    <IoIosArrowRoundForward className="text-xl text-white" />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

     
       
      </div>
    </div>

      {/* Document Request Modal */}
      <DocumentRequestModal
        isModalOpen={isModalOpen}
        selectedDocument={selectedDocument}
        hasPendingRequest={hasPendingRequest}
        handleReRequest={handleReRequest}
        formData={formData}
        handleFormChange={handleFormChange}
        handleSubmitRequest={handleSubmitRequest}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        closeModal={closeModal}
      />
    </div>
  )
}

export default ProductPage