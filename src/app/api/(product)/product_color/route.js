import db from "../../../../../lib/db";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("product_id");

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
    }

    console.log(`Fetching colors for product_id: ${productId}`);

    const [productExists] = await db.query(`SELECT product_id FROM products WHERE product_id = ?`, [productId]);

    if (productExists.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    const [rows] = await db.query(
      `SELECT c.color_id, c.color_name, c.hex_code 
       FROM product_color pc 
       JOIN colors c ON pc.color_id = c.color_id 
       WHERE pc.product_id = ?`,
      [productId]
    );

    console.log(`Colors found:`, rows);

    return NextResponse.json(rows.length > 0 ? rows : []);
  } catch (error) {
    console.error("Database Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

