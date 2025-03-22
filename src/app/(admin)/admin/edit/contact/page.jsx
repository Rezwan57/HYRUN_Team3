"use client";
import React, { useEffect, useState } from 'react';

export default function ContactEdit() {
    const [contactInfo, setContactInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const res = await fetch('http://localhost:3000/admin/edit/contact', {
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) throw new Error('Failed to fetch contact info');
                const data = await res.json();
                setContactInfo(data.contactInfo);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactInfo();
    }, []);

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:3000/admin/edit/contact`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contactInfo })
            });
            if (!res.ok) throw new Error('Failed to update contact info');
            alert('Contact info updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating contact info:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Contact Information</h1>
            <div>
                {isEditing ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate();
                    }}>
                        <textarea
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            rows="5"
                            cols="30"
                            className="border p-2 w-full"
                        />
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save Changes</button>
                        <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Contact Information:</strong> {contactInfo}</p>
                        <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
}
