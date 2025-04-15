'use client';
import { useEffect, useState } from 'react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('/api/contacts') 
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error fetching messages:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Messages</h1>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
