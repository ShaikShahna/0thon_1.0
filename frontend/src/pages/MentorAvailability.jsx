import React, { useEffect, useState } from 'react';
import api from '../api';

export default function MentorAvailability(){
  const [profile, setProfile] = useState(null);
  const [topicInput, setTopicInput] = useState('');
  const [slot, setSlot] = useState({ dayOfWeek:'Monday', from:'09:00', to:'10:00' });

  const load = async () => {
    const res = await api.get('/users/me');
    setProfile(res.data);
  };

  useEffect(()=> { load(); }, []);

  const addTopic = () => {
    if (!topicInput) return;
    setProfile(p => (`{ ...p, topics: [...(p.topics  []), topicInput] }`));
    setTopicInput('');
  };

  const addSlot = () => {
    setProfile(p => ({ ...p, availability: [...(p.availability || []), slot] }));
    setSlot({ dayOfWeek:'Monday', from:'09:00', to:'10:00' });
  };

  const save = async () => {
    try {
      await api.put('/users/me', { name: profile.name, topics: profile.topics, availability: profile.availability });
      alert('Saved');
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  if (!profile) return <div className="mt-6">Loading...</div>;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Topics you teach</h3>
        <div className="flex gap-2 my-2">
          <input value={topicInput} onChange={e=>setTopicInput(e.target.value)} className="flex-1 border p-2 rounded" placeholder="Add a topic"/>
          <button onClick={addTopic} className="bg-indigo-600 text-white px-3 rounded">Add</button>
        </div>
        <ul className="mt-2">
          {(profile.topics || []).map((t, i) => <li key={i} className="py-1 border-b">{t}</li>)}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Availability</h3>
        <div className="mt-2">
          <select value={slot.dayOfWeek} onChange={e=>setSlot({...slot, dayOfWeek:e.target.value})} className="border p-2 w-full mt-1">
            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => <option key={d}>{d}</option>)}
          </select>
          <input type="time" value={slot.from} onChange={e=>setSlot({...slot, from:e.target.value})} className="border p-2 w-full mt-1" />
          <input type="time" value={slot.to} onChange={e=>setSlot({...slot, to:e.target.value})} className="border p-2 w-full mt-1" />
          <div className="flex gap-2 mt-2">
            <button onClick={addSlot} className="bg-indigo-600 text-white px-3 py-1 rounded">Add Slot</button>
            <button onClick={save} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
          </div>
        </div>

        <div className="mt-4">
          {(profile.availability || []).map((a,i) => (
            <div key={i} className="p-2 border rounded mb-2">{a.dayOfWeek} {a.from} - {a.to}</div>
          ))}
        </div>
      </div>
    </div>
  );
}