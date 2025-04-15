"use client";
import React from "react";
import CollectionPage from "@/components/collections/page";

const HotProductsPage = () => {
  return (
    <CollectionPage
      pageType="hot-products"
      // title="Hot Products - Best Deals"
      // description="Discover our best dealsc:\Users\91733\Downloads\ChatGPT Image Apr 14, 2025, 10_25_53 PM.png – high quality shoes at unbeatable prices!"
      bannerImage="/assets/gender/hot.png"
      defaultSortBy="price-low-high"
      productLimit={5}
    />
  );
};

export default HotProductsPage;