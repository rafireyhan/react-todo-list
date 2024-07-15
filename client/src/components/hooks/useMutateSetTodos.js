import { useState } from "react";
import { addTodo, editTask, deleteTodo } from "../../services/todo.services";

export const useMutateTodos = ({ onSuccess, onFailed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutate = async (todo) => {
    setIsLoading(true);
    try {
      await addTodo(todo);
      onSuccess(todo);
    } catch (error) {
      setErrorMessage(error.message);
      onFailed(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, errorMessage };
};

export const useEditTodos = ({onSuccess, onFailed}) =>{
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const edit = async (task, id) => {
    setIsLoading(true);
    try {
      await editTask(task, id);
      onSuccess(task);
    } catch (error) {
      setErrorMessage(error.message);
      onFailed(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { edit, isLoading, errorMessage};
}

export const useDeleteTodos = ({onSuccess, onFailed}) =>{
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteTask = async (id) => {
    setIsLoading(true);
    try{
      await deleteTodo(id);
      onSuccess(id);
    } catch (error) {
      setErrorMessage(error.message);
      onFailed(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTask, isLoading, errorMessage};
}