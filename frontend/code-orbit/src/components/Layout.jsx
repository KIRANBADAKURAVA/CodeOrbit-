import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import { useRepository } from '../contexts/RepositoryContext';

const Layout = () => {
  const { repository } = useRepository();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1">
        {repository && (
          <Sidebar />
        )}
        <MainContent />
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;