import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { loginSuccess, logout, initializeAuth } from './redux/slices/authSlice';

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

 // Check if user is logged in on app load 
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
    <Router>
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
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}