/* eslint-disable no-console */
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/login';
import FakeStackOverflow from './components/fakestackoverflow';
import { FakeSOSocket, RootsState, UserSettings } from './types';
import store from './store';
import auth from './firebaseConfig';
import { setUser, clearUser } from './userSlice';
import { saveUserSettings, fetchUserSettings } from './services/authService';
import SettingsManager from './settingsManager';
import SettingsPage from './components/main/settingsPage';

// Get the root HTML container where the app will be rendered.
const container = document.getElementById('root');
/**
 * App Component
 * This is the main application component that:
 * - Initializes a WebSocket connection using `socket.io`.
 * - Applies global and contextual styles based on Redux state.
 * - Wraps the app in a router for navigation and a Redux provider for state management.
 * @returns The main app component wrapped in a router.
 */
const App = () => {
  const [socket, setSocket] = useState<FakeSOSocket | null>(null);

  const serverURL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const user = useSelector((state: RootsState) => state.user);

  if (!serverURL) {
    throw new Error("Environment variable 'REACT_APP_SERVER_URL' must be defined");
  }

  useEffect(() => {
    if (!socket) {
      setSocket(io(serverURL));
    }

    document.body?.classList.add('normal');

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, serverURL]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        dispatch(setUser({ uid: firebaseUser.uid, username: firebaseUser.displayName || 'User' }));
        const settings = await fetchUserSettings(firebaseUser.uid);
        if (settings) SettingsManager.applyUISettings(settings);
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path='/*' element={<Login />} />
        ) : (
          <Route path='/*' element={<FakeStackOverflow socket={socket} />} />
        )}
      </Routes>
    </Router>
  );
};

// Render the App component into the root HTML element.
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    // Wrap the app in a Redux provider to provide global state management.
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
