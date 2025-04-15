"use client";
import React from "react";
import CollectionPage from "@/components/collections/page";

const NewArrivalsPage = () => {
  return (
    <CollectionPage
         pageType="new-arrivals"
    //   title="New Arrivals - Fresh & Trendy"
    //   description="Check out our latest arrivals – the freshest drops in premium HYRUN Collections🔥🔥!"
      bannerImage="/assets/gender/new.jpg"
      defaultSortBy="newest"
      productLimit={8}  
    />
  );
};

export default NewArrivalsPage;