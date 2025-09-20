import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
//import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from '../components/TaskColumn';
import AddTaskModal from '../components/AddTaskModal';
import FilterBar from '../components/FilterBar';
import { moveTask } from '../features/tasksSlice';

const columnOrder = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const tasksState = useSelector(s => s.tasks);
  const [isAddOpen, setAddOpen] = useState(false);
  const [filters, setFilters] = useState({ category: '', priority: '', due: '' });

  const isFiltering = Boolean(filters.category || filters.priority || filters.due);

  const onDragEnd = result => {
    if (!result.destination) return;
    // if filters are active, ignore drag
    if (isFiltering) return;
    dispatch(moveTask({ source: result.source, destination: result.destination }));
  };

  return (
    <div className="p-6 min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Creative Upaay Dashboard</h1>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-xl" onClick={() => setAddOpen(true)}>+ Add Task</button>
        </div>
      </header>

      <FilterBar filters={filters} setFilters={setFilters} />

      {isFiltering && <div className="mt-3 text-sm text-gray-600">Filters active — drag & drop disabled to avoid reorder issues.</div>}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {columnOrder.map(col => (
            <TaskColumn
              key={col.id}
              columnId={col.id}
              title={col.title}
              taskIds={tasksState.columns[col.id] || []}
              tasksById={tasksState.tasksById}
              filters={filters}
              isFiltering={isFiltering}
            />
          ))}
        </div>
      </DragDropContext>

      {isAddOpen && <AddTaskModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}
