import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { RepositoryProvider } from './contexts/RepositoryContext';
import Layout from './components/Layout';
import './index.css'
function App() {
  return (
    <ThemeProvider>
      <RepositoryProvider>
        <Layout />
      </RepositoryProvider>
    </ThemeProvider>
  );
}

export default App;