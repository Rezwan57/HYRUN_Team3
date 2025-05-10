import { NextResponse } from 'next/server';
import db from "../../../../../../lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params; // Get product_id from URL
    const body = await request.json();
    const [result] = await db.execute(
      'UPDATE homepage_products SET name = ?, brand = ?, shortDescription = ?, price = ? WHERE id = ?',
      [
        body.name,
        body.brand,
        body.shortDescription,
        body.price,
        id,
      ]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product updated' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // Get product_id from URL
    const [result] = await db.execute('DELETE FROM homepage_products WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
