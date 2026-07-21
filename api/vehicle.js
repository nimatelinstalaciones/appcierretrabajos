// api/vehicle.js — V2.0 · Módulo Control de Vehículos (Nimatel Check App)
//
// Acciones (POST { action, ... }):
//   itv-get        → lee itv_config.json de la carpeta "Control de Vehículos" en Drive
//   itv-set        → crea/actualiza la fecha de ITV de una matrícula en itv_config.json
//   upload-session → crea una sesión de subida reanudable en Drive y devuelve la URL
//                    (el navegador sube el PDF directamente a Google, sin límite de 4,5 MB)
//   send-mail      → descarga el PDF de Drive y envía el aviso de anomalías por Gmail
//
// Usa la cuenta nimatelinstalaciones@gmail.com mediante refresh token.
// Variables de entorno necesarias en Vercel (todas en todos los entornos):
//   GOOGLE_OAUTH_CLIENT_ID
//   GOOGLE_OAUTH_CLIENT_SECRET
//   GOOGLE_OAUTH_REFRESH_TOKEN   (con scopes: drive + gmail.send)

const VEHICLE_FOLDER_ID = "1r87mzOWnT3DfEcFpGj82R5nhEYuzi_uj"; // Carpeta "Control de Vehículos"
const ITV_FILE_NAME = "itv_config.json";
const MAIL_TO = "info@nimatel.es";
const MAIL_FROM = "nimatelinstalaciones@gmail.com";
const MAIL_SUBJECT = "Fallo en vehículo";

// ── Token de acceso de Google (cacheado por instancia) ──────────────────
let TOKEN_CACHE = null; // { token, expiresAt }

async function getAccessToken() {
  if (TOKEN_CACHE && TOKEN_CACHE.expiresAt > Date.now() + 60000) return TOKEN_CACHE.token;
  const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET || !GOOGLE_OAUTH_REFRESH_TOKEN) {
    throw new Error("Faltan variables de entorno GOOGLE_OAUTH_* en Vercel.");
  }
  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CLIENT_ID,
    client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
    refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = await resp.json();
  if (!resp.ok || !data.access_token) {
    throw new Error("No se pudo obtener el token de Google: " + (data.error_description || data.error || resp.status));
  }
  TOKEN_CACHE = { token: data.access_token, expiresAt: Date.now() + (parseInt(data.expires_in || "3600", 10) - 120) * 1000 };
  return TOKEN_CACHE.token;
}

// ── Utilidades Drive ────────────────────────────────────────────────────
async function findItvFileId(token) {
  const q = `name='${ITV_FILE_NAME}' and '${VEHICLE_FOLDER_ID}' in parents and trashed=false`;
  const resp = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id)&supportsAllDrives=true&includeItemsFromAllDrives=true`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!resp.ok) throw new Error(`Error buscando ${ITV_FILE_NAME} en Drive: ${resp.status}`);
  const data = await resp.json();
  return data.files && data.files[0] ? data.files[0].id : null;
}

async function readItvConfig(token) {
  const fileId = await findItvFileId(token);
  if (!fileId) return { fileId: null, config: {} };
  const resp = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!resp.ok) throw new Error(`Error leyendo ${ITV_FILE_NAME}: ${resp.status}`);
  let config = {};
  try { config = await resp.json(); } catch (_) { config = {}; }
  if (!config || typeof config !== "object" || Array.isArray(config)) config = {};
  return { fileId, config };
}

async function writeItvConfig(token, fileId, config) {
  const body = JSON.stringify(config, null, 2);
  if (fileId) {
    // Actualizar contenido del fichero existente
    const resp = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media&supportsAllDrives=true`,
      { method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body }
    );
    if (!resp.ok) throw new Error(`Error actualizando ${ITV_FILE_NAME}: ${resp.status}`);
    return fileId;
  }
  // Crear el fichero (multipart) dentro de la carpeta
  const boundary = "nimatel_itv_" + Date.now();
  const metadata = JSON.stringify({ name: ITV_FILE_NAME, parents: [VEHICLE_FOLDER_ID], mimeType: "application/json" });
  const multipart =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${body}\r\n--${boundary}--`;
  const resp = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id&supportsAllDrives=true",
    { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${boundary}` }, body: multipart }
  );
  if (!resp.ok) throw new Error(`Error creando ${ITV_FILE_NAME}: ${resp.status}`);
  const data = await resp.json();
  return data.id;
}

