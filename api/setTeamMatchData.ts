import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const teamMap: Record<string, number> = {
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

    // 각 팀별 fetch Promise 생성
    const promises = Object.entries(teamMap).map(async ([team, id]) => {
      const response = await fetch(
        `https://api.football-data.org/v4/teams/${id}/matches`,
        {
          headers: {
            "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error for ${team}: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.matches?.length) {
        throw new Error(`No matches for ${team}`);
      }

      // Firebase 저장용 데이터
      const matchData = { detail: data, updated: new Date() };
      const cleanData = JSON.parse(JSON.stringify(matchData));

      return { team, cleanData };
    });

    const results = await Promise.allSettled(promises);

    const savePromises = results
      .filter((r): r is PromiseFulfilledResult<{ team: string; cleanData: any }> => r.status === "fulfilled")
      .map(({ value }) => {
        const docRef = db
          .collection("premier-league")
          .doc("2025-2026")
          .collection("team")
          .doc(value.team);

        return docRef.set(value.cleanData);
      });

    await Promise.all(savePromises);

    const failedTeams = results
      .filter((r) => r.status === "rejected")
      .map((r) => (r as PromiseRejectedResult).reason);

    if (failedTeams.length > 0) {
      console.warn("Some teams failed:", failedTeams);
    }

    return res.status(200).json({
      message: "Data saved successfully",
      successCount: savePromises.length,
      failCount: failedTeams.length,
    });
  } catch (error) {
    console.error("Error saving matches:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}
