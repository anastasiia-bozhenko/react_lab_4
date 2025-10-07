import useTodos from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import "./TodoListContainer.css";

function TodoListContainer() {
  const {
    pageTodos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
  } = useTodos();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="todo-container">
      <h2>Todo List</h2>

      <AddTodoForm onAdd={addTodo} />

      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="todo-search"
      />

      <table className="todo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageTodos.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              onToggle={() => toggleTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
              onEdit={editTodoTitle}
            />
          ))}
        </tbody>
      </table>

      <div className="todo-pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(totalTodos / limitPerPage)}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage * limitPerPage >= totalTodos}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoListContainer;
