import db from '../../../../lib/db';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    return new Response(JSON.stringify({ message: "Message sent successfully!" }), { status: 200 });

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Database error. Please try again later." }), { status: 500 });
  }
}

