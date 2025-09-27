import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchFromAPI, setFirestoreData, handleError } from "./firebaseHelper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const data = await fetchFromAPI("https://api.football-data.org/v4/competitions/PL/teams");

    if (!data?.teams?.length) {
      return res.status(204).json({ message: "No team data to save" });
    }

    const teamData = { teamData: data, teamUpdated: new Date() };
    await setFirestoreData(["premier-league", "2025-2026", "teams", "team"], teamData);

    return res.status(200).json({ message: "Team data saved successfully" });
  } catch (error) {
    return handleError(res, error);
  }
}
