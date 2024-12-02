/* eslint-disable no-console */
import React, { useEffect } from 'react';
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { RootsState } from '../../../types';
import { clearUser } from '../../../userSlice';

/**

 * SideBarNav Component
 * A sidebar navigation menu with links to "Questions", "Tags", and "View Settings".
 * It highlights the currently active menu item and applies a color mode based on Redux state.
 * @returns The rendered sidebar navigation component.
 */
const SideBarNav = () => {
  /**
   * Provides navigation functionality for redirecting to different routes.
   */
  const navigate = useNavigate();

  /**
   * Accesses the `sidebarMode` value from the Redux store to determine the sidebar's color mode.
   */
  const { sidebarMode, buttonMode } = useSelector(
    (state: RootsState) => state.dataStorageReducer.datastorages,
  );
  /**
   * Applies the `sidebarMode` as a CSS class to sidebar menu buttons when the component is mounted.
  

 * SideBarNav displays navigation options for "Questions", "Tags", "View Settings",
 * and includes a logout button. It dynamically applies styles based on `sidebarMode`.
 */

  const dispatch = useDispatch();
  console.log('SideBarNav component rendered');
  // Handle user logout
  /**
   * Handles the logout functionality by clearing the username from localStorage
   * and navigating back to the homepage.
   */
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);

      // Clear Redux state and localStorage
      dispatch(clearUser());
      localStorage.clear();

      // Redirect to login page
      navigate('/');
      console.log('User logged out successfully');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  // Apply dynamic styles to menu buttons based on `sidebarMode`

  useEffect(() => {
    const menubtns = document.querySelectorAll('.menu_button');
    menubtns.forEach(btn => {
      btn?.classList.add(sidebarMode || 'normal');
    });

    const selectedBtns = document.querySelectorAll('.menu_selected');
    selectedBtns.forEach(btn => {
      btn?.classList.add(sidebarMode || 'normal');
    });
  }, [sidebarMode]);

  return (
    <div id='sideBarNav' className='sideBarNav'>
      {/* Sidebar logo */}
      <img src='/images/CodeHive.png' width='70%' height={120} />
      {/* Menu options with navigation */}
      <p className={sidebarMode || 'normal'} onClick={() => navigate('/home')}>
        Questions
      </p>
      <p className={sidebarMode || 'normal'} onClick={() => navigate('/tags')}>
        Tags
      </p>
      <p className={sidebarMode || 'normal'} onClick={() => navigate('/view-settings')}>
        View Settings
      </p>

      {/* <NavLink
        to='/home'
        id='menu_questions'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        Questions
      </NavLink>
      <NavLink
        to='tags'
        id='menu_tags'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        Tags
      </NavLink>
      <NavLink
        to='view-settings'
        id='menu_view'
        className={({ isActive }) => `menu_button ${isActive ? 'menu_selected' : ''}`}>
        View Settings

      </NavLink> */}
      {/* Logout button */}
      <button
        onClick={handleLogout}
        id='logout-btn'
        className={`${buttonMode || 'logout-button-bg-color'}  logout-button `}>
        Logout
      </button>
    </div>
  );
};

export default SideBarNav;
