import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { auth, signInWithGoogle } from '../firebase';
import { signOut } from 'firebase/auth';
import SearchBar from './SearchBar';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get current route location
  const { user, isInitialized } = useSelector(state => state.auth);
  const { totalQuantity } = useSelector(state => state.cart);

  // List of routes where search bar should be hidden
  const hideSearchBarRoutes = ['/login', '/signup', '/forgot-password'];

  // Check if current route is in the hideSearchBarRoutes array
  const shouldHideSearchBar = hideSearchBarRoutes.includes(location.pathname);

  // handle google sign-in with popup
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      };
      dispatch(loginSuccess(userData));
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.error('Google sign-in error:', error);
      dispatch(loginFailure(error.message));
    }
  };

  // handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('isAuthenticated');
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isInitialized) return null;

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left - Logo */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            Meesho
          </Link>
        </div>

        {/* Middle - SearchBar (conditionally rendered) */}
        {!shouldHideSearchBar && (
          <div className="w-full md:flex-1">
            <SearchBar />
          </div>
        )}

        {/* Right - Auth and Cart */}
        <div className={`w-full md:w-auto flex flex-wrap md:flex-nowrap justify-center md:justify-end items-center gap-2 ${shouldHideSearchBar ? 'md:ml-auto' : ''}`}>
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-700 text-sm md:text-base">
                  {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-3 py-1.5 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-3 py-1.5 bg-gray-200 text-sm text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Login
              </Link>
              <button 
                onClick={handleGoogleSignIn}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z" />
                </svg>
                Google
              </button>
            </>
          )}

          <Link 
            to="/cart" 
            className="relative px-3 py-1.5 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700 transition-colors"
          >
            Cart
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;