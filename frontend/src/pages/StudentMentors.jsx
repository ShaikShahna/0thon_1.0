import React, { useEffect, useState } from 'react';
import api from '../api';
import MentorCard from '../components/MentorCard';
import { getUser } from '../utils/auth';

export default function StudentMentors(){
  const [q, setQ] = useState('');
  const [mentors, setMentors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [booking, setBooking] = useState({ topic:'', date:'', time:'' });

  const load = async () => {
    const res = await api.get(`/users/mentors?q=${encodeURIComponent(q)}`);
    setMentors(res.data);
  };

  useEffect(()=> { load(); }, []);

  const handleSearch = async () => {
    load();
  };

  const onBookClick = (mentor) => {
    setSelected(mentor);
    setBooking(prev => ({ ...prev, topic: mentor.topics?.[0] ||  '' }));
  };

  const confirmBooking = async () => {
    try {
      await api.post('/sessions/book', { mentorId: selected._id, topic: booking.topic, date: booking.date, time: booking.time });
      alert('Session requested');
      setSelected(null);
    } catch (err) {
      alert(err.response?.data?.error ||  err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="md:col-span-2">
        <div className="flex gap-2 mb-4">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search mentors or topics" className="flex-1 border p-2 rounded" />
          <button onClick={handleSearch} className="bg-indigo-600 text-white px-3 rounded">Search</button>
        </div>
        <div className="grid gap-3">
          {mentors.map(m => <MentorCard key={m._id} mentor={m} onBook={onBookClick} />)}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Booking</h3>
        {!selected ? <p>Select a mentor to request a session</p> : (
          <>
            <p className="font-medium">Mentor: {selected.name}</p>
            <input className="w-full border p-2 my-2" placeholder="Topic" value={booking.topic} onChange={e=>setBooking({...booking,topic:e.target.value})} />
            <input type="date" className="w-full border p-2 my-2" value={booking.date} onChange={e=>setBooking({...booking,date:e.target.value})}/>
            <input type="time" className="w-full border p-2 my-2" value={booking.time} onChange={e=>setBooking({...booking,time:e.target.value})}/>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={confirmBooking}>Request</button>
              <button className="px-3 py-1" onClick={()=>setSelected(null)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}