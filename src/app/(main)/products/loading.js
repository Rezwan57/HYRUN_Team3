"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CategoryPage = () => {
  const router = useRouter();

  useEffect(() => {
    /*router.push("/products"); // Redirects to Products page
    // Rezwan please check this line above (router.push("/products");) 
    // becasue of this when i try to open categories
    // or mens or womens or kids
    //  its redirecting to the product page i thought because of this
    // if it's not u  can remove the comments*/
    
  }, []);

  return null; // Nothing is shown, just redirects
};

export default CategoryPage;
