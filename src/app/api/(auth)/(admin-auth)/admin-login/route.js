import db from "../../../../../../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    const [existingUser] = await db.query(
      "SELECT first_name, last_name, password FROM admins WHERE username = ?",
      [username]
    );

    if (!existingUser || existingUser.length === 0) {
      return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
    }

    const user = existingUser[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Login successful!",
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: username, 
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
