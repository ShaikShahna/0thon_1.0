import React, { useEffect, useState } from 'react';
import api from '../api';
import SessionTable from '../components/SessionTable';

export default function MentorDashboard(){
  const [sessions, setSessions] = useState([]);
  const [reschedule, setReschedule] = useState({ id:null, date:'', time:'', reason:'' });

  const load = async () => {
    const res = await api.get('/sessions/me');
    setSessions(res.data);
  };

  useEffect(()=> { load(); }, []);

  const accept = async (s) => {
    try { await api.put(`/sessions/${s._id}`, { status: 'accepted' }); load(); }
    catch (err) { alert(err.response?.data?.error || err.message); }
  };
  const decline = async (s) => {
    try { await api.put(`/sessions/${s._id}`, { status: 'declined' }); load(); }
    catch (err) { alert(err.response?.data?.error || err.message); }
  };
  const openReschedule = (s) => setReschedule({ id: s._id, date: s.date, time: s.time, reason: '' });
  const doReschedule = async () => {
    try {
      await api.put(`/sessions/${reschedule.id}`, { date: reschedule.date, time: reschedule.time, rescheduleReason: reschedule.reason, status: 'rescheduled' });
      setReschedule({ id:null, date:'', time:'', reason:'' });
      load();
    } catch (err) { alert(err.response?.data?.error || err.message); }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Incoming Session Requests</h2>
      <SessionTable
        sessions={sessions}
        onAccept={accept}
        onDecline={decline}
        onReschedule={(s)=>openReschedule(s)}
        role="mentor"
      />

      {reschedule.id && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-bold mb-2">Reschedule session</h3>
            <input type="date" value={reschedule.date} onChange={e=>setReschedule(r=>({...r,date:e.target.value}))} className="w-full border p-2 my-1" />
            <input type="time" value={reschedule.time} onChange={e=>setReschedule(r=>({...r,time:e.target.value}))} className="w-full border p-2 my-1" />
            <textarea value={reschedule.reason} onChange={e=>setReschedule(r=>({...r,reason:e.target.value}))} placeholder="Reason" className="w-full border p-2 my-1" />
            <div className="flex gap-2 mt-2">
              <button onClick={doReschedule} className="bg-indigo-600 text-white px-3 py-1 rounded">Send</button>
              <button onClick={()=>setReschedule({ id:null, date:'', time:'', reason:'' })} className="px-3 py-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}