import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, createTask, updateTask, deleteTask } from '../redux/actions/index.js'; 

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const newTask = {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        completed: false,
      };
      dispatch(createTask(newTask));
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const filteredTasks = tasks
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
  .filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'all') return !task.completed; 
    return true;
  });

  

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Task Manager
        </h1>
        
        <form onSubmit={handleAddTask} className="mb-6 space-y-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Título de la tarea"
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Descripción de la tarea"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Agregar
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Pendientes
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No hay tareas para mostrar.</p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map(task => (
              <li
                key={task._id}
                className="bg-gray-800 p-4 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      dispatch(updateTask(task._id, { completed: !task.completed }));
                    }}
                    className="w-5 h-5 mt-1 rounded border-gray-600"
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-400'}`}>
                        {task.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Creado: {formatDate(task.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(deleteTask(task._id))}
                    className="text-red-500 hover:text-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
