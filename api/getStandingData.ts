import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from "./firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const docRef = db.collection("premier-league")
      .doc("2025-2026")
      .collection("standings")
      .doc("table");

    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({error: "Document not found"});
    }

    const data = docSnap.data();
    const detail = Array.isArray(data?.detail) ? data.detail : [];

    res.status(200).json({detail});
    // res.status(200).send(JSON.stringify(detail));
  } catch (error) {
    console.error("Firebase fetch error:", error.message);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}