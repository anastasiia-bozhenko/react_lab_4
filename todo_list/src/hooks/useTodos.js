// src/hooks/useTodos.js
import { useState, useEffect } from "react";
import axios from "axios";

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // === Fetch initial data ===
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://dummyjson.com/todos");
        setTodos(res.data.todos);
      } catch (err) {
        setError(err.message || "Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // === Add new todo (POST) ===
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

  // === Toggle todo (PUT) ===
  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const res = await axios.put(`https://dummyjson.com/todos/${id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: res.data.completed } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // === Delete todo (DELETE) ===
 const deleteTodo = async (id) => {
  try {
    await axios.delete(`https://dummyjson.com/todos/${id}`);
    // Даже если сервер вернёт 404 — мы всё равно удалим локально
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.warn(`Todo ${id} not found on server, deleting locally.`);
    } else {
      setError(err.message);
      return;
    }
  }

  // Удаляем локально в любом случае
  setTodos((prev) => prev.filter((t) => t.id !== id));
};

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}

export default useTodos;
