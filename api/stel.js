// api/stel.js — Proxy para Stel Order API
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://appcierretrabajos.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-AUTH-TOKEN");

  if (req.method === "OPTIONS") return res.status(200).end();

  const STEL_API_KEY = "256JhK74OuI3kji9tpRLpngRHCSiPdTP66cvAuxx";
  const STEL_BASE = "https://app.stelorder.com/app";

  try {
    // El endpoint y params vienen en el body o query
    const { endpoint, method = "GET", body: reqBody } = req.body || {};

    if (!endpoint) return res.status(400).json({ error: "Falta el parámetro endpoint" });

    const url = `${STEL_BASE}/${endpoint}`;
    const options = {
      method,
      headers: {
        "X-AUTH-TOKEN": STEL_API_KEY,
        "Content-Type": "application/json",
      },
    };
    if (reqBody && method !== "GET") {
      options.body = JSON.stringify(reqBody);
    }

    const stelResp = await fetch(url, options);
    const text = await stelResp.text();

    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    return res.status(stelResp.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
