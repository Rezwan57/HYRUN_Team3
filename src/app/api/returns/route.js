import db from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.formData();
    const orderId = data.get("orderId");
    const email = data.get("email");
    const reason = data.get("reason");

    if (!orderId || !email || !reason) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db.query(
      "INSERT INTO returns (order_id, email, reason) VALUES (?, ?, ?)",
      [orderId, email, reason]
    );

    return new Response(
      JSON.stringify({ message: "Return request submitted successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error submitting return:", err);
    return new Response(
      JSON.stringify({ error: "Failed to submit return request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM returns ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching returns:", error);
    return NextResponse.json({ error: "Failed to fetch returns" }, { status: 500 });
  }
}
