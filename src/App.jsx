import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* add other pages (settings, etc) if needed */}
    </Routes>
  );
}

