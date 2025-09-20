import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
//import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasksSlice';

export default function TaskCard({ task, index }) {
  const dispatch = useDispatch();

  if (!task) return null;
  const onDelete = () => {
    if (window.confirm('Delete task?')) dispatch(deleteTask({ id: task.id }));
  };

  const changeStatus = (newStatus) => {
    dispatch(updateTask({ id: task.id, changes: { column: newStatus } }));
    // Note: this only updates column in task object; for consistent move you'd dispatch move action from DnD or implement move helper
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="mb-3 border rounded-lg p-3 bg-white shadow-sm"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={onDelete} className="text-xs text-red-500">Delete</button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex gap-2">
            <div>{task.category}</div>
            <div>•</div>
            <div>{task.priority}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
