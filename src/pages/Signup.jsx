import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { signInWithGoogle } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Clear errors when component mounts
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      // 1. Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        photoURL: userCredential.user.photoURL
      };

      // 3. Dispatch success with serializable user data
      dispatch(loginSuccess({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        photoURL: userCredential.user.photoURL
      }));

      // 4. Set explicit login flag and redirect
      sessionStorage.setItem('explicitLogin', 'true');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = error.message;
      
      // More user-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use another email or login.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      
      dispatch(loginFailure(errorMessage));
    }
  };

  const handleGoogleSignIn = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithGoogle();
      sessionStorage.setItem('explicitLogin', 'true');
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
      dispatch(loginSuccess(userData));
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
            >
              {status === 'loading' ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              disabled={status === 'loading'}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z" />
              </svg>
              <span className="ml-2">Sign up with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;