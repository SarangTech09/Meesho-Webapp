import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, addItemToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

// Cart component
const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
 
  // Check if user is logged in
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
        <Link 
          to="/login" 
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Login
        </Link>
      </div>
    );
  }

  // Check if cart is empty
  if (totalQuantity === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link 
          to="/" 
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({totalQuantity} items)</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {items.map(item => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-20 h-20 object-contain mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => dispatch(removeItemFromCart(item.id))}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  onClick={() => dispatch(addItemToCart(item))}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div className="ml-8">
                <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => dispatch(clearCart())}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal ({totalQuantity} items)</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button className="w-full mt-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;