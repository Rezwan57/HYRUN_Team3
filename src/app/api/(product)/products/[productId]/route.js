import db from "../../../../../../lib/db";

export async function PUT(request, { params }) {
  const { productId } = params;

  try {
    const body = await request.json();

    await db.query(
      `UPDATE products
       SET name = ?, selling_price = ?, stock_quantity = ?
       WHERE product_id = ?`,
      [body.name, body.selling_price, body.stock_quantity, productId]
    );

    return new Response(JSON.stringify({ message: "Product updated successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { productId } = params;

  try {
    await db.query("DELETE FROM products WHERE product_id = ?", [productId]);
    return new Response(JSON.stringify({ message: "Product deleted successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}