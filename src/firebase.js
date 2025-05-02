import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ 
  prompt: 'select_account',
  login_hint: '' 
});

// Auth Functions (remain the same)
export const signInWithGoogle = async () => {
  await setPersistence(auth, browserSessionPersistence);
  return signInWithPopup(auth, provider);
};

export const signInWithEmail = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = (user, { displayName, photoURL }) => {
  return updateProfile(user, {
    displayName: displayName?.trim() || '',
    photoURL: photoURL || null
  });
};