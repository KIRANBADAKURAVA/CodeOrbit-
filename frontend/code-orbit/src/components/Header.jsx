import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useRepository } from '../contexts/RepositoryContext';
import { Moon, Sun, Github } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { repository, clearRepository } = useRepository();
  
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Github size={24} className="text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            GitVisualizer
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {repository && (
            <button
              onClick={clearRepository}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              New Repository
            </button>
          )}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;