import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Loader, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';
import axios from 'axios';

const AI = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setConversation(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [...conversation, userMessage],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      const aiMessage = { role: 'assistant', content: result.data.choices[0].message.content };
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, there was an error processing your request.' };
      setConversation(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left-hand side menu */}
      <div className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-purple-700">Task Mate AI</h2>
        </div>
        <nav className="mt-6">
          <Link to="/tasklist" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Task List</Link>
          <Link to="/taskmanagement" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Task Management</Link>
          <Link to="/ai" className="block py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300">AI</Link>
          <Link to="/roadmap" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Roadmap</Link>
          <Link to="/startmyday" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Start My Day</Link>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Conversation area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3/4 p-3 rounded-lg ${message.role === 'user' ? 'bg-purple-600 text-white' : 'bg-white'}`}>
                <p>{message.content}</p>
                {message.role === 'assistant' && (
                  <div className="flex items-center mt-2 space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <ThumbsDown size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Copy size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-white p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI for task management advice..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors flex items-center"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin" /> : <Send />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AI;