import React from 'react';
import { useRepository } from '../contexts/RepositoryContext';
import { Star, GitFork, AlertCircle, Calendar, Code, FileText, Zap } from 'lucide-react';
import ActionButton from './ActionButton';

const Sidebar = () => {
  const { repository, selectedNode } = useRepository();
  
  if (!repository) return null;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 shadow-md transition-all duration-300 p-4 flex flex-col overflow-auto">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {repository.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {repository.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Star size={18} className="text-yellow-500 mr-1" />
            <span>{repository.stars.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <GitFork size={18} className="text-blue-500 mr-1" />
            <span>{repository.forks.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <AlertCircle size={18} className="text-red-500 mr-1" />
            <span>{repository.issues.toLocaleString()} issues</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar size={18} className="text-purple-500 mr-1" />
            <span>Updated {formatDate(repository.updatedAt)}</span>
          </div>
        </div>
      </div>
      
      {selectedNode && (
        <div className="mb-6 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <h3 className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">
            Selected: {selectedNode.label}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Type: {selectedNode.group === 'folder' ? 'Directory' : 'File'}
          </p>
        </div>
      )}
      
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-gray-800 dark:text-white mb-2">Actions</h3>
        <ActionButton 
          icon={<FileText size={18} />} 
          label="Generate README" 
          onClick={() => alert('README generation would happen here')}
          className="bg-indigo-600 hover:bg-indigo-700"
        />
        <ActionButton 
          icon={<Code size={18} />} 
          label="Document Project" 
          onClick={() => alert('Project documentation would happen here')}
          className="bg-emerald-600 hover:bg-emerald-700"
        />
        <ActionButton 
          icon={<Zap size={18} />} 
          label="Analyze Code" 
          onClick={() => alert('Code analysis would happen here')}
          className="bg-amber-600 hover:bg-amber-700"
        />
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <a 
          href={repository.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
        >
          <span>View on GitHub</span>
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;