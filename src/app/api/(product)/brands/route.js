import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM brands");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await db.execute("INSERT INTO brands (name) VALUES (?)", [name]);

    return NextResponse.json({ message: "Brand added successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
