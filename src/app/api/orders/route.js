import db from '../../../../lib/db';
import { NextResponse } from 'next/server';

async function generateOrderId(db) {
  const [rows] = await db.execute('SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1');
  if (rows.length === 0) return 'HY00001';
  const lastId = rows[0].order_id;
  const number = parseInt(lastId.replace('HY', ''), 10); 
  const newNumber = number + 1;
  return `HY${String(newNumber).padStart(5, '0')}`;
}

export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM orders');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const orderId = await generateOrderId(db);
    const [result] = await db.execute(
      'INSERT INTO orders (order_id, customer_name, customer_email, order_date, status, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
      [
        orderId,
        body.customer_name,
        body.customer_email,
        new Date().toISOString(),
        body.status || 'Pending',
        body.total_amount,
      ]
    );
    return NextResponse.json({ order_id: orderId, message: 'Order created' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}