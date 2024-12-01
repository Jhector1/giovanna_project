import { useCallback, useEffect, useState } from 'react';
import './index.css';
/**
 * ScrollButton Component
 * A button that becomes visible when the user scrolls down the page.
 * When clicked, it smoothly scrolls the page back to the top.
 * @returns The scroll-to-top button, conditionally rendered.
 */
const ScrollButton = () => {
  const [isVisble, setIsVisble] = useState(false);
  /**
   * toggleVisibility
   * A function to toggle the visibility of the button based on the scroll position.
   * If the user has scrolled more than 200px from the top, the button becomes visible.
   */
  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 200) {
      setIsVisble(true);
    } else {
      setIsVisble(false);
    }
  }, []);
  /**
   * useEffect to set up and clean up the scroll event listener.
   * Adds an event listener to detect scrolling and calls toggleVisibility.
   * Cleans up the event listener when the component is unmounted or updated.
   */

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <>
      {/* Conditionally render the button only when isVisble is true */}
      {isVisble && (
        <button
          id='myBtn'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='semi-transparent'>
          Scroll to Top
        </button>
      )}
    </>
  );
};
export default ScrollButton;
