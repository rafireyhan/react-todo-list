import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import {
  fetchTodo,
  addTodo,
  editTask,
  deleteTodo,
} from "../services/todo.services";
import useGetListTodos from "./hooks/useGetListTodos";
import useMutateTodos from "./hooks/useMutateSetTodos";

uuidv4();

export const TodoWrapper = () => {
  const { data: todos, refetch, isLoading, errorMessage } = useGetListTodos();
  const { mutate, isLoading: isPending } = useMutateTodos({
    onSuccess: () => {
      refetch();
    },
    onFailed: (error) => {
      alert.error(error.message);
    },
  });

  const handleAddTodo = async (todo) => {
    await mutate(todo);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      refetch();
    } catch (error) {}
  };

  const handleEditTask = async (task, id) => {
    try {
      await editTask(task, id);
      refetch();
    } catch (error) {}
  };

  const toggleComplete = (id) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // );
  };

  const editTodo = (id) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
    //   ),
    // );
  };

  return (
    <div className="TodoWrapper">
      <h1>To Do List App</h1>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <TodoForm addTodo={handleAddTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={handleEditTask} task={todo} key={index} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={handleDeleteTodo}
            editTodo={editTodo}
          />
        ),
      )}
    </div>
  );
};

