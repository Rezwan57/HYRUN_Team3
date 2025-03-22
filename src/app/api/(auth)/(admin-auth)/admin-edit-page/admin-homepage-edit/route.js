"use client";
import { NextApiResponse, NextApiRequest } from 'next';
import db from '../../../lib/db'; 

export async function GET() {
    try {
        const result = await db.query('SELECT content FROM homepage LIMIT 1');
        return NextResponse.json({ content: result[0]?.content || '' });
    } catch (error) {
        console.error('Error fetching homepage content:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { content } = await req.json();
        await db.query('UPDATE homepage SET content = ? WHERE id = 1', [content]);
        return NextResponse.json({ message: 'Content updated successfully' });
    } catch (error) {
        console.error('Error updating homepage content:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
