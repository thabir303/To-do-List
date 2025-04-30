
# Todo List Application with Redux Toolkit and RTK Query

This is a demo project built using **TypeScript**, **Redux Toolkit**, and **RTK Query** to demonstrate state management and data fetching techniques in a modern React application. The application allows users to add, update, and delete tasks, with an option to filter tasks by their completion status.

## Features

- **Add, Edit, Delete Todos**: Users can add, edit, and delete tasks.
- **Filtering**: Tasks can be filtered based on their completion status: All, Active, or Completed.
- **State Management**: Uses Redux Toolkit for global state management, with RTK Query for data fetching and synchronization.

## Tech Stack

- **React** - For building the user interface.
- **TypeScript** - For static typing and better developer experience.
- **Redux Toolkit** - For state management.
- **RTK Query** - For fetching data and managing API calls.
- **Tailwind CSS** - For styling the components.

## Setup Instructions

Follow these steps to set up the project on your local machine:

### Prerequisites

Ensure you have the following tools installed:

- **Node.js** (v14 or above) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - [Download yarn](https://yarnpkg.com/)

### Clone the repository

```bash
git clone https://github.com/thabir303/To-do-List.git
cd To-do-List/rtk-todo-app
```

### Install dependencies

```bash
npm install
# or if you're using yarn
yarn install
```

### Setup API Server

This app requires an API server to store the todos. You can either:

1. Use the `json-server` package to set up a mock API server:
   - Install `json-server`:
     ```bash
     npm install json-server
     # or
     yarn global add json-server
     ```
   - Create a `db.json` file in the root directory with the following content:
     ```json
     {
       "todos": []
     }
     ```
   - Start the mock server:
     ```bash
     json-server --watch db.json --port 3001
     ```

2. Alternatively, you can set up your own API server if you prefer a different backend.

### Running the Application

Once the API server is running, start the React application:

```bash
npm start
# or if you're using yarn
yarn start
```

This will run the app on [http://localhost:5173](http://localhost:5173).

### Testing the Application

The application provides basic testing for the functionality like adding, editing, deleting, and filtering todos. The data is fetched from the local API server (configured via RTK Query).

## File Structure

```plaintext
── src/
    ├── api/
    │   └── todoApi.ts        # API calls using RTK Query
    ├── components/
    │   ├── AddTodo.tsx       # Component for adding a todo
    │   ├── TodoItem.tsx      # Todo item component with editing and deleting options
    │   └── TodoList.tsx      # Displays the list of todos with filters
    ├── store/
    │   └── store.ts          # Redux store configuration
    ├── types/
    │   └── todo.ts           # TypeScript interfaces for todos
    └── App.tsx               # Main App component

```

## Contributing

If you want to contribute to this project:

1. Fork the repository.
2. Create a new branch.
3. Implement your feature or fix.
4. Submit a pull request.

## License

This project is licensed under the MIT License.

---