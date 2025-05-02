import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts, resetSearch } from '../redux/slices/productSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const dispatch = useDispatch();

  // Scroll to products section
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle search with debounce
  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
    } else {
      dispatch(resetSearch());
    }
    scrollToProducts();
  };

  // Debounced search on typing
  useEffect(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    if (searchTerm.trim() || isTyping) {
      typingTimeout.current = setTimeout(() => {
        handleSearch();
        setIsTyping(false);
      }, 500); // 500ms debounce delay
    }

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [searchTerm, isTyping]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Track typing state
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsTyping(true);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    dispatch(resetSearch());
    scrollToProducts();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-600"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-600"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;