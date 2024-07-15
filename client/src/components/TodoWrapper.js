import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import useGetListTodos from "./hooks/useGetListTodos";
import { useMutateTodos, useEditTodos, useDeleteTodos} from "./hooks/useMutateSetTodos";

export const TodoWrapper = () => {
  const [localTodos, setLocalTodos] = useState([]);
  const [message, setMessage] = useState("");

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  const { data: todos, refetch, isLoading, errorMessage } = useGetListTodos();
  
  const { mutate, isLoading: isMutatePending } = useMutateTodos({
    onSuccess: () => {
      setMessage("Todo added succesfully!");
      clearMessage();
      refetch();
    },
    onFailed: (error) => {
      setMessage(`Failed to add todo: ${error.message}`);
      clearMessage();
    },
  });

  const { edit, isLoading: isEditPending } = useEditTodos({
    onSuccess: () => {
      setMessage("Todo edited sucessfully!");
      clearMessage();
      refetch();
    },
    onFailed: (error) => {
      setMessage(`Failed to edit todo: ${error.message}`);
      clearMessage();
    },
  });

  const { deleteTask, isLoading: isDeletePending } = useDeleteTodos({
    onSuccess: () =>{
      setMessage("Todo deleted successfully");
      clearMessage();
      refetch();
    },
    onFailed: (error) =>{
      setMessage(`Failed to delete todo: ${error.message}`);
      clearMessage();
    },
  });

  useEffect(() =>{
    if (todos){
      setLocalTodos(todos);
    }
  }, [todos]);

  const handleAddTodo = async (todo) => {
    await mutate(todo);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTask(id);
      refetch();
    } catch (error) {}
  };

  const handleEditTask = async (task, id) => {
    try {
      await edit(task, id);
      refetch();
    } catch (error) {}
  };

  // const toggleComplete = (id) => {
  //   setLocalTodos(
  //     localTodos.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  //     ),
  //   );
  // };
  const toggleComplete = async (id) => {
    const todo = localTodos.find(todo => todo.id === id);
    if (todo){
      const updatedStatus = todo.status === "draft" ? "published" : "draft";
      const updatedCompleted = updatedStatus === "published" ? "completed" : "";
      const updatedTodo = {
        ...todo,
        status: updatedStatus,
        completed: updatedCompleted
      };

      try {
        await handleEditTask(updatedTodo, id);
      } catch (error) {
        console.error("Failed to toggle todo status: ", error);
      }
    }
  };

  const editTodo = (id) => {
    setLocalTodos(localTodos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing}: todo))
  }

  const isAnyPending = isMutatePending || isEditPending || isDeletePending;

  return (
    <div className="TodoWrapper">
      <h1>To Do List App</h1>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <TodoForm addTodo={handleAddTodo} isPending={isAnyPending}/>
      {localTodos.map((todo, index) =>
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
      
      {message && <h4>{message}</h4>}
    </div>
  );
};

