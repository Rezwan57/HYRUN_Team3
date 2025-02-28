import db from "../../../../../lib/db";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Validate if productId is a valid number
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
    }

    console.log(`Fetching sizes for product_id: ${productId}`);

    // Check if the product exists before fetching sizes
    const [productExists] = await db.query(`SELECT product_id FROM products WHERE product_id = ?`, [productId]);

    if (productExists.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Fetch sizes associated with the product
    const [rows] = await db.query(
      `SELECT s.size_id, s.uk_size, s.us_size, s.eu_size
       FROM product_size ps 
       JOIN sizes s ON ps.size_id = s.size_id 
       WHERE ps.product_id = ?`,
      [productId]
    );

    console.log(`sizes found:`, rows);

    return NextResponse.json(rows.length > 0 ? rows : []);
  } catch (error) {
    console.error("Database Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

