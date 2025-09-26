import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getUser } from '../utils/auth';

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const onLogout = () => {
    clearAuth();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-lg">MentorApp</Link>
        <div className="flex items-center gap-3">
          {!user && <Link to="/" className="px-3 py-1 bg-indigo-600 text-white rounded">Login / Register</Link>}
          {user && user.role === 'student' && (
            <>
              <Link to="/student/mentors" className="px-3 py-1">Find Mentors</Link>
              <Link to="/student/dashboard" className="px-3 py-1">My Sessions</Link>
            </>
          )}
          {user && user.role === 'mentor' && (
            <>
              <Link to="/mentor/availability" className="px-3 py-1">Availability</Link>
              <Link to="/mentor/dashboard" className="px-3 py-1">Session Requests</Link>
            </>
          )}
          {user && (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button onClick={onLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
