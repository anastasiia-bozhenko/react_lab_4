import { useState } from "react";
import "./TodoItem.css";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.todo);

  const handleSave = () => {
    onEdit(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <tr
      className={`todo-row ${todo.completed ? "completed" : ""}`}
    >
      <td>{todo.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="todo-edit-input"
          />
        ) : (
          todo.todo
        )}
      </td>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="todo-checkbox"
        />
      </td>
      <td className="todo-actions">
        {isEditing ? (
          <button className="todo-btn save" onClick={handleSave}>Save</button>
        ) : (
          <button className="todo-btn edit" onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="todo-btn delete" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default TodoItem;
