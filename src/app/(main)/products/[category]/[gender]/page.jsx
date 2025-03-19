
"use client";
import React, { use } from 'react';
import CategoryPage from '@/components/CategoryPages/page';

export default function GenderSpecificCategoryPage({ params }) {
  const resolvedParams = use(params);
  return <CategoryPage 
    category={resolvedParams?.category || ''} 
    gender={resolvedParams?.gender || ''} 
  />;
}
