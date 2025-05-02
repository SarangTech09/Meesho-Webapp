import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate(); 

  // Add to cart handler
  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login
      navigate('/login', { state: { from: 'poduct'}});
      return;
    }
    dispatch(addItemToCart(product));
  };

   // Enhanced image URL handling
   const getImageUrl = () => {
    // If API provides direct image URL
    if (product.image && typeof product.image === 'string') {
      // Ensure URL has proper protocol
      if (product.image.startsWith('http')) {
        return product.image;
      }
      return `https://${product.image}`;
    }
    
    // If API provides images array
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    
    // If API provides image object
    if (product.image?.url) {
      return product.image.url;
    }
    // Fallback to placeholder
    return 'https://via.placeholder.com/300?text=No+Image';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <img 
            src={getImageUrl()} 
            alt={product.title} 
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300?text=Product+Image';
              e.target.className = 'w-full h-full object-contain p-4';
            }}
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-3">{product.description}</p>
          <p className="text-pink-600 font-bold">${product.price}</p>
        </Link>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;