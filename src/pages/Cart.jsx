import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item));
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="px-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cartItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-2">${item.price}</p>
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="bg-blue-100 p-4 rounded-lg shadow-lg w-full sm:w-auto">
          <h2 className="text-xl font-bold text-gray-800">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
