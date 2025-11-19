const KEY = 'notes_app_state_v1';

/**
 * PUBLIC_INTERFACE
 * Read notes state from localStorage.
 */
export function readState() {
  /** Returns parsed state or null */
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * Write notes state to localStorage.
 */
export function writeState(state) {
  /** Persists notes and activeId fields */
  try {
    const data = { notes: state.notes || [], activeId: state.activeId || null };
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
