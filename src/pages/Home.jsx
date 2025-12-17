import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/cartSlice';

const Home = () => {
  const [products, setProducts] = useState([]);
  console.log(products, 'products');
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://dummyjson.com/products?limit=20'
        );
        setProducts(response.data.products);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = product => {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      toast.error('Duplicate products are not allowed');
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
