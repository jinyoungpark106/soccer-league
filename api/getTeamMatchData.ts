import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from "./firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // const teamId = req.teamId;
  try {
    const docRef = db.collection("premier-league")
      .doc("2025-2026")
      .collection("team")
      .doc('liverpool');

    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({error: "Document not found"});
    }

    const data = docSnap.data();
    // const detail = data.detail;

    // res.status(200).json({data});
    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error("Firebase fetch error:", error.message);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}