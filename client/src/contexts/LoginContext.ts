import { createContext } from 'react';
import { User } from '../types';

/**
 * Interface representing the context type for user login management.
 *
 * - setUser - A function to update the current user in the context,
 *             which take User object representing the logged-in user or null
 *             to indicate no user is logged in.
 */
export interface LoginContextType {
  user?: User | null; // Add user property
  setUser: (user: User | null) => void;
}

const LoginContext = createContext<LoginContextType>({
  user: null, // Default to null
  setUser: () => {},
});

export default LoginContext;
