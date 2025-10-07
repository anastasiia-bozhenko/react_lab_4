import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.todo);

  const handleSave = () => {
    onEdit(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <tr
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        color: todo.completed ? "gray" : "black",
      }}
    >
      <td>{todo.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          todo.todo
        )}
      </td>
      <td>
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      </td>
      <td style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={onDelete} style={{ marginLeft: "5px" }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TodoItem;
