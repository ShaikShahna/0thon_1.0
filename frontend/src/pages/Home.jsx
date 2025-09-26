import React, { useState } from 'react';
import api from '../api';
import { saveAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    expertise: [],
    availableSlots: []
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const path = isRegister ? '/auth/register' : '/auth/login';
      
      // Prepare request body
      let requestBody = {};
      if (isRegister) {
        requestBody = {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role
        };

        if (form.role === 'mentor') {
          requestBody.expertise = form.expertise;
          requestBody.availableSlots = form.availableSlots;
        }
      } else {
        requestBody = { email: form.email, password: form.password };
      }

      const res = await api.post(path, requestBody);
     const { token, user } = res.data;
      console.log(res);
      saveAuth(token, user);
      
    //   Role-based redirect
      if (user.role === 'student') navigate('/student/mentors');
      else navigate('/student/mentors'); // changed to match your backend route

    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={submit} className="space-y-3">
          {isRegister && (
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="w-full border p-2 rounded"
            />
          )}

          <input
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          <input
            required
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full border p-2 rounded"
          />

          {isRegister && (
            <select
              className="w-full border p-2 rounded"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
            </select>
          )}

          {/* Mentor-specific fields */}
          {isRegister && form.role === 'mentor' && (
            <>
              <input
                required
                value={form.expertise.join(',')}
                onChange={e => setForm({ ...form, expertise: e.target.value.split(',') })}
                placeholder="Expertise (comma separated)"
                className="w-full border p-2 rounded"
              />
              <input
                required
                value={form.availableSlots.join(',')}
                onChange={e => setForm({ ...form, availableSlots: e.target.value.split(',') })}
                placeholder="Available Slots (comma separated)"
                className="w-full border p-2 rounded"
              />
            </>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {isRegister ? 'Register' : 'Login'}
            </button>

            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-gray-600 underline"
            >
              {isRegister ? 'Already have an account? Login' : 'New user? Register'}
            </button>
          </div>
        </form>

        <div className="mt-3 text-sm text-gray-500">
          Tip: Use seeded users if backend seeded: <br />
          student: s1@ex.com / password123 <br />
          mentor: alice@ex.com / password123
        </div>
      </div>
    </div>
  );
}