// ── Correo (Gmail API, mensaje MIME con adjunto) ────────────────────────
const b64 = (str) => Buffer.from(str, "utf-8").toString("base64");
const chunk76 = (s) => s.replace(/(.{76})/g, "$1\r\n");

function buildMailBody(matricula, tecnico, anomalies) {
  if (anomalies.length === 1) {
    return `El vehículo "${matricula}" tiene una anomalía, en concreto "${anomalies[0].comentario}" según reporta el técnico: "${tecnico}"`;
  }
  const lines = anomalies.map((a) => `- ${a.elemento}: "${a.comentario}"`).join("\n");
  return `El vehículo "${matricula}" tiene las siguientes anomalías según reporta el técnico "${tecnico}":\n${lines}`;
}

async function sendAnomalyMail(token, { fileId, filename, matricula, tecnico, anomalies }) {
  // 1) Descargar el PDF de Drive
  const pdfResp = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!pdfResp.ok) throw new Error(`No se pudo descargar el PDF de Drive: ${pdfResp.status}`);
  const pdfB64 = Buffer.from(await pdfResp.arrayBuffer()).toString("base64");

  // 2) Construir mensaje MIME multipart con el PDF adjunto
  const boundary = "nimatel_mail_" + Date.now();
  const bodyText = buildMailBody(matricula, tecnico, anomalies);
  const mime = [
    `From: Nimatel Check App <${MAIL_FROM}>`,
    `To: ${MAIL_TO}`,
    `Subject: =?UTF-8?B?${b64(MAIL_SUBJECT)}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    chunk76(b64(bodyText)),
    `--${boundary}`,
    `Content-Type: application/pdf; name="${filename}"`,
    `Content-Disposition: attachment; filename="${filename}"`,
    "Content-Transfer-Encoding: base64",
    "",
    chunk76(pdfB64),
    `--${boundary}--`,
  ].join("\r\n");

  // 3) Enviar por Gmail API (base64url)
  const raw = Buffer.from(mime, "utf-8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const resp = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw }),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error("Gmail no pudo enviar el aviso: " + (err.error?.message || resp.status));
  }
  return true;
}

// ── Handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido. Usa POST." });
    return;
  }
  try {
    const { action } = req.body || {};
    const token = await getAccessToken();

    if (action === "itv-get") {
      const { config } = await readItvConfig(token);
      res.status(200).json({ config });
      return;
    }

    if (action === "itv-set") {
      const { matricula, fecha } = req.body;
      if (!matricula || !fecha) { res.status(400).json({ error: "Faltan matrícula o fecha." }); return; }
      const { fileId, config } = await readItvConfig(token);
      config[matricula] = fecha;
      await writeItvConfig(token, fileId, config);
      res.status(200).json({ ok: true, config });
      return;
    }

    if (action === "upload-session") {
      const { filename } = req.body;
      if (!filename) { res.status(400).json({ error: "Falta el nombre del fichero." }); return; }
      // El header Origin del navegador debe ir en la petición de inicio para
      // que Google permita el PUT posterior desde el navegador (CORS).
      const origin = req.headers.origin || "";
      const initResp = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id&supportsAllDrives=true",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=UTF-8",
            "X-Upload-Content-Type": "application/pdf",
            ...(origin ? { Origin: origin } : {}),
          },
          body: JSON.stringify({ name: filename, mimeType: "application/pdf", parents: [VEHICLE_FOLDER_ID] }),
        }
      );
      if (!initResp.ok) {
        const err = await initResp.json().catch(() => ({}));
        throw new Error("Error iniciando la subida a Drive: " + (err.error?.message || initResp.status));
      }
      const uploadUrl = initResp.headers.get("location");
      if (!uploadUrl) throw new Error("Drive no devolvió la URL de subida.");
      res.status(200).json({ uploadUrl });
      return;
    }

    if (action === "send-mail") {
      const { fileId, filename, matricula, tecnico, anomalies } = req.body;
      if (!fileId || !filename || !matricula || !tecnico || !Array.isArray(anomalies) || anomalies.length === 0) {
        res.status(400).json({ error: "Faltan datos para enviar el aviso." });
        return;
      }
      await sendAnomalyMail(token, { fileId, filename, matricula, tecnico, anomalies });
      res.status(200).json({ ok: true });
      return;
    }

    res.status(400).json({ error: `Acción desconocida: ${action}` });
  } catch (err) {
    res.status(500).json({ error: err.message || "Error interno del módulo de vehículos." });
  }
}
