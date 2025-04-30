// rtk-todo-app/src/api/todoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, AddTodoRequest, UpdateTodoRequest } from '../types/todo';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({

    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      providesTags: ['Todo'],
    }),
    
    addTodo: builder.mutation<Todo, AddTodoRequest>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      onQueryStarted: async (newTodo, {dispatch, queryFulfilled }) => {
        const tempId = Date.now();
        
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
            draft.push({
              id: tempId,
              text: newTodo.text,
              completed: newTodo.completed
            });
          })
        );
        
        try {
          const { data: addedTodo } = await queryFulfilled;

          dispatch(
            todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
              const index = draft.findIndex(todo => todo.id === tempId);
              if (index !== -1) {
                draft[index] = addedTodo;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Todo'],
    }),
    
    updateTodo: builder.mutation<Todo, UpdateTodoRequest>({
      query: ({ id, ...todo }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: todo,
      }),
      onQueryStarted: async ({ id, ...update }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todoToUpdate = draft.find((todo) => todo.id === id);
            if (todoToUpdate) {
              Object.assign(todoToUpdate, update);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Todo'],
    }),
    
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const index = draft.findIndex((todo) => todo.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation,
  useDeleteTodoMutation, } = todoApi;