import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  const update = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));

  return (
    <div className="flex gap-3 items-center">
      <select value={filters.category} onChange={e => update('category', e.target.value)} className="p-2 border rounded">
        <option value="">All categories</option>
        <option>Work</option><option>Personal</option><option>Urgent</option>
      </select>

      <select value={filters.priority} onChange={e => update('priority', e.target.value)} className="p-2 border rounded">
        <option value="">All priorities</option>
        <option>High</option><option>Medium</option><option>Low</option>
      </select>

      <input
        placeholder="Search title..."
        value={filters.search || ''}
        onChange={e => update('search', e.target.value)}
        className="p-2 border rounded"
      />

      <button onClick={() => setFilters({})} className="text-sm text-gray-600">Clear</button>
    </div>
  );
}
