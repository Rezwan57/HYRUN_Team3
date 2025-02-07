import db from "../../../../../lib/db";
import bcrypt from "bcryptjs";

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

    const userData = {
      id: user.id,
      email: user.user_email,
      name: user.user_name,
    };

    return new Response(JSON.stringify({ message: "Login successful!", user: userData }), { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ error: "Server error. Please try again later." }), { status: 500 });
  }
}
