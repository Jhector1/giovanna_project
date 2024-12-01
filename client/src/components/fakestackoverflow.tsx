import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout';
import Login from './login';
import { FakeSOSocket, User } from '../types';
import LoginContext from '../contexts/LoginContext';
import ProtectedRoute from '../ProtectedRoute';
import { fetchUserSettings } from '../services/authService';
import QuestionPage from './main/questionPage';
import TagPage from './main/tagPage';
import NewQuestionPage from './main/newQuestion';
import NewAnswerPage from './main/newAnswer';
import AnswerPage from './main/answerPage';
import SettingsPage from './main/settingsPage';

const FakeStackOverflow = ({ socket }: { socket: FakeSOSocket | null }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate user from localStorage and fetch settings if necessary
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser?.uid) {
          fetchUserSettings(parsedUser.uid).then(settings => {});
        }
      } catch (error) {
        /* empty */
      }
    }

    setLoading(false);
  }, []);

  // Show a loading state until the user and settings are resolved
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if no user is available
  // if (!user) {
  //   return <Navigate to='/' />;
  // }

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path='/' element={<Login />} />
        {
          <Route
            element={
              <ProtectedRoute user={user} socket={socket}>
                <Layout />
              </ProtectedRoute>
            }>
            {/* <Route path='/' element={<Login />} /> */}
            <Route path='/home' element={<QuestionPage />} />
            <Route path='tags' element={<TagPage />} />
            {/* <Route path='/home/*' element={<FakeStackOverflow socket={socket} />} /> */}
            <Route path='/question/:qid' element={<AnswerPage />} />
            <Route path='/new/question' element={<NewQuestionPage />} />
            <Route path='/new/answer/:qid' element={<NewAnswerPage />} />
            <Route path='/view-settings' element={<SettingsPage />} />
          </Route>
        }
      </Routes>
    </LoginContext.Provider>
  );
};

export default FakeStackOverflow;
