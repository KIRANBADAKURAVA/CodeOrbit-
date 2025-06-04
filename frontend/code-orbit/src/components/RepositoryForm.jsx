import React, { useState } from 'react';
import { useRepository } from '../contexts/RepositoryContext';

const RepositoryForm = () => {
  const [url, setUrl] = useState('');
  const { fetchRepository, isLoading } = useRepository();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepository(url.trim());
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col">
        <label htmlFor="repo-url" className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          GitHub Repository URL
        </label>
        <div className="relative">
          <input
            type="text"
            id="repo-url"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="https://github.com/username/repository"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !url.trim()}
        className={`mt-4 w-full px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 
          ${isLoading || !url.trim()
            ? 'bg-indigo-400 dark:bg-indigo-700 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 transform hover:scale-[1.01] active:scale-[0.99]'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" fill="none\" viewBox="0 0 24 24">
              <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Visualize Repository'
        )}
      </button>
      
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Example: https://github.com/facebook/react
      </div>
    </form>
  );
};

export default RepositoryForm;