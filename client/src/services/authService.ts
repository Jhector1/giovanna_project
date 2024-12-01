/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import axios from 'axios';
import { User, UserSettings } from '../types';
import auth from '../firebaseConfig';

// Generalized error logging function
const logError = (message: string, error: unknown) => {
  if (error instanceof Error) {
    console.log(`⚠ ${message}: ${error.name} - ${error.message}`);
  } else {
    console.log(`⚠ ${message}:`, error);
  }
};

// Mapping function to match your custom User type
const mapFirebaseUserToCustomUser = (firebaseUser: FirebaseUser): User => ({
  username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous',
});

// Register a new user with email and password
export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered successfully:', userCredential.user);
    return {
      username: email.split('@')[0],
      uid: userCredential.user.uid,
    };
  } catch (error) {
    logError('Registration error', error);
    throw error;
  }
};

// Log in a user with email and password
export const loginWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully:', userCredential.user);
    return {
      username: email.split('@')[0],
      uid: userCredential.user.uid,
    };
  } catch (error) {
    logError('Login error', error);
    throw error;
  }
};

// Save user settings to Firebase
export const saveUserSettings = async (uid: string, settings: UserSettings): Promise<void> => {
  try {
    const db = getDatabase();
    await set(ref(db, `users/${uid}/settings`), settings);
    console.log(`User settings saved for UID: ${uid}`);
  } catch (error) {
    logError('Error saving user settings', error);
    throw error;
  }
};

// Fetch user settings from Firebase
export const fetchUserSettings = async (uid: string): Promise<UserSettings | null> => {
  try {
    const db = getDatabase();
    const snapshot = await get(ref(db, `users/${uid}/settings`));
    if (snapshot.exists()) {
      console.log(`Fetched user settings for UID: ${uid}`, snapshot.val());
      return snapshot.val();
    }
    console.log(`No settings found for UID: ${uid}`);
    return {
      globalMode: null,
      headerMode: null,
      sidebarMode: null,
      textMode: null,
      buttonMode: null,
    }; // Provide default settings if not found
  } catch (error) {
    logError('Error fetching user settings', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    await axios.post('/api/auth/login', { token });
    return mapFirebaseUserToCustomUser(userCredential.user); // Return mapped user
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
export const loginWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = mapFirebaseUserToCustomUser(userCredential.user); // Map Firebase user to custom User
    return user;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};
