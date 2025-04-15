export const getWishlist = () => {
  try {
    const wishlist = localStorage.getItem("wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return [];
  }
};

export const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    // Dispatch event after saving wishlist
    window.dispatchEvent(new Event('wishlistUpdated'));
  } catch (error) {
    console.error("Error saving wishlist:", error);
  }
};

export const toggleWishlistItem = (product) => {
  const wishlist = getWishlist();
  
  // Check if item exists in wishlist
  const existingIndex = wishlist.findIndex(item => item.product_id === product.product_id);
  
  // If item exists, remove it; otherwise, add it
  if (existingIndex !== -1) {
    const updatedWishlist = wishlist.filter(item => item.product_id !== product.product_id);
    saveWishlist(updatedWishlist);
    return { updatedWishlist, added: false };
  } else {
    const updatedWishlist = [...wishlist, product];
    saveWishlist(updatedWishlist);
    return { updatedWishlist, added: true };
  }
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.product_id === productId);
};

export const getWishlistCount = () => {
  return getWishlist().length;
};