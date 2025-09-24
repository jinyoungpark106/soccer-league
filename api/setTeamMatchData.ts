import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const teamMap = {
      ARS: 57,
      AVL: 58,
      BOU: 1044,
      BRE: 402,
      BHA: 397,
      BUR: 328,
      CHE: 61,
      CRY: 354,
      EVE: 62,
      FUL: 63,
      LEE: 341,
      LIV: 64,
      MCI: 65,
      MUN: 66,
      NEW: 67,
      NOT: 351,
      SUN: 71,
      TOT: 73,
      WHU: 563,
      WOL: 76,
    };

    Object.entries(teamMap).map(([team, id]) => {
      setTimeout(async () => {
        const response = await fetch(
          `https://api.football-data.org/v4/teams/${id}/matches`,
          {
            headers: {
              "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
            },
          }
        );

        if (!response.ok) {
          console.log('team1: ', team);
          throw new Error(`API error for ${team}: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.matches?.length) {
          return;
        }

        const matchData = {detail: data, updated: new Date()};
        const cleanData = JSON.parse(JSON.stringify(matchData));

        const docRef = db.collection("premier-league")
          .doc("2025-2026")
          .collection("team")
          .doc(team);

        await docRef.set(cleanData);
      }, 100);
    });
    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving matches:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
