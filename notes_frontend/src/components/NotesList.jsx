import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * NotesList renders the list of notes and supports selection and deletion.
 */
export default function NotesList({ notes, activeId, onSelect, onDelete }) {
  /** Displays title, body preview, and updated time */
  if (!notes || notes.length === 0) {
    return (
      <div className="card">
        <div className="card-body empty" role="status">No notes yet</div>
      </div>
    );
  }

  return (
    <div className="card" aria-label="Notes list">
      <div className="card-body">
        <div className="list">
          {notes.map((n) => {
            const updated = n.updatedAt ? new Date(n.updatedAt) : null;
            const updatedLabel = updated ? updated.toLocaleString() : '';
            const preview = (n.body || '').replace(/\n+/g, ' ').slice(0, 80);
            return (
              <div
                key={n.id}
                className={`list-item ${activeId === n.id ? 'active' : ''}`}
                onClick={() => onSelect(n.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(n.id); }}
                aria-pressed={activeId === n.id}
                aria-label={`Open note ${n.title || 'Untitled'}`}
              >
                <div>
                  <div className="list-item-title">{n.title || 'Untitled'}</div>
                  <div className="list-item-preview">{preview || 'No content'}</div>
                </div>
                <div className="row">
                  <div className="list-item-meta" aria-label={`Updated ${updatedLabel}`}>{updatedLabel}</div>
                  <button
                    className="btn-ghost btn"
                    onClick={(e) => { e.stopPropagation(); onDelete(n.id); }}
                    aria-label={`Delete note ${n.title || 'Untitled'}`}
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
