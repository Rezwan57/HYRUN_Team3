'use client';
import React, { useEffect, useState } from 'react';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('http://localhost:3000/admin/add-messages', {
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) throw new Error('Failed to fetch messages');
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleUpdate = async (messageId) => {
        try {
            const res = await fetch(`http://localhost:3000/admin/add-messages/${messageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            if (!res.ok) throw new Error('Failed to update message');
            const updatedMessages = messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...editData } : msg
            );
            setMessages(updatedMessages);
            setIsEditing(false);
            setSelectedMessage(null);
        } catch (error) {
            console.error('Error updating message:', error);
        }
    };

    const handleDelete = async (messageId) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch(`http://localhost:3000/admin/add-messages/${messageId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete message');
            setMessages(messages.filter((msg) => msg.id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleEdit = (message) => {
        setSelectedMessage(message);
        setEditData({ ...message }); 
        setIsEditing(true);
    };

    const handleCancel = () => {
        setSelectedMessage(null);
        setIsEditing(false);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Admin Messages</h1>
            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">Message ID</th>
                        <th className="p-2">Customer Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Message Content</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message.id} className="border-b">
                            <td className="p-2">{message.id}</td>
                            <td className="p-2">{message.customerName}</td>
                            <td className="p-2">{message.email}</td>
                            <td className="p-2">{message.content}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(message)}
                                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(message.id)}
                                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded p-6 w-full max-w-lg">
                        {isEditing ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(selectedMessage.id);
                            }}>
                                <h2 className="text-2xl font-bold mb-4">
                                    Edit Message
                                </h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="content"
                                        value={editData.content || ''}
                                        onChange={handleEditChange}
                                        className="border p-2 w-full"
                                        placeholder="Edit message content"
                                    />
                                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                        Save Changes
                                    </button>
                                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <p><strong>Message Content:</strong> {selectedMessage.content}</p>
                                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
