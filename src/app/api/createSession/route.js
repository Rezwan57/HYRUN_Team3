import dbConnection from "../../../../lib/database.js";
import { NextResponse } from "next/server.js";



//GET Data
export async function GET() {
    try {
        const db = await dbConnection();
        const [rows] = await db.execute("SELECT * FROM users");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    const body = await request.json();
    const email = body.user_email;
    const password = body.user_password;

    const connection = await dbConnection();

    const [rows] = await connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

    if (rows.length > 0) {
        const user = rows[0];
        return new Response(JSON.stringify(user), { status: 200 });
    } else {
        return new Response(null, { status: 401 });
    }
}

