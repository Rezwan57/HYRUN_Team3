import { db } from "../../../../lib/db.js";



export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM users'); 
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: 'Database error', details: error }, { status: 500 });
  }
}