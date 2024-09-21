// src/hooks/useTasks.js
import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, { ...newTask, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  return { tasks, addTask, deleteTask, updateTask };
};

export default useTasks;