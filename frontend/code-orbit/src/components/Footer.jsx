import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            <Github size={20} className="text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              GitVisualizer
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {year} GitVisualizer. All rights reserved.
          </div>
          
          <div className="flex mt-3 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 mx-2"
            >
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;