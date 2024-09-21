// src/components/TaskManagement.js
import React from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { X } from 'lucide-react';
import  useTasks  from '../CustomHooks /useTasks';

const TaskManagement = () => {
  const { tasks, deleteTask, updateTask } = useTasks();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedTask = tasks.find(task => task.id.toString() === result.draggableId);
    updateTask(updatedTask.id, { category: destination.droppableId });
  };

  const getTasksForCategory = (category) => {
    return tasks.filter(task => task.category === category);
  };

  const TaskList = ({ listId, title }) => (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-white p-4 rounded-lg shadow-md flex-1 min-h-[200px]"
        >
          <h2 className="text-xl font-bold mb-4 font-handwritten text-gray-800 transform -rotate-2">
            <span className="inline-block px-2 py-1 bg-yellow-100 rounded">
              {title}
            </span>
          </h2>
          {getTasksForCategory(listId).map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-2 mb-2 rounded-md ${
                    snapshot.isDragging ? 'bg-gray-100' : 'bg-gray-50'
                  } relative group select-none`}
                >
                  <span className="text-gray-800">{task.text}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="absolute top-1 right-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left-hand side menu */}
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

      {/* Main content area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <TaskList listId="urgentImportant" title="Urgent and Important" />
            <TaskList listId="importantNotUrgent" title="Important but Not Urgent" />
            <TaskList listId="urgentNotImportant" title="Urgent but Not Important" />
            <TaskList listId="neitherUrgentNorImportant" title="Neither Urgent nor Important" />
            <TaskList listId="todo" title="To-Do" />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskManagement;