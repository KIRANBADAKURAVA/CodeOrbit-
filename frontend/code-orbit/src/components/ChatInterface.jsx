import React, { useState, useRef, useEffect } from 'react';
import { useRepository } from '../contexts/RepositoryContext';
import { X, Send } from 'lucide-react';

const ChatInterface = ({ onClose }) => {
  const { repository, selectedNode } = useRepository();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat when selected node changes
  useEffect(() => {
    const initialMessage = selectedNode 
      ? `I can help you understand the ${selectedNode.label} ${selectedNode.group}. What would you like to know?`
      : `Hi there! I can help you with the ${repository.name} repository. What would you like to know?`;
      
    setMessages([{ 
      id: 1, 
      sender: 'bot', 
      text: initialMessage
    }]);
  }, [selectedNode, repository.name]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input
    };
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: simulateBotResponse(input, repository, selectedNode)
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };
  
  const simulateBotResponse = (input, repository, selectedNode) => {
    if (selectedNode) {
      const responses = [
        `The ${selectedNode.label} ${selectedNode.group} is a key part of the ${repository.name} project.`,
        `Would you like me to explain the purpose of ${selectedNode.label}?`,
        `I can help you understand how ${selectedNode.label} fits into the project structure.`,
        `This ${selectedNode.group} is located in the project hierarchy. What specific aspects would you like to know about?`,
        `I can analyze ${selectedNode.label} and provide insights about its functionality.`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    const responses = [
      `I've analyzed the structure of ${repository.name}. It appears to be a ${Math.random() > 0.5 ? 'frontend' : 'backend'} project with approximately ${Math.floor(Math.random() * 50) + 10} files.`,
      `Looking at ${repository.name}, I can help you generate documentation for the codebase. Would you like me to focus on any particular aspect?`,
      `${repository.name} has ${repository.stars} stars and ${repository.forks} forks. It's quite a popular project!`,
      `I can help create a README file for ${repository.name} that highlights its main features and installation process.`,
      `Based on the repository structure, this project appears to be using ${Math.random() > 0.5 ? 'React' : 'Vue'} as its main framework.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  return (
    <div className="fixed bottom-24 right-6 w-full sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out z-20 animate-slideUp">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-medium text-gray-800 dark:text-white">
          {selectedNode ? `Chat about ${selectedNode.label}` : 'Repository Assistant'}
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`mb-3 ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%]`}
          >
            <div className={`p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-3 mr-auto max-w-[80%]">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder={selectedNode ? `Ask about ${selectedNode.label}...` : "Ask about this repository..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg transition-colors duration-200"
            disabled={!input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;