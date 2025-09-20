import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
//import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

export default function TaskColumn({ columnId, title, taskIds = [], tasksById, filters }) {
  const visibleTaskIds = taskIds.filter(id => {
    const t = tasksById[id];
    if (!t) return false;
    // simple filter logic (category + priority + due)
    if (filters?.category && t.category !== filters.category) return false;
    if (filters?.priority && t.priority !== filters.priority) return false;
    // due filtering left as an exercise
    return true;
  });

  return (
    <div className="card">
      <h2 className="font-semibold mb-3">{title} <span className="text-sm text-gray-500">({taskIds.length})</span></h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
            {visibleTaskIds.map((taskId, idx) => (
              <TaskCard key={taskId} task={tasksById[taskId]} index={idx} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
