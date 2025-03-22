'use client';
import React, { useEffect, useState } from 'react';

export default function HomepageEdit() {
    const [content, setContent] = useState({
        heroTitle: '',
        heroSubtitle: '',
        aboutText: '',
        contactCTA: '',
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch('/api/admin/edit/homepage', {
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) throw new Error('Failed to fetch content');
                const data = await res.json();
                setContent(data); 
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch('/api/admin/edit/homepage', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            if (!res.ok) throw new Error('Failed to update content');
            alert('Homepage content updated!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Homepage</h1>

            {isEditing ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                }} className="space-y-4">
                    <div>
                        <label className="font-bold">Hero Title</label>
                        <input
                            name="heroTitle"
                            value={content.heroTitle}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="font-bold">Hero Subtitle</label>
                        <input
                            name="heroSubtitle"
                            value={content.heroSubtitle}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="font-bold">About Text</label>
                        <textarea
                            name="aboutText"
                            value={content.aboutText}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="font-bold">Contact CTA</label>
                        <input
                            name="contactCTA"
                            value={content.contactCTA}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                        <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <p><strong>Hero Title:</strong> {content.heroTitle}</p>
                    <p><strong>Hero Subtitle:</strong> {content.heroSubtitle}</p>
                    <p><strong>About Text:</strong> {content.aboutText}</p>
                    <p><strong>Contact CTA:</strong> {content.contactCTA}</p>
                    <button onClick={() => setIsEditing(true)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                </div>
            )}
        </div>
    );
}
