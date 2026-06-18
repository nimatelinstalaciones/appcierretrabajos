import { useState, useRef } from "react";

// ─── Nimatel Brand ───────────────────────────────────────────────────────
const LOGO_PNG_B64 = "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";
const LOGO_SRC = `data:image/png;base64,${LOGO_PNG_B64}`;
const BRAND_RED = "#b10925";
const BRAND_GRADIENT = "linear-gradient(135deg, #bd0048, #b10925)";
const TECHNICIANS = ["Amador García García", "Carlos Campos Hernández", "Francisco Hernández Torrecillas", "Pedro Jiménez Fernández"];
const PAYMENT_METHODS = ["No aplica (Factura mensual)", "TPV", "Bizum", "Transferencia", "Efectivo"];
const DOC_TYPES = ["Albarán", "Presupuesto"];
const TOTAL_STEPS = 5;
const MIN_AFTER_PHOTOS = 3;

// ─── Albarán format: XXalb-0YYY ─────────────────────────────────────────
const getDocRef = (orden, docType) => {
  const yr = new Date().getFullYear().toString().slice(-2);
  const num = orden.trim().replace(/\D/g, "");
  if (!num) return null;
  const prefix = docType === "Presupuesto" ? `${yr}PRT` : `${yr}alb`;
  return `${prefix}-0${num}`;
};

// ─── Load jsPDF from CDN ──────────────────────────────────────────────────
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
          className="flex-1 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-150 active:scale-95"
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
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={cardStyle}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-semibold text-sm leading-tight">{label}</p>
            {required && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>}
            {badge && <span className="text-[10px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/30 px-1.5 py-0.5 rounded-full tracking-widest uppercase">{badge}</span>}
          </div>
          {sublabel && <p className="text-slate-400 text-xs mt-0.5 leading-snug">{sublabel}</p>}
        </div>
        {value === true  && <span className="text-green-400 mt-0.5 shrink-0"><Icons.Check /></span>}
        {value === false && <span className="text-red-400 mt-0.5 shrink-0"><Icons.X /></span>}
      </div>
      <Toggle value={value} onChange={onChange} hasNA={hasNA} />
    </div>
  );
}

// ─── Photo: Antes (file picker, single, optional) ─────────────────────────
function FilePicker({ label, sublabel, value, onChange }) {
  const ref = useRef();
  const handleFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    onChange({ name: f.name, url: URL.createObjectURL(f), file: f });
    e.target.value = "";
  };
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={cardStyle}>
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-semibold text-sm">{label}</p>
          <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full tracking-widest uppercase">Opcional</span>
          <span className="text-[10px] font-bold text-slate-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full tracking-widest">📁 Archivo</span>
        </div>
        {sublabel && <p className="text-slate-400 text-xs mt-0.5">{sublabel}</p>}
      </div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-green-500/30">
          <img src={value.url} alt="before" className="w-full h-32 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
            <p className="text-white text-xs truncate flex-1">{value.name}</p>
            <button onClick={() => onChange(null)} className="text-red-400 text-xs ml-2 font-semibold">✕</button>
          </div>
        </div>
      ) : (
        <button onClick={() => ref.current.click()}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl transition-colors active:scale-95"
          style={{ border: "2px dashed rgba(100,116,139,0.4)", color: "#64748b" }}>
          <Icons.Folder /><span className="font-semibold text-sm">Seleccionar de Archivos / Galería</span>
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Photo: Después (camera, multiple, min 3) ─────────────────────────────
function CameraUploader({ label, sublabel, value, onChange }) {
  const ref = useRef();
  const handleFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    onChange([...value, { name: f.name, url: URL.createObjectURL(f), file: f }]);
    e.target.value = "";
  };
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const ok = value.length >= MIN_AFTER_PHOTOS;
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={cardStyle}>
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-semibold text-sm">{label}</p>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Mín. {MIN_AFTER_PHOTOS} fotos</span>
          <span className="text-[10px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/30 px-1.5 py-0.5 rounded-full">📷 Cámara</span>
        </div>
        {sublabel && <p className="text-slate-400 text-xs mt-0.5">{sublabel}</p>}
      </div>

      {/* Progress */}
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

      {/* Thumbnails */}
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

      {/* Add button */}
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
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Step Bar ─────────────────────────────────────────────────────────────
function StepBar({ current }) {
  const labels = ["Inicio","Técnico","Limpieza","Evidencias","Cierre"];
  return (
    <div className="flex items-start justify-between px-1">
      {labels.map((l, i) => {
        const s = i + 1, done = s < current, active = s === current;
        return (
          <div key={l} className="flex flex-col items-center gap-1 flex-1">
            <div className="flex items-center w-full">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all"
                style={done ? { background: BRAND_RED, color: "white" } : active ? { background: "white", color: BRAND_RED } : { background: "#1e1e1e", color: "#6b7280" }}>
                {done ? "✓" : s}
              </div>
              {i < labels.length - 1 && <div className="flex-1 h-0.5 mx-1 rounded transition-all" style={{ background: done ? BRAND_RED : "#2d2d2d" }} />}
            </div>
            <span className="text-[9px] font-semibold tracking-wide uppercase"
              style={{ color: active ? "white" : done ? BRAND_RED : "#4b5563" }}>{l}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Validation Alert ──────────────────────────────────────────────────────
function Alert({ msg }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium"
      style={{ background: "rgba(177,9,37,0.1)", border: "1px solid rgba(177,9,37,0.4)", color: "#f87171" }}>
      <Icons.Alert /><span>{msg}</span>
    </div>
  );
}

// ─── PDF Generator ─────────────────────────────────────────────────────────
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

  // ── Header ──────────────────────────────────────────────────────────────
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

  // ── Helper: section header ───────────────────────────────────────────────
  const secHeader = (title) => {
    doc.setFillColor(240, 240, 240);
    doc.rect(M, y - 4, CW, 7, "F");
    doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(177, 9, 37);
    doc.text(title.toUpperCase(), M + 2, y + 0.5);
    y += 5; line(M, y, M + CW, y, [200, 200, 200]); y += 4;
  };

  // ── Helper: field row ────────────────────────────────────────────────────
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

  // ── 1. Datos del Servicio ─────────────────────────────────────────────────
  secHeader("1. Datos del Servicio");
  fRow("Técnico", data.s1.tecnico);
  fRow("Nº Orden / Cliente", data.s1.orden);
  fRow("Referencia Albarán (Stel Order)", albaranRef || "—");
  fRow("Tipo de Servicio", data.s1.tipo);
  nl(4);

  // ── 2. Verificación Técnica ───────────────────────────────────────────────
  secHeader("2. Verificación Técnica — Sello de Calidad");
  fRow("Etiquetado Correcto", data.s2.etiquetado);
  fRow("Peinado y Fijación", data.s2.peinado);
  fRow("Configuración (Router/Equipo)", data.s2.config);
  fRow("Test de Funcionamiento (Crítico)", data.s2.test);
  fRow("Cierre de Equipos (Racks/Registros)", data.s2.cierre);
  nl(4);

  // ── 3. Orden, Limpieza y Herramientas ─────────────────────────────────────
  secHeader("3. Orden, Limpieza y Herramientas");
  fRow("Residuos Retirados", data.s3.residuos);
  fRow("Inventario Herramientas (Crítico)", data.s3.herramientas);
  fRow("Material Sobrante Recogido", data.s3.material);
  nl(4);

  // ── 4. Gestión Stel Order ─────────────────────────────────────────────────
  secHeader("4. Gestión Stel Order");
  fRow("Foto del Antes adjuntada", data.s4.fotoAntes ? "✓ Sí — " + data.s4.fotoAntes.name : "No adjunta");
  fRow("Fotos del Después (nº)", `${data.s4.fotosDepues.length} foto(s) adjuntas`);
  fRow("Material Añadido al Albarán", data.s4.materiales);
  fRow("Descripción Técnica Registrada", data.s4.descripcion);
  nl(4);

  // ── 5. Cierre con el Cliente ──────────────────────────────────────────────
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

  // ── FOTOS ────────────────────────────────────────────────────────────────
  const allPhotos = [];
  if (data.s4.fotoAntes) allPhotos.push({ label: "Foto del Antes", photo: data.s4.fotoAntes });
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
        doc.setFillColor(0,0,0,0.4);
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

  // ── Footer on each page ───────────────────────────────────────────────────
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

// ─── Report Screen ─────────────────────────────────────────────────────────
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
      ["Referencia " + (data.s1.docType || "Documento"), albaranRef ? <span style={{ color: BRAND_RED }} className="font-black">{albaranRef}</span> : null],
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
      ["Foto Antes", data.s4.fotoAntes ? <span className="text-sky-400 text-xs">{data.s4.fotoAntes.name}</span> : <span className="text-slate-500 italic">No adjunta</span>],
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
      {/* Success header */}
      <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg,rgba(177,9,37,0.2),rgba(189,0,72,0.08))", border: "1px solid rgba(177,9,37,0.3)" }}>
        <div className="text-4xl mb-2">✅</div>
        <h2 className="text-white text-xl font-black tracking-tight">Parte Completado</h2>
        <p className="text-slate-400 text-xs mt-1">Protocolo Nimatel registrado correctamente</p>
        {albaranRef && (
          <div className="mt-3 inline-flex flex-col items-center rounded-2xl px-5 py-2.5" style={{ background: "rgba(177,9,37,0.15)", border: "1px solid rgba(177,9,37,0.4)" }}>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Referencia Stel Order</p>
            <p className="text-2xl font-black tracking-widest mt-0.5" style={{ color: BRAND_RED }}>{albaranRef}</p>
            <p className="text-slate-500 text-xs mt-0.5">{data.s1.tipo} · {data.s1.tecnico?.split(" ")[0]} · {data.s1.fecha}</p>
          </div>
        )}
      </div>

      {/* Fotos después preview */}
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

      {/* Stel Order attachment instructions */}
      {albaranRef && (
        <div className="rounded-2xl p-4" style={{ background: "rgba(14,116,144,0.08)", border: "1px solid rgba(14,116,144,0.25)" }}>
          <p className="text-sky-400 font-bold text-sm mb-2">📎 Adjuntar a Stel Order</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            Abre el {data.s1.docType === "Presupuesto" ? "presupuesto" : "albarán"} <span className="text-sky-300 font-bold">{albaranRef}</span> en Stel Order y adjunta:
          </p>
          <ol className="mt-2 space-y-1">
            {["El PDF generado (parte del servicio)", ...data.s4.fotosDepues.map((p,i) => `Foto después #${i+1}: ${p.name}`), ...(data.s4.fotoAntes ? [`Foto antes: ${data.s4.fotoAntes.name}`] : [])].map((item, i) => (
              <li key={i} className="text-slate-300 text-xs flex items-start gap-1.5"><span style={{ color: BRAND_RED }} className="font-bold shrink-0">{i+1}.</span>{item}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 mt-1">
        <button onClick={handlePDF} disabled={generating}
          className="w-full py-4 font-black text-base rounded-2xl tracking-wide active:scale-95 transition-all flex items-center justify-center gap-2 text-white"
          style={{ background: generating ? "rgba(177,9,37,0.4)" : BRAND_GRADIENT, boxShadow: "0 8px 24px rgba(177,9,37,0.3)" }}>
          {generating ? <><Icons.Spin />Generando PDF...</> : pdfDone ? <>✓ PDF Descargado — Generar de Nuevo</> : <><Icons.PDF />Generar y Descargar PDF</>}
        </button>
        <button onClick={onReset} className="w-full py-3.5 font-bold text-sm rounded-2xl active:scale-95 transition-transform text-slate-300"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          ＋ Nuevo Parte de Servicio
        </button>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const today = new Date().toLocaleDateString("es-ES", { day:"2-digit", month:"2-digit", year:"numeric" });
  const [step, setStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState("");
  const [s1, setS1] = useState({ tecnico:"", orden:"", fecha:today, tipo:"", docType:"" });
  const [s2, setS2] = useState({ etiquetado:null, peinado:null, config:null, test:null, cierre:null });
  const [s3, setS3] = useState({ residuos:null, herramientas:null, material:null });
  const [s4, setS4] = useState({ fotoAntes:null, fotosDepues:[], materiales:null, descripcion:null });
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
    setS4({fotoAntes:null,fotosDepues:[],materiales:null,descripcion:null});
    setS5({vistoBueno:null,firma:null,cobro:"",observaciones:""});
  };

  const titles    = ["","Datos del Servicio","Verificación Técnica","Orden y Limpieza","Evidencias Stel Order","Cierre con el Cliente"];
  const subtitles = ["","Datos básicos del parte","Sello de calidad Nimatel","Evitar pérdidas y dejar el lugar limpio","Gestión documental en la app","Confirmación y cobro"];

  const albaranPreview = getDocRef(s1.orden, s1.docType);

  return (
    <div className="min-h-screen flex items-start justify-center" style={{ background: "#090608", fontFamily: "'Trebuchet MS','Avenir',sans-serif" }}>
      <div className="w-full max-w-md min-h-screen flex flex-col" style={{ background: "#0f0a0b" }}>

        {/* ── HEADER ── */}
        <div className="px-5 pt-5 pb-4 sticky top-0 z-10" style={{ background:"rgba(15,10,11,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(177,9,37,0.2)" }}>
          <div className="flex items-center gap-3 mb-5">
            <img src={LOGO_SRC} alt="Nimatel" className="h-10 w-auto object-contain" />
            <div className="border-l border-white/10 pl-3">
              <p className="text-white font-black text-sm tracking-tight uppercase" style={{ letterSpacing:"0.05em" }}>Check App</p>
              <p className="text-xs mt-0.5" style={{ color:BRAND_RED }}>Protocolo de Cierre · {today}</p>
            </div>
          </div>
          {!showReport && <StepBar current={step} />}
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 px-4 pt-4 pb-4 overflow-y-auto" style={{ maxHeight:"calc(100vh - 156px)" }}>
          {showReport ? (
            <ReportScreen data={{ s1,s2,s3,s4,s5 }} onReset={reset} />
          ) : (
            <div className="flex flex-col gap-4 pb-4">
              <div>
                <h2 className="text-white font-black text-xl tracking-tight">{titles[step]}</h2>
                <p className="text-slate-500 text-xs mt-0.5">{subtitles[step]}</p>
              </div>

              {/* STEP 1 */}
              {step===1 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl p-4 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Técnico <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <select value={s1.tecnico} onChange={e=>u1("tecnico",e.target.value)}
                      className="w-full rounded-xl px-3 py-3 text-sm appearance-none focus:outline-none"
                      style={inputStyle} onFocus={e=>e.target.style.borderColor=BRAND_RED} onBlur={e=>e.target.style.borderColor="#2d2d2d"}>
                      <option value="" style={{background:"#0a0a0a"}}>— Seleccionar técnico —</option>
                      {TECHNICIANS.map(t=><option key={t} style={{background:"#0a0a0a"}}>{t}</option>)}
                    </select>
                  </div>

                  <div className="rounded-2xl p-4 flex flex-col gap-2" style={cardStyle}>
                  {/* Tipo de documento */}
                  <div className="rounded-2xl p-4 flex flex-col gap-3" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Tipo de Documento
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {DOC_TYPES.map(dt=>(
                        <button key={dt} onClick={()=>u1("docType",dt)}
                          className="py-4 rounded-2xl font-black text-sm tracking-wide active:scale-95 flex flex-col items-center gap-1.5"
                          style={s1.docType===dt ? {background:"rgba(177,9,37,0.2)",border:"2px solid #b10925",color:"#f87171"} : {background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",color:"#6b7280"}}>
                          <span className="text-xl">{dt==="Albarán"?"📋":"📝"}</span>{dt}
                          <span className="text-[9px] font-semibold opacity-70 tracking-widest">
                            {dt==="Albarán" ? "26alb-0XXX" : "26PRT-0XXX"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      {s1.docType === "Presupuesto" ? "Nº de Presupuesto (Stel Order)" : "Nº de Albarán (Stel Order)"} <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <input type="text" inputMode="numeric" value={s1.orden} onChange={e=>u1("orden",e.target.value)}
                      placeholder={s1.docType === "Presupuesto" ? "Ej: 142" : "Ej: 275"}
                      className="w-full rounded-xl px-3 py-3 text-sm focus:outline-none"
                      style={inputStyle} onFocus={e=>e.target.style.borderColor=BRAND_RED} onBlur={e=>e.target.style.borderColor="#2d2d2d"} />
                    {albaranPreview && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-slate-500 text-xs">Referencia:</span>
                        <span className="font-black text-base tracking-widest" style={{ color:BRAND_RED }}>{albaranPreview}</span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl p-4 flex items-center justify-between" style={cardStyle}>
                    <div><p className="text-white font-semibold text-sm">Fecha</p><p className="text-slate-500 text-xs mt-0.5">Automática</p></div>
                    <span className="font-bold text-sm rounded-xl px-3 py-1.5" style={{ color:BRAND_RED, background:"rgba(177,9,37,0.12)", border:"1px solid rgba(177,9,37,0.3)" }}>{today}</span>
                  </div>

                  <div className="rounded-2xl p-4 flex flex-col gap-3" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Tipo de Servicio <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Instalación","Avería"].map(tipo=>(
                        <button key={tipo} onClick={()=>u1("tipo",tipo)}
                          className="py-5 rounded-2xl font-black text-base tracking-wide active:scale-95 flex flex-col items-center gap-1.5"
                          style={s1.tipo===tipo ? {background:"rgba(177,9,37,0.2)",border:"2px solid #b10925",color:"#f87171"} : {background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",color:"#6b7280"}}>
                          <span className="text-2xl">{tipo==="Instalación"?"⚡":"🔴"}</span>{tipo}
                        </button>
                      ))}
                    </div>
                  </div>

              )}

              {/* STEP 2 */}
              {step===2 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl px-3 py-2 flex items-center gap-2" style={{ background:"rgba(177,9,37,0.1)", border:"1px solid rgba(177,9,37,0.2)" }}>
                    <span>🏅</span><p className="text-xs font-semibold text-red-300">Sello de Calidad Nimatel — Todos obligatorios</p>
                  </div>
                  <FieldRow label="Etiquetado Correcto" sublabel="¿Cables identificados en ambos extremos?" value={s2.etiquetado} onChange={v=>u2("etiquetado",v)} required />
                  <FieldRow label="Peinado y Fijación" sublabel="¿Cableado ordenado con bridas/velcros?" value={s2.peinado} onChange={v=>u2("peinado",v)} required />
                  <FieldRow label="Configuración" sublabel="¿Equipo/Router configurado y actualizado?" value={s2.config} onChange={v=>u2("config",v)} hasNA required />
                  <FieldRow label="Test de Funcionamiento" sublabel="¿Has medido la señal en todos los puntos?" value={s2.test} onChange={v=>u2("test",v)} required badge="Crítico" />
                  <FieldRow label="Cierre de Equipos" sublabel="¿Racks cerrados con llave y cajas tapadas?" value={s2.cierre} onChange={v=>u2("cierre",v)} required />
                </div>
              )}

              {/* STEP 3 */}
              {step===3 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl px-3 py-2 flex items-center gap-2" style={{ background:"rgba(14,116,144,0.1)", border:"1px solid rgba(14,116,144,0.25)" }}>
                    <span>🧹</span><p className="text-xs font-semibold text-sky-400">Dejar el lugar como lo encontraste</p>
                  </div>
                  <FieldRow label="Residuos Retirados" sublabel="¿Restos de cable, polvo y cajas vacías retirados?" value={s3.residuos} onChange={v=>u3("residuos",v)} required />
                  <FieldRow label="Inventario de Herramientas" sublabel="¿Taladro, fusionadora/medidor y portátil en la maleta?" value={s3.herramientas} onChange={v=>u3("herramientas",v)} required badge="Crítico" />
                  <FieldRow label="Material Sobrante Recogido" sublabel="¿Has recogido el material no utilizado?" value={s3.material} onChange={v=>u3("material",v)} required />
                </div>
              )}

              {/* STEP 4 */}
              {step===4 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl px-3 py-2 flex items-center gap-2" style={{ background:"rgba(88,28,135,0.15)", border:"1px solid rgba(126,34,206,0.25)" }}>
                    <span>📱</span><p className="text-xs font-semibold text-purple-400">Evidencias para Stel Order</p>
                  </div>
                  <FilePicker
                    label="Foto del Antes"
                    sublabel="Selecciona de galería o archivos — estado previo a la intervención"
                    value={s4.fotoAntes}
                    onChange={v=>u4("fotoAntes",v)} />
                  <CameraUploader
                    label="Fotos del Después"
                    sublabel="Instalación finalizada, rack ordenado, equipos con luces OK"
                    value={s4.fotosDepues}
                    onChange={v=>u4("fotosDepues",v)} />
                  <FieldRow label="Material Añadido al Albarán" sublabel="¿Material gastado añadido en Stel Order?" value={s4.materiales} onChange={v=>u4("materiales",v)} required />
                  <FieldRow label="Descripción Técnica" sublabel="¿Resolución técnica detallada en las notas?" value={s4.descripcion} onChange={v=>u4("descripcion",v)} required />
                </div>
              )}

              {/* STEP 5 */}
              {step===5 && (
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl px-3 py-2 flex items-center gap-2" style={{ background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.25)" }}>
                    <span>🤝</span><p className="text-xs font-semibold text-green-400">Último paso — Cierre con el cliente</p>
                  </div>
                  <FieldRow label="Visto Bueno del Cliente" sublabel="¿El cliente ha comprobado que todo funciona?" value={s5.vistoBueno} onChange={v=>u5("vistoBueno",v)} required />
                  <FieldRow label="Firma del Albarán" sublabel="¿Tienes la firma digital del cliente en Stel Order?" value={s5.firma} onChange={v=>u5("firma",v)} required />

                  <div className="rounded-2xl p-4 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm flex items-center gap-2">
                      Método de Cobro <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-widest uppercase" style={badgeRed}>Obligatorio</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      {PAYMENT_METHODS.map(m=>(
                        <button key={m} onClick={()=>u5("cobro",m)}
                          className="py-3 px-4 rounded-xl text-sm font-semibold text-left active:scale-95 transition-all"
                          style={s5.cobro===m ? {background:"rgba(177,9,37,0.2)",border:`1.5px solid ${BRAND_RED}`,color:"#f87171"} : {background:"#0a0a0a",border:"1px solid #2d2d2d",color:"#9ca3af"}}>
                          {s5.cobro===m?"● ":"○ "}{m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 flex flex-col gap-2" style={cardStyle}>
                    <label className="text-white font-semibold text-sm">
                      Observaciones <span className="text-slate-500 font-normal ml-1 text-xs">(Opcional)</span>
                    </label>
                    <textarea value={s5.observaciones} onChange={e=>u5("observaciones",e.target.value)} rows={4}
                      placeholder="Incidencias, trabajos pendientes, notas relevantes..."
                      className="w-full rounded-xl px-3 py-3 text-sm focus:outline-none resize-none leading-relaxed"
                      style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=BRAND_RED} onBlur={e=>e.target.style.borderColor="#2d2d2d"} />
                  </div>
                </div>
              )}

              <Alert msg={error} />
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        {!showReport && (
          <div className="px-4 py-4 sticky bottom-0" style={{ background:"rgba(15,10,11,0.97)", backdropFilter:"blur(12px)", borderTop:"1px solid rgba(177,9,37,0.15)" }}>
            <div className="flex gap-3">
              {step > 1 && (
                <button onClick={back} className="flex items-center gap-1.5 px-5 py-4 font-bold text-sm rounded-2xl active:scale-95 text-slate-300"
                  style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)" }}>
                  <Icons.ChevL />Atrás
                </button>
              )}
              <button onClick={next}
                className="flex-1 flex items-center justify-center gap-2 py-4 font-black text-base rounded-2xl active:scale-95 text-white"
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
