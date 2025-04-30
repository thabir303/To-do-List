// rtk-todo-app/src/types/todo.ts
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export interface AddTodoRequest {
    text: string;
    completed: boolean;
  }
  
  export interface UpdateTodoRequest {
    id: number;
    text?: string;
    completed?: boolean;
  }