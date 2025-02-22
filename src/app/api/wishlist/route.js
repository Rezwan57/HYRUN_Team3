import db from '../../../../lib/db';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addToWishlist(req, res);
        case 'DELETE':
            return removeFromWishlist(req, res);
        default:
            return res.status(405).end(); 
    }
}

async function addToWishlist(req, res) {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [result] = await db.execute(
            "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
            [userId, productId]
        );
        return res.status(200).json({ message: "Item added to wishlist successfully!" });
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database error. Please try again later." });
    }
}

async function removeFromWishlist(req, res) {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [result] = await db.execute(
            "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );
        return res.status(200).json({ message: "Item removed from wishlist successfully!" });
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database error. Please try again later." });
    }
}
