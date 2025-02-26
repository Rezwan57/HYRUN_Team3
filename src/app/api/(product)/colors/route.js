import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET(request) {
  try {
    const [rows] = await db.execute("SELECT * FROM colors");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const [result] = await db.execute("INSERT INTO colors SET ?", data);
    return NextResponse.json({ id: result.insertId, ...data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
