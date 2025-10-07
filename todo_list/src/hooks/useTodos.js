import { useState, useEffect } from "react";
import axios from "axios";

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://dummyjson.com/todos?limit=150");
        setTodos(res.data.todos);
      } catch (err) {
        setError(err.message || "Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  
  const addTodo = async (todoText, completed = false, userId = 1) => {
    try {
      const res = await axios.post("https://dummyjson.com/todos/add", {
        todo: todoText,
        completed,
        userId,
      });
      setTodos((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const res = await axios.put(`https://dummyjson.com/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: res.data.completed } : t
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${id}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.warn(`Todo ${id} not found on server, deleting locally.`);
      } else {
        setError(err.message);
        return;
      }
    }
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodoTitle = async (id, newTitle) => {
    try {
      const res = await axios.put(`https://dummyjson.com/todos/${id}`, {
        todo: newTitle,
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: res.data.todo } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  
  const filteredTodos = todos.filter((t) =>
    t.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTodos = filteredTodos.length;
  const startIndex = (currentPage - 1) * limitPerPage;
  const pageTodos = filteredTodos.slice(startIndex, startIndex + limitPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      prev * limitPerPage < totalTodos ? prev + 1 : prev
    );
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return {
    todos,
    pageTodos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodoTitle,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimitPerPage,
    searchTerm,
    setSearchTerm,
  };
}

export default useTodos;
