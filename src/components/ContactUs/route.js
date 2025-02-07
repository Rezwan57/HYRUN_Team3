import { createConnection } from './your-database-connection-file';  // Import your database connection setup
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Establish database connection
    const db = await createConnection();
    
    // Parse the incoming JSON request body
    const body = await req.json();
    const { name, email, message } = body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Insert data into the MySQL database (contacts table)
    await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    // Send a success response
    return NextResponse.json({ message: "Thank you for your message!" }, { status: 201 });

  } catch (error) {
    // Handle errors and send error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
