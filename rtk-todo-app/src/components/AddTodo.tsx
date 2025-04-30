// rtk-todo-app/src/components/AddTodo.tsx
import { useState } from 'react';
import { useAddTodoMutation } from '../api/todoApi';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') return;

    try {
      await addTodo({ text, completed: false });
      setText('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || text.trim() === ''}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default AddTodo;