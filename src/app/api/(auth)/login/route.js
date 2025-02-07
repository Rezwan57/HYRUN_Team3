import db from "../../../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; 

export async function POST(req) {
  try {
    const { user_email, user_password } = await req.json();

    if (!user_email || !user_password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const [existingUser] = await db.query("SELECT * FROM users WHERE user_email = ?", [user_email]);

    if (existingUser.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid credentials!" }), { status: 401 });
    }

    const user = existingUser[0];

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials!" }), { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, email: user.user_email }, JWT_SECRET, { expiresIn: "7d" });

    return new Response(JSON.stringify({ message: "Login successful!", token }), { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Server error. Please try again later." }), { status: 500 });
  }
}
