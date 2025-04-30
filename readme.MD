# RTK Query Todo App

A modern Todo application built with React, TypeScript, Redux Toolkit, and RTK Query demonstrating efficient state management and API interaction patterns.

![RTK Query Todo App](![](image.png))

## Features

- Create, read, update, and delete todo items
- Filter todos by status (all, active, completed)
- Optimistic updates for a responsive user experience
- Error handling for all API operations
- Fully typed with TypeScript
- Clean, responsive UI with Tailwind CSS

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety and better developer experience
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework
- **JSON Server**: Mock backend API

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn

## Getting Started

### Clone the repository

```bash
git clone https://github.com/thabir303/To-do-List.git
cd To-do-List/rtk-todo-app
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Set up the mock API server

The application uses JSON Server to simulate a REST API.

1. Install JSON Server globally:

```bash
npm install json-server
```

2. Create a `db.json` file in the root directory:

```json
{
  "todos": [
    {
      "id": 1,
      "text": "Learn Redux Toolkit",
      "completed": true
    },
    {
      "id": 2,
      "text": "Master RTK Query",
      "completed": false
    },
    {
      "id": 3,
      "text": "Build an awesome Todo app",
      "completed": false
    }
  ]
}
```

3. Start the JSON Server:

```bash
json-server --watch db.json --port 3001
```

### Run the application

In a new terminal window:

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── api/
│   └── todoApi.ts         # RTK Query API definition
├── components/
│   ├── AddTodo.tsx        # Add new todo form
│   ├── TodoItem.tsx       # Individual todo item
│   └── TodoList.tsx       # List of todos with filters
├── store/
│   └── store.ts           # Redux store configuration
├── types/
│   └── todo.ts            # TypeScript interfaces
├── App.tsx                # Main application component
└── index.tsx              # Entry point
```

## Key Concepts

### RTK Query

The app demonstrates several key features of RTK Query:

- **API Definition**: Creating an API slice with endpoints
- **Query Hooks**: Using generated hooks for data fetching (`useGetTodosQuery`)
- **Mutation Hooks**: Using generated hooks for data modification (`useAddTodoMutation`, etc.)
- **Cache Invalidation**: Managing cache with tags
- **Optimistic Updates**: Implementing optimistic UI updates for better UX

### TypeScript Integration

The app uses TypeScript for type safety, including:

- Type-safe Redux store
- Typed API responses and requests
- Interface definitions for application entities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
