import React, { useState, useEffect } from 'react';

function App() {
  const [activeTodo, setActiveTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const storedActiveTodo = JSON.parse(localStorage.getItem('activeTodo')) || [];
    const storedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo')) || [];

    setActiveTodo(storedActiveTodo);
    setCompletedTodo(storedCompletedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem('activeTodo', JSON.stringify(activeTodo));
    localStorage.setItem('completedTodo', JSON.stringify(completedTodo));
  }, [activeTodo, completedTodo]);

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: idCounter,
        text: newTodo,
        completed: false,
        timestamp: Date.now(),
      };

      setActiveTodo([newTodoItem, ...activeTodo]);
      setNewTodo('');
      setIdCounter(idCounter + 1);
    }
  };

  const handleTodoClick = (id, isCompleted) => {
    const clickedTodo = isCompleted
      ? completedTodo.find((todo) => todo.id === id)
      : activeTodo.find((todo) => todo.id === id);

    clickedTodo.completed = !clickedTodo.completed;
    clickedTodo.timestamp = isCompleted ? Date.now() : clickedTodo.timestamp;

    if (isCompleted) {
      setCompletedTodo([...completedTodo.filter((todo) => todo.id !== id), clickedTodo]);
    } else {
      setActiveTodo([...activeTodo.filter((todo) => todo.id !== id)]);
      setCompletedTodo([...completedTodo, clickedTodo]);
    }
  };

  const handleReset = () => {
    setActiveTodo([]);
    setCompletedTodo([]);
  };

  const renderTodoList = (todos, isCompleted) => {
    return todos
      .filter((todo) => todo.completed === isCompleted)
      .sort((a, b) => (isCompleted ? b.timestamp - a.timestamp : a.timestamp - b.timestamp))
      .map((todo) => (
        <div
          key={todo.id}
          onClick={() => handleTodoClick(todo.id, isCompleted)}
          className={`bg-white p-3 m-2 shadow-md cursor-pointer ${
            todo.completed ? 'line-through text-gray-500' : 'text-black'
          }`}
        >
          {todo.text}
        </div>
      ));
  };

  return (
    <div className='bg-gray-800 h-fit flex flex-col justify-center items-center '>
      <div className='w-96 p-8  bg-gray-400 rounded-lg shadow-md'>
      <h1 className='text-4xl mb-6 text-gray-800 font-bold'>Todo:</h1>
        <label htmlFor='todo' className='flex items-center mb-4'>
          <input
            type='text'
            placeholder='Add a new todo'
            className='p-2 rounded border outline-none flex-grow mr-2'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={newTodo}
          />
          <button
            onClick={handleAddTodo}
            className='bg-green-500 p-2 rounded text-white hover:bg-green-700'
          >
            Add
          </button>
        </label>
        <div className='flex flex-col w-full'>
          <div className='text-white font-bold mb-2'>Active Todos</div>
          {renderTodoList(activeTodo, false)}
          {activeTodo.length === 0 && <p className='text-gray-300'>No active todos.</p>}
        </div>
        <div className='flex flex-col w-full mt-4'>
          <div className='text-white font-bold mb-2'>Completed Todos</div>
          {renderTodoList(completedTodo, true)}
          {completedTodo.length === 0 && <p className='text-gray-300'>No completed todos.</p>}
        </div>
      </div>
        <button
          onClick={handleReset}
          className='absolute top-4 right-4 bg-red-500 p-2 rounded text-white hover:bg-red-700'
        >
          Reset
        </button>
        <br />
        <footer className='text-white text-l'>@2023 <span>Rameshwar Jaiswal</span></footer>
    </div>
    
  );
}

export default App;
