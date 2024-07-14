import { useState } from "react";
import { addTodo } from "../../services/todo.services";

const useMutateTodos = ({ onSuccess, onFailed }) => {
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
export default useMutateTodos;
