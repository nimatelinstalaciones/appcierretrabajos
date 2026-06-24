// api/drive-upload.js — Proxy para subir PDF a Google Drive
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://appcierretrabajos.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  try {
    const { accessToken, filename, pdfBase64, folderId: existingFolderId } = req.body;
    if (!accessToken || !filename || !pdfBase64) {
      return res.status(400).json({ error: "Faltan parámetros: accessToken, filename, pdfBase64" });
    }

    let folderId = existingFolderId;

    // Buscar o crear carpeta "Nimatel Check App"
    if (!folderId) {
      const searchResp = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent("name='Nimatel Check App' and mimeType='application/vnd.google-apps.folder' and trashed=false")}&fields=files(id)`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const searchData = await searchResp.json();

      if (searchData.files && searchData.files.length > 0) {
        folderId = searchData.files[0].id;
      } else {
        const folderResp = await fetch("https://www.googleapis.com/drive/v3/files", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Nimatel Check App", mimeType: "application/vnd.google-apps.folder" }),
        });
        if (!folderResp.ok) throw new Error(`Error creando carpeta: ${folderResp.status}`);
        const folderData = await folderResp.json();
        folderId = folderData.id;
      }
    }

    // Convertir base64 a buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    // Subir PDF con multipart
    const boundary = "nimatel_" + Date.now();
    const metadata = JSON.stringify({ name: filename, mimeType: "application/pdf", parents: [folderId] });
    const metaPart = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`;
    const filePart = `--${boundary}\r\nContent-Type: application/pdf\r\n\r\n`;
    const endPart = `\r\n--${boundary}--`;

    const bodyBuffer = Buffer.concat([
      Buffer.from(metaPart),
      Buffer.from(filePart),
      pdfBuffer,
      Buffer.from(endPart),
    ]);

    const uploadResp = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/related; boundary=${boundary}`,
          "Content-Length": bodyBuffer.length,
        },
        body: bodyBuffer,
      }
    );

    if (!uploadResp.ok) {
      const errText = await uploadResp.text();
      throw new Error(`Error subiendo a Drive: ${uploadResp.status} — ${errText}`);
    }

    const uploadData = await uploadResp.json();
    if (!uploadData.id) throw new Error("Drive no devolvió ID del archivo");

    // Hacer público
    await fetch(`https://www.googleapis.com/drive/v3/files/${uploadData.id}/permissions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ role: "reader", type: "anyone" }),
    });

    const publicUrl = `https://drive.google.com/uc?export=download&id=${uploadData.id}`;
    return res.status(200).json({ fileId: uploadData.id, publicUrl, folderId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
