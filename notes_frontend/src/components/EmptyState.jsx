import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * EmptyState shows guidance when there are no notes.
 */
export default function EmptyState({ onCreate }) {
  /** Encourages creating a first note */
  return (
    <div className="card">
      <div className="card-body empty">
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No notes yet</div>
        <div style={{ marginBottom: 12, color: 'var(--text-muted)' }}>
          Create your first note with the button below.
        </div>
        <button className="btn" onClick={onCreate} aria-label="Create first note">
          + New Note
        </button>
      </div>
    </div>
  );
}
