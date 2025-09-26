import { db } from "./firebaseAdmin.js";
import type { VercelResponse } from "@vercel/node";

export async function fetchFromAPI(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${await response.text()}`);
  }

  return response.json();
}

export async function setFirestoreData(
  path: string[],
  data: any
): Promise<void> {
  let ref: any = db;
  path.forEach((segment, idx) => {
    if (idx % 2 === 0) {
      ref = ref.collection(segment);
    } else {
      ref = ref.doc(segment);
    }
  });

  const cleanData = JSON.parse(JSON.stringify(data));
  await ref.set(cleanData);
}

export async function getFirestoreData(
  collectionPath: string[],
  res: VercelResponse
) {
  try {
    let ref: any = db;
    for (let i = 0; i < collectionPath.length; i++) {
      if (!collectionPath[i]) continue;
      if (i % 2 === 0) {
        ref = ref.collection(collectionPath[i]);
      } else {
        ref = ref.doc(collectionPath[i]);
      }
    }

    const docSnap = await ref.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Document not found" });
    }

    const data = docSnap.data();
    res.status(200).json(data);
  } catch (error) {
    console.error("Firebase fetch error:", error.message);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}

export function setCORSHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://football-league-info.web.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function handleError(res: VercelResponse, error: any) {
  console.error("Error:", error);
  return res.status(500).json({
    message: "Internal Server Error",
    error: error.message || error.toString(),
  });
}
