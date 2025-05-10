import db from "../../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { user_email, user_password } = await req.json();

    console.log("Received login request:", { user_email, user_password });

    if (!user_email || !user_password) {
      console.log("Error: Missing fields");
      return new Response(JSON.stringify({ error: "All fields are required!" }), { status: 400 });
    }

    const [existingUser] = await db.query(
      "SELECT first_name, last_name, user_email, user_password FROM users WHERE user_email = ?",
      [user_email]
    );

    console.log("User query result:", existingUser);

    if (!existingUser || existingUser.length === 0) {
      console.log("Error: Invalid credentials (user not found)");
      return new Response(JSON.stringify({ error: "Invalid credentials!" }), { status: 401 });
    }

    const user = existingUser[0];

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    console.log("Password match status:", isMatch);

    if (!isMatch) {
      console.log("Error: Invalid credentials (password mismatch)");
      return new Response(JSON.stringify({ error: "Invalid credentials!" }), { status: 401 });
    }

    return new Response(
      JSON.stringify({
        message: "Login successful!",
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.user_email,
        },
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ error: "Server error. Please try again later." }), { status: 500 });
  }
}
