import db from "../../../../../../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { firstName, lastName, username, password } = await req.json();

    if (!firstName || !lastName || !username || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const [existingAdmin] = await db.query("SELECT * FROM admins WHERE username = ?", [username]);

    if (existingAdmin.length > 0) {
      return NextResponse.json({ error: "Username already in use!" }, { status: 409 });
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO admins (first_name, last_name, username, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, username, encryptedPass]
    );

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Admin Signup Error:", error);
    return NextResponse.json({ error: error.message || "Server error. Please try again later." }, { status: 500 });
  }
}
