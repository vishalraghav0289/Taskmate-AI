import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import useTasks from '../CustomHooks /useTasks';

const TaskManagement = () => {
  const { tasks, deleteTask, updateTask } = useTasks();
  const [organizedTasks, setOrganizedTasks] = useState({
    urgentImportant: [],
    importantNotUrgent: [],
    urgentNotImportant: [],
    neitherUrgentNorImportant: [],
    todo: []
  });
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    const newOrganizedTasks = tasks.reduce((acc, task) => {
      const category = task.category || 'todo';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(task);
      return acc;
    }, {
      urgentImportant: [],
      importantNotUrgent: [],
      urgentNotImportant: [],
      neitherUrgentNorImportant: [],
      todo: []
    });
    setOrganizedTasks(newOrganizedTasks);
  }, [tasks]);

  const onDragStart = (e, categoryId, index) => {
    dragItem.current = { categoryId, index };
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.style.opacity = '0.5';
  };

  const onDragEnter = (e, categoryId, index) => {
    dragOverItem.current = { categoryId, index };
    e.target.style.backgroundColor = '#f3f4f6';
  };

  const onDragLeave = (e) => {
    e.target.style.backgroundColor = '';
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e, categoryId) => {
    e.preventDefault();
    const draggedItemCategory = dragItem.current.categoryId;
    const draggedItemIndex = dragItem.current.index;
    const droppedItemCategory = categoryId;
    const droppedItemIndex = dragOverItem.current?.index ?? 0;

    if (draggedItemCategory === droppedItemCategory && draggedItemIndex === droppedItemIndex) {
      return;
    }

    const newOrganizedTasks = { ...organizedTasks };
    const draggedTask = newOrganizedTasks[draggedItemCategory][draggedItemIndex];

    if (newOrganizedTasks[draggedItemCategory] && newOrganizedTasks[droppedItemCategory]) {
      newOrganizedTasks[draggedItemCategory].splice(draggedItemIndex, 1);
      newOrganizedTasks[droppedItemCategory].splice(droppedItemIndex, 0, draggedTask);
    } else {
      console.error(`Category not found: ${draggedItemCategory} or ${droppedItemCategory}`);
    }

    setOrganizedTasks(newOrganizedTasks);
    updateTask(draggedTask.id, { category: droppedItemCategory });

    e.target.style.backgroundColor = '';
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const onDragEnd = (e) => {
    e.target.style.opacity = '';
    e.target.style.backgroundColor = '';
  };

  const TaskList = React.memo(({ listId, title, tasks }) => (
    <div
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        hyphens: 'auto'
      }}
      className="bg-white p-4 rounded-lg shadow-md flex-1 min-h-[200px]"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, listId)}
    >
      <h2 className="text-xl font-bold mb-4 font-handwritten text-gray-800 task-heading">
        {title}
      </h2>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => onDragStart(e, listId, index)}
          onDragEnter={(e) => onDragEnter(e, listId, index)}
          onDragLeave={onDragLeave}
          onDragEnd={onDragEnd}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            hyphens: 'auto'
          }}
          className="p-2 mb-2 rounded-md bg-gray-50 relative group select-none cursor-move"
        >
          <span style={{ whiteSpace: 'normal' }} className="text-gray-800">{task.text}</span>
          <button
            onClick={() => deleteTask(task.id)}
            className="absolute top-1 right-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  ));

  const categories = [
    { id: 'urgentImportant', title: 'Urgent and Important' },
    { id: 'importantNotUrgent', title: 'Important but Not Urgent' },
    { id: 'urgentNotImportant', title: 'Urgent but Not Important' },
    { id: 'neitherUrgentNorImportant', title: 'Neither Urgent nor Important' },
    { id: 'todo', title: 'To-Do' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-500">

      <div className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-purple-700">Task Mate AI</h2>
        </div>
        <nav className="mt-6">
          <Link to="/tasklist" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Task List</Link>
          <Link to="/taskmanagement" className="block py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300">Task Management</Link>
          <Link to="/ai" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">AI</Link>
          <Link to="/roadmap" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Roadmap</Link>
          <Link to="/startmyday" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Start My Day</Link>
        </nav>
      </div>

      <div className="flex-1 p-8 flex flex-col  h-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map(category => (
            <TaskList 
              key={category.id} 
              listId={category.id} 
              title={category.title} 
              tasks={organizedTasks[category.id] || []}
              className="flex-1 h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;