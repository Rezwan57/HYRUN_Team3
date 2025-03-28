import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("product_id");

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
    }

    console.log(`Fetching category for product_id: ${productId}`);

    // Fetch category directly from the products table
    const [rows] = await db.query(
      `SELECT c.category_id, c.category_name 
       FROM products p
       JOIN categories g ON p.category_id = c.category_id
       WHERE p.product_id = ?`,
      [productId]
    );

    console.log("category found:", rows);

    return NextResponse.json(rows.length > 0 ? rows[0] : { error: "category not found" });

  } catch (error) {
    console.error("Database Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
