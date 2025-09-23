import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./firebaseAdmin";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    let data = {standings: [{table: []}]}, standingData = {detail: [], updated: null};
    try {
      const response = await fetch(
        "https://api.football-data.org/v4/competitions/PL/standings",
        {
          headers: {
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        return res.status(response.status).json({error1: await response.text()});
      }

      data = await response.json();

      if (data?.standings?.length > 0) {
        standingData = {detail: data.standings[0].table, updated: new Date()};
        // res.status(200).json({message: "Football data called successfully"});
      }
    } catch (error) {
      res.status(500).json({error2: error.message});
    }

    try {
      if (standingData.detail && standingData.detail.length > 0) {
        const docRef = db.collection("premier-league")
          .doc("2025-2026")
          .collection("standings")
          .doc("table");

        const cleanData = JSON.parse(JSON.stringify(standingData));
        await docRef.set(cleanData);

        return res.status(200).json({ message: "Data saved successfully" });
      } else {
        return res.status(204).json({ message: "No standings data to save" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({error3: err});
    }
  } catch (outerError) {
    console.error('error4: ', outerError);
  }
}
