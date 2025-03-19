"use client";
import { useCart } from "../app/context/CartContext";

const AddToCart = ({ product, className, onAdd, children }) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (onAdd) {
      onAdd(addToCart);
    } else {
      addToCart(product);
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
