"use client";
import { NextApiResponse, NextApiRequest } from 'next';
import db from '../../../lib/db'; // Adjust the path as needed

async function getContactInfo(req, res) {
    try {
        const result = await db.query("SELECT info FROM contact WHERE id = 1"); // Assuming there's a single row for contact info
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Failed to get contact info:", error);
        res.status(500).json({ error: "Database error while fetching contact info" });
    }
}

async function updateContactInfo(req, res) {
    const { info } = req.body;
    try {
        const result = await db.query("UPDATE contact SET info = ? WHERE id = 1", [info]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Contact info not found" });
        }
        res.status(200).json({ message: "Contact info updated successfully" });
    } catch (error) {
        console.error("Failed to update contact info:", error);
        res.status(500).json({ error: "Database error while updating contact info" });
    }
}

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getContactInfo(req, res);
        case 'PUT':
            return updateContactInfo(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
