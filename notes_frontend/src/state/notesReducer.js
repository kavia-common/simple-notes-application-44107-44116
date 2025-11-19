export const initialState = {
  notes: [],
  activeId: null,
  query: '',
};

/**
 * PUBLIC_INTERFACE
 * Create a simple unique id using timestamp + random segment.
 */
export function createId() {
  /** Returns a unique id suitable for note keys */
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * PUBLIC_INTERFACE
 * Reducer for notes state.
 */
export function notesReducer(state, action) {
  /** Handles actions: INIT_FROM_STORAGE, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, SET_ACTIVE, SET_QUERY */
  switch (action.type) {
    case 'INIT_FROM_STORAGE': {
      const { notes, activeId } = action.payload || {};
      return {
        ...state,
        notes: Array.isArray(notes) ? notes : [],
        activeId: activeId || (Array.isArray(notes) && notes[0] ? notes[0].id : null),
      };
    }
    case 'CREATE_NOTE': {
      const now = new Date().toISOString();
      const baseTitle = (action.payload?.title || '').trim();
      const body = action.payload?.body || '';
      const title = baseTitle || (body ? body.split('\n')[0].slice(0, 60) : 'Untitled Note');
      const note = {
        id: createId(),
        title,
        body,
        updatedAt: now,
        createdAt: now,
      };
      return {
        ...state,
        notes: [note, ...state.notes],
        activeId: note.id,
      };
    }
    case 'UPDATE_NOTE': {
      const { id, title, body } = action.payload;
      return {
        ...state,
        notes: state.notes.map(n => {
          if (n.id !== id) return n;
          const newTitle = (title || '').trim() || (body ? body.split('\n')[0].slice(0, 60) : n.title || 'Untitled Note');
          return { ...n, title: newTitle, body: body ?? n.body, updatedAt: new Date().toISOString() };
        }),
      };
    }
    case 'DELETE_NOTE': {
      const id = action.payload;
      const filtered = state.notes.filter(n => n.id !== id);
      let nextActive = state.activeId;
      if (id === state.activeId) {
        nextActive = filtered[0]?.id || null;
      }
      return { ...state, notes: filtered, activeId: nextActive };
    }
    case 'SET_ACTIVE': {
      return { ...state, activeId: action.payload };
    }
    case 'SET_QUERY': {
      return { ...state, query: action.payload || '' };
    }
    default:
      return state;
  }
}
