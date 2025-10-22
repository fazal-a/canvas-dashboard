// pages/api/assemblyToken.ts
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({error: "Missing AssemblyAI API key"});
    }

    const response = await fetch("https://api.assemblyai.com/v2/realtime/token", {
        method: "POST",
        headers: {
            authorization: API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({expires_in: 3600}), // 1 hour
    });

    const data = await response.json();
    res.status(200).json(data);
}
