import React, { useState } from 'react';

const DailyTaskScheduler = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editing, setEditing] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, task: newTask, description: newDescription, completed: false }]);
      setNewTask('');
      setNewDescription('');
    }
  };

  const editTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setNewTask(task.task);
    setNewDescription(task.description);
    setEditing(id);
  };

  const saveTask = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, task: newTask, description: newDescription } : task));
    setEditing(null);
    setNewTask('');
    setNewDescription('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Daily Task Scheduler</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
        className="w-full p-2 mb-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Add task description"
        className="w-full p-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex flex-col justify-between items-start mb-4">
            {editing === task.id ? (
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            ) : (
              <span
                className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}
              >
                {task.task}
              </span>
            )}
            {editing === task.id ? (
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            ) : (
              <p
                className={`text-gray-600 ${task.completed ? 'text-gray-400' : ''}`}
              >
                {task.description}
              </p>
            )}
            <div className="flex justify-end">
              {editing === task.id ? (
                <button
                  onClick={() => saveTask(task.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => editTask(task.id)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => toggleCompleted(task.id)}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg ${task.completed ? 'bg-gray-400 hover:bg-gray-600' : ''}`}
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTaskScheduler;