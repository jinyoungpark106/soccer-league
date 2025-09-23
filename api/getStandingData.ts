import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from "./firebaseAdmin";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const docRef = db.collection("premier-league")
    .doc("2025-2026")
    .collection("standings")
    .doc("table");

  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return res.status(404).json({ error: "Document not found" });
  }

  const data = docSnap.data();
  const detail = data?.detail;
  res.status(200).json({ detail });

}