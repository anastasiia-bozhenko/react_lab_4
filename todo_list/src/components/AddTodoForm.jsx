
import { useState } from "react";
import "./AddTodoForm.css";


function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter new todo..."
        style={{ padding: "5px 10px", width: "70%" }}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
