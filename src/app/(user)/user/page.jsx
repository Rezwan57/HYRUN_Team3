'use client'
import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch('/api/createSession')
      .then(res => res.json())
      .then(data => setusers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - ${user.price}</li>
        ))}
      </ul>
    </div>
  );
}
