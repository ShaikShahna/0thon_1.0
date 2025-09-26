import React from 'react';

export default function MentorCard({ mentor, onBook }) {
  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{mentor.name}</h3>
          <p className="text-sm text-gray-600">{mentor.email}</p>
          <p className="text-sm mt-2">Topics: {mentor.topics?.join(', ') || '—'}</p>
        </div>
        <div>
          <button onClick={() => onBook(mentor)} className="bg-blue-600 text-white px-3 py-1 rounded">Request</button>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        {mentor.availability && mentor.availability.length > 0
          ? mentor.availability.map((a,i) => (
              <div key={i}>{a.dayOfWeek} {a.from} - {a.to}</div>
            ))
          : <div>No availability listed</div>
        }
      </div>
    </div>
  );
}
