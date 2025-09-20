export const loadState = (key = 'upaay_state') => {
  try {
    const serialized = localStorage.getItem(key);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.warn('Failed to load state', err);
    return undefined;
  }
};

export const saveState = (state, key = 'upaay_state') => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn('Failed to save state', err);
  }
};
