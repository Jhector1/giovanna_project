/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import './index.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from '../../services/authService';
import { RootsState } from '../../types';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { globalMode, buttonMode } = useSelector(
    (state: RootsState) => state.dataStorageReducer.datastorages,
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }

      let user;
      if (isRegistering) {
        user = await registerWithEmailAndPassword(email, password);
      } else {
        user = await loginWithEmailAndPassword(email, password);
      }
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await loginWithGoogle();
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <img src='/images/CodeHive.png' alt='CodeHive logo' width='20%' height={220} />
      <h2>Welcome to CodeHive!</h2>
      <h4>Sign in with Google or your email and password.</h4>
      <form onSubmit={handleAuth}>
        <div className='email-login'>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            className='input-text'
            aria-label='Email address'
          />
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
            className='input-text'
            aria-label='Password'
          />
          <div className='lo'>
            <button type='submit' className='login-button' disabled={isLoading}>
              {isLoading ? 'Loading...' : isRegistering ? 'Register' : 'Login'}
            </button>
            <button
              type='button'
              onClick={() => setIsRegistering(prev => !prev)}
              className='login-button secondary'
              disabled={isLoading}>
              {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>
        </div>
      </form>
      <hr />
      <button onClick={handleGoogleLogin} className='login-button google' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default Login;
