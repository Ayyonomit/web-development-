
import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return;

    if (editId !== null) {
      setNotes(notes.map(note =>
        note.id === editId ? { ...note, title, content } : note
      ));
      setEditId(null);
    } else {
      setNotes([...notes, {
        id: Date.now(),
        title,
        content
      }]);
    }

    setTitle("");
    setContent("");
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app">
      <h1>My Notes</h1>
      <p>Write down your thoughts and ideas.</p>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button onClick={saveNote}>
          {editId !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="notes">
        {notes.map(note => (
          <div className="note" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <button onClick={() => editNote(note)}>
              Edit
            </button>

            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
