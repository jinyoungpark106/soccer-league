import type { VercelRequest, VercelResponse } from "@vercel/node";
import {getFirestoreData, handleError, setCORSHeaders} from "./firebaseHelper.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    setCORSHeaders(res);
    const {teamCode} = req.query as { teamCode?: string };
    await getFirestoreData(["premier-league", "2025-2026", "teams", teamCode ?? ""], res);
  } catch (error) {
    return handleError(res, error);
  }
}
