import React from 'react';
import { Navigate } from 'react-router-dom';
import { FakeSOSocket, User } from './types';
import UserContext from './contexts/UserContext';

/**
 * Ensures a route is accessible only if a user and socket are present.
 * Provides `user` and `socket` context for child components.
 */
const ProtectedRoute = ({
  user,
  socket,
  children,
}: {
  user: User | null;
  socket: FakeSOSocket | null;
  children: JSX.Element;
}) => {
  // Redirect to login if user or socket is missing
  if (!user) {
    return <Navigate to='/' />;
  }

  if (!socket) {
    return <Navigate to='/' />;
  }

  // Provide context for authenticated routes
  return <UserContext.Provider value={{ user, socket }}>{children}</UserContext.Provider>;
};

export default ProtectedRoute;
