import  db   from "../../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { firstName, lastName, user_email, user_password } = await req.json();

    if (!firstName || !lastName || !user_email || !user_password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const [existingUser] = await db.query("SELECT * FROM admins WHERE user_email = ?", [user_email]);

    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ error: "Email already in use!" }), { status: 409 });
    }
// Encrtipting the password
    const encyptedPass = await bcrypt.hash(user_password, 10);

    await db.query(
      "INSERT INTO admins (first_name, last_name, user_email, user_password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, user_email, encyptedPass]
    );

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Server error. Please try again later." }), { status: 500 });
  }
}
