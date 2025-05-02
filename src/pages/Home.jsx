import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterByCategory, resetSearch, resetAllFilters } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero'; 

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error, filteredItems } = useSelector(state => state.products);

  const productRef = useRef(null);

  // Fetch products initially
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Scroll handler
  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler passed to Hero component
  const handleCategoryClick = (category) => {
    if (category === "") {
      dispatch(resetSearch()); // Changed from resetFilter to resetSearch
    } else {
      dispatch(filterByCategory(category));
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        {/* Hero Section with Category Filter */}
        <Hero onCategoryClick={handleCategoryClick} onShopNowClick={scrollToProducts} />
      </div>

      {/* Product Grid */}
      <div id='products-section' ref={productRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;