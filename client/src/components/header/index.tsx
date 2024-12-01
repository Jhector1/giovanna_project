import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import useHeader from '../../hooks/useHeader';
import LoginContext from '../../contexts/LoginContext';
import './index.css';

import { RootsState } from '../../types';

/**
 * Header component that renders the main title and a search bar.
 * The search bar allows the user to input a query and navigate to the search results page
 * when they press Enter.
 */
const Header = () => {
  const { val, handleInputChange, handleKeyDown } = useHeader();

  const { user } = useContext(LoginContext); // Access user from context

  const { headerMode } = useSelector((state: RootsState) => state.dataStorageReducer.datastorages);
  useEffect(() => {
    document.querySelector('#header')?.classList.add(headerMode || 'normal');
    // document.querySelector('#header')?.classList.add(JSON.parse(darkbg !== null ? darkbg : ''));
  }, [headerMode]);

  return (
    <div id='header' className={`header ${headerMode || 'default'}`}>
      <div className='title'>CodeHive</div>
      <div className='user-info'>{user ? `Welcome, ${user.username}` : 'Not logged in'}</div>
      <input
        id='searchBar'
        placeholder='Search ...'
        type='text'
        value={val}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Header;
