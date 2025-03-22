"use client";
import { NextApiResponse, NextApiRequest } from 'next';
import db from '../../../lib/db'; 

async function getMessages(req, res) {
    try {
        const result = await db.query("SELECT * FROM messages ORDER BY id DESC");
        res.status(200).json(result);
    } catch (error) {
        console.error("Failed to get messages:", error);
        res.status(500).json({ error: "Database error while fetching messages" });
    }
}

async function addMessage(req, res) {
    const { name, email, message } = req.body;
    try {
        const result = await db.query("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)", [name, email, message]);
        res.status(200).json({ message: "Message added successfully", id: result.insertId });
    } catch (error) {
        console.error("Failed to add message:", error);
        res.status(500).json({ error: "Database error while adding message" });
    }
}

async function resolveMessage(req, res) {
    const { id } = req.query;
    try {
        const result = await db.query("UPDATE messages SET resolved = TRUE WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.status(200).json({ message: "Message resolved successfully" });
    } catch (error) {
        console.error("Failed to resolve message:", error);
        res.status(500).json({ error: "Database error while resolving message" });
    }
}

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getMessages(req, res);
        case 'POST':
            if (req.body.resolve) {
                return resolveMessage(req, res);
            } else {
                return addMessage(req, res);
            }
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
