import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const teamMap = {
      arsenal: 57,
      aston_villa: 58,
      bournemouth: 1044,
      brentford: 402,
      brighton: 397,
      burnley: 328,
      chelsea: 61,
      crystal_palace: 354,
      everton: 62,
      fulham: 63,
      leeds: 341,
      liverpool: 64,
      man_city: 65,
      man_utd: 66,
      newcastle: 67,
      nottm_forest: 351,
      sunderland: 71,
      tottenham: 73,
      west_ham: 563,
      wolves: 76,
    };

    Object.entries(teamMap).map(async ([team, id]) => {
      console.log("key:", team, "value:", id);
      const response = await fetch(
        `https://api.football-data.org/v4/teams/${id}/matches`,
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

      if (matchData.detail && matchData.detail.matches?.length > 0) {
        const docRef = db.collection("premier-league")
          .doc("2025-2026")
          .collection("team")
          .doc(team);

        const cleanData = JSON.parse(JSON.stringify(matchData));
        await docRef.set(cleanData);

        return res.status(200).json({ message: "Data saved successfully" });
      } else {
        return res.status(204).json({ message: "No match data to save" });
      }
    });
  } catch (error) {
    console.error("Error saving matches:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
