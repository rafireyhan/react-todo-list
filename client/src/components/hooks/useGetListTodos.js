import { useEffect, useState } from "react";

const useGetListTodos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTodo = async () => {
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
    fetchTodo();
  });

  return {
    data,
    isLoading,
    errorMessage,
    refetch: fetchTodo,
  };
};

export default useGetListTodos;
