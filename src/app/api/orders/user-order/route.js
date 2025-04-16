import db from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Fetch orders for the given email
    const [orders] = await db.execute(
      `SELECT o.order_id, o.order_date, o.status, o.total_amount,
              JSON_ARRAYAGG(JSON_OBJECT(
                'product_id', oi.product_id,
                'product_name', p.name,
                'quantity', oi.quantity,
                'price_at_time', oi.price_at_time
              )) AS items
       FROM orders o
       JOIN order_items oi ON o.order_id = oi.order_id
       JOIN products p ON oi.product_id = p.product_id
       WHERE o.customer_email = ?
       GROUP BY o.order_id`,
      [email]
    );

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}