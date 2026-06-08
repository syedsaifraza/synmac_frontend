import Link from 'next/link'
import React from 'react'
import { LiaAngleRightSolid } from 'react-icons/lia'


const Path = ({
  industryName,
  industrySlug,
  subIndustryName,
  subIndustrySlug,
  productCategoryName,
  productCategorySlug
}: any) => {
  
  // Build breadcrumb items dynamically based on available props
  const breadcrumbItems = [
    { name: 'Home', href: '/', isLink: true },
  ];

  // Add industry if available
  if (industryName && industrySlug) {
    breadcrumbItems.push({
      name: industryName,
      href: `/industry/${industrySlug}`,
      isLink: true
    });
  }

  // Add sub-industry if available
  if (subIndustryName && subIndustrySlug && industrySlug) {
    breadcrumbItems.push({
      name: subIndustryName,
      href: `/industry/${industrySlug}/${subIndustrySlug}`,
      isLink: true
    });
  }

  // Add product category if available
  if (productCategoryName && productCategorySlug && industrySlug && subIndustrySlug) {
    breadcrumbItems.push({
      name: productCategoryName,
      href: `/industry/${industrySlug}/${subIndustrySlug}/${productCategorySlug}`,
      isLink: true
    });
  }

  return (
    <div className="border-b text-xs border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <LiaAngleRightSolid size={12} />}
            {item.isLink ? (
              <Link href={item.href} className="hover:text-[#cd2626] transition">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Path