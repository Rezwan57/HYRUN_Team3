import { NextResponse } from "next/server";
import db from "../../../../lib/db.js";

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM products'); 
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Database error', details: error }, { status: 500 });
    }
}