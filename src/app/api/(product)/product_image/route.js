import db from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id");
  const all = searchParams.get("all") === "true";

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const query = "SELECT image FROM product_images WHERE product_id = ?";
    const [rows] = await db.query(query, [productId]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (all) {
      const imageBuffers = rows.map(row => Buffer.from(row.image));
      const base64Images = imageBuffers.map(buffer => `data:image/jpeg;base64,${buffer.toString("base64")}`);
      return NextResponse.json(base64Images, { status: 200 });
    } else {
      const imageBuffer = Buffer.from(rows[0].image);
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Length": imageBuffer.length.toString(),
        },
      });
    }
  } catch (error) {
    console.error("Error fetching product image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}