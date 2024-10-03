import React, { useEffect } from 'react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  useEffect(() => {
    if (localStorage.theme === 'dark') {
      toggleDarkMode();
    } else if (localStorage.theme === 'light') {
      toggleDarkMode();
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode();
      }
    }
  }, [toggleDarkMode]);

  return (
    <div className="flex justify-center items-center">
      <div className="border rounded-full p-1 flex">
        <button
          onClick={() => {
            localStorage.theme = 'light';
            toggleDarkMode();
          }}
          className={`rounded-full h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center focus:outline-none ${
            isDarkMode ? 'bg-gray-100 text-gray-900' : ''
          }`}
        >
          <span className="text-base material-symbols-outlined">light_mode</span>
        </button>
        <button
          onClick={() => {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              localStorage.theme = 'system';
              toggleDarkMode();
            }
          }}
          className={`rounded-full h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center focus:outline-none ${
            isDarkMode ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300' : ''
          }`}
        >
          <span className="text-base material-symbols-outlined">desktop_windows</span>
        </button>
        <button
          onClick={() => {
            localStorage.theme = 'dark';
            toggleDarkMode();
          }}
          className={`rounded-full h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center focus:outline-none ${
            isDarkMode ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300' : ''
          }`}
        >
          <span className="text-base material-symbols-outlined">dark_mode</span>
        </button>
      </div>
    </div>
  );
};

export default DarkModeToggle;
