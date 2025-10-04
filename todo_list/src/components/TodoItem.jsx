
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <tr
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "gray" : "black",
      }}
    >
      <td>{todo.id}</td>
      <td>{todo.todo}</td>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
      </td>
      <td>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default TodoItem;
