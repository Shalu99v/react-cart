import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../redux/productsSlice';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();
    if (query.trim() != "") {
      dispatch(searchProducts(query));

      navigate(`/?search=${query}`);
      setQuery("");
    }
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">My Store </Link>
      </div>

      <form
        action=""
        onSubmit={handleSearch}
        className="flex mt-2 sm:mt-0 sm:ml-4 flex-1 max-w-md"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      <div className="flex  items-center space-x-4 mt-2 sm:mt-0">
        <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">
          Home
        </Link>
        <Link
          to="/cart"
          className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 font-medium"
        >
          <ShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
