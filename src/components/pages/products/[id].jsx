// pages/products/[id].jsx
import { useRouter } from 'next/navigation';
import ProductPage from '../../components/ProductPage';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch product data based on the `id` (you can use an API or mock data)
  const mockProduct = {
    id: 1,
    name: 'Running Shoes',
    price: 120,
    image: '/assets/products/running-shoes.jpg',
    description: 'High-performance running shoes for all terrains.',
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Black', 'White', 'Blue'],
  };

  return <ProductPage product={mockProduct} />;
}