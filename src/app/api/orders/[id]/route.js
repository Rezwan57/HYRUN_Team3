import db from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = params; // Get order_id from URL
    const body = await request.json();
    const [result] = await db.execute(
      'UPDATE orders SET customer_name = ?, customer_email = ?, status = ?, total_amount = ? WHERE order_id = ?',
      [
        body.customer_name,
        body.customer_email,
        body.status,
        body.total_amount,
        id,
      ]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order updated' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // Get order_id from URL
    // First delete related order_items due to foreign key constraint
    await db.execute('DELETE FROM order_items WHERE order_id = ?', [id]);
    const [result] = await db.execute('DELETE FROM orders WHERE order_id = ?', [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}