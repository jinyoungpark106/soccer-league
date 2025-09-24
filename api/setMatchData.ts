import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/matches",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({error1: await response.text()});
    }

    const data = await response.json();

    if (!data?.matches?.length) {
      return res.status(204).json({ message: "No match data to save" });
    }

    const matchData = {detail: data, updated: new Date()};

    if (matchData.detail.matches && matchData.detail.matches.length > 0) {
      const docRef = db.collection("premier-league")
        .doc("2025-2026")
        .collection("matches")
        .doc("match");

      const cleanData = JSON.parse(JSON.stringify(matchData));
      await docRef.set(cleanData);

      return res.status(200).json({ message: "Data saved successfully" });
    } else {
      return res.status(204).json({ message: "No match data to save" });
    }
  } catch (error) {
    console.error("Error saving matches:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
