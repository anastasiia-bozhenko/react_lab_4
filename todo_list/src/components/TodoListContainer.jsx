// src/components/TodoListContainer.jsx
import useTodos from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

function TodoListContainer() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ width: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Todo List</h2>
      <AddTodoForm onAdd={addTodo} />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              onToggle={() => toggleTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoListContainer;
