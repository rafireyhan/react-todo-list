import { useEffect, useState } from "react";
import { fetchTodo } from "../../services/todo.services";

const useGetListTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getTodo = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTodo();
      setData(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return {
    data,
    isLoading,
    errorMessage,
    refetch: getTodo,
  };
};

export default useGetListTodos;
