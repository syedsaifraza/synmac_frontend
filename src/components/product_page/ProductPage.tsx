"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { DocumentRequestModal } from "./DocumentRequestModal";
import Product_Section from "../component/Product_Card";
import toast from "react-hot-toast";

const ProductPage = ({ productData }: any) => {
  const captchaRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    client_country: "",
    company_name: "",
    company_address: "",
    purposes: [],
    purpose_other_text: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<any>(null);

  const formatRequestTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to get time remaining
  const getTimeRemaining = (timestamp: number) => {
    const elapsed = Date.now() - timestamp;
    const hoursRemaining = Math.max(0, 24 - (elapsed / (1000 * 60 * 60)));
    if (hoursRemaining < 1) {
      const minutesRemaining = Math.ceil(hoursRemaining * 60);
      return `${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}`;
    }
    return `${Math.ceil(hoursRemaining)} hour${Math.ceil(hoursRemaining) > 1 ? 's' : ''}`;
  };

  // Updated hasPendingRequest - returns request data or null
  const hasPendingRequest = useCallback((productId: any, documentType: any) => {
    const pendingRequests = localStorage.getItem(
      `doc_request_${productId}_${documentType}`,
    );
    if (pendingRequests) {
      const requestData = JSON.parse(pendingRequests);
      const hoursSinceRequest =
        (Date.now() - requestData.timestamp) / (1000 * 60 * 60);
      if (hoursSinceRequest < 24) {
        return requestData; // Return the full request data
      }
    }
    return null;
  }, []);

  const saveRequestToLocalStorage = (
    productId: number,
    documentType: string,
  ) => {
    const requestData = { timestamp: Date.now(), status: "pending" };
    localStorage.setItem(
      `doc_request_${productId}_${documentType}`,
      JSON.stringify(requestData),
    );
  };

  const removeRequestFromLocalStorage = (
    productId: number,
    documentType: string,
  ) => {
    localStorage.removeItem(`doc_request_${productId}_${documentType}`);
  };

  const handleDocumentClick = (
    e: React.MouseEvent,
    docType: "tds" | "sds",
    docUrl: string,
  ) => {
    const isLocked =
      docType === "tds"
        ? productData?.is_tds_locked
        : productData?.is_msds_locked;
    const hasDoc =
      docType === "tds" ? productData?.tds_doc : productData?.msds_doc;

    if (!hasDoc) {
      e.preventDefault();
      return;
    }

    // If document is unlocked, allow direct access
    if (hasDoc && !isLocked) {
      window.open(docUrl, "_blank");
      return;
    }

    // If document is locked, check for pending request
    if (hasDoc && isLocked) {
      e.preventDefault();

      // Check if there's already a pending request
      const pendingRequest = hasPendingRequest(productData?.id, docType);
      if (pendingRequest) {
        setSelectedDocument({
          productId: productData?.id,
          productName: productData?.name,
          documentType: docType,
          documentUrl: docUrl,
          pendingRequest: pendingRequest // Pass the pending request data
        });
        setIsModalOpen(true);
        setSubmitMessage(null);
      } else {
        setSelectedDocument({
          productId: productData?.id,
          productName: productData?.name,
          documentType: docType,
          documentUrl: docUrl,
          pendingRequest: null
        });
        setIsModalOpen(true);
        setSubmitMessage(null);
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
          message: "",
        });
      }
    }
  };

  const handleFormChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitRequest = async (e: any) => {
    e.preventDefault();
    if (!selectedDocument) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

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
      request_status: "pending",
      captchaToken: captchaValue,
    };

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          toast.success("Request submitted successfully");
          setIsModalOpen(false);
          saveRequestToLocalStorage(
            selectedDocument.productId,
            selectedDocument.documentType,
          );
          setSelectedDocument(null);
          setSubmitMessage(null);
          setCaptchaValue("");
          captchaRef?.current?.reset();
        } else {
          setCaptchaValue("");
          captchaRef?.current?.reset();
        }
      } else {
        setCaptchaValue("");
        captchaRef?.current?.reset();
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      toast.error("Something went wrong");
      setCaptchaValue("");
      captchaRef?.current?.reset();
    } finally {
      setCaptchaValue("");
      setIsSubmitting(false);
    }
  };

  const handleReRequest = (productId: number, documentType: string) => {
    removeRequestFromLocalStorage(productId, documentType);
    
    setFormData({
      client_name: "",
      client_email: "",
      client_phone: "",
      client_country: "",
      company_name: "",
      company_address: "",
      purposes: [],
      purpose_other_text: "",
      message: "",
    });
    setSubmitMessage(null);
    setSelectedDocument({
      ...selectedDocument,
      pendingRequest: null
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
    setSubmitMessage(null);
  };

  if (!productData?.relatedProduct || productData?.relatedProduct.length === 0)
    return null;

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-row gap-10 ">
        <div className="flex-1 w-full space-y-10">
          <div className="text-black lg:pt-16 space-y-3 ">
            <h1 className="text-3xl text-gray-900 font-semibold">
              Product Applications
            </h1>
            <div
              className="text-gray-600 text-base text-justify sm:text-lg leading-relaxed fonts ql-editor"
              dangerouslySetInnerHTML={{
                __html: productData?.description || "",
              }}
            />
          </div>

          <div className="my-10">
            <div
              className="text-gray-600 text-base text-justify sm:text-lg leading-relaxed fonts ql-editor"
              dangerouslySetInnerHTML={{
                __html: productData?.usecaes_and_benefits_content || "",
              }}
            />
          </div>
        </div>

        <div className="w-1/4 space-y-3 border bg-gray-50 rounded-md border-[#ff0100]/10 my-20 inline-block p-5">
          <h1 className="text-xl text-gray-900 font-semibold">
            Product Information
          </h1>
          {(productData?.tds_doc || productData?.msds_doc) && (
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 fonts ">
              {productData?.tds_doc && (
                <a
                  href={!productData?.is_tds_locked ? productData.tds_doc : "#"}
                  onClick={(e) =>
                    handleDocumentClick(e, "tds", productData.tds_doc)
                  }
                  target={!productData?.is_tds_locked ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center w-full gap-2 px-2 sm:px-2 py-2 sm:py-2.5 border rounded-lg font-medium transition-colors duration-200 text-xs
                  ${productData?.is_tds_locked
                      ? "bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 border-gray-200"
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                    }`}
                >
                  {productData?.is_tds_locked ? <FaLock /> : <FaLockOpen />}
                  Technical Data Sheet (TDS)
                  {(() => {
                    const pending = hasPendingRequest(productData?.id, "tds");
                    return pending && productData?.is_tds_locked ? (
                      <span className="text-xs ml-2 text-amber-600">
                        Pending
                      </span>
                    ) : null;
                  })()}
                </a>
              )}

              {productData?.msds_doc && (
                <a
                  href={
                    !productData?.is_msds_locked ? productData.msds_doc : "#"
                  }
                  onClick={(e) =>
                    handleDocumentClick(e, "sds", productData.msds_doc)
                  }
                  target={!productData?.is_msds_locked ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center w-full gap-2 px-2 sm:px-2 py-2 sm:py-2.5 border rounded-lg transition-colors duration-200 text-xs fonts
                  ${productData?.is_msds_locked
                      ? "bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 border-gray-200"
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                    }`}
                >
                  {productData?.is_msds_locked ? <FaLock /> : <FaLockOpen />}
                  Material Safety Data Sheet (MSDS)
                  {(() => {
                    const pending = hasPendingRequest(productData?.id, "sds");
                    return pending && productData?.is_msds_locked ? (
                      <span className="text-xs ml-2 text-amber-600">
                        Pending
                      </span>
                    ) : null;
                  })()}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <Product_Section
        product_list={productData.relatedProduct}
        title={"Related Products"}
      />

      <DocumentRequestModal
        isModalOpen={isModalOpen}
        ref={captchaRef}
        captchaValue={captchaValue}
        selectedDocument={selectedDocument}
        hasPendingRequest={hasPendingRequest}
        handleReRequest={handleReRequest}
        formData={formData}
        handleFormChange={handleFormChange}
        handleSubmitRequest={handleSubmitRequest}
        isSubmitting={isSubmitting}
        setCaptchaValue={setCaptchaValue}
        closeModal={closeModal}
        formatRequestTime={formatRequestTime}
        getTimeRemaining={getTimeRemaining}
      />
    </div>
  );
};

export default ProductPage;