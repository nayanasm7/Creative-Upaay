import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';
import { loadState, saveState } from '../utils/localStorage';

const persisted = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksReducer
  },
  preloadedState: persisted 
});

// subscribe to save only tasks slice to avoid saving ephemeral ui state
store.subscribe(() => {
  saveState({ tasks: store.getState().tasks });
});

export default store;
