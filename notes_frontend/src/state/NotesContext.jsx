import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { initialState, notesReducer } from './notesReducer';
import { readState, writeState } from '../utils/storage';

const NotesContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * NotesProvider wraps the app and manages notes state with persistence.
 */
export function NotesProvider({ children }) {
  /** Provides notes, active note, actions, and filtered results */
  const [state, dispatch] = useReducer(notesReducer, initialState);

  // Initialize from storage on mount
  useEffect(() => {
    const saved = readState();
    if (saved) {
      dispatch({ type: 'INIT_FROM_STORAGE', payload: saved });
    }
  }, []);

  // Persist on change
  useEffect(() => {
    writeState(state);
  }, [state.notes, state.activeId]);

  const actions = useMemo(() => ({
    create: (title, body) => dispatch({ type: 'CREATE_NOTE', payload: { title, body } }),
    update: (id, title, body) => dispatch({ type: 'UPDATE_NOTE', payload: { id, title, body } }),
    remove: (id) => dispatch({ type: 'DELETE_NOTE', payload: id }),
    setActive: (id) => dispatch({ type: 'SET_ACTIVE', payload: id }),
    setQuery: (q) => dispatch({ type: 'SET_QUERY', payload: q }),
  }), []);

  const activeNote = useMemo(() => state.notes.find(n => n.id === state.activeId) || null, [state.notes, state.activeId]);

  const filteredNotes = useMemo(() => {
    const q = (state.query || '').toLowerCase();
    if (!q) return state.notes;
    return state.notes.filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.body || '').toLowerCase().includes(q)
    );
  }, [state.notes, state.query]);

  const value = useMemo(() => ({
    state,
    actions,
    activeNote,
    filteredNotes,
  }), [state, actions, activeNote, filteredNotes]);

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useNotes hook to access notes context.
 */
export function useNotes() {
  /** Returns { state, actions, activeNote, filteredNotes } */
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
