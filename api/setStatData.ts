import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchFromAPI, setFirestoreData, handleError } from "./firebaseHelper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const data = await fetchFromAPI("https://api.football-data.org/v4/competitions/PL/scorers");

    if (!data?.scorers?.length) {
      return res.status(204).json({ message: "No stat data to save" });
    }

    const statData = { statData: data, statUpdated: new Date() };
    await setFirestoreData(["premier-league", "2025-2026", "stats", "stat"], statData);

    return res.status(200).json({ message: "Stat data saved successfully" });
  } catch (error) {
    return handleError(res, error);
  }
}
