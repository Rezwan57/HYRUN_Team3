"use client"
import React, { useState, useEffect } from 'react';

const AdminMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('/api/messages')
            .then(res => res.json())
            .then(data => {
                setMessages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch messages:", err);
                setError('Failed to load messages');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading messages...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Manage Messages</h1>
            <div className="messages-list">
                {messages.map(message => (
                    <div key={message.id} className="message">
                        <p><strong>Name:</strong> {message.name}</p>
                        <p><strong>Email:</strong> {message.email}</p>
                        <p><strong>Message:</strong> {message.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminMessagesPage;
