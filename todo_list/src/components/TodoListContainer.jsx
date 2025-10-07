import useTodos from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

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
    <div style={{ width: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Todo List</h2>

      <AddTodoForm onAdd={addTodo} />

      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

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

      <div style={{ marginTop: "10px" }}>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
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
