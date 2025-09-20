import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasksSlice';

export default function AddTaskModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [column, setColumn] = useState('todo');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    dispatch(addTask({ title, description: desc, column, category, priority }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-xl z-10 w-[420px]">
        <h3 className="text-lg font-semibold mb-4">Add Task</h3>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full mb-2 p-2 border rounded" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <div className="flex gap-2 mb-3">
          <select value={column} onChange={e => setColumn(e.target.value)} className="p-2 border rounded">
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border rounded">
            <option>Work</option><option>Personal</option><option>Urgent</option>
          </select>
          <select value={priority} onChange={e => setPriority(e.target.value)} className="p-2 border rounded">
            <option>High</option><option>Medium</option><option>Low</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-primary text-white">Add</button>
        </div>
      </form>
    </div>
  );
}
