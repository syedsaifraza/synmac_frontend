import { FaX } from "react-icons/fa6";

export const DocumentRequestModal = ({
  isModalOpen,
  selectedDocument,
  hasPendingRequest,
  handleReRequest,
  formData,
  handleFormChange,
  handleSubmitRequest,
  isSubmitting,
  submitMessage,
  closeModal
}: any) => {
  if (!isModalOpen || !selectedDocument) return null;

  const hasExistingRequest = hasPendingRequest(selectedDocument.productId, selectedDocument.documentType);

  // Handle purpose checkbox change
  const handlePurposeChange = (value: string, checked: boolean) => {
    let updatedPurposes = [...(formData.purposes || [])];
    
    if (checked) {
      if (!updatedPurposes.includes(value)) {
        updatedPurposes.push(value);
      }
    } else {
      updatedPurposes = updatedPurposes.filter(p => p !== value);
    }
    
    handleFormChange({
      target: {
        name: "purposes",
        value: updatedPurposes
      }
    });
  };

  // Handle Other text change
  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFormChange({
      target: {
        name: "purpose_other_text",
        value: e.target.value
      }
    });
  };

  // Check if Other is selected
  const isOtherSelected = formData.purposes?.includes("Other");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-10 box-border">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 transition-opacity p-4 box-border"
          onClick={closeModal}
        ></div>
        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full">
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Request {selectedDocument.documentType.toUpperCase()} Document
            </h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaX size={18} />
            </button>
          </div>

          <div className="p-6">
            {hasExistingRequest && !submitMessage ? (
              <div className="text-center py-6">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Request Already Submitted</h3>
                  <p className="text-gray-600 mb-6">
                    You have already requested access to this document. Our team will review your request and provide access within 24 hours.
                  </p>
                  <button
                    onClick={() => handleReRequest(selectedDocument.productId, selectedDocument.documentType)}
                    className="w-full bg-[#cd2626] text-white py-2 px-4 rounded-lg hover:bg-[#a31e1e] transition-colors"
                  >
                    Request Again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {submitMessage && (
                    <div className={`p-3 rounded-lg col-span-2 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {submitMessage.text}
                    </div>
                  )}

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <input
                      type="text"
                      value={selectedDocument.productName}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="client_name"
                      required
                      value={formData.client_name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="client_email"
                      required
                      value={formData.client_email}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="client_phone"
                      required
                      value={formData.client_phone}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                      placeholder="Your phone number"
                    />
                  </div>

                  {/* Country Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="client_country"
                      required
                      value={formData.client_country || ""}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                      placeholder="Your country"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      required
                      value={formData.company_name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Address
                    </label>
                    <input
                      type="text"
                      name="company_address"
                      value={formData.company_address}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                      placeholder="Your company address"
                    />
                  </div>

                  {/* Purpose of Request Section - CHECKBOXES */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Request * (Select all that apply)
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value="Purchase Evaluation"
                          checked={formData.purposes?.includes("Purchase Evaluation") || false}
                          onChange={(e) => handlePurposeChange("Purchase Evaluation", e.target.checked)}
                          className="w-4 h-4 text-[#cd2626] rounded focus:ring-[#cd2626]/20"
                        />
                        <span className="text-sm text-gray-700">Purchase Evaluation</span>
                      </label>
                      
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value="Compliance / Safety"
                          checked={formData.purposes?.includes("Compliance / Safety") || false}
                          onChange={(e) => handlePurposeChange("Compliance / Safety", e.target.checked)}
                          className="w-4 h-4 text-[#cd2626] rounded focus:ring-[#cd2626]/20"
                        />
                        <span className="text-sm text-gray-700">Compliance / Safety</span>
                      </label>
                      
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value="Technical Understanding"
                          checked={formData.purposes?.includes("Technical Understanding") || false}
                          onChange={(e) => handlePurposeChange("Technical Understanding", e.target.checked)}
                          className="w-4 h-4 text-[#cd2626] rounded focus:ring-[#cd2626]/20"
                        />
                        <span className="text-sm text-gray-700">Technical Understanding</span>
                      </label>
                      
                      {/* Other checkbox with inline text input */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value="Other"
                            checked={isOtherSelected}
                            onChange={(e) => handlePurposeChange("Other", e.target.checked)}
                            className="w-4 h-4 text-[#cd2626] rounded focus:ring-[#cd2626]/20"
                          />
                          <span className="text-sm text-gray-700">Other:</span>
                        </label>
                        <input
                          type="text"
                          value={formData.purpose_other_text || ""}
                          onChange={handleOtherTextChange}
                          disabled={!isOtherSelected}
                          placeholder="Please specify"
                          className={`flex-1 min-w-[200px] px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626] text-sm
                            ${!isOtherSelected ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cd2626]/20 focus:border-[#cd2626]"
                      placeholder="Any additional information..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (formData.purposes?.length === 0) || (isOtherSelected && !formData.purpose_other_text?.trim())}
                  className="w-full bg-[#cd2626] text-white py-2 px-4 rounded-lg hover:bg-[#a31e1e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};