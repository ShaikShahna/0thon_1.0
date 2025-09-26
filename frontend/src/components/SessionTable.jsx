import React from 'react';

export default function SessionTable({ sessions, onAccept, onDecline, onReschedule, onCancel, role }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">With</th>
            <th className="px-4 py-2 text-left">Topic</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 && (
            <tr><td colSpan={6} className="p-4 text-center text-gray-500">No sessions</td></tr>
          )}
          {sessions.map(s => (
            <tr key={s._id} className="border-t">
              <td className="px-4 py-2">{role === 'student' ? s.mentor.name : s.student.name}</td>
              <td className="px-4 py-2">{s.topic}</td>
              <td className="px-4 py-2">{s.date}</td>
              <td className="px-4 py-2">{s.time}</td>
              <td className="px-4 py-2">{s.status}</td>
              <td className="px-4 py-2 space-x-2">
                {role === 'mentor' && (
                  <>
                    <button onClick={() => onAccept(s)} className="px-2 py-1 bg-green-600 text-white rounded">Accept</button>
                    <button onClick={() => onDecline(s)} className="px-2 py-1 bg-red-600 text-white rounded">Decline</button>
                    <button onClick={() => onReschedule(s)} className="px-2 py-1 bg-yellow-500 rounded">Reschedule</button>
                  </>
                )}
                {role === 'student' && (
                  <button onClick={() => onCancel(s)} className="px-2 py-1 bg-red-500 text-white rounded">Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
