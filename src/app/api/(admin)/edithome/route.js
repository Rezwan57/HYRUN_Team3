import { NextResponse } from 'next/server';
import db from "../../../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, name, brand, shortDescription, price, image FROM homepage_products");
    
    const sneakers = rows.map((row) => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      shortDescription: row.shortDescription,
      price: row.price,
      image: `data:image/png;base64,${row.image.toString("base64")}`,
    }));

    return new Response(JSON.stringify(sneakers), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error", error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const brand = formData.get('brand');
    const shortDescription = formData.get('shortDescription');
    const price = formData.get('price');
    const image = formData.get('image');

    if (!image) {
      console.error('No image found');
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Parsed data:', { name, brand, shortDescription, price, imageName: image.name });
    console.log('Image buffer size:', buffer.length);

    const [result] = await db.query(
      'INSERT INTO homepage_products (name, brand, shortDescription, image, price) VALUES (?, ?, ?, ?, ?)',
      [name, brand, shortDescription, buffer, price]
    );

    console.log('DB insert success:', result);

    return NextResponse.json({ message: 'Product uploaded successfully', result });
  } catch (error) {
    console.error('Upload failed:', error.message);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}