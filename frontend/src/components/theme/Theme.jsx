import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';

const Theme = () => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply theme on page load
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); // Apply dark mode class to the HTML tag
    } else {
      document.documentElement.classList.remove('dark'); // Remove dark mode class
    }

    // Save the theme to localStorage for persistence
    localStorage.setItem('theme', theme);
  }, [theme]); // This will re-run whenever `theme` changes

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="dark:text-neutral-100 text-neutral-800 text-lg w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800/80 flex items-center justify-center transition-all duration-300"
    >
      {/* Show moon icon for dark theme, sun icon for light theme */}
      {theme === 'dark' ? (
        <FaMoon className="text-2xl" />
      ) : (
        <FaSun className="text-2xl" />
      )}
    </button>
  );
};

export default Theme;
