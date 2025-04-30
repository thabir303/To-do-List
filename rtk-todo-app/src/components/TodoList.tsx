// rtk-todo-app/src/components/TodoList.tsx
import { useState } from 'react';
import { useGetTodosQuery } from '../api/todoApi';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

const TodoList = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-gray-500">Loading todos...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: {error instanceof Error ? error.message : 'Failed to load todos'}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTodos && filteredTodos.length > 0 ? (
        <div>
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
          No {filter !== 'all' ? filter : ''} tasks found.
        </div>
      )}
    </div>
  );
};

export default TodoList;