import React, { useEffect, useState } from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * NoteEditor allows creating a new note or editing the selected one.
 */
export default function NoteEditor({ note, onSave, onCreateNew, onDelete }) {
  /** Manages local title/body state and saves on action */
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setBody(note?.body || '');
  }, [note?.id]);

  const isEditing = Boolean(note && note.id);

  function handleSave() {
    const t = (title || '').trim();
    const b = body || '';
    onSave({ title: t, body: b });
  }

  return (
    <div className="card" aria-labelledby="editor-heading">
      <div className="card-header">
        <div className="row">
          <h2 id="editor-heading" style={{ margin: 0, fontSize: 16 }}>
            {isEditing ? 'Edit Note' : 'New Note'}
          </h2>
          <span className="badge" aria-hidden="true">{isEditing ? 'Editing' : 'Draft'}</span>
        </div>
        <div className="row">
          {isEditing && (
            <button
              className="btn-danger btn"
              onClick={onDelete}
              aria-label="Delete this note"
            >
              Delete
            </button>
          )}
          <button className="btn-secondary btn" onClick={onCreateNew} aria-label="Create new note">
            New
          </button>
          <button className="btn" onClick={handleSave} aria-label="Save note">
            Save
          </button>
        </div>
      </div>
      <div className="card-body">
        <div style={{ display: 'grid', gap: 10 }}>
          <input
            className="input"
            type="text"
            placeholder="Title"
            aria-label="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea"
            placeholder="Write your note here…"
            aria-label="Note body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="footer-note">
            Title is optional; if left empty, it will be generated from the first line of the body.
          </div>
        </div>
      </div>
    </div>
  );
}
