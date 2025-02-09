import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const [result] = await db.execute(
        "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
        [name, email, message]
      );
      res
        .status(201)
        .json({ message: "Message received!", id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
