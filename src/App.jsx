import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { loginSuccess, logout, initializeAuth } from './redux/slices/authSlice';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL
        };
        dispatch(loginSuccess(userData));
      } else {
        dispatch(logout());
      }
      dispatch(initializeAuth());
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}