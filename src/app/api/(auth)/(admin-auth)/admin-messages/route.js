import { NextResponse } from "next/server";
import db from "../../../../../lib/db";  

export async function POST(req) {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const [result] = await db.query(
            "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
            [name, email, message]
        );

        const messageId = result.insertId;

        return new Response(JSON.stringify({ message: "Message received successfully!", id: messageId }), { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM messages ORDER BY id DESC');
        return NextResponse.json(rows);
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error', details: error }), { status: 500 });
    }
}
