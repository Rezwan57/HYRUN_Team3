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

    // Validate input data
    if (!body.customer_name || !body.customer_email || !body.cart || body.cart.length === 0 || !body.total_amount) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // Start a transaction to ensure data consistency
    await db.query('START TRANSACTION');

    // Generate custom order_id
    const orderId = await generateOrderId(db);

    // Insert into orders table with custom order_id
    await db.execute(
      'INSERT INTO orders (order_id, customer_name, customer_email, order_date, status, total_amount) VALUES (?, ?, ?, NOW(), ?, ?)',
      [
        orderId,
        body.customer_name,
        body.customer_email,
        body.status || 'Pending',
        body.total_amount,
      ]
    );

    // Prepare order items for batch insertion
    const orderItems = body.cart.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.selling_price,
    ]);

    // Insert into order_items table
    await db.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ?',
      [orderItems]
    );

    // Commit the transaction
    await db.query('COMMIT');

    return NextResponse.json({ order_id: orderId, message: 'Order created' });
  } catch (error) {
    // Rollback the transaction in case of error
    await db.query('ROLLBACK');
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}