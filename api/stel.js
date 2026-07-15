// api/stel.js — Proxy para Stel Order API
export const config = { api: { bodyParser: true } };
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  const STEL_API_KEY = process.env.STEL_API_KEY;
  const STEL_BASE = "https://app.stelorder.com/app";
  if (!STEL_API_KEY) {
    return res.status(500).json({ error: "STEL_API_KEY no configurada en variables de entorno" });
  }
  try {
    // Parsear body manualmente si no viene parseado
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    if (!body) body = {};
    const { endpoint, method = "GET", body: reqBody } = body;
    if (!endpoint) {
      return res.status(400).json({
        error: "Falta endpoint",
        received_body: JSON.stringify(body).substring(0, 200)
      });
    }
    const url = `${STEL_BASE}/${endpoint}`;
    const options = {
      method,
      headers: {
        "APIKEY": STEL_API_KEY,
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json",
        "Accept-Charset": "UTF-8",
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
