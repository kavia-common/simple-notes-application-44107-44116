import React, { useEffect, useRef } from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * SearchBar provides a text input to filter notes by title/body.
 */
export default function SearchBar({ value, onChange }) {
  /** Includes keyboard shortcut hint and clear button */
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="card" role="search">
      <div className="card-body">
        <div className="row" style={{ alignItems: 'center' }}>
          <input
            ref={inputRef}
            className="input"
            type="search"
            placeholder="Search notes (title or body)…"
            aria-label="Search notes"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {value ? (
            <button
              className="btn-ghost btn"
              onClick={() => onChange('')}
              aria-label="Clear search"
              title="Clear"
            >
              Clear
            </button>
          ) : null}
          <div className="space" />
          <span className="badge" aria-hidden="true">Search</span>
          <kbd className="shortcut">Ctrl/⌘ + F</kbd>
        </div>
      </div>
    </div>
  );
}
