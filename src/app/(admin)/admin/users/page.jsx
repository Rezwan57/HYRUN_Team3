'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Users List</h1>
      <ul className="flex flex-col gap-2">
        {users.map(user => (
          <li key={user.id} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">{user.first_name} {user.last_name}</span>
              <span className="text-sm">{user.user_email}</span>
            </div>
            <Link href={`/admin/users/${user.id}`}>
              <p className="text-blue-500 hover:underline">Edit</p>
            </Link>
            <button
              className="text-red-500 hover:underline"
              onClick={() => handleDelete(user.id)}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

