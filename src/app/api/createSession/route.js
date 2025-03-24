export async function GET(request) {
  try {
    const session = await request.session();
    const users = await db.query("SELECT id, first_name, last_name, user_email FROM users");
    session.users = users;
    await session.save();
    return NextResponse.json({ message: "Session created" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
