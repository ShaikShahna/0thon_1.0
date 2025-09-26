import React, { useEffect, useState } from 'react';
import api from '../api';
import SessionTable from '../components/SessionTable';

export default function StudentDashboard(){
  const [sessions, setSessions] = useState([]);

  const load = async () => {
    const res = await api.get('/sessions/me');
    setSessions(res.data);
  };

  useEffect(()=> { load(); }, []);

  const cancel = async (s) => {
    if (!confirm('Cancel this session?')) return;
    try {
      await api.delete(`/sessions/${s._id}`);
      alert('Cancelled');
      load();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-3">My Sessions</h2>
      <SessionTable sessions={sessions} onCancel={cancel} role="student" />
    </div>
  );
}