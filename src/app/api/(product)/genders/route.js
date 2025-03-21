import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Gender is required" }, { status: 400 });
    }

    await db.execute("INSERT INTO genders (name) VALUES (?)", [name]);

    return NextResponse.json({ message: "Gender added successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM genders");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

