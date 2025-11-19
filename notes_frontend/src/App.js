import React from 'react';
import './index.css';
import './theme.css';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import EmptyState from './components/EmptyState';

import { NotesProvider, useNotes } from './state/NotesContext';

/**
 * PUBLIC_INTERFACE
 * MainApp composes the Notes UI with header, list, search, and editor.
 */
function MainApp() {
  /** Integrates context actions for CRUD and search */
  const { state, actions, activeNote, filteredNotes } = useNotes();

  const handleNew = () => {
    actions.create('', '');
  };

  const handleSave = ({ title, body }) => {
    if (activeNote?.id) {
      actions.update(activeNote.id, title, body);
    } else {
      actions.create(title, body);
    }
  };

  const confirmDelete = (id) => {
    const allowed = window.confirm('Delete this note? This action cannot be undone.');
    if (allowed) {
      actions.remove(id);
    }
  };

  const editorDelete = () => {
    if (activeNote?.id) confirmDelete(activeNote.id);
  };

  return (
    <div className="app-root">
      <Header onNew={handleNew} />
      <div className="container" style={{ marginTop: 16 }}>
        <div className="content">
          <div className="left">
            <SearchBar value={state.query} onChange={actions.setQuery} />
            <div style={{ height: 12 }} />
            <NotesList
              notes={filteredNotes}
              activeId={state.activeId}
              onSelect={actions.setActive}
              onDelete={confirmDelete}
            />
          </div>
          <div className="right">
            {state.notes.length === 0 && !activeNote ? (
              <EmptyState onCreate={handleNew} />
            ) : (
              <NoteEditor
                note={activeNote}
                onSave={handleSave}
                onCreateNew={handleNew}
                onDelete={editorDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App root with NotesProvider for state management and persistence.
 */
export default function App() {
  /** Wraps MainApp with context provider */
  return (
    <NotesProvider>
      <MainApp />
    </NotesProvider>
  );
}
