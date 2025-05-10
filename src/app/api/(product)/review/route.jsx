import db from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.product_id || !body.user_email || !body.review || !body.rating) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await db.execute(
      'INSERT INTO reviews (product_id, user_email, review, rating, created_at) VALUES (?, ?, ?, ?, NOW())',
      [body.product_id, body.user_email, body.review, body.rating]
    );

    return NextResponse.json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const [reviews] = await db.execute(
      `SELECT r.user_email, CONCAT(u.first_name, ' ', u.last_name) AS name, r.review, r.rating, r.created_at
       FROM reviews r
       JOIN users u ON r.user_email = u.user_email
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC`,
      [productId]
    );

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

