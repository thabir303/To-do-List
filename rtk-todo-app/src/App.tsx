import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container max-w-3xl px-4 py-8 mx-auto">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Todo App</h1>
        </header>
        <main className="p-6 bg-white rounded-lg shadow-md">
          <AddTodo />
          <TodoList />
        </main>
      </div>
    </div>
  );
}

export default App;