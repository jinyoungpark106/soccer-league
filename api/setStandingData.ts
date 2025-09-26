import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchFromAPI, setFirestoreData, handleError } from "./firebaseHelper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const data = await fetchFromAPI("https://api.football-data.org/v4/competitions/PL/standings");

    if (!data?.standings?.length) {
      return res.status(204).json({ message: "No standings data to save" });
    }

    const standingData = { standingData: data.standings[0].table, standingUpdated: new Date() };
    await setFirestoreData(["premier-league", "2025-2026", "standings", "standing"], standingData);

    return res.status(200).json({ message: "Standing data saved successfully" });
  } catch (error) {
    return handleError(res, error);
  }
}
