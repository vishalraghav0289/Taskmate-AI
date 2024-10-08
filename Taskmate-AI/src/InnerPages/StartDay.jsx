import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, SortAsc, LayoutGrid, MoreHorizontal, ChevronDown, User, Clock, ArrowUpDown } from 'lucide-react';

const StartDay = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    // Sample task data for illustration, you can modify it as needed.
    { id: 1, name: 'Task 1', assignee: 'John', dueDate: '6 Oct - Today', priority: 'Low', status: 'On track' },
    { id: 2, name: 'Task 2', assignee: 'Alice', dueDate: null, priority: 'Medium', status: 'At risk' },
  ]);

  const renderTaskList = (sectionTitle) => (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <ChevronDown className="mr-2 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-200">{sectionTitle}</h2>
      </div>
      {tasks.filter(task => task.status === sectionTitle).map(task => (
        <div key={task.id} className="flex items-center py-2 border-b border-gray-700">
          <input type="checkbox" className="mr-3" />
          <div className="flex-1">
            <p className="text-gray-200">{task.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            {task.dueDate ? (
              <span className="text-gray-400">{task.dueDate}</span>
            ) : (
              <Clock size={16} className="text-gray-400" />
            )}
            <div className="relative">
              <span
                className={`px-2 py-1 rounded text-xs cursor-pointer ${
                  task.priority === 'Low' ? 'bg-green-800 text-green-200' :
                  task.priority === 'Medium' ? 'bg-yellow-800 text-yellow-200' :
                  'bg-red-800 text-red-200'
                }`}
                onClick={() => togglePriority(task.id)}
              >
                {task.priority}
              </span>
              <ArrowUpDown size={12} className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              task.status === 'On track' ? 'bg-green-800 text-green-200' :
              task.status === 'At risk' ? 'bg-yellow-800 text-yellow-200' :
              'bg-red-800 text-red-200'
            }`}>
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const togglePriority = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) {
        const priorities = ['Low', 'Medium', 'High'];
        const currentIndex = priorities.indexOf(task.priority);
        const nextPriority = priorities[(currentIndex + 1) % priorities.length];
        return { ...task, priority: nextPriority };
      }
      return task;
    }));
  };

  const handleManageEmail = () => {
    navigate('/emailmanage');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Left-hand side menu */}
      <div className="w-64 bg-gray-800 shadow-md flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-purple-400">Task Mate AI</h2>
        </div>
        <nav className="mt-6">
          <Link to="/tasklist" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">Task List</Link>
          <Link to="/taskmanagement" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">Task Management</Link>
          <Link to="/ai" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">AI</Link>
          <Link to="/roadmap" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">Roadmap</Link>
          <Link to="/startmyday" className="block py-2 px-4 text-gray-400 bg-gray-700">Start My Day</Link>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cross-functional project plan</h1>
          <div className="flex space-x-2">
            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors flex items-center"
              onClick={handleManageEmail}
            >
              Manage your email
            </button>
            <button className="bg-gray-700 text-gray-200 p-2 rounded hover:bg-gray-600 transition-colors">
              <Filter size={18} />
            </button>
            <button className="bg-gray-700 text-gray-200 p-2 rounded hover:bg-gray-600 transition-colors">
              <SortAsc size={18} />
            </button>
            <button className="bg-gray-700 text-gray-200 p-2 rounded hover:bg-gray-600 transition-colors">
              <LayoutGrid size={18} />
            </button>
            <button className="bg-gray-700 text-gray-200 p-2 rounded hover:bg-gray-600 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          {renderTaskList('To do')}
          {renderTaskList('Doing')}
          {renderTaskList('Done')}
        </main>
      </div>
    </div>
  );
};

export default StartDay;
