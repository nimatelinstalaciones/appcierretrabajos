// api/file/[name].js — Re-sirve el PDF desde Google Drive con el nombre y tipo correctos
// para que Stel Order lo reconozca como "26ALB-XXXX_parte.pdf" y no como "uc".
export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  // El nombre es el último tramo de la ruta — es lo que Stel Order usará como nombre del archivo.
  const name = decodeURIComponent(url.pathname.split("/").pop() || "documento.pdf");

  if (!id) {
    return new Response("Falta el parámetro 'id'", { status: 400 });
  }

  const driveUrl = `https://drive.google.com/uc?export=download&confirm=t&id=${id}`;
  const driveResp = await fetch(driveUrl);

  if (!driveResp.ok) {
    return new Response("No se pudo obtener el archivo de Google Drive", { status: 502 });
  }

  return new Response(driveResp.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${name}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
