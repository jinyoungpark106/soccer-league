import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchFromAPI, setFirestoreData, handleError } from "./firebaseHelper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const teamMap: Record<string, number> = {
      ARS: 57, AVL: 58, BOU: 1044, BRE: 402, BHA: 397, BUR: 328,
      CHE: 61, CRY: 354, EVE: 62, FUL: 63, LEE: 341, LIV: 64,
      MCI: 65, MUN: 66, NEW: 67, NOT: 351, SUN: 71, TOT: 73,
      WHU: 563, WOL: 76,
    };

    const promises = Object.entries(teamMap).map(async ([team, id]) => {
      const data = await fetchFromAPI(`https://api.football-data.org/v4/teams/${id}/matches`);

      if (!data?.matches?.length) {
        throw new Error(`No matches for ${team}`);
      }

      const matchData = { matchData: data, matchUpdated: new Date() };
      await setFirestoreData(["premier-league", "2025-2026", "teamMatches", team], matchData);
      return team;
    });

    const results = await Promise.allSettled(promises);

    const successCount = results.filter(r => r.status === "fulfilled").length;
    const failedTeams = results
      .filter(r => r.status === "rejected")
      .map(r => (r as PromiseRejectedResult).reason);

    if (failedTeams.length > 0) {
      console.warn("Some teams failed:", failedTeams);
    }

    return res.status(200).json({
      message: "Team match data saved successfully",
      successCount,
      failCount: failedTeams.length,
    });
  } catch (error) {
    return handleError(res, error);
  }
}
