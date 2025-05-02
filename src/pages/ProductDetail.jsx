import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addItemToCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);
  const { user } = useSelector(state => state.auth);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch products initially
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    } else {
      const foundProduct = items.find(item => item.id.toString() === id);
      setProduct(foundProduct);
    }
  }, [dispatch, id, items]);

  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login
      navigate('/login', { state: { from: 'poduct' } });
      return;
    }
    dispatch(addItemToCart(product));
  };

  if (status === 'loading') {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-8 text-red-500">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-pink-600 mb-6">${product.price}</p>
          
          <div className="mb-6">
            <span className="text-gray-700 font-medium">Category:</span>
            <span className="ml-2 text-gray-600 capitalize">{product.category}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;