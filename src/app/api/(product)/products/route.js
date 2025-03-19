import { NextResponse } from "next/server";
import db from "../../../../../lib/db";


export async function POST(req) {
  try {
    const formData = await req.formData();

    const slug = formData.get("slug");
    const name = formData.get("name");
    const description = formData.get("description");
    const category_id = formData.get("category_id");
    const brand_id = formData.get("brand_id");
    const gender_id = formData.get("gender_id");
    const buying_price = parseFloat(formData.get("buying_price"));
    const selling_price = parseFloat(formData.get("selling_price"));
    const stock_quantity = parseInt(formData.get("stock_quantity"));

    const size_ids = formData.getAll("size_id[]");
    const color_ids = formData.getAll("color_id[]"); 
    const images = formData.getAll("images[]");

    if (!slug || !name || !category_id || !brand_id || !gender_id || !selling_price) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO products (slug, name, description, category_id, brand_id, gender_id, buying_price, selling_price, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [slug, name, description, category_id, brand_id, gender_id, buying_price, selling_price, stock_quantity]
    );

    const productId = result.insertId;

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      await db.query("INSERT INTO product_images (product_id, image) VALUES (?, ?)", [productId, Buffer.from(imageBuffer)]);
    }
    
    for (const size of size_ids) {
      await db.query("INSERT INTO product_size (product_id, size_id) VALUES (?, ?)", [productId, size]);
    }

    for (const color of color_ids) {
      await db.query("INSERT INTO product_color (product_id, color_id) VALUES (?, ?)", [productId, color]);
    }

    return new Response(JSON.stringify({ message: "Product added successfully!" }), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const query = "SELECT * FROM products WHERE slug = ?";
      const [rows] = await db.query(query, [slug]);
      console.log('Database query result for slug', slug, ':', rows);

      if (rows.length === 0) {
        return NextResponse.json([], { status: 200 });
      }
      return NextResponse.json(rows, { status: 200 });
    } else {
      const query = "SELECT * FROM products";
      const [rows] = await db.query(query);
      console.log('Fetched all products:', rows);
      return NextResponse.json(rows, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}