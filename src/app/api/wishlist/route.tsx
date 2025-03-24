import db from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();
    if (!userId || !productId) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    await db.execute("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)", [userId, productId]);

    return new Response(JSON.stringify({ message: "Item added to wishlist successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Database error. Please try again later." }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, productId } = await req.json();
    if (!userId || !productId) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    await db.execute("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?", [userId, productId]);

    return new Response(JSON.stringify({ message: "Item removed from wishlist successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: "Database error. Please try again later." }), { status: 500 });
  }
}
