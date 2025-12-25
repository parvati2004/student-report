import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StudentList from './pages/StudentList';
import ReportPage from './pages/ReportPage';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Student Speaking Assessment</h1>
          <Link to="/" className="text-sm text-indigo-600">Student List</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/students/:id" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  );
}
