// api/stel.js — Proxy para Stel Order API
export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const STEL_API_KEY = process.env.STEL_API_KEY;
  const STEL_BASE = "https://app.stelorder.com/app";

  try {
    const { endpoint, method = "GET", body: reqBody } = req.body || {};

    if (!endpoint) return res.status(400).json({ error: "Falta endpoint" });

    const url = `${STEL_BASE}/${endpoint}`;
    const options = {
      method,
      headers: {
        "X-AUTH-TOKEN": STEL_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    };

    if (reqBody && method !== "GET") {
      options.body = JSON.stringify(reqBody);
    }

    const stelResp = await fetch(url, options);
    const text = await stelResp.text();

    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    return res.status(stelResp.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
