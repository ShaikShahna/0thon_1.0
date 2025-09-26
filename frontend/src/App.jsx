import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home.jsx';
import StudentMentors from './pages/studentMentors';
import StudentDashboard from './pages/StudentDashboard';
import MentorAvailability from './pages/MentorAvailability';
import MentorDashboard from './pages/MentorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/student/mentors" element={
            <ProtectedRoute role="student"><StudentMentors /></ProtectedRoute>
          } />
          <Route path="/student/dashboard" element={
            <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
          } />

          <Route path="/mentor/availability" element={
            <ProtectedRoute role="mentor"><MentorAvailability /></ProtectedRoute>
          } />
          <Route path="/mentor/dashboard" element={
            <ProtectedRoute role="mentor"><MentorDashboard /></ProtectedRoute>
          } />

          <Route path="*" element={<div className="p-6">Page not found</div>} />
        </Routes>
      </div>
    </>
  );
}