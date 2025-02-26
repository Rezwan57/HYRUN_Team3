import db from "../../../../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");

  if (!productId) {
    return new Response("Product ID is required", { status: 400 });
  }

  try {
    const [rows] = await db.query(
      "SELECT image FROM product_images WHERE product_id = ? LIMIT 1",
      [productId]
    );

    if (rows.length === 0) {
      return new Response("Image not found", { status: 404 });
    }

    const image = rows[0].image;

    return new Response(image, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    console.error("Error fetching product image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
