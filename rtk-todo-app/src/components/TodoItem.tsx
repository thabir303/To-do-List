// rtk-todo-app/src/components/TodoItem.tsx
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../api/todoApi';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [updateTodo, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, isError: isDeleteError, error: deleteError }] = useDeleteTodoMutation();

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  useEffect(() => {
    if (isUpdateError) {
      setErrorMessage(updateError instanceof Error ? updateError.message : 'Failed to update');
      setTimeout(() => setErrorMessage(null), 3000);
    }
    if (isDeleteError) {
      setErrorMessage(deleteError instanceof Error ? deleteError.message : 'Failed to delete');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  }, [isUpdateError, isDeleteError, updateError, deleteError]);

  const handleToggleComplete = () => {
    updateTodo({
      id: todo.id,
      completed: !todo.completed
    });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editText.trim() === '') return;
    
    updateTodo({
      id: todo.id,
      text: editText
    })
    .unwrap()
    .then(() => {
      setIsEditing(false);
    })
    .catch((error) => {
      console.error('Failed to update todo:', error);
    });
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={isUpdating}
          className="w-5 h-5 mr-3 border border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              disabled={isUpdating || editText.trim() === ''}
              className="px-2 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              disabled={isUpdating || isDeleting}
              className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </>
        )}
        {errorMessage && (
         <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
          )}
      </div>
    </div>
  );
};

export default TodoItem;