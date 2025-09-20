import { createSlice, nanoid } from '@reduxjs/toolkit';

/**
 * Shape:
 * state = {
 *  tasksById: { id: {id, title, description, category, priority, dueDate } },
 *  columns: { todo: [ids], inprogress: [ids], done: [ids] }
 * }
 */

const initialState = {
  tasksById: {
    // sample task
    't1': { id: 't1', title: 'Sample task', description: 'Welcome!', category: 'Work', priority: 'Medium', dueDate: null },
  },
  columns: {
    todo: ['t1'],
    inprogress: [],
    done: [],
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { id, title, description, column } = action.payload;
        state.tasksById[id] = action.payload;
        state.columns[column].unshift(id); // add to top
      },
      prepare({ title, description, column = 'todo', category = 'General', priority = 'Medium', dueDate = null }) {
        const id = nanoid();
        return { payload: { id, title, description, column, category, priority, dueDate } };
      }
    },
    updateTask(state, action) {
      const { id, changes } = action.payload;
      if (state.tasksById[id]) {
        state.tasksById[id] = { ...state.tasksById[id], ...changes };
      }
    },
    deleteTask(state, action) {
      const { id } = action.payload;
      if (!state.tasksById[id]) return;
      // remove from columns
      Object.keys(state.columns).forEach(col => {
        state.columns[col] = state.columns[col].filter(tid => tid !== id);
      });
      delete state.tasksById[id];
    },
    moveTask(state, action) {
      const { source, destination } = action.payload;
      // source: { droppableId, index } destination: { droppableId, index }
      if (!destination) return;
      const sourceList = state.columns[source.droppableId];
      const destList = state.columns[destination.droppableId];

      const [movedId] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, movedId);

      // update task column field (optional but useful)
      if (state.tasksById[movedId]) {
        state.tasksById[movedId].column = destination.droppableId;
      }
    },
    setState(state, action) {
      // replace whole state (used when loading from localStorage)
      return action.payload;
    }
  }
});

export const { addTask, updateTask, deleteTask, moveTask, setState } = tasksSlice.actions;
export default tasksSlice.reducer;
