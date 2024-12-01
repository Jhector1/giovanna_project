import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import useLoginContext from './useLoginContext';
import useDataStorage from './useDataStorage';

/**
 * Custom hook to handle login input and submission.
 *
 * @returns username - The current value of the username input.
 * @returns handleInputChange - Function to handle changes in the input field.
 * @returns handleSubmit - Function to handle login submission.
 */
const useLogin = () => {
  const { storedValue, setStoredValue } = useDataStorage('name', '');
  const [username, setUsername] = useState<string>(storedValue || ''); // Initialize with stored value
  const { setUser } = useLoginContext();
  const navigate = useNavigate();

  /**
   * Function to handle the input change event.
   *
   * @param e - the event object.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setStoredValue(e.target.value);
  };

  useEffect(() => {
    if (storedValue) {
      setUser({ username: storedValue });

      navigate('/home');
    }
  });

  /**
   * Function to handle the form submission event.
   *
   * @param event - the form event object.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim()) {
      const guestUser = { username }; // Guest user object
      setUser(guestUser);
      navigate('/home'); // Redirect to home
    } else {
      /* empty */
    }
  };

  /**
   * Automatically set user if `storedValue` exists on initial load.
   */
  useEffect(() => {
    if (storedValue && !username) {
      setUser({ username: storedValue });
    }
  }, [setUser, storedValue, username]);

  return { username, handleInputChange, handleSubmit };
};

export default useLogin;
