import React, { createContext, useContext, useState } from 'react';
import { parseGitHubUrl, generateSampleStructure, convertToGraphData } from '../utils/repository';

const RepositoryContext = createContext(undefined);

export const RepositoryProvider = ({ children }) => {
  const [repository, setRepository] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const fetchRepository = async (url) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { owner, repo } = parseGitHubUrl(url);
      
      if (!owner || !repo) {
        throw new Error('Invalid GitHub URL format. Please enter a valid GitHub repository URL.');
      }
      
      const mockRepo = {
        owner,
        name: repo,
        description: 'This is a sample repository description that would be fetched from the GitHub API in a production application.',
        url: `https://github.com/${owner}/${repo}`,
        stars: Math.floor(Math.random() * 1000),
        forks: Math.floor(Math.random() * 500),
        issues: Math.floor(Math.random() * 50),
        updatedAt: new Date().toISOString(),
      };
      
      const nodeData = generateSampleStructure(mockRepo);
      const graphData = convertToGraphData(nodeData);
      
      setRepository(mockRepo);
      setGraphData(graphData);
      setSelectedNode(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repository data');
      setRepository(null);
      setGraphData(null);
      setSelectedNode(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRepository = () => {
    setRepository(null);
    setGraphData(null);
    setError(null);
    setSelectedNode(null);
  };
  
  const selectNode = (node) => {
    setSelectedNode(node);
  };

  return (
    <RepositoryContext.Provider 
      value={{ 
        repository, 
        isLoading, 
        error, 
        graphData,
        selectedNode,
        fetchRepository, 
        clearRepository,
        selectNode
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }
  return context;
};