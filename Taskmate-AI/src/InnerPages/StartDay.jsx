import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, CheckCircle, Clock } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showTimeInputs, setShowTimeInputs] = useState(false);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log('Loaded tasks from local storage:', storedTasks); // Debugging line
    try {
      const parsedTasks = JSON.parse(storedTasks);
      if (Array.isArray(parsedTasks)) {
        setTasks(parsedTasks);
      } else {
        console.error('Stored tasks are not an array:', parsedTasks);
      }
    } catch (error) {
      console.error('Error parsing stored tasks:', error);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    console.log('Saving tasks to local storage:', tasks); // Debugging line
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const taskToAdd = {
        id: Date.now(),
        text: newTask,
        completed: false,
        startTime,
        endTime
      };
      console.log('Adding new task:', taskToAdd); // Debugging line
      setTasks((prevTasks) => [...prevTasks, taskToAdd]);
      resetForm();
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setNewTask(task.text);
    setStartTime(task.startTime);
    setEndTime(task.endTime);
    setShowTimeInputs(true);
  };

  const saveEdit = () => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === editingTask.id ? { ...task, text: newTask, startTime, endTime } : task
      )
    );
    resetForm();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      editingTask ? saveEdit() : addTask();
    }
  };

  const toggleTimeInputs = () => {
    setShowTimeInputs(!showTimeInputs);
  };

  const resetForm = () => {
    setEditingTask(null);
    setNewTask('');
    setStartTime('');
    setEndTime('');
    setShowTimeInputs(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100" style={{ width: '100vw', boxSizing: 'border-box' }}>
      {/* Left-hand side menu */}
      <div className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-purple-700">Task Mate AI</h2>
        </div>
        <nav className="mt-6">
          <Link to="/tasklist" className="block py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300">Task List</Link>
          <Link to="/taskmanagement" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Task Management</Link>
          <Link to="/ai" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">AI</Link>
          <Link to="/roadmap" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Roadmap</Link>
          <Link to="/startmyday" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Start My Day</Link>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Task List</h1>

          {/* Add task form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Add a new task"
              />
              
              {/* Time inputs */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTimeInputs}
                  className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out flex items-center"
                >
                  <Clock size={18} className="mr-2" />
                  {showTimeInputs ? 'Hide Time' : 'Add Time'}
                </button>
                
                {showTimeInputs && (
                  <>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="Start Time"
                    />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="End Time"
                    />
                  </>
                )}
              </div>

              <button
                onClick={editingTask ? saveEdit : addTask}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out flex items-center justify-center"
              >
                {editingTask ? (
                  <>
                    <Edit2 size={18} className="mr-2" />
                    Update Task
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} className="mr-2" />
                    Add Task
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Task list */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {tasks.map(task => (
                <li key={task.id} className="flex items-center p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <span 
                    className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                  >
                    {task.text}
                  </span>
                  <div className="flex items-center space-x-4">
                    {task.startTime && (
                      <span className="text-gray-500 text-sm">
                        {task.startTime} - {task.endTime}
                      </span>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className={`p-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-200'} hover:bg-opacity-80 transition duration-300 ease-in-out`}
                      >
                        <CheckCircle size={18} className={task.completed ? 'text-white' : 'text-gray-600'} />
                      </button>
                      <button
                        onClick={() => startEditing(task)}
                        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;