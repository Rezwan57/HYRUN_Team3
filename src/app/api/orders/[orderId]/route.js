import db from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { orderId } = params;

  try {
    // Fetch order details
    const [orderRows] = await db.execute(
      'SELECT order_id, customer_name, customer_email, order_date, status, total_amount FROM orders WHERE order_id = ?',
      [orderId]
    );

    if (orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRows[0];

    // Fetch order items
    const [itemRows] = await db.execute(
      `SELECT oi.order_item_id, oi.product_id, oi.quantity, oi.price_at_time, p.name
       FROM order_items oi
       JOIN products p ON oi.product_id = p.product_id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    // Format order data
    const orderData = {
      id: order.order_id,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      order_date: order.order_date,
      status: order.status,
      total_amount: order.total_amount,
      items: itemRows.map(item => ({
        id: item.order_item_id,
        product_id: item.product_id,
        name: item.name,
        price: item.price_at_time,
        quantity: item.quantity,
        image: `/api/product_image?product_id=${item.product_id}`,
      })),
    };

    return NextResponse.json(orderData);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}