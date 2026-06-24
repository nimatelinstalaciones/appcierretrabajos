import { useState, useRef } from "react";

// ─── Nimatel Brand ───────────────────────────────────────────────────────
const LOGO_PNG_B64 = "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";

const LOGO_PNG_B64_REAL = "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";

// Use the actual logo from the original
const LOGO_SRC = `data:image/png;base64,${LOGO_PNG_B64}`;

// ─── Config ──────────────────────────────────────────────────────────────
const GOOGLE_CLIENT_ID = "1097463589133-ioj3tncqdpdf6qvpnvi5keusdj2pepdg.apps.googleusercontent.com";
const STEL_API_KEY = "256JhK74OuI3kji9tpRLpngRHCSiPdTP66cvAuxx";
const STEL_BASE = "https://app.stelorder.com/app";
const BRAND_RED = "#b10925";
const BRAND_GRADIENT = "linear-gradient(135deg, #bd0048, #b10925)";
const TECHNICIANS = ["Amador García García", "Carlos Campos Hernández", "Francisco Hernández Torrecillas", "Pedro Jiménez Fernández"];
const PAYMENT_METHODS = ["No aplica (Factura mensual)", "TPV", "Bizum", "Transferencia", "Efectivo"];
const DOC_TYPES = ["Albarán", "Presupuesto"];
const TOTAL_STEPS = 5;
const MIN_AFTER_PHOTOS = 3;

// ─── Albarán format ──────────────────────────────────────────────────────
const getDocRef = (orden, docType) => {
  const yr = new Date().getFullYear().toString().slice(-2);
  const num = orden.trim().replace(/\D/g, "");
  if (!num) return null;
  const prefix = docType === "Presupuesto" ? `${yr}PRT` : `${yr}alb`;
  return `${prefix}-0${num}`;
};

// ─── Load jsPDF from CDN ─────────────────────────────────────────────────
const loadJsPDF = () => new Promise((resolve, reject) => {
  if (window.jspdf) { resolve(window.jspdf.jsPDF); return; }
  const s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  s.onload = () => resolve(window.jspdf.jsPDF);
  s.onerror = () => reject(new Error("No se pudo cargar jsPDF"));
  document.head.appendChild(s);
});

// ─── Convert blob URL to base64 ──────────────────────────────────────────
const urlToBase64 = (url) => fetch(url).then(r => r.blob()).then(blob =>
  new Promise(res => { const r = new FileReader(); r.onloadend = () => res(r.result); r.readAsDataURL(blob); })
);

// ─── Google OAuth ────────────────────────────────────────────────────────
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const loadGoogleAPI = () => new Promise((resolve) => {
  if (window.google?.accounts) { resolve(); return; }
  const s = document.createElement("script");
  s.src = "https://accounts.google.com/gsi/client";
  s.onload = resolve;
  document.head.appendChild(s);
});

const getGoogleToken = () => new Promise(async (resolve, reject) => {
  await loadGoogleAPI();
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: SCOPES,
    callback: (resp) => {
      if (resp.error) reject(new Error(resp.error));
      else resolve(resp.access_token);
    },
  });
  client.requestAccessToken();
});

// ─── Upload PDF to Google Drive ──────────────────────────────────────────
const uploadToDrive = async (pdfBlob, filename, accessToken) => {
  // Create folder "Nimatel Check App" if not exists, then upload
  // First, search for existing folder
  const searchResp = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=name%3D'Nimatel+Check+App'+and+mimeType%3D'application%2Fvnd.google-apps.folder'+and+trashed%3Dfalse&fields=files(id)`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const searchData = await searchResp.json();
  let folderId;

  if (searchData.files && searchData.files.length > 0) {
    folderId = searchData.files[0].id;
  } else {
    // Create folder
    const folderResp = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Nimatel Check App", mimeType: "application/vnd.google-apps.folder" }),
    });
    const folderData = await folderResp.json();
    folderId = folderData.id;
  }

  // Upload the PDF
  const metadata = { name: filename, mimeType: "application/pdf", parents: [folderId] };
  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", pdfBlob, filename);

  const uploadResp = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webContentLink",
    { method: "POST", headers: { Authorization: `Bearer ${accessToken}` }, body: form }
  );
  const uploadData = await uploadResp.json();
  if (!uploadData.id) throw new Error("Error al subir a Drive: " + JSON.stringify(uploadData));

  // Make it publicly readable
  await fetch(`https://www.googleapis.com/drive/v3/files/${uploadData.id}/permissions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ role: "reader", type: "anyone" }),
  });

  // Get direct download link
  const publicUrl = `https://drive.google.com/uc?export=download&id=${uploadData.id}`;
  return { fileId: uploadData.id, publicUrl };
};

// ─── Get Stel Order document ID from reference ────────────────────────────
const getStelDocId = async (orden, docType) => {
  const num = orden.trim().replace(/\D/g, "");
  const endpoint = docType === "Presupuesto" ? "workEstimates" : "workDeliveryNotes";
  const entityType = docType === "Presupuesto" ? "WORKESTIMATE" : "WORKDELIVERYNOTE";

  // Try with numeric reference first
  const resp = await fetch(`${STEL_BASE}/${endpoint}?reference=${num}&limit=100`, {
    headers: { "X-AUTH-TOKEN": STEL_API_KEY, "Content-Type": "application/json" },
  });

  if (!resp.ok) throw new Error(`Error Stel Order API: ${resp.status}`);
  const data = await resp.json();

  // Try exact match on full-reference
  const albaranRef = getDocRef(orden, docType);
  let doc = null;

  if (Array.isArray(data)) {
    doc = data.find(d => d["full-reference"] === albaranRef) || data[0];
  } else if (data.data && Array.isArray(data.data)) {
    doc = data.data.find(d => d["full-reference"] === albaranRef) || data.data[0];
  }

  if (!doc) {
    // Try fetching last 100 and searching
    const resp2 = await fetch(`${STEL_BASE}/${endpoint}?limit=100&sort=id&order=desc`, {
      headers: { "X-AUTH-TOKEN": STEL_API_KEY, "Content-Type": "application/json" },
    });
    const data2 = await resp2.json();
    const list = Array.isArray(data2) ? data2 : (data2.data || []);
    doc = list.find(d => d["full-reference"] === albaranRef);
  }

  if (!doc) throw new Error(`No se encontró el documento ${albaranRef} en Stel Order`);
  return { id: doc.id, entityType };
};

// ─── Attach PDF to Stel Order ─────────────────────────────────────────────
const attachToStelOrder = async (fileUrl, entityId, entityType, filename) => {
  const resp = await fetch(`${STEL_BASE}/entityAttachments`, {
    method: "POST",
    headers: { "X-AUTH-TOKEN": STEL_API_KEY, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ "file-url": fileUrl, "entity-id": entityId, "entity-type": entityType, "name": filename }),
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Error al adjuntar en Stel Order: ${resp.status} — ${errText}`);
  }
  return await resp.json();
};

// ─── Icons ───────────────────────────────────────────────────────────────
const Icons = {
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>,
  X:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Camera: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Folder: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Plus:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Alert: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  ChevR: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevL: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"/></svg>,
  ClipOk: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1" ry="1"/><path d="m9 12 2 2 4-4"/></svg>,
  PDF:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Spin:  () => <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>,
  Drive: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 19h20L12 2z"/><path d="M12 2L4.5 15.5M12 2l7.5 13.5M2 19h20"/></svg>,
  Link:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
};

// ─── Shared styles ────────────────────────────────────────────────────────
const cardStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };
const inputStyle = { background: "#0a0a0a", border: "1px solid #2d2d2d", color: "white" };
const badgeRed   = { color: BRAND_RED, background: "rgba(177,9,37,0.12)", border: `1px solid rgba(177,9,37,0.3)` };

// ─── Toggle Sí / No / N/A ────────────────────────────────────────────────
function Toggle({ value, onChange, hasNA = false }) {
  const opts = hasNA
    ? [{ v: true, l: "Sí", on: "#16a34a" }, { v: false, l: "No", on: "#dc2626" }, { v: "na", l: "N/A", on: "#64748b" }]
    : [{ v: true, l: "Sí", on: "#16a34a" }, { v: false, l: "No", on: "#dc2626" }];
  return (
    <div className="flex gap-2">
      {opts.map(o => (
        <button key={String(o.v)} onClick={() => onChange(o.v)}
          className="flex-1 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-150 active:scale-95"
          style={value === o.v
            ? { background: o.on, color: "white", border: "2px solid transparent" }
            : { background: "rgba(15,10,11,0.6)", border: "1px solid #374151", color: "#9ca3af" }}>
          {o.l}
        </button>
      ))}
    </div>
  );
}

// ─── Field Row ────────────────────────────────────────────────────────────
function FieldRow({ label, sublabel, value, onChange, hasNA, required, badge }) {
  return (
    <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-semibold text-sm leading-tight">{label}</p>
            {required && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>}
            {badge && <span className="text-[10px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/30 px-1.5 py-0.5 rounded-full tracking-widest uppercase">{badge}</span>}
          </div>
          {sublabel && <p className="text-slate-500 text-[10px] mt-0 leading-snug">{sublabel}</p>}
        </div>
        {value === true  && <span className="text-green-400 mt-0.5 shrink-0"><Icons.Check /></span>}
        {value === false && <span className="text-red-400 mt-0.5 shrink-0"><Icons.X /></span>}
      </div>
      <Toggle value={value} onChange={onChange} hasNA={hasNA} />
    </div>
  );
}

// ─── FilePicker ───────────────────────────────────────────────────────────
function FilePicker({ label, sublabel, value, onChange }) {
  const ref = useRef();
  const handleFile = (e) => {
    const files = Array.from(e.target.files); if (!files.length) return;
    onChange(files.map(f => ({ name: f.name, url: URL.createObjectURL(f), file: f })));
    e.target.value = "";
  };
  return (
    <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-semibold text-sm">{label}</p>
          <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full tracking-widest uppercase">Opcional</span>
        </div>
        {sublabel && <p className="text-slate-500 text-[10px] mt-0">{sublabel}</p>}
      </div>
      {value && value.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {value.map((p, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={p.url} alt={`antes ${i+1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-start justify-between p-1">
                  <span className="text-white text-[10px] font-bold bg-black/50 rounded px-1">#{i+1}</span>
                  <button onClick={() => onChange(value.filter((_,idx) => idx !== i))} className="text-red-400 bg-black/50 rounded text-[10px] font-bold px-1">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => onChange(null)} className="text-red-400 text-xs text-center py-1 font-semibold">Eliminar todas</button>
        </div>
      ) : (
        <button onClick={() => ref.current.click()}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl transition-colors active:scale-95"
          style={{ border: "2px dashed rgba(100,116,139,0.4)", color: "#64748b" }}>
          <Icons.Folder /><span className="font-semibold text-sm">Seleccionar de Archivos / Galería</span>
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── CameraUploader ───────────────────────────────────────────────────────
function CameraUploader({ label, sublabel, value, onChange }) {
  const ref = useRef();
  const handleFile = (e) => {
    const files = Array.from(e.target.files); if (!files.length) return;
    onChange([...value, ...files.map(f => ({ name: f.name, url: URL.createObjectURL(f), file: f }))]);
    e.target.value = "";
  };
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const ok = value.length >= MIN_AFTER_PHOTOS;
  return (
    <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-semibold text-sm">{label}</p>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Mín. {MIN_AFTER_PHOTOS} fotos</span>
        </div>
        {sublabel && <p className="text-slate-500 text-[10px] mt-0">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {Array.from({ length: Math.max(MIN_AFTER_PHOTOS, value.length) }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all"
              style={{ background: i < value.length ? (ok ? "#16a34a" : BRAND_RED) : "#2d2d2d" }} />
          ))}
        </div>
        <span className="text-xs font-semibold" style={{ color: ok ? "#16a34a" : BRAND_RED }}>
          {value.length}/{MIN_AFTER_PHOTOS} mínimo {ok ? "✓" : ""}
        </span>
      </div>
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((p, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
              <img src={p.url} alt={`foto ${i+1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-start justify-between p-1">
                <span className="text-white text-[10px] font-bold bg-black/50 rounded px-1">#{i+1}</span>
                <button onClick={() => remove(i)} className="text-red-400 bg-black/50 rounded text-[10px] font-bold px-1">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => ref.current.click()}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl transition-all active:scale-95"
        style={{ background: "rgba(177,9,37,0.08)", border: `2px dashed rgba(177,9,37,0.4)`, color: BRAND_RED }}>
        <Icons.Camera />
        <span className="font-bold text-sm">
          {value.length === 0 ? "Añadir 1ª Foto" : value.length < MIN_AFTER_PHOTOS
            ? `Añadir Foto (${MIN_AFTER_PHOTOS - value.length} más requerida${MIN_AFTER_PHOTOS - value.length > 1 ? "s" : ""})`
            : "Añadir Foto Adicional"}
        </span>
      </button>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── StepBar ─────────────────────────────────────────────────────────────
function StepBar({ current }) {
  const labels = ["Inicio","Técnico","Limpieza","Evidencias","Cierre"];
  return (
    <div className="flex items-center justify-between px-0.5">
      {labels.map((l, i) => {
        const s = i + 1, done = s < current, active = s === current;
        return (
          <div key={l} className="flex flex-col items-center gap-0.5 flex-1">
            <div className="flex items-center w-full">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all"
                style={done ? { background: BRAND_RED, color: "white" } : active ? { background: "white", color: BRAND_RED } : { background: "#1e1e1e", color: "#6b7280" }}>
                {done ? "✓" : s}
              </div>
              {i < labels.length - 1 && <div className="flex-1 h-px mx-0.5 rounded transition-all" style={{ background: done ? BRAND_RED : "#2d2d2d" }} />}
            </div>
            <span className="text-[8px] font-semibold tracking-wide uppercase leading-none"
              style={{ color: active ? "white" : done ? BRAND_RED : "#4b5563" }}>{l}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Alert ───────────────────────────────────────────────────────────────
function Alert({ msg }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium"
      style={{ background: "rgba(177,9,37,0.1)", border: "1px solid rgba(177,9,37,0.4)", color: "#f87171" }}>
      <Icons.Alert /><span>{msg}</span>
    </div>
  );
}

// ─── PDF Generator ────────────────────────────────────────────────────────
async function buildPDF(data) {
  const JsPDF = await loadJsPDF();
  const doc = new JsPDF({ unit: "mm", format: "a4" });
  const W = 210, H = 297, M = 14, CW = W - 2 * M;
  let y = 0;

  const nl = (n = 5) => { y += n; if (y > H - 20) { doc.addPage(); y = 20; } };
  const txt = (t, x, size = 10, bold = false, color = [30,30,30]) => {
    doc.setFontSize(size); doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(...color); doc.text(t, x, y);
  };
  const line = (x1, y1, x2, y2, color = [200,200,200]) => {
    doc.setDrawColor(...color); doc.line(x1, y1, x2, y2);
  };

  doc.setFillColor(177, 9, 37);
  doc.rect(0, 0, W, 38, "F");
  doc.addImage(LOGO_SRC, "PNG", M, 5, 48, 24);
  doc.setFontSize(13); doc.setFont("helvetica", "bold"); doc.setTextColor(255,255,255);
  doc.text("PARTE DE SERVICIO", W - M, 16, { align: "right" });
  doc.setFontSize(9); doc.setFont("helvetica", "normal");
  const albaranRef = getDocRef(data.s1.orden, data.s1.docType);
  if (albaranRef) doc.text(`Ref: ${albaranRef}`, W - M, 23, { align: "right" });
  doc.text(`Fecha: ${data.s1.fecha}`, W - M, 29, { align: "right" });
  y = 46;

  const secHeader = (title) => {
    doc.setFillColor(240, 240, 240);
    doc.rect(M, y - 4, CW, 7, "F");
    doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(177, 9, 37);
    doc.text(title.toUpperCase(), M + 2, y + 0.5);
    y += 5; line(M, y, M + CW, y, [200, 200, 200]); y += 4;
  };

  const fmtVal = (v) => {
    if (v === null || v === undefined || v === "") return "—";
    if (v === true) return "✓ Sí"; if (v === false) return "✗ No"; if (v === "na") return "N/A";
    if (typeof v === "object" && v.name) return v.name;
    return String(v);
  };
  const fRow = (label, val) => {
    doc.setFontSize(8.5); doc.setFont("helvetica", "normal"); doc.setTextColor(80,80,80);
    doc.text(label, M + 2, y);
    const vs = fmtVal(val);
    const color = vs.startsWith("✓") ? [22,163,74] : vs.startsWith("✗") ? [220,38,38] : [30,30,30];
    doc.setFont("helvetica", "bold"); doc.setTextColor(...color);
    doc.text(vs, M + CW, y, { align: "right" });
    y += 5.5; line(M, y - 0.5, M + CW, y - 0.5, [230,230,230]);
  };

  secHeader("1. Datos del Servicio");
  fRow("Técnico", data.s1.tecnico);
  fRow("Nº Orden / Cliente", data.s1.orden);
  fRow("Referencia Albarán (Stel Order)", albaranRef || "—");
  fRow("Tipo de Servicio", data.s1.tipo);
  nl(4);

  secHeader("2. Verificación Técnica — Sello de Calidad");
  fRow("Etiquetado Correcto", data.s2.etiquetado);
  fRow("Peinado y Fijación", data.s2.peinado);
  fRow("Configuración (Router/Equipo)", data.s2.config);
  fRow("Test de Funcionamiento (Crítico)", data.s2.test);
  fRow("Cierre de Equipos (Racks/Registros)", data.s2.cierre);
  nl(4);

  secHeader("3. Orden, Limpieza y Herramientas");
  fRow("Residuos Retirados", data.s3.residuos);
  fRow("Inventario Herramientas (Crítico)", data.s3.herramientas);
  fRow("Material Sobrante Recogido", data.s3.material);
  nl(4);

  secHeader("4. Gestión Stel Order");
  fRow("Foto del Antes adjuntada", data.s4.fotoAntes && data.s4.fotoAntes.length > 0 ? `✓ Sí — ${data.s4.fotoAntes.length} foto(s)` : "No adjunta");
  fRow("Fotos del Después (nº)", `${data.s4.fotosDepues.length} foto(s) adjuntas`);
  fRow("Material Añadido al Albarán", data.s4.materiales);
  fRow("Descripción Técnica Registrada", data.s4.descripcion);
  nl(4);

  secHeader("5. Cierre con el Cliente");
  fRow("Visto Bueno del Cliente", data.s5.vistoBueno);
  fRow("Firma del Albarán (Stel Order)", data.s5.firma);
  fRow("Método de Cobro", data.s5.cobro);
  if (data.s5.observaciones) {
    nl(2);
    doc.setFontSize(8.5); doc.setFont("helvetica", "bold"); doc.setTextColor(80,80,80);
    doc.text("Observaciones / Incidencias:", M + 2, y); nl(4.5);
    doc.setFont("helvetica", "normal"); doc.setTextColor(30,30,30);
    const lines = doc.splitTextToSize(data.s5.observaciones, CW - 4);
    lines.forEach(l => { doc.text(l, M + 2, y); nl(4.5); });
  }
  nl(8);

  const allPhotos = [];
  if (data.s4.fotoAntes && data.s4.fotoAntes.length > 0) {
    data.s4.fotoAntes.forEach((p, i) => allPhotos.push({ label: `Foto del Antes #${i+1}`, photo: p }));
  }
  data.s4.fotosDepues.forEach((p, i) => allPhotos.push({ label: `Foto del Después #${i+1}`, photo: p }));

  if (allPhotos.length > 0) {
    doc.addPage(); y = 20;
    secHeader("Fotografías del Servicio");
    const imgW = (CW - 6) / 2, imgH = imgW * 0.7;
    let col = 0;
    for (const { label, photo } of allPhotos) {
      if (y + imgH + 12 > H - 15) { doc.addPage(); y = 20; }
      const x = M + col * (imgW + 6);
      try {
        const b64 = await urlToBase64(photo.url);
        doc.addImage(b64, x, y, imgW, imgH);
        doc.setFontSize(7); doc.setFont("helvetica", "bold"); doc.setTextColor(50,50,50);
        doc.text(label, x + 1, y + imgH + 3.5);
      } catch(_) {
        doc.setFillColor(230,230,230); doc.rect(x, y, imgW, imgH, "F");
        doc.setTextColor(150,150,150); doc.setFontSize(8);
        doc.text("Imagen no disponible", x + 2, y + imgH/2);
      }
      col++;
      if (col === 2) { col = 0; y += imgH + 12; }
    }
  }

  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(150,150,150);
    doc.text(`Nimatel Fibra y Telecomunicaciones — ${data.s1.fecha} — Parte: ${albaranRef || data.s1.orden}`, M, H - 6);
    doc.text(`Pág. ${p} / ${totalPages}`, W - M, H - 6, { align: "right" });
    doc.setDrawColor(177,9,37); doc.line(M, H - 10, W - M, H - 10);
  }

  return doc;
}

// ─── Stel Order Integration Button ───────────────────────────────────────
function StelIntegrationPanel({ data }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState("");
  const [driveUrl, setDriveUrl] = useState(null);
  const albaranRef = getDocRef(data.s1.orden, data.s1.docType);

  const handleAutoAttach = async () => {
    setStatus("loading");
    setStatusMsg("Generando PDF...");
    try {
      // 1. Generate PDF as blob
      const doc = await buildPDF(data);
      const filename = albaranRef ? `${albaranRef}_parte.pdf` : `parte_${data.s1.orden}.pdf`;
      const pdfBlob = doc.output("blob");

      // 2. Get Google token
      setStatusMsg("Solicitando acceso a Google Drive...");
      const accessToken = await getGoogleToken();

      // 3. Upload to Drive
      setStatusMsg("Subiendo PDF a Google Drive...");
      const { fileId, publicUrl } = await uploadToDrive(pdfBlob, filename, accessToken);
      setDriveUrl(publicUrl);

      // 4. Get Stel Order document ID
      setStatusMsg("Buscando documento en Stel Order...");
      const { id: entityId, entityType } = await getStelDocId(data.s1.orden, data.s1.docType);

      // 5. Attach to Stel Order
      setStatusMsg("Adjuntando a Stel Order...");
      await attachToStelOrder(publicUrl, entityId, entityType, filename);

      setStatus("success");
      setStatusMsg(`✓ PDF adjuntado correctamente al ${data.s1.docType} ${albaranRef}`);
    } catch (err) {
      setStatus("error");
      setStatusMsg(err.message || "Error desconocido");
    }
  };

  if (!albaranRef) return null;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(14,116,144,0.3)", background: "rgba(14,116,144,0.06)" }}>
      <div className="px-3 py-2.5 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(14,116,144,0.2)", background: "rgba(14,116,144,0.1)" }}>
        <Icons.Link />
        <p className="text-sky-400 font-bold text-sm">Adjuntar PDF a Stel Order</p>
      </div>
      <div className="p-3 flex flex-col gap-3">
        <p className="text-slate-400 text-xs leading-relaxed">
          Sube el PDF automáticamente a <span className="text-white font-semibold">Google Drive</span> y lo adjunta al {data.s1.docType === "Presupuesto" ? "presupuesto" : "albarán"} <span className="font-black" style={{ color: BRAND_RED }}>{albaranRef}</span> en Stel Order.
        </p>

        {status === "idle" && (
          <button onClick={handleAutoAttach}
            className="w-full py-3 font-black text-sm rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 text-white"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)", boxShadow: "0 6px 16px rgba(14,116,144,0.3)" }}>
            <Icons.Drive />Subir a Drive y adjuntar en Stel Order
          </button>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="flex items-center gap-2" style={{ color: "#38bdf8" }}>
              <Icons.Spin /><span className="text-sm font-semibold">{statusMsg}</span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-full rounded-full animate-pulse" style={{ background: "#0ea5e9", width: "60%" }} />
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}>
              <span className="text-green-400 text-lg">✓</span>
              <p className="text-green-400 text-xs font-semibold">{statusMsg}</p>
            </div>
            {driveUrl && (
              <a href={driveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold"
                style={{ background: "rgba(14,116,144,0.1)", border: "1px solid rgba(14,116,144,0.3)", color: "#38bdf8" }}>
                <Icons.Drive />Ver PDF en Google Drive
              </a>
            )}
            <button onClick={handleAutoAttach}
              className="text-slate-500 text-xs text-center py-1 hover:text-slate-400 transition-colors">
              Volver a adjuntar
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 rounded-lg px-3 py-2.5" style={{ background: "rgba(177,9,37,0.1)", border: "1px solid rgba(177,9,37,0.3)" }}>
              <span className="text-red-400 text-sm mt-0.5 shrink-0">✕</span>
              <p className="text-red-400 text-xs font-medium leading-relaxed">{statusMsg}</p>
            </div>
            <button onClick={handleAutoAttach}
              className="w-full py-2.5 font-bold text-sm rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{ background: "rgba(177,9,37,0.15)", border: "1px solid rgba(177,9,37,0.3)", color: "#f87171" }}>
              <Icons.Spin />Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Report Screen ────────────────────────────────────────────────────────
function ReportScreen({ data, onReset }) {
  const [generating, setGenerating] = useState(false);
  const [pdfDone, setPdfDone] = useState(false);
  const albaranRef = getDocRef(data.s1.orden, data.s1.docType);

  const handlePDF = async () => {
    setGenerating(true);
    try {
      const doc = await buildPDF(data);
      const filename = albaranRef ? `${albaranRef}_parte.pdf` : `parte_${data.s1.orden}.pdf`;
      doc.save(filename);
      setPdfDone(true);
    } catch(e) {
      alert("Error al generar el PDF: " + e.message);
    } finally {
      setGenerating(false);
    }
  };

  const fmt = (v) => {
    if (v === null || v === undefined) return <span className="text-slate-500 italic">—</span>;
    if (v === true)  return <span className="text-green-400 font-bold">✓ Sí</span>;
    if (v === false) return <span className="text-red-400 font-bold">✗ No</span>;
    if (v === "na")  return <span className="text-slate-400">N/A</span>;
    if (typeof v === "object" && v.name) return <span className="text-sky-400 text-xs">{v.name}</span>;
    return <span className="text-white">{String(v)}</span>;
  };

  const sections = [
    { title: "Datos del Servicio", icon: "📋", rows: [
      ["Técnico", data.s1.tecnico], ["Nº Orden", data.s1.orden],
      ["Referencia", albaranRef ? <span style={{ color: BRAND_RED }} className="font-black">{albaranRef}</span> : null],
      ["Tipo", data.s1.tipo ? <span style={{ color: BRAND_RED }} className="font-bold">{data.s1.tipo}</span> : null],
    ]},
    { title: "Verificación Técnica", icon: "🔧", rows: [
      ["Etiquetado", data.s2.etiquetado], ["Peinado y Fijación", data.s2.peinado],
      ["Configuración", data.s2.config], ["Test Funcionamiento", data.s2.test], ["Cierre Equipos", data.s2.cierre],
    ]},
    { title: "Orden y Limpieza", icon: "🧹", rows: [
      ["Residuos", data.s3.residuos], ["Herramientas", data.s3.herramientas], ["Material Sobrante", data.s3.material],
    ]},
    { title: "Stel Order", icon: "📱", rows: [
      ["Foto Antes", data.s4.fotoAntes && data.s4.fotoAntes.length > 0
        ? <span className="text-sky-400 text-xs">{data.s4.fotoAntes.length} foto(s)</span>
        : <span className="text-slate-500 italic">No adjunta</span>],
      ["Fotos Después", <span className="text-green-400 font-bold">{data.s4.fotosDepues.length} foto(s)</span>],
      ["Material en albarán", data.s4.materiales], ["Descripción técnica", data.s4.descripcion],
    ]},
    { title: "Cierre con el Cliente", icon: "🤝", rows: [
      ["Visto Bueno", data.s5.vistoBueno], ["Firma Albarán", data.s5.firma], ["Cobro", data.s5.cobro],
      ...(data.s5.observaciones ? [["Observaciones", <span className="text-white text-xs">{data.s5.observaciones}</span>]] : []),
    ]},
  ];

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* Header */}
      <div className="rounded-xl p-3 text-center" style={{ background: "linear-gradient(135deg,rgba(177,9,37,0.2),rgba(189,0,72,0.08))", border: "1px solid rgba(177,9,37,0.3)" }}>
        <div className="text-4xl mb-2">✅</div>
        <h2 className="text-white text-xl font-black tracking-tight">Parte Completado</h2>
        <p className="text-slate-400 text-xs mt-1">Protocolo Nimatel registrado correctamente</p>
        {albaranRef && (
          <div className="mt-3 inline-flex flex-col items-center rounded-2xl px-5 py-2.5" style={{ background: "rgba(177,9,37,0.15)", border: "1px solid rgba(177,9,37,0.4)" }}>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Referencia Stel Order</p>
            <p className="text-xl font-black tracking-widest mt-0.5" style={{ color: BRAND_RED }}>{albaranRef}</p>
            <p className="text-slate-500 text-xs mt-0.5">{data.s1.tipo} · {data.s1.tecnico?.split(" ")[0]} · {data.s1.fecha}</p>
          </div>
        )}
      </div>

      {/* ── STEL ORDER INTEGRATION PANEL ── */}
      <StelIntegrationPanel data={data} />

      {/* Fotos */}
      {data.s4.fotosDepues.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={cardStyle}>
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(177,9,37,0.12)", borderBottom: "1px solid rgba(177,9,37,0.2)" }}>
            <span>📷</span>
            <h3 className="text-white font-bold text-sm">Fotos del Después ({data.s4.fotosDepues.length})</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {data.s4.fotosDepues.map((p, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={p.url} alt={`foto ${i+1}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-center py-0.5">
                  <span className="text-white text-[10px] font-bold">#{i+1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data sections */}
      {sections.map(sec => (
        <div key={sec.title} className="rounded-2xl overflow-hidden" style={cardStyle}>
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(177,9,37,0.12)", borderBottom: "1px solid rgba(177,9,37,0.2)" }}>
            <span>{sec.icon}</span><h3 className="text-white font-bold text-sm">{sec.title}</h3>
          </div>
          <div>
            {sec.rows.map(([label, val]) => (
              <div key={label} className="flex items-start justify-between gap-3 px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <span className="text-slate-400 text-xs leading-relaxed flex-1">{label}</span>
                <span className="text-sm text-right">{fmt(val)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 mt-1">
        <button onClick={handlePDF} disabled={generating}
          className="w-full py-3 font-black text-sm rounded-xl tracking-wide active:scale-95 transition-all flex items-center justify-center gap-2 text-white"
          style={{ background: generating ? "rgba(177,9,37,0.4)" : BRAND_GRADIENT, boxShadow: "0 8px 24px rgba(177,9,37,0.3)" }}>
          {generating ? <><Icons.Spin />Generando PDF...</> : pdfDone ? <>✓ PDF Descargado — Generar de Nuevo</> : <><Icons.PDF />Descargar PDF</>}
        </button>
        <button onClick={onReset} className="w-full py-2.5 font-bold text-sm rounded-xl active:scale-95 transition-transform text-slate-300"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          ＋ Nuevo Parte de Servicio
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const today = new Date().toLocaleDateString("es-ES", { day:"2-digit", month:"2-digit", year:"numeric" });
  const [step, setStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState("");
  const [s1, setS1] = useState({ tecnico:"", orden:"", fecha:today, tipo:"", docType:"" });
  const [s2, setS2] = useState({ etiquetado:null, peinado:null, config:null, test:null, cierre:null });
  const [s3, setS3] = useState({ residuos:null, herramientas:null, material:null });
  const [s4, setS4] = useState({ fotoAntes:[], fotosDepues:[], materiales:null, descripcion:null });
  const [s5, setS5] = useState({ vistoBueno:null, firma:null, cobro:"", observaciones:"" });

  const u1 = (k,v) => setS1(p=>({...p,[k]:v}));
  const u2 = (k,v) => setS2(p=>({...p,[k]:v}));
  const u3 = (k,v) => setS3(p=>({...p,[k]:v}));
  const u4 = (k,v) => setS4(p=>({...p,[k]:v}));
  const u5 = (k,v) => setS5(p=>({...p,[k]:v}));

  const validate = () => {
    if (step===1) {
      if (!s1.tecnico) return "Selecciona el técnico.";
      if (!s1.orden.trim()) return "Introduce el Nº de Orden.";
      if (!s1.tipo) return "Selecciona el tipo de servicio.";
      if (!s1.docType) return "Selecciona si es Albarán o Presupuesto.";
    }
    if (step===2) {
      if (s2.etiquetado===null) return "Marca 'Etiquetado Correcto'.";
      if (s2.peinado===null) return "Marca 'Peinado y Fijación'.";
      if (s2.config===null) return "Marca 'Configuración'.";
      if (s2.test===null) return "El Test de Funcionamiento es obligatorio.";
      if (s2.cierre===null) return "Marca 'Cierre de Equipos'.";
    }
    if (step===3) {
      if (s3.residuos===null) return "Confirma la retirada de residuos.";
      if (s3.herramientas===null) return "El inventario de herramientas es obligatorio.";
      if (s3.material===null) return "Confirma el material sobrante.";
    }
    if (step===4) {
      if (s4.fotosDepues.length < MIN_AFTER_PHOTOS) return `Adjunta al menos ${MIN_AFTER_PHOTOS} fotos del Después.`;
      if (s4.materiales===null) return "Confirma el material en Stel Order.";
      if (s4.descripcion===null) return "Confirma la descripción técnica.";
    }
    if (step===5) {
      if (s5.vistoBueno===null) return "Confirma el Visto Bueno del cliente.";
      if (s5.firma===null) return "Confirma la firma del albarán.";
      if (!s5.cobro) return "Selecciona el método de cobro.";
    }
    return "";
  };

  const next = () => {
    const e = validate(); if (e) { setError(e); return; }
    setError("");
    if (step === TOTAL_STEPS) { setShowReport(true); return; }
    setStep(s => s + 1);
  };
  const back = () => { setError(""); setStep(s => Math.max(1,s-1)); };
  const reset = () => {
    setStep(1); setShowReport(false); setError("");
    setS1({tecnico:"",orden:"",fecha:today,tipo:"",docType:""});
    setS2({etiquetado:null,peinado:null,config:null,test:null,cierre:null});
    setS3({residuos:null,herramientas:null,material:null});
    setS4({fotoAntes:[],fotosDepues:[],materiales:null,descripcion:null});
    setS5({vistoBueno:null,firma:null,cobro:"",observaciones:""});
  };

  const titles    = ["","Datos del Servicio","Verificación Técnica","Orden y Limpieza","Evidencias Stel Order","Cierre con el Cliente"];
  const subtitles = ["","Datos básicos del parte","Sello de calidad Nimatel","Evitar pérdidas y dejar el lugar limpio","Gestión documental en la app","Confirmación y cobro"];
  const albaranPreview = getDocRef(s1.orden, s1.docType);

  return (
    <div className="min-h-screen flex items-start justify-center" style={{ background: "#090608", fontFamily: "'Trebuchet MS','Avenir',sans-serif" }}>
      <div className="w-full max-w-md min-h-screen flex flex-col" style={{ background: "#0f0a0b" }}>

        <div className="px-3 py-2 sticky top-0 z-10 flex flex-col gap-1.5" style={{ background:"rgba(15,10,11,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(177,9,37,0.2)" }}>
          <div className="flex items-center gap-2">
            <img src={LOGO_SRC} alt="Nimatel" className="h-6 w-auto object-contain shrink-0" />
            <span className="text-white font-black text-xs tracking-widest uppercase opacity-80">Check App</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ color:"#64748b", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)" }}>V1.2</span>
            <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color:BRAND_RED, background:"rgba(177,9,37,0.12)", border:"1px solid rgba(177,9,37,0.25)" }}>{today}</span>
          </div>
          {!showReport && <StepBar current={step} />}
        </div>

        <div className="flex-1 px-4 pt-4 pb-4 overflow-y-auto" style={{ maxHeight:"calc(100vh - 90px)", overflowY:"auto" }}>
          {showReport ? (
            <ReportScreen data={{ s1,s2,s3,s4,s5 }} onReset={reset} />
          ) : (
            <div className="flex flex-col gap-2 pb-2">
              <div className="pt-0.5 pb-0.5">
                <h2 className="text-white font-black text-base tracking-tight leading-tight">{titles[step]}</h2>
                <p className="text-slate-500 text-[10px] mt-0">{subtitles[step]}</p>
              </div>

              {step===1 && (
                <div className="flex flex-col gap-2">
                  <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Técnico <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <select value={s1.tecnico} onChange={e=>u1("tecnico",e.target.value)}
                      className="w-full rounded-lg px-2.5 py-2 text-sm appearance-none focus:outline-none"
                      style={inputStyle} onFocus={e=>e.target.style.borderColor=BRAND_RED} onBlur={e=>e.target.style.borderColor="#2d2d2d"}>
                      <option value="" style={{background:"#0a0a0a"}}>— Seleccionar técnico —</option>
                      {TECHNICIANS.map(t=><option key={t} style={{background:"#0a0a0a"}}>{t}</option>)}
                    </select>
                  </div>

                  <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Tipo de Documento <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {DOC_TYPES.map(dt=>(
                        <button key={dt} onClick={()=>u1("docType",dt)}
                          className="py-2 rounded-xl font-bold text-xs tracking-wide active:scale-95 flex flex-col items-center gap-1"
                          style={s1.docType===dt ? {background:"rgba(177,9,37,0.2)",border:"2px solid #b10925",color:"#f87171"} : {background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",color:"#6b7280"}}>
                          <span className="text-base">{dt==="Albarán"?"📋":"📝"}</span>{dt}
                          <span className="text-[9px] font-semibold opacity-70 tracking-widest">{dt==="Albarán" ? "26alb-0XXX" : "26PRT-0XXX"}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      {s1.docType === "Presupuesto" ? "Nº de Presupuesto (Stel Order)" : "Nº de Albarán (Stel Order)"}
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <input type="text" inputMode="numeric" value={s1.orden} onChange={e=>u1("orden",e.target.value)}
                      placeholder={s1.docType === "Presupuesto" ? "Ej: 142" : "Ej: 275"}
                      className="w-full rounded-lg px-2.5 py-2 text-sm focus:outline-none"
                      style={inputStyle} onFocus={e=>e.target.style.borderColor=BRAND_RED} onBlur={e=>e.target.style.borderColor="#2d2d2d"} />
                    {albaranPreview && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-slate-500 text-xs">Referencia:</span>
                        <span className="font-black text-base tracking-widest" style={{ color:BRAND_RED }}>{albaranPreview}</span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl p-2.5 flex items-center justify-between" style={cardStyle}>
                    <div><p className="text-white font-semibold text-sm">Fecha</p><p className="text-slate-500 text-xs mt-0.5">Automática</p></div>
                    <span className="font-bold text-sm rounded-xl px-3 py-1.5" style={{ color:BRAND_RED, background:"rgba(177,9,37,0.12)", border:"1px solid rgba(177,9,37,0.3)" }}>{today}</span>
                  </div>

                  <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Tipo de Servicio <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Instalación","Avería"].map(tipo=>(
                        <button key={tipo} onClick={()=>u1("tipo",tipo)}
                          className="py-2.5 rounded-xl font-bold text-sm tracking-wide active:scale-95 flex flex-col items-center gap-1"
                          style={s1.tipo===tipo ? {background:"rgba(177,9,37,0.2)",border:"2px solid #b10925",color:"#f87171"} : {background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",color:"#6b7280"}}>
                          <span className="text-lg">{tipo==="Instalación"?"⚡":"🔴"}</span>{tipo}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step===2 && (
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg px-2.5 py-1.5 flex items-center gap-2" style={{ background:"rgba(177,9,37,0.1)", border:"1px solid rgba(177,9,37,0.2)" }}>
                    <span>🏅</span><p className="text-xs font-semibold text-red-300">Sello de Calidad Nimatel — Todos obligatorios</p>
                  </div>
                  <FieldRow label="Etiquetado Correcto" sublabel="¿Cables identificados en ambos extremos?" value={s2.etiquetado} onChange={v=>u2("etiquetado",v)} required />
                  <FieldRow label="Peinado y Fijación" sublabel="¿Cableado ordenado con bridas/velcros?" value={s2.peinado} onChange={v=>u2("peinado",v)} required />
                  <FieldRow label="Configuración" sublabel="¿Equipo/Router configurado y actualizado?" value={s2.config} onChange={v=>u2("config",v)} hasNA required />
                  <FieldRow label="Test de Funcionamiento" sublabel="¿Has medido la señal en todos los puntos?" value={s2.test} onChange={v=>u2("test",v)} required badge="Crítico" />
                  <FieldRow label="Cierre de Equipos" sublabel="¿Racks cerrados con llave y cajas tapadas?" value={s2.cierre} onChange={v=>u2("cierre",v)} required />
                </div>
              )}

              {step===3 && (
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg px-2.5 py-1.5 flex items-center gap-2" style={{ background:"rgba(14,116,144,0.1)", border:"1px solid rgba(14,116,144,0.25)" }}>
                    <span>🧹</span><p className="text-xs font-semibold text-sky-400">Dejar el lugar como lo encontraste</p>
                  </div>
                  <FieldRow label="Residuos Retirados" sublabel="¿Restos de cable, polvo y cajas vacías retirados?" value={s3.residuos} onChange={v=>u3("residuos",v)} required />
                  <FieldRow label="Inventario de Herramientas" sublabel="¿Taladro, fusionadora/medidor y portátil en la maleta?" value={s3.herramientas} onChange={v=>u3("herramientas",v)} required badge="Crítico" />
                  <FieldRow label="Material Sobrante Recogido" sublabel="¿Has recogido el material no utilizado?" value={s3.material} onChange={v=>u3("material",v)} required />
                </div>
              )}

              {step===4 && (
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg px-2.5 py-1.5 flex items-center gap-2" style={{ background:"rgba(88,28,135,0.15)", border:"1px solid rgba(126,34,206,0.25)" }}>
                    <span>📱</span><p className="text-xs font-semibold text-purple-400">Evidencias para Stel Order</p>
                  </div>
                  <FilePicker label="Foto del Antes" sublabel="Estado previo a la intervención" value={s4.fotoAntes} onChange={v=>u4("fotoAntes",v)} />
                  <CameraUploader label="Fotos del Después" sublabel="Instalación finalizada, rack ordenado, equipos con luces OK" value={s4.fotosDepues} onChange={v=>u4("fotosDepues",v)} />
                  <FieldRow label="Material Añadido al Albarán" sublabel="¿Material gastado añadido en Stel Order?" value={s4.materiales} onChange={v=>u4("materiales",v)} required />
                  <FieldRow label="Descripción Técnica" sublabel="¿Resolución técnica detallada en las notas?" value={s4.descripcion} onChange={v=>u4("descripcion",v)} required />
                </div>
              )}

              {step===5 && (
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg px-2.5 py-1.5 flex items-center gap-2" style={{ background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.25)" }}>
                    <span>🤝</span><p className="text-xs font-semibold text-green-400">Último paso — Cierre con el cliente</p>
                  </div>
                  <FieldRow label="Visto Bueno del Cliente" sublabel="¿El cliente ha comprobado que todo funciona?" value={s5.vistoBueno} onChange={v=>u5("vistoBueno",v)} required />
                  <FieldRow label="Firma del Albarán" sublabel="¿Tienes la firma digital del cliente en Stel Order?" value={s5.firma} onChange={v=>u5("firma",v)} required />
                  <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Método de Cobro <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      {PAYMENT_METHODS.map(m=>(
                        <button key={m} onClick={()=>u5("cobro",m)}
                          className="py-2 px-3 rounded-lg text-xs font-semibold text-left active:scale-95 transition-all"
                          style={s5.cobro===m ? {background:"rgba(177,9,37,0.2)",border:`1.5px solid ${BRAND_RED}`,color:"#f87171"} : {background:"#0a0a0a",border:"1px solid #2d2d2d",color:"#9ca3af"}}>
                          {s5.cobro===m?"● ":"○ "}{m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl p-2.5 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm">
                      Observaciones <span className="text-slate-500 font-normal ml-1 text-xs">(Opcional)</span>
                    </label>
                    <textarea value={s5.observaciones} onChange={e=>u5("observaciones",e.target.value)} rows={3}
                      placeholder="Incidencias, trabajos pendientes, notas relevantes..."
                      className="w-full rounded-lg px-2.5 py-2 text-sm focus:outline-none resize-none leading-relaxed"
                      style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=BRAND_RED} onBlur={e=>e.target.style.borderColor="#2d2d2d"} />
                  </div>
                </div>
              )}

              <Alert msg={error} />
            </div>
          )}
        </div>

        {!showReport && (
          <div className="px-3 py-2.5 sticky bottom-0" style={{ background:"rgba(15,10,11,0.97)", backdropFilter:"blur(12px)", borderTop:"1px solid rgba(177,9,37,0.15)" }}>
            <div className="flex gap-2">
              {step > 1 && (
                <button onClick={back} className="flex items-center gap-1.5 px-4 py-3 font-bold text-sm rounded-xl active:scale-95 text-slate-300"
                  style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)" }}>
                  <Icons.ChevL />Atrás
                </button>
              )}
              <button onClick={next}
                className="flex-1 flex items-center justify-center gap-2 py-3 font-black text-sm rounded-xl active:scale-95 text-white"
                style={{ background:BRAND_GRADIENT, boxShadow:"0 8px 20px rgba(177,9,37,0.3)" }}>
                {step===TOTAL_STEPS ? <><Icons.ClipOk />Finalizar y Ver Reporte</> : <>Continuar<Icons.ChevR /></>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
