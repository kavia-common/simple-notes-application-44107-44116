import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * Header component renders the app brand and primary action buttons.
 */
export default function Header({ onNew }) {
  /** Displays app title and a New Note button */
  return (
    <header className="header ocean-gradient">
      <div className="container header-bar">
        <div className="brand" aria-label="Notes App">
          <div className="brand-logo" aria-hidden="true" />
          <div>
            <div className="brand-title">Ocean Notes</div>
            <div className="footer-note">A clean, modern notes experience</div>
          </div>
        </div>
        <div className="row">
          <button className="btn" onClick={onNew} aria-label="Create new note">
            + New Note
          </button>
        </div>
      </div>
    </header>
  );
}
