import React, { useState } from 'react';
import { useRepository } from '../contexts/RepositoryContext';
import RepositoryForm from './RepositoryForm';
import ProjectGraph from './ProjectGraph';
import ChatInterface from './ChatInterface';

const MainContent = () => {
  const { repository, isLoading, error } = useRepository();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <main className="flex-1 flex flex-col p-4 md:p-6 overflow-x-hidden">
      {!repository ? (
        <div className="max-w-2xl mx-auto w-full mt-8 md:mt-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              GitHub Project Visualizer
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Enter a GitHub repository URL to visualize its structure, generate documentation,
              and interact with an AI assistant for insights about the codebase.
            </p>
          </div>
          
          <RepositoryForm />
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex-1 flex flex-col">
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-300">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              </div>
            ) : (
              <ProjectGraph />
            )}
          </div>
          
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
          
          {isChatOpen && (
            <ChatInterface onClose={() => setIsChatOpen(false)} />
          )}
        </div>
      )}
    </main>
  );
};

export default MainContent;