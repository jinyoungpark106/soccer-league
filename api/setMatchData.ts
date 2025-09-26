import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchFromAPI, setFirestoreData, handleError } from "./firebaseHelper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const data = await fetchFromAPI("https://api.football-data.org/v4/competitions/PL/matches");

    if (!data?.matches?.length) {
      return res.status(204).json({ message: "No match data to save" });
    }

    const matchData = { matchData: data, matchUpdated: new Date() };
    await setFirestoreData(["premier-league", "2025-2026", "matches", "match"], matchData);

    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    return handleError(res, error);
  }
}
