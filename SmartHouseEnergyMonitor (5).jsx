import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Zap, LayoutDashboard, Plug, Receipt, Lightbulb, Leaf, Target,
  ArrowLeftRight, FileText, Newspaper, Moon, Sun, Plus, Trash2,
  Search, X, Check, TrendingUp, TrendingDown, ArrowRight, Sparkles,
  Gauge, PiggyBank, TreePine, Car, ChevronRight, Menu, Pencil, Download,
  Printer, ShieldCheck, Mail, Settings as SettingsIcon, LogOut,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  THEME TOKENS                                                       */
/* ------------------------------------------------------------------ */
const C = {
  light: {
    accent: "#0c6b72", accentSoft: "#d3e7e7", eco: "#2f8f5b", ecoSoft: "#d3ead9",
    gold: "#bf8417", danger: "#cf5a43", text: "#14201c", textSoft: "#5b665f", grid: "#dde3df",
    surface: "#ffffff", track: "#e6ebe6",
  },
  dark: {
    accent: "#27a7af", accentSoft: "#0e3a3d", eco: "#46b483", ecoSoft: "#123a2c",
    gold: "#e0a23a", danger: "#e07a63", text: "#e7efe9", textSoft: "#9fb0a6", grid: "#283631",
    surface: "#11201c", track: "#1c2b25",
  },
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

.she-root{
  --bg:#eef1ed; --bg2:#f6f8f5; --surface:#ffffff; --surface2:#f3f6f2;
  --text:#14201c; --soft:#5b665f; --faint:#8a958c; --border:#dde3df; --border2:#cdd6cf;
  --accent:#0c6b72; --accent2:#0a565c; --accentb:#0f8a92; --eco:#2f8f5b; --gold:#bf8417; --danger:#cf5a43;
  --track:#e6ebe6; --inkdot:rgba(20,32,28,.05); --on-accent:#ffffff;
  --shadow:0 1px 0 rgba(20,40,34,.04),0 12px 30px -24px rgba(16,40,36,.4);
}
.she-root.dark{
  --bg:#0b1411; --bg2:#0f1a16; --surface:#11201c; --surface2:#16241f;
  --text:#e7efe9; --soft:#9fb0a6; --faint:#6f8077; --border:#25332d; --border2:#324138;
  --accent:#27a7af; --accent2:#1f8b92; --accentb:#3fc3cb; --eco:#46b483; --gold:#e0a23a; --danger:#e07a63;
  --track:#1c2b25; --inkdot:rgba(255,255,255,.045); --on-accent:#04201f;
  --shadow:0 1px 0 rgba(0,0,0,.3),0 18px 40px -26px rgba(0,0,0,.8);
}
.she-root{font-family:'Hanken Grotesk',ui-sans-serif,system-ui,sans-serif;color:var(--text);
  background:var(--bg);min-height:100vh;line-height:1.5;-webkit-font-smoothing:antialiased;}
.she-root *{box-sizing:border-box;}
.she-bg{position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:
    radial-gradient(circle at 1px 1px,var(--inkdot) 1px,transparent 0),
    radial-gradient(125% 70% at 50% -8%,color-mix(in srgb,var(--accent) 8%,transparent),transparent 62%);
  background-size:24px 24px,100% 100%;}

.display{font-family:'Space Grotesk',system-ui,sans-serif;letter-spacing:-.02em;}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums;}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);}

.glass{background:var(--surface);border:1px solid var(--border);}
.panel{background:var(--surface);border:1px solid var(--border);}
.card{background:var(--surface);border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);}
.hair{border-color:var(--border);}

.btn{font-family:'Space Grotesk',inherit;font-weight:600;font-size:14px;cursor:pointer;border:1px solid transparent;
  border-radius:10px;padding:10px 16px;display:inline-flex;align-items:center;gap:8px;letter-spacing:-.01em;
  transition:transform .12s ease,background .18s ease,border-color .18s,color .18s;}
.btn:active{transform:translateY(1px);}
.btn-accent{background:var(--accent);color:var(--on-accent);}
.btn-accent:hover{background:var(--accentb);}
.btn-eco{background:var(--eco);color:#fff;}
.btn-ghost{background:transparent;color:var(--text);border-color:var(--border2);}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
.btn-soft{background:var(--surface2);color:var(--text);border-color:var(--border);}
.btn-soft:hover{border-color:var(--border2);}

.input,.select{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:var(--text);background:var(--surface2);
  border:1px solid var(--border2);border-radius:9px;padding:10px 12px;width:100%;outline:none;
  transition:border-color .15s,box-shadow .15s;}
.input:focus,.select:focus{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 24%,transparent);}
.lbl{font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:600;color:var(--soft);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px;display:block;}

.chip{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;padding:5px 10px;border-radius:7px;display:inline-flex;
  align-items:center;gap:6px;border:1px solid var(--border2);background:var(--surface2);color:var(--soft);letter-spacing:.03em;}
.chip-accent{background:var(--accent);color:var(--on-accent);border-color:transparent;}

.navlink{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:9px;
  font-size:14px;font-weight:600;color:var(--soft);cursor:pointer;border:1px solid transparent;
  transition:background .15s,color .15s;width:100%;text-align:left;background:none;font-family:'Space Grotesk',inherit;letter-spacing:-.01em;}
.navlink:hover{background:var(--surface2);color:var(--text);}
.navlink.active{background:var(--accent);color:var(--on-accent);}


.tbl{width:100%;border-collapse:collapse;font-size:13.5px;}
.tbl th{text-align:left;font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--soft);font-size:10.5px;letter-spacing:.08em;
  text-transform:uppercase;padding:9px 12px;border-bottom:1px solid var(--border);}
.tbl td{padding:11px 12px;border-bottom:1px solid var(--border);}
.tbl tr:last-child td{border-bottom:none;}
.tbl tbody tr:hover{background:var(--surface2);}

.switch{width:44px;height:25px;border-radius:7px;background:var(--track);position:relative;
  cursor:pointer;transition:background .2s;border:none;flex:none;}
.switch.on{background:var(--accent);}
.switch span{position:absolute;top:3px;left:3px;width:19px;height:19px;border-radius:5px;
  background:#fff;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.3);}
.switch.on span{left:22px;}

@keyframes rise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.rise{animation:rise .5s cubic-bezier(.2,.7,.2,1) both;}
@keyframes grow{from{transform:scaleX(0);}to{transform:scaleX(1);}}
@keyframes dashin{from{stroke-dashoffset:var(--len);}to{stroke-dashoffset:0;}}
@keyframes pulse{0%,100%{opacity:.4;}50%{opacity:1;}}
.live-dot{width:8px;height:8px;border-radius:50%;background:var(--eco);animation:pulse 1.8s infinite;}

.bar-track{height:9px;border-radius:5px;background:var(--track);overflow:hidden;}
.bar-fill{height:100%;border-radius:5px;transform-origin:left;animation:grow .7s cubic-bezier(.2,.7,.2,1) both;}
.seg-row{display:flex;gap:4px;}
.seg{flex:1;height:11px;border-radius:3px;background:var(--track);transform-origin:left;}

.she-root ::-webkit-scrollbar{width:11px;height:11px;}
.she-root ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:99px;border:3px solid var(--bg);}
.she-root ::-webkit-scrollbar-track{background:transparent;}

.recharts-cartesian-axis-tick text{font-family:'JetBrains Mono',monospace;font-size:11px;}

@media (prefers-reduced-motion: reduce){
  .rise,.bar-fill,.seg,.live-dot{animation:none!important;}
  .btn{transition:none;}
}

@media print{
  .no-print{display:none!important;}
  .print-full{position:static!important;width:100%!important;}
  .she-root{background:#fff;}
  .card{box-shadow:none;border:1px solid #ddd;}
}
`;

/* ------------------------------------------------------------------ */
/*  APPLIANCE LIBRARY                                                  */
/* ------------------------------------------------------------------ */
const LIBRARY = [
  ["Refrigerator", 150, 8, 7, "Kitchen"], ["Freezer", 200, 8, 7, "Kitchen"],
  ["Fridge-Freezer", 200, 8, 7, "Kitchen"], ["Microwave", 1000, 0.3, 7, "Kitchen"],
  ["Electric Oven", 2100, 1, 5, "Kitchen"], ["Electric Hob", 2000, 0.7, 7, "Kitchen"],
  ["Kettle", 3000, 0.3, 7, "Kitchen"], ["Toaster", 1000, 0.2, 7, "Kitchen"],
  ["Air Fryer", 1500, 0.5, 5, "Kitchen"], ["Dishwasher", 1200, 1, 5, "Kitchen"],
  ["Coffee Machine", 1000, 0.3, 7, "Kitchen"], ["Slow Cooker", 250, 6, 2, "Kitchen"],
  ["Washing Machine", 700, 1, 4, "Laundry"], ["Tumble Dryer", 2500, 1, 3, "Laundry"],
  ["Iron", 1800, 0.3, 2, "Laundry"], ["Television (LED 50\")", 100, 4, 7, "Entertainment"],
  ["Streaming / TV Box", 15, 4, 7, "Entertainment"], ["Games Console", 150, 2, 5, "Entertainment"],
  ["Gaming PC", 500, 3, 6, "Office"], ["Desktop PC", 200, 4, 7, "Office"],
  ["Laptop", 50, 5, 7, "Office"], ["Monitor", 30, 5, 7, "Office"],
  ["Wi-Fi Router", 10, 24, 7, "Office"], ["Phone Charger", 5, 3, 7, "Office"],
  ["Tablet Charger", 10, 2, 7, "Office"], ["Printer", 30, 0.2, 3, "Office"],
  ["Sound System", 60, 2, 7, "Entertainment"], ["LED Bulb", 10, 5, 7, "Lighting"],
  ["Halogen Bulb", 50, 5, 7, "Lighting"], ["Incandescent Bulb", 60, 5, 7, "Lighting"],
  ["Electric Heater", 2000, 3, 5, "Heating"], ["Oil Radiator", 1500, 3, 5, "Heating"],
  ["Electric Blanket", 100, 1, 7, "Heating"], ["Fan", 50, 4, 3, "Cooling"],
  ["Air Conditioner", 1200, 4, 3, "Cooling"], ["Dehumidifier", 300, 4, 4, "Cooling"],
  ["Heated Towel Rail", 300, 2, 7, "Heating"], ["Immersion Heater", 3000, 1.5, 7, "Heating"],
  ["EV Charger", 7000, 2, 4, "Other"], ["Hot Tub", 2000, 2, 3, "Other"],
  ["Pool Pump", 1100, 4, 7, "Other"], ["Vacuum Cleaner", 900, 0.3, 3, "Other"],
  ["Hair Dryer", 1800, 0.2, 7, "Other"], ["Electric Shower", 8500, 0.2, 7, "Other"],
].map(([name, watts, hoursPerDay, daysPerWeek, category]) => ({ name, watts, hoursPerDay, daysPerWeek, category }));

const STARTER = [
  { name: "Refrigerator", watts: 150, hoursPerDay: 8, daysPerWeek: 7, quantity: 1 },
  { name: "Television (LED 50\")", watts: 100, hoursPerDay: 4, daysPerWeek: 7, quantity: 1 },
  { name: "Gaming PC", watts: 500, hoursPerDay: 3, daysPerWeek: 6, quantity: 1 },
  { name: "Washing Machine", watts: 700, hoursPerDay: 1, daysPerWeek: 4, quantity: 1 },
  { name: "LED Bulb", watts: 10, hoursPerDay: 5, daysPerWeek: 7, quantity: 12 },
  { name: "Wi-Fi Router", watts: 10, hoursPerDay: 24, daysPerWeek: 7, quantity: 1 },
  { name: "Kettle", watts: 3000, hoursPerDay: 0.3, daysPerWeek: 7, quantity: 1 },
].map((a, i) => ({ ...a, id: "seed-" + i }));

const DEFAULTS = {
  pricePerKWh: 0.27, standingCharge: 0.6, carbonFactor: 0.207,
  currency: "£", supplier: "", name: "",
};
const BENCHMARK = 2700; // UK typical annual electricity (kWh)
const TARIFFS = [
  { name: "Standard Variable (Price Cap)", unit: 27.0, standing: 60.0, tag: "Default" },
  { name: "12-Month Fixed Saver", unit: 25.4, standing: 55.0, tag: "Fixed" },
  { name: "Green Energy Fixed", unit: 26.2, standing: 58.0, tag: "100% renewable" },
  { name: "EV Smart Off-Peak", unit: 22.0, standing: 62.0, tag: "Best for EV / night use" },
  { name: "Economy 7 (blended)", unit: 24.5, standing: 65.0, tag: "Night storage" },
];

/* ------------------------------------------------------------------ */
/*  CALCULATIONS                                                       */
/* ------------------------------------------------------------------ */
function calcAppliance(a, price) {
  const q = a.quantity || 1;
  const weeklyKWh = (a.watts * a.hoursPerDay * a.daysPerWeek * q) / 1000;
  return {
    dailyKWh: weeklyKWh / 7,
    weeklyKWh,
    monthlyKWh: (weeklyKWh * 52) / 12,
    annualKWh: weeklyKWh * 52,
    annualCost: weeklyKWh * 52 * price,
  };
}
const SEASON = [1.18, 1.12, 1.06, 0.96, 0.88, 0.82, 0.8, 0.82, 0.92, 1.04, 1.12, 1.18];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function computeStats(appliances, s) {
  const price = s.pricePerKWh;
  const per = appliances.map((a) => ({ ...a, ...calcAppliance(a, price) }));
  const annualKWh = per.reduce((t, a) => t + a.annualKWh, 0);
  const standingYear = s.standingCharge * 365;
  const annualCost = annualKWh * price + standingYear;
  const carbonKg = annualKWh * s.carbonFactor;
  const breakdown = [...per].sort((a, b) => b.annualKWh - a.annualKWh);
  const seasonAvg = SEASON.reduce((a, b) => a + b, 0) / 12;
  const monthly = MONTHS.map((m, i) => {
    const kwh = (annualKWh / 12) * (SEASON[i] / seasonAvg);
    return { month: m, kWh: +kwh.toFixed(1), cost: +(kwh * price + s.standingCharge * 30.42).toFixed(2) };
  });
  const score = Math.max(5, Math.min(99, Math.round(110 - (annualKWh / BENCHMARK) * 45)));
  return {
    per, breakdown, annualKWh, monthlyKWh: annualKWh / 12, dailyKWh: annualKWh / 365,
    annualCost, monthlyCost: annualCost / 12, dailyCost: annualCost / 365, standingYear,
    carbonKg, trees: carbonKg / 21, drivingMiles: carbonKg / 0.271, score, monthly,
    vsBenchmark: annualKWh / BENCHMARK - 1, top: breakdown[0] || null, price,
  };
}

function buildRecs(st, appliances, s) {
  const recs = [];
  const has = (n) => appliances.find((a) => a.name.toLowerCase().includes(n));
  if (st.top && st.annualKWh > 0) {
    const pct = Math.round((st.top.annualKWh / st.annualKWh) * 100);
    recs.push({
      icon: Zap, tone: pct > 25 ? "danger" : "accent",
      title: `Your ${st.top.name.toLowerCase()} accounts for ${pct}% of total household energy usage.`,
      detail: pct > 25
        ? `That's a big chunk of your bill (~${money(st.top.annualCost, s)}/yr). Cutting its runtime even slightly compounds fast.`
        : `It uses about ${money(st.top.annualCost, s)} of electricity per year.`,
    });
  }
  const bad = appliances.filter((a) => /halogen|incandescent/i.test(a.name));
  if (bad.length) {
    const wasted = bad.reduce((t, a) => t + calcAppliance(a, s.pricePerKWh).annualCost, 0) * 0.85;
    recs.push({ icon: Lightbulb, tone: "eco", title: `Switching your remaining ${bad.length} halogen/incandescent bulb${bad.length > 1 ? "s" : ""} to LED could save ~${money(wasted, s)} annually.`, detail: "LEDs use ~85% less energy for the same brightness and last far longer." });
  } else {
    recs.push({ icon: Lightbulb, tone: "eco", title: "Switching any remaining halogen bulbs to LED could save roughly £40–£120 per year.", detail: "LEDs draw about a tenth of the power of old bulbs." });
  }
  const dryer = has("tumble dryer");
  if (dryer) {
    const c = calcAppliance(dryer, s.pricePerKWh).annualCost;
    recs.push({ icon: TrendingDown, tone: "accent", title: `Reducing tumble-dryer use by 20% could lower yearly costs by ~${money(c * 0.2, s)}.`, detail: "Air-drying two loads a week is one of the highest-impact changes most homes can make." });
  }
  const ev = has("ev charger");
  if (ev) recs.push({ icon: Car, tone: "eco", title: "Charging your EV on an off-peak tariff could cut its running cost by 30–60%.", detail: "Night rates (e.g. EV Smart) are often 8–14p/kWh versus the 27p day rate." });
  if (st.vsBenchmark > 0.05) {
    recs.push({ icon: Target, tone: "danger", title: `Your usage is about ${Math.round(st.vsBenchmark * 100)}% above the UK average home.`, detail: `Setting a 10% reduction goal would save roughly ${money(st.annualCost * 0.1, s)} a year.` });
  } else if (appliances.length) {
    recs.push({ icon: Check, tone: "eco", title: "You're already below the average UK household for electricity. Nice work.", detail: `The typical home uses ~${BENCHMARK.toLocaleString()} kWh/yr; you're at ${Math.round(st.annualKWh).toLocaleString()} kWh.` });
  }
  recs.push({ icon: PiggyBank, tone: "accent", title: "Eliminating standby on entertainment devices could save £30–£65 a year.", detail: "TVs, consoles and speakers left on standby quietly add up over twelve months." });
  return recs.slice(0, 5);
}

/* ------------------------------------------------------------------ */
/*  FORMAT HELPERS                                                     */
/* ------------------------------------------------------------------ */
const fmt = (n, dp = 0) => (isFinite(n) ? n : 0).toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp });
const money = (n, s, force) => `${s.currency}${fmt(n, force != null ? force : n >= 1000 ? 0 : 2)}`;
const kwh = (n) => `${fmt(n, n >= 100 ? 0 : 1)} kWh`;

/* ------------------------------------------------------------------ */
/*  STORAGE — uses the host storage API in preview, falls back to        */
/*  localStorage on a real website so data persists between visits.       */
/* ------------------------------------------------------------------ */
const _ws = typeof window !== "undefined" && window.storage ? window.storage : null;
const _ls = (() => { try { return typeof window !== "undefined" && window.localStorage ? window.localStorage : null; } catch { return null; } })();
async function load(key, fallback) {
  const k = "she:" + key;
  try {
    if (_ws) { const r = await _ws.get(k); return r ? JSON.parse(r.value) : fallback; }
    if (_ls) { const r = _ls.getItem(k); return r ? JSON.parse(r) : fallback; }
  } catch { /* noop */ }
  return fallback;
}
async function save(key, value) {
  const k = "she:" + key;
  try {
    if (_ws) { await _ws.set(k, JSON.stringify(value)); return; }
    if (_ls) { _ls.setItem(k, JSON.stringify(value)); }
  } catch { /* noop */ }
}

/* ------------------------------------------------------------------ */
/*  SMALL UI PRIMITIVES                                                */
/* ------------------------------------------------------------------ */
function Stat({ icon: Icon, label, value, sub, tone = "accent", delay = 0, theme }) {
  const col = tone === "eco" ? "var(--eco)" : tone === "danger" ? "var(--danger)" : tone === "gold" ? "var(--gold)" : "var(--accent)";
  return (
    <div className="card rise" style={{ padding: 18, animationDelay: delay + "ms", position: "relative", overflow: "hidden" }}>
      <span style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: col }} />
      <div className="flex items-center justify-between mb-3" style={{ marginTop: 2 }}>
        <span className="lbl" style={{ margin: 0 }}>{label}</span>
        <Icon size={17} style={{ color: col }} />
      </div>
      <div className="mono" style={{ fontSize: 27, fontWeight: 600, lineHeight: 1, letterSpacing: "-.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12.5, color: "var(--soft)", marginTop: 7 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ icon: Icon, kicker, title, desc, theme, right }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
      <div>
        {kicker && <div className="eyebrow mb-2" style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon size={13} />{kicker}</div>}
        <h1 className="display" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-.025em" }}>{title}</h1>
        {desc && <p style={{ color: "var(--soft)", marginTop: 6, fontSize: 14.5, maxWidth: 620 }}>{desc}</p>}
      </div>
      {right}
    </div>
  );
}

function Gauge2({ value, theme }) {
  const col = value >= 70 ? theme.eco : value >= 45 ? theme.accent : theme.danger;
  const r = 66, cx = 80, cy = 80, len = Math.PI * r;
  const off = len * (1 - value / 100);
  return (
    <svg viewBox="0 0 160 92" style={{ width: "100%", maxWidth: 200 }}>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--track)" strokeWidth="13" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={col} strokeWidth="13" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={off} style={{ transition: "stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)" }} />
      <text x={cx} y={cy - 8} textAnchor="middle" className="mono" style={{ fontSize: 29, fontWeight: 700, fill: "var(--text)" }}>{value}</text>
      <text x={cx} y={cy + 8} textAnchor="middle" className="mono" style={{ fontSize: 9.5, fill: "var(--soft)" }}>/ 100</text>
    </svg>
  );
}

function ChartTip({ theme, suffix = "" }) {
  return ({ active, payload, label }) =>
    active && payload && payload.length ? (
      <div className="glass" style={{ borderRadius: 10, padding: "8px 11px", fontSize: 12.5, boxShadow: "var(--shadow)" }}>
        <div style={{ fontWeight: 700, marginBottom: 3 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="mono" style={{ color: p.color || p.fill }}>{fmt(p.value, p.value >= 100 ? 0 : 1)}{suffix}</div>
        ))}
      </div>
    ) : null;
}

function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div className="no-print" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(20,15,8,.5)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} className="card rise" style={{ width: "100%", maxWidth: wide ? 720 : 520, maxHeight: "86vh", overflow: "auto", padding: 24 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="display" style={{ fontSize: 21, fontWeight: 600 }}>{title}</h3>
          <button className="btn btn-soft" style={{ padding: 8 }} onClick={onClose}><X size={16} /></button>
        </div>
        <div style={{ color: "var(--soft)", fontSize: 14, lineHeight: 1.65 }}>{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LANDING                                                            */
/* ------------------------------------------------------------------ */
function CountUp({ to, prefix = "", dp = 0 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, start;
    const step = (t) => { if (!start) start = t; const p = Math.min((t - start) / 1100, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{prefix}{fmt(v, dp)}</span>;
}

function HeroMeter({ theme }) {
  const lit = 7, total = 12;
  const segColor = (i) => (i < 4 ? "var(--eco)" : i < 8 ? "var(--gold)" : "var(--danger)");
  return (
    <div className="panel" style={{ borderRadius: 16, padding: 22, boxShadow: "var(--shadow)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
        <span className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 7 }}><span className="live-dot" />Live reading</span>
        <span className="chip">THIS MONTH</span>
      </div>
      <div className="lbl" style={{ marginBottom: 6 }}>Estimated cost</div>
      <div className="flex items-baseline" style={{ gap: 3 }}>
        <span className="mono" style={{ fontSize: 15, fontWeight: 600, color: "var(--soft)" }}>£</span>
        <span className="mono" style={{ fontSize: 52, fontWeight: 700, lineHeight: 0.95, letterSpacing: "-.03em" }}><CountUp to={84.2} dp={2} /></span>
        <span className="mono" style={{ fontSize: 13, color: "var(--faint)", marginLeft: 5 }}>/mo</span>
      </div>
      <div className="seg-row" style={{ marginTop: 20, marginBottom: 9 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="seg" style={{ background: i < lit ? segColor(i) : "var(--track)", animation: `grow .4s ${i * 45}ms both` }} />
        ))}
      </div>
      <div className="flex justify-between" style={{ fontSize: 10 }}>
        <span className="mono" style={{ color: "var(--eco)", letterSpacing: ".1em" }}>EFFICIENT</span>
        <span className="mono" style={{ color: "var(--faint)" }}>320 kWh used</span>
        <span className="mono" style={{ color: "var(--danger)", letterSpacing: ".1em" }}>HIGH</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 11, padding: "12px 13px" }}>
          <div className="lbl" style={{ margin: 0 }}>Usage</div>
          <div className="mono" style={{ fontSize: 21, fontWeight: 700, marginTop: 2 }}><CountUp to={320} /><span style={{ fontSize: 11, color: "var(--faint)" }}> kWh</span></div>
        </div>
        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 11, padding: "12px 13px" }}>
          <div className="lbl" style={{ margin: 0 }}>CO₂</div>
          <div className="mono" style={{ fontSize: 21, fontWeight: 700, color: "var(--eco)", marginTop: 2 }}><CountUp to={48} /><span style={{ fontSize: 11, color: "var(--faint)" }}> kg</span></div>
        </div>
      </div>
    </div>
  );
}

function Landing({ onStart, theme, dark, setDark, openPolicy }) {
  const feats = [
    { icon: Plug, cat: "USAGE", t: "Appliance calculator", d: "Add any device and see daily, monthly and annual kWh plus its true running cost." },
    { icon: Lightbulb, cat: "SAVINGS", t: "Smart recommendations", d: "Personalised savings tips generated from your actual usage data." },
    { icon: Leaf, cat: "CARBON", t: "Carbon tracking", d: "See your CO\u2082 footprint, trees-to-offset and how you compare to UK averages." },
    { icon: ArrowLeftRight, cat: "TARIFFS", t: "Tariff comparison", d: "Check your current rate against alternatives and see what you'd save." },
    { icon: Target, cat: "GOALS", t: "Reduction goals", d: "Set targets and watch real progress as you cut consumption." },
    { icon: FileText, cat: "REPORTS", t: "Reports & export", d: "Printable PDF summaries and CSV export of every appliance." },
  ];
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <header className="flex items-center justify-between" style={{ padding: "20px 22px", maxWidth: 1140, margin: "0 auto" }}>
        <div className="flex items-center gap-2.5">
          <span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--accent)", display: "grid", placeItems: "center" }}><Zap size={19} style={{ color: "var(--on-accent)" }} /></span>
          <span className="display" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-.02em" }}>Smart House Energy</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-soft no-print" style={{ padding: 9 }} onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button className="btn btn-accent" onClick={onStart}>Open the dashboard <ArrowRight size={16} /></button>
        </div>
      </header>

      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "46px 22px 24px" }}>
        <div className="grid hero-grid" style={{ gridTemplateColumns: "1.05fr .95fr", gap: 52, alignItems: "center" }}>
          <div>
            <div className="eyebrow mb-4" style={{ display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 20, height: 2, background: "var(--accent)", display: "inline-block" }} />Home energy analytics</div>
            <h1 className="display" style={{ fontSize: "clamp(40px,5.6vw,66px)", fontWeight: 600, lineHeight: 1.0, letterSpacing: "-.035em" }}>
              Read your home<br />like a meter.
            </h1>
            <p style={{ fontSize: 18, color: "var(--soft)", marginTop: 22, maxWidth: 500, lineHeight: 1.6 }}>
              Track electricity use down to each appliance, watch cost and carbon add up in real terms, and find exactly where to cut.
            </p>
            <div className="flex gap-3 mt-7 flex-wrap">
              <button className="btn btn-accent" style={{ padding: "13px 22px", fontSize: 15 }} onClick={onStart}>Open the dashboard <ArrowRight size={17} /></button>
            </div>
            <div className="flex gap-6 mt-7 flex-wrap" style={{ fontSize: 13, color: "var(--soft)" }}>
              {["Free, no ads", "No payment, ever", "Your data stays yours"].map((x) => <span key={x} className="flex items-center gap-1.5"><Check size={15} style={{ color: theme.eco }} />{x}</span>)}
            </div>
          </div>
          <HeroMeter theme={theme} />
        </div>
      </section>

      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "56px 22px" }}>
        <div className="eyebrow mb-2">What you get</div>
        <h2 className="display" style={{ fontSize: 30, fontWeight: 600, marginBottom: 28, letterSpacing: "-.025em" }}>One panel for usage, cost &amp; carbon</h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(258px,1fr))", gap: 14 }}>
          {feats.map((f, i) => (
            <div key={i} className="panel feat" style={{ borderRadius: 13, padding: 20 }}>
              <div className="flex items-center justify-between mb-4">
                <f.icon size={22} style={{ color: "var(--accent)" }} />
                <span className="mono" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--faint)" }}>{f.cat}</span>
              </div>
              <h3 className="display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>{f.t}</h3>
              <p style={{ color: "var(--soft)", fontSize: 14, lineHeight: 1.55 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "30px 22px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div className="flex justify-between flex-wrap gap-4" style={{ fontSize: 13.5, color: "var(--soft)" }}>
            <div className="flex items-center gap-2"><Zap size={16} style={{ color: theme.accent }} /><span className="display" style={{ fontWeight: 600 }}>Smart House Energy</span></div>
            <div className="flex gap-5 flex-wrap">
              {["About", "Privacy Policy", "Terms", "Cookie Policy", "Contact"].map((p) => (
                <button key={p} className="navlink" style={{ padding: 0, width: "auto", fontSize: 13.5 }} onClick={() => openPolicy(p)}>{p}</button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 12, color: "var(--faint)", marginTop: 16 }}>© {new Date().getFullYear()} Smart House Energy Monitor. Estimates are indicative and depend on your tariff and usage.</p>
        </div>
      </footer>
      <style>{`.feat{transition:border-color .18s,transform .18s;} .feat:hover{border-color:var(--accent);transform:translateY(-2px);} @media(max-width:820px){.hero-grid{grid-template-columns:1fr!important;gap:34px!important;}}`}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APPLIANCES (Calculator)                                            */
/* ------------------------------------------------------------------ */
function blank() { return { id: "a" + Date.now() + Math.random().toString(36).slice(2, 6), name: "", watts: 100, hoursPerDay: 2, daysPerWeek: 7, quantity: 1 }; }

function Appliances({ appliances, setAppliances, s, theme, st }) {
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return LIBRARY.filter((l) => !t || l.name.toLowerCase().includes(t) || l.category.toLowerCase().includes(t)).slice(0, 8);
  }, [q]);

  const addFromLib = (l) => {
    setAppliances((p) => [...p, { ...blank(), name: l.name, watts: l.watts, hoursPerDay: l.hoursPerDay, daysPerWeek: l.daysPerWeek }]);
  };
  const remove = (id) => setAppliances((p) => p.filter((a) => a.id !== id));
  const upd = (id, k, v) => setAppliances((p) => p.map((a) => (a.id === id ? { ...a, [k]: v } : a)));

  return (
    <div>
      <SectionTitle icon={Plug} kicker="Calculator" title="Appliance energy calculator" theme={theme}
        desc="Add the devices in your home. We compute consumption and running cost automatically from the wattage and how often you use each one."
        right={<div className="chip">{appliances.length} appliances</div>} />

      {/* search library */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div className="flex items-center gap-2" style={{ background: "var(--surface2)", borderRadius: 11, padding: "0 12px", border: "1px solid var(--border2)" }}>
          <Search size={17} style={{ color: "var(--faint)" }} />
          <input className="input" style={{ border: "none", background: "transparent", paddingLeft: 0 }} placeholder="Search the appliance library (TV, gaming PC, air fryer, EV charger…)" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <button className="btn btn-soft" style={{ padding: 6 }} onClick={() => setQ("")}><X size={14} /></button>}
        </div>
        {q && (
          <div className="grid mt-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 8 }}>
            {filtered.length === 0 && <div style={{ color: "var(--soft)", fontSize: 13, padding: 8 }}>No matches — add a custom appliance below.</div>}
            {filtered.map((l) => (
              <button key={l.name} className="btn btn-soft" style={{ justifyContent: "space-between" }} onClick={() => addFromLib(l)}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.name}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>{l.watts}W</span>
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-3">
          <button className="btn btn-accent" onClick={() => setEditing(blank())}><Plus size={16} />Add custom appliance</button>
        </div>
      </div>

      {/* list */}
      {appliances.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "var(--soft)" }}>
          <Plug size={28} style={{ color: "var(--faint)", margin: "0 auto 10px" }} />No appliances yet. Search the library or add a custom one to begin.
        </div>
      ) : (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr>
                <th>Appliance</th><th>Watts</th><th>Hrs/day</th><th>Days/wk</th><th>Qty</th>
                <th style={{ textAlign: "right" }}>Annual kWh</th><th style={{ textAlign: "right" }}>Annual cost</th><th></th>
              </tr></thead>
              <tbody>
                {appliances.map((a) => {
                  const c = calcAppliance(a, s.pricePerKWh);
                  return (
                    <tr key={a.id}>
                      <td style={{ fontWeight: 600, minWidth: 150 }}>{a.name || "Unnamed"}</td>
                      <td><input className="input mono" style={{ width: 78, padding: "6px 8px" }} type="number" value={a.watts} onChange={(e) => upd(a.id, "watts", +e.target.value)} /></td>
                      <td><input className="input mono" style={{ width: 64, padding: "6px 8px" }} type="number" step="0.1" value={a.hoursPerDay} onChange={(e) => upd(a.id, "hoursPerDay", +e.target.value)} /></td>
                      <td><input className="input mono" style={{ width: 58, padding: "6px 8px" }} type="number" max="7" value={a.daysPerWeek} onChange={(e) => upd(a.id, "daysPerWeek", Math.min(7, +e.target.value))} /></td>
                      <td><input className="input mono" style={{ width: 54, padding: "6px 8px" }} type="number" value={a.quantity} onChange={(e) => upd(a.id, "quantity", Math.max(1, +e.target.value))} /></td>
                      <td className="mono" style={{ textAlign: "right" }}>{fmt(c.annualKWh, 0)}</td>
                      <td className="mono" style={{ textAlign: "right", fontWeight: 600, color: theme.accent }}>{money(c.annualCost, s)}</td>
                      <td style={{ textAlign: "right" }}><button className="btn btn-soft" style={{ padding: 7 }} onClick={() => remove(a.id)}><Trash2 size={14} style={{ color: theme.danger }} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing && (
        <Modal open onClose={() => setEditing(null)} title="Add a custom appliance">
          <div className="grid" style={{ gap: 12 }}>
            <div><label className="lbl">Name</label><input className="input" autoFocus value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="e.g. Aquarium pump" /></div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label className="lbl">Power rating (Watts)</label><input className="input mono" type="number" value={editing.watts} onChange={(e) => setEditing({ ...editing, watts: +e.target.value })} /></div>
              <div><label className="lbl">Quantity</label><input className="input mono" type="number" value={editing.quantity} onChange={(e) => setEditing({ ...editing, quantity: Math.max(1, +e.target.value) })} /></div>
              <div><label className="lbl">Hours used / day</label><input className="input mono" type="number" step="0.1" value={editing.hoursPerDay} onChange={(e) => setEditing({ ...editing, hoursPerDay: +e.target.value })} /></div>
              <div><label className="lbl">Days used / week</label><input className="input mono" type="number" max="7" value={editing.daysPerWeek} onChange={(e) => setEditing({ ...editing, daysPerWeek: Math.min(7, +e.target.value) })} /></div>
            </div>
            <div style={{ background: "var(--surface2)", borderRadius: 11, padding: 12, fontSize: 13 }}>
              <div className="flex justify-between"><span style={{ color: "var(--soft)" }}>Annual consumption</span><span className="mono" style={{ fontWeight: 600 }}>{kwh(calcAppliance(editing, s.pricePerKWh).annualKWh)}</span></div>
              <div className="flex justify-between mt-1"><span style={{ color: "var(--soft)" }}>Annual cost</span><span className="mono" style={{ fontWeight: 600, color: theme.accent }}>{money(calcAppliance(editing, s.pricePerKWh).annualCost, s)}</span></div>
            </div>
            <button className="btn btn-accent" style={{ justifyContent: "center" }} onClick={() => { if (editing.name.trim()) { setAppliances((p) => [...p, editing]); setEditing(null); } }}><Plus size={16} />Add appliance</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD                                                          */
/* ------------------------------------------------------------------ */
function Dashboard({ st, s, theme }) {
  const pieColors = [theme.accent, theme.eco, theme.gold, theme.danger, "#5b7db1", "#3fa3ab", "#9aa39a"];
  const top6 = st.breakdown.slice(0, 6).filter((a) => a.annualKWh > 0);
  const other = st.breakdown.slice(6).reduce((t, a) => t + a.annualKWh, 0);
  const pie = [...top6.map((a) => ({ name: a.name, value: +a.annualKWh.toFixed(0) })), ...(other > 1 ? [{ name: "Other", value: +other.toFixed(0) }] : [])];

  return (
    <div>
      <SectionTitle icon={LayoutDashboard} kicker="Overview" title={s.name ? `Welcome back, ${s.name}` : "Your energy dashboard"} theme={theme}
        desc="A live snapshot built from your appliances and tariff. Edit either and everything updates instantly."
        right={<div className="flex items-center gap-2"><span className="live-dot" /><span style={{ fontSize: 12.5, color: "var(--soft)", fontWeight: 600 }}>Synced</span></div>} />

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 16 }}>
        <Stat icon={Zap} label="Monthly usage" value={kwh(st.monthlyKWh)} sub={`${fmt(st.annualKWh, 0)} kWh / year`} theme={theme} delay={0} />
        <Stat icon={Receipt} label="Est. monthly cost" value={money(st.monthlyCost, s)} sub={`${money(st.dailyCost, s)} per day`} theme={theme} delay={60} />
        <Stat icon={TrendingUp} label="Yearly projection" value={money(st.annualCost, s)} sub="incl. standing charge" theme={theme} delay={120} />
        <Stat icon={Leaf} label="Carbon footprint" value={`${fmt(st.carbonKg, 0)} kg`} sub="CO₂ per year" tone="eco" theme={theme} delay={180} />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="display" style={{ fontSize: 17, fontWeight: 600 }}>Projected monthly usage</h3>
            <span className="chip">Modeled · seasonal</span>
          </div>
          <div style={{ height: 230 }}>
            <ResponsiveContainer>
              <AreaChart data={st.monthly} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={theme.accent} stopOpacity={0.45} /><stop offset="100%" stopColor={theme.accent} stopOpacity={0.02} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 4" stroke={theme.grid} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: theme.textSoft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: theme.textSoft }} axisLine={false} tickLine={false} width={42} />
                <Tooltip content={ChartTip({ theme, suffix: " kWh" })} />
                <Area type="monotone" dataKey="kWh" stroke={theme.accent} strokeWidth={2.5} fill="url(#ag)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h3 className="display" style={{ fontSize: 17, fontWeight: 600, alignSelf: "flex-start", marginBottom: 6 }}>Efficiency score</h3>
          <Gauge2 value={st.score} theme={theme} />
          <p style={{ fontSize: 13, color: "var(--soft)", textAlign: "center", marginTop: 8 }}>
            {st.score >= 70 ? "Excellent — you're well below average." : st.score >= 45 ? "Fair — there's room to trim usage." : "High usage — big savings available."}
          </p>
          <div className="chip mt-2" style={{ fontSize: 11.5 }}>vs UK avg {st.vsBenchmark >= 0 ? "+" : ""}{Math.round(st.vsBenchmark * 100)}%</div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <h3 className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>Where your energy goes</h3>
          {pie.length ? (
            <div className="flex items-center gap-4 flex-wrap">
              <div style={{ width: 170, height: 170 }}>
                <ResponsiveContainer>
                  <PieChart><Pie data={pie} dataKey="value" innerRadius={48} outerRadius={80} paddingAngle={2} stroke="none">{pie.map((e, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}</Pie>
                    <Tooltip content={ChartTip({ theme, suffix: " kWh" })} /></PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1, minWidth: 150, display: "grid", gap: 7 }}>
                {pie.map((e, i) => (
                  <div key={i} className="flex items-center justify-between" style={{ fontSize: 13 }}>
                    <span className="flex items-center gap-2"><span style={{ width: 10, height: 10, borderRadius: 3, background: pieColors[i % pieColors.length] }} />{e.name}</span>
                    <span className="mono" style={{ color: "var(--soft)" }}>{Math.round((e.value / st.annualKWh) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : <p style={{ color: "var(--soft)" }}>Add appliances to see the breakdown.</p>}
        </div>

        <div className="card" style={{ padding: 18 }}>
          <h3 className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>Top consumers</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {st.breakdown.slice(0, 4).map((a, i) => {
              const pct = Math.round((a.annualKWh / st.annualKWh) * 100) || 0;
              return (
                <div key={a.id}>
                  <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{a.name}</span><span className="mono" style={{ color: "var(--soft)" }}>{money(a.annualCost, s)}/yr</span></div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: pct + "%", background: pieColors[i % pieColors.length], animationDelay: i * 80 + "ms" }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BILL ESTIMATOR                                                     */
/* ------------------------------------------------------------------ */
function Bills({ st, s, setS, theme }) {
  const rows = [
    { label: "Daily", v: st.dailyCost }, { label: "Weekly", v: st.dailyCost * 7 },
    { label: "Monthly", v: st.monthlyCost }, { label: "Annual", v: st.annualCost },
  ];
  return (
    <div>
      <SectionTitle icon={Receipt} kicker="Bill estimator" title="Estimate your electricity bill" theme={theme}
        desc="Enter your tariff details and we project your costs across every timeframe, standing charge included." />
      <div className="grid" style={{ gridTemplateColumns: "320px 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 20, height: "fit-content" }}>
          <h3 className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 14 }}>Your tariff</h3>
          <div className="grid" style={{ gap: 13 }}>
            <div><label className="lbl">Unit rate (price per kWh, £)</label><input className="input mono" type="number" step="0.001" value={s.pricePerKWh} onChange={(e) => setS({ ...s, pricePerKWh: +e.target.value })} /></div>
            <div><label className="lbl">Standing charge (£ per day)</label><input className="input mono" type="number" step="0.01" value={s.standingCharge} onChange={(e) => setS({ ...s, standingCharge: +e.target.value })} /></div>
            <div><label className="lbl">Supplier (optional)</label><input className="input" value={s.supplier} onChange={(e) => setS({ ...s, supplier: e.target.value })} placeholder="e.g. Octopus, OVO…" /></div>
            <div style={{ background: "var(--surface2)", borderRadius: 11, padding: 12, fontSize: 13 }}>
              <div className="flex justify-between"><span style={{ color: "var(--soft)" }}>Annual usage</span><span className="mono" style={{ fontWeight: 600 }}>{kwh(st.annualKWh)}</span></div>
              <div className="flex justify-between mt-1"><span style={{ color: "var(--soft)" }}>Standing charge / yr</span><span className="mono">{money(st.standingYear, s)}</span></div>
            </div>
          </div>
        </div>

        <div className="grid" style={{ gap: 16, alignContent: "start" }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {rows.map((r, i) => (
              <div key={r.label} className="card rise" style={{ padding: 16, animationDelay: i * 60 + "ms" }}>
                <div className="lbl" style={{ margin: 0 }}>{r.label}</div>
                <div className="display" style={{ fontSize: 23, fontWeight: 700, marginTop: 5 }}>{money(r.v, s)}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 18 }}>
            <h3 className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Projected monthly bill</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={st.monthly} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 4" stroke={theme.grid} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: theme.textSoft }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: theme.textSoft }} axisLine={false} tickLine={false} width={42} />
                  <Tooltip cursor={{ fill: theme.grid, opacity: 0.3 }} content={ChartTip({ theme, suffix: " " + s.currency })} />
                  <Bar dataKey="cost" radius={[6, 6, 0, 0]} fill={theme.accent} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RECOMMENDATIONS                                                    */
/* ------------------------------------------------------------------ */
function Recommendations({ st, appliances, s, theme }) {
  const recs = useMemo(() => buildRecs(st, appliances, s), [st, appliances, s]);
  const toneCol = (t) => (t === "eco" ? theme.eco : t === "danger" ? theme.danger : theme.accent);
  return (
    <div>
      <SectionTitle icon={Lightbulb} kicker="Smart recommendations" title="Ways to cut your bill" theme={theme}
        desc="Generated dynamically from your appliances and tariff. The more accurate your inputs, the sharper the advice." />
      {appliances.length === 0 && <div className="card" style={{ padding: 30, textAlign: "center", color: "var(--soft)", marginBottom: 16 }}>Add appliances first to get personalised recommendations.</div>}
      <div className="grid" style={{ gap: 12 }}>
        {recs.map((r, i) => (
          <div key={i} className="card rise" style={{ padding: 18, display: "flex", gap: 14, animationDelay: i * 70 + "ms", borderLeft: `3px solid ${toneCol(r.tone)}` }}>
            <span style={{ width: 38, height: 38, borderRadius: 11, flex: "none", display: "grid", placeItems: "center", background: "var(--surface2)", color: toneCol(r.tone) }}><r.icon size={19} /></span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{r.title}</div>
              <p style={{ color: "var(--soft)", fontSize: 13.5, marginTop: 4, lineHeight: 1.55 }}>{r.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  CARBON                                                             */
/* ------------------------------------------------------------------ */
function Carbon({ st, s, theme }) {
  const avgKg = BENCHMARK * s.carbonFactor;
  const data = [{ name: "You", v: +st.carbonKg.toFixed(0) }, { name: "UK average", v: +avgKg.toFixed(0) }];
  return (
    <div>
      <SectionTitle icon={Leaf} kicker="Carbon tracker" title="Your carbon footprint" theme={theme}
        desc={`Based on a grid intensity of ${s.carbonFactor} kg CO₂ per kWh. Adjust the factor in Settings if your supplier publishes its own.`} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginBottom: 16 }}>
        <Stat icon={Leaf} label="Annual CO₂" value={`${fmt(st.carbonKg, 0)} kg`} sub={`${fmt(st.carbonKg / 12, 0)} kg per month`} tone="eco" theme={theme} />
        <Stat icon={TreePine} label="Trees to offset" value={fmt(Math.ceil(st.trees), 0)} sub="mature trees / year" tone="eco" theme={theme} delay={60} />
        <Stat icon={Car} label="Equivalent driving" value={`${fmt(st.drivingMiles, 0)} mi`} sub="in an average petrol car" theme={theme} delay={120} />
        <Stat icon={Gauge} label="vs UK average" value={`${st.vsBenchmark >= 0 ? "+" : ""}${Math.round(st.vsBenchmark * 100)}%`} sub={st.vsBenchmark >= 0 ? "above typical home" : "below typical home"} tone={st.vsBenchmark >= 0 ? "danger" : "eco"} theme={theme} delay={180} />
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <h3 className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>How you compare</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 6, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 4" stroke={theme.grid} horizontal={false} />
                <XAxis type="number" tick={{ fill: theme.textSoft }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: theme.text, fontWeight: 600 }} axisLine={false} tickLine={false} width={84} />
                <Tooltip cursor={{ fill: theme.grid, opacity: 0.3 }} content={ChartTip({ theme, suffix: " kg" })} />
                <Bar dataKey="v" radius={[0, 7, 7, 0]} barSize={30}>{data.map((d, i) => <Cell key={i} fill={i === 0 ? theme.eco : theme.grid} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          <h3 className="display" style={{ fontSize: 17, fontWeight: 600 }}>What this means</h3>
          <p style={{ color: "var(--soft)", fontSize: 14, lineHeight: 1.6 }}>
            Your electricity produces roughly <b style={{ color: "var(--text)" }}>{fmt(st.carbonKg, 0)} kg of CO₂</b> a year. Offsetting that naturally would take about <b style={{ color: theme.eco }}>{Math.ceil(st.trees)} mature trees</b>, each absorbing ~21 kg annually.
          </p>
          <p style={{ color: "var(--soft)", fontSize: 14, lineHeight: 1.6 }}>
            Cutting usage by 10% would save around <b style={{ color: "var(--text)" }}>{fmt(st.carbonKg * 0.1, 0)} kg</b> of CO₂ — and switching to a renewable tariff can take the grid factor close to zero.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GOALS                                                              */
/* ------------------------------------------------------------------ */
function Goals({ goals, setGoals, st, s, theme }) {
  const [type, setType] = useState("bill");
  const [pct, setPct] = useState(10);
  const types = { bill: { label: "Reduce annual bill", unit: (v) => money(v, s), get: () => st.annualCost, icon: PiggyBank }, energy: { label: "Reduce energy use", unit: (v) => kwh(v), get: () => st.annualKWh, icon: Zap }, carbon: { label: "Lower carbon footprint", unit: (v) => fmt(v, 0) + " kg", get: () => st.carbonKg, icon: Leaf } };
  const add = () => { const t = types[type]; setGoals((p) => [...p, { id: "g" + Date.now(), type, pct: +pct, baseline: t.get(), label: t.label, created: Date.now() }]); };
  const cur = (g) => types[g.type].get();

  return (
    <div>
      <SectionTitle icon={Target} kicker="Goals" title="Energy reduction goals" theme={theme}
        desc="Set a target, then reduce appliances and watch real progress. Your baseline is captured the moment you create the goal." />
      <div className="card" style={{ padding: 18, marginBottom: 16 }}>
        <div className="flex gap-3 items-end flex-wrap">
          <div style={{ flex: "1 1 220px" }}><label className="lbl">Goal type</label>
            <select className="select" value={type} onChange={(e) => setType(e.target.value)}>{Object.entries(types).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
          </div>
          <div style={{ width: 130 }}><label className="lbl">Target reduction</label>
            <div className="flex items-center gap-2"><input className="input mono" type="number" value={pct} min="1" max="90" onChange={(e) => setPct(e.target.value)} /><span style={{ fontWeight: 600 }}>%</span></div>
          </div>
          <button className="btn btn-accent" onClick={add}><Plus size={16} />Set goal</button>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="card" style={{ padding: 36, textAlign: "center", color: "var(--soft)" }}><Target size={26} style={{ color: "var(--faint)", margin: "0 auto 8px" }} />No goals yet — set your first above.</div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
          {goals.map((g) => {
            const t = types[g.type]; const target = g.baseline * (1 - g.pct / 100); const current = cur(g);
            const reduced = g.baseline - current; const need = g.baseline - target;
            const prog = Math.max(0, Math.min(100, (reduced / need) * 100));
            const done = current <= target;
            return (
              <div key={g.id} className="card" style={{ padding: 18 }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><t.icon size={18} style={{ color: theme.accent }} /><span style={{ fontWeight: 600 }}>{g.label} {g.pct}%</span></div>
                  <button className="btn btn-soft" style={{ padding: 6 }} onClick={() => setGoals((p) => p.filter((x) => x.id !== g.id))}><Trash2 size={13} /></button>
                </div>
                <div className="flex justify-between" style={{ fontSize: 12.5, color: "var(--soft)", marginBottom: 6 }}>
                  <span>Now: <b className="mono" style={{ color: "var(--text)" }}>{t.unit(current)}</b></span>
                  <span>Target: <b className="mono" style={{ color: theme.eco }}>{t.unit(target)}</b></span>
                </div>
                <div className="bar-track" style={{ height: 11 }}><div className="bar-fill" style={{ width: prog + "%", background: done ? theme.eco : `linear-gradient(90deg,var(--accent),var(--accent2))` }} /></div>
                <div className="flex justify-between mt-2" style={{ fontSize: 12.5 }}>
                  <span style={{ color: "var(--soft)" }}>{done ? "🎉 Goal reached!" : `${Math.round(prog)}% of the way there`}</span>
                  <span className="mono" style={{ color: "var(--soft)" }}>baseline {t.unit(g.baseline)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TARIFFS                                                            */
/* ------------------------------------------------------------------ */
function Tariffs({ st, s, theme }) {
  const [unit, setUnit] = useState((s.pricePerKWh * 100).toFixed(1));
  const [standing, setStanding] = useState((s.standingCharge * 100).toFixed(1));
  const [usage, setUsage] = useState(Math.round(st.annualKWh) || BENCHMARK);
  const cur = (u, st2) => (usage * u) / 100 + (st2 / 100) * 365;
  const mine = cur(+unit, +standing);
  const ranked = TARIFFS.map((t) => ({ ...t, annual: cur(t.unit, t.standing) })).sort((a, b) => a.annual - b.annual);
  const best = ranked[0];

  return (
    <div>
      <SectionTitle icon={ArrowLeftRight} kicker="Comparison" title="Tariff comparison tool" theme={theme}
        desc="Enter your current rate and annual usage to see how sample tariffs stack up. Figures are illustrative." />
      <div className="card" style={{ padding: 18, marginBottom: 16 }}>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 13 }}>
          <div><label className="lbl">Your unit rate (p/kWh)</label><input className="input mono" type="number" value={unit} onChange={(e) => setUnit(e.target.value)} /></div>
          <div><label className="lbl">Your standing charge (p/day)</label><input className="input mono" type="number" value={standing} onChange={(e) => setStanding(e.target.value)} /></div>
          <div><label className="lbl">Annual usage (kWh)</label><input className="input mono" type="number" value={usage} onChange={(e) => setUsage(+e.target.value)} /></div>
        </div>
      </div>

      {mine > best.annual && (
        <div className="card rise" style={{ padding: 16, marginBottom: 16, border: `1.5px solid ${theme.eco}`, display: "flex", alignItems: "center", gap: 12 }}>
          <PiggyBank size={22} style={{ color: theme.eco }} />
          <div>You could save up to <b style={{ color: theme.eco }}>{money(mine - best.annual, s)}/year</b> by switching to <b>{best.name}</b>.</div>
        </div>
      )}

      <div className="card" style={{ padding: 18 }}>
        <div className="grid" style={{ gap: 11 }}>
          <div className="flex items-center justify-between" style={{ padding: "4px 0", borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2"><span className="chip">Current</span><span style={{ fontWeight: 600 }}>Your tariff</span></div>
            <span className="mono display" style={{ fontSize: 18, fontWeight: 700 }}>{money(mine, s)}</span>
          </div>
          {ranked.map((t) => {
            const diff = mine - t.annual; const max = Math.max(...ranked.map((r) => r.annual), mine);
            return (
              <div key={t.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap"><span style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</span><span className="chip" style={{ fontSize: 10.5 }}>{t.tag}</span></div>
                  <div className="flex items-center gap-3">
                    {diff > 0 ? <span style={{ fontSize: 12.5, color: theme.eco, fontWeight: 600 }}>save {money(diff, s)}</span> : <span style={{ fontSize: 12.5, color: theme.danger, fontWeight: 600 }}>+{money(-diff, s)}</span>}
                    <span className="mono" style={{ fontWeight: 600, width: 70, textAlign: "right" }}>{money(t.annual, s)}</span>
                  </div>
                </div>
                <div className="bar-track"><div className="bar-fill" style={{ width: (t.annual / max) * 100 + "%", background: t === best ? theme.eco : theme.grid }} /></div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 12, color: "var(--faint)", marginTop: 14 }}>Sample rates for illustration only — always confirm live prices with suppliers before switching.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  REPORTS                                                            */
/* ------------------------------------------------------------------ */
function Reports({ st, s, appliances, theme }) {
  const exportCSV = () => {
    const head = ["Appliance", "Watts", "Hours/day", "Days/week", "Qty", "Annual kWh", "Annual cost"];
    const lines = st.breakdown.map((a) => [a.name, a.watts, a.hoursPerDay, a.daysPerWeek, a.quantity || 1, a.annualKWh.toFixed(1), a.annualCost.toFixed(2)].join(","));
    const csv = [head.join(","), ...lines, "", "Total," + ",,,,," + st.annualKWh.toFixed(1) + "," + st.annualCost.toFixed(2)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "energy-report.csv"; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div>
      <SectionTitle icon={FileText} kicker="Reports" title="Energy report" theme={theme}
        desc="A clean summary you can print to PDF or export to CSV."
        right={<div className="flex gap-2 no-print">
          <button className="btn btn-ghost" onClick={() => window.print()}><Printer size={16} />Print / PDF</button>
          <button className="btn btn-accent" onClick={exportCSV}><Download size={16} />Export CSV</button>
        </div>} />
      <div className="print-full">
        <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
          {[["Annual usage", kwh(st.annualKWh)], ["Annual cost", money(st.annualCost, s)], ["Annual CO₂", fmt(st.carbonKg, 0) + " kg"], ["Efficiency", st.score + " / 100"]].map(([l, v], i) => (
            <div key={i} className="card" style={{ padding: 16 }}><div className="lbl" style={{ margin: 0 }}>{l}</div><div className="display" style={{ fontSize: 21, fontWeight: 700, marginTop: 4 }}>{v}</div></div>
          ))}
        </div>
        <div className="card" style={{ overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}><h3 className="display" style={{ fontSize: 17, fontWeight: 600 }}>Appliance breakdown</h3></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Appliance</th><th style={{ textAlign: "right" }}>Annual kWh</th><th style={{ textAlign: "right" }}>Annual cost</th><th style={{ textAlign: "right" }}>Share</th></tr></thead>
              <tbody>
                {st.breakdown.map((a) => (
                  <tr key={a.id}><td style={{ fontWeight: 600 }}>{a.name}</td>
                    <td className="mono" style={{ textAlign: "right" }}>{fmt(a.annualKWh, 0)}</td>
                    <td className="mono" style={{ textAlign: "right" }}>{money(a.annualCost, s)}</td>
                    <td className="mono" style={{ textAlign: "right", color: "var(--soft)" }}>{Math.round((a.annualKWh / st.annualKWh) * 100) || 0}%</td></tr>
                ))}
                <tr style={{ fontWeight: 700 }}><td>Total</td><td className="mono" style={{ textAlign: "right" }}>{fmt(st.annualKWh, 0)}</td><td className="mono" style={{ textAlign: "right", color: theme.accent }}>{money(st.annualCost, s)}</td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BLOG                                                               */
/* ------------------------------------------------------------------ */
const POSTS = [
  { t: "10 proven ways to cut your electricity bill this year", c: "Money saving", read: "6 min", body: ["Small, consistent changes beat dramatic one-offs. Start by identifying your three biggest consumers in the dashboard — for most homes that's heating, the tumble dryer and always-on electronics.", "Move flexible loads like washing and dishwashing to a single batch, switch every remaining halogen bulb to LED, and put entertainment devices on a switched extension to kill standby draw overnight.", "Finally, set a 10% reduction goal and review it monthly. Treating it as a target rather than a hope is what turns intention into a lower bill."] },
  { t: "The true cost of charging your EV at home", c: "Electric vehicles", read: "5 min", body: ["A typical EV uses around 0.3 kWh per mile. On a 27p day rate that's roughly 8p a mile; on a dedicated overnight tariff nearer 14p/kWh it drops to about 4p.", "Over 8,000 miles a year that gap is the difference between ~£650 and ~£330 — worth more than the cost of switching tariff for most drivers."] },
  { t: "Are air fryers really cheaper than ovens?", c: "Appliances", read: "4 min", body: ["For small portions, almost always. An air fryer draws less power and reaches temperature in a fraction of the time, so the energy per meal is far lower than heating a large oven cavity.", "For a full roast feeding several people, a single oven run can still win. The rule of thumb: match the appliance to the portion size."] },
];
function Blog({ theme }) {
  const [open, setOpen] = useState(null);
  if (open != null) {
    const p = POSTS[open];
    return (
      <div>
        <button className="navlink no-print" style={{ width: "auto", marginBottom: 14 }} onClick={() => setOpen(null)}><ChevronRight size={15} style={{ transform: "rotate(180deg)" }} />Back to blog</button>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span className="chip mb-3">{p.c} · {p.read} read</span>
          <h1 className="display" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.1, margin: "10px 0 18px" }}>{p.t}</h1>
          {p.body.map((para, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "var(--soft)", marginBottom: 18 }}>{para}</p>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <SectionTitle icon={Newspaper} kicker="Blog" title="Energy saving guides" theme={theme} desc="Practical, SEO-friendly articles on cutting bills and going greener." />
      <div className="grid" style={{ gap: 14 }}>
        {POSTS.map((p, i) => (
          <button key={i} className="card" style={{ padding: 20, textAlign: "left", cursor: "pointer" }} onClick={() => setOpen(i)}>
            <span className="chip mb-2" style={{ fontSize: 11 }}>{p.c}</span>
            <h3 className="display" style={{ fontSize: 20, fontWeight: 600, marginTop: 8 }}>{p.t}</h3>
            <p style={{ color: "var(--soft)", fontSize: 14, marginTop: 6, lineHeight: 1.55 }}>{p.body[0].slice(0, 130)}…</p>
            <span className="flex items-center gap-1.5" style={{ color: theme.accent, fontSize: 13, fontWeight: 600, marginTop: 10 }}>Read article <ArrowRight size={14} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SETTINGS                                                           */
/* ------------------------------------------------------------------ */
function SettingsView({ s, setS, dark, setDark, theme, onReset, onLogout }) {
  return (
    <div style={{ maxWidth: 720 }}>
      <SectionTitle icon={SettingsIcon} kicker="Settings" title="Settings" theme={theme} desc="Tune the defaults that drive every calculation." />
      <div className="card" style={{ padding: 22, marginBottom: 16 }}>
        <h3 className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 14 }}>Profile & tariff</h3>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 13 }}>
          <div><label className="lbl">Display name</label><input className="input" value={s.name} onChange={(e) => setS({ ...s, name: e.target.value })} placeholder="Your name" /></div>
          <div><label className="lbl">Currency symbol</label><input className="input" value={s.currency} onChange={(e) => setS({ ...s, currency: e.target.value })} /></div>
          <div><label className="lbl">Unit rate (£/kWh)</label><input className="input mono" type="number" step="0.001" value={s.pricePerKWh} onChange={(e) => setS({ ...s, pricePerKWh: +e.target.value })} /></div>
          <div><label className="lbl">Standing charge (£/day)</label><input className="input mono" type="number" step="0.01" value={s.standingCharge} onChange={(e) => setS({ ...s, standingCharge: +e.target.value })} /></div>
          <div><label className="lbl">Carbon factor (kg CO₂/kWh)</label><input className="input mono" type="number" step="0.001" value={s.carbonFactor} onChange={(e) => setS({ ...s, carbonFactor: +e.target.value })} /></div>
          <div><label className="lbl">Supplier</label><input className="input" value={s.supplier} onChange={(e) => setS({ ...s, supplier: e.target.value })} /></div>
        </div>
      </div>
      <div className="card" style={{ padding: 22, marginBottom: 16 }}>
        <h3 className="display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>Appearance</h3>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 14, color: "var(--soft)" }}>Dark mode</span>
          <button className={`switch ${dark ? "on" : ""}`} onClick={() => setDark(!dark)}><span /></button>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-ghost" onClick={onLogout}><LogOut size={15} />Sign out</button>
        <button className="btn btn-soft" onClick={onReset} style={{ color: theme.danger }}><Trash2 size={15} />Reset all data</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  POLICY CONTENT                                                     */
/* ------------------------------------------------------------------ */
const POLICY = {
  About: <><p>Smart House Energy Monitor helps homeowners, tenants, students and small businesses understand their electricity usage, estimate costs and find savings.</p><p style={{ marginTop: 10 }}>All calculations run in your browser from the figures you provide. This is a starter template — replace this copy with your own story before launch.</p></>,
  "Privacy Policy": <><p>Smart House Energy Monitor is built to respect your privacy. Every calculation runs in your browser, and the appliances and settings you enter are stored on your own device so your dashboard persists between visits.</p><p style={{ marginTop: 10 }}>No analytics or advertising cookies are set, and your usage data is never sold or shared with anyone. Replace this copy with your own practices before launch.</p></>,
  Terms: <><p>Sample terms of service. Estimates provided are indicative only and depend on your tariff and actual usage; they are not financial advice.</p><p style={{ marginTop: 10 }}>Replace with your own enforceable terms, reviewed by a qualified professional, before commercial use.</p></>,
  "Cookie Policy": <><p>This app uses only essential browser storage to remember your settings and keep you signed in. There are no advertising or third-party tracking cookies of any kind.</p><p style={{ marginTop: 10 }}>Replace this copy with your own practices before launch.</p></>,
  Contact: <><p>Questions or feedback? A production build would route this through a contact form or support inbox.</p><p style={{ marginTop: 10 }}>Add your support email and response-time commitment here.</p></>,
};

/* ------------------------------------------------------------------ */
/*  APP SHELL                                                          */
/* ------------------------------------------------------------------ */
const NAV = [
  ["dashboard", "Dashboard", LayoutDashboard], ["appliances", "Appliances", Plug],
  ["bills", "Bill estimator", Receipt], ["recs", "Recommendations", Lightbulb],
  ["carbon", "Carbon", Leaf], ["goals", "Goals", Target],
  ["tariffs", "Tariffs", ArrowLeftRight], ["reports", "Reports", FileText],
  ["blog", "Blog", Newspaper], ["settings", "Settings", SettingsIcon],
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState("dashboard");
  const [appliances, setAppliances] = useState(STARTER);
  const [s, setS] = useState(DEFAULTS);
  const [goals, setGoals] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [policy, setPolicy] = useState(null);

  const theme = dark ? C.dark : C.light;

  // load persisted state once
  useEffect(() => {
    (async () => {
      setAppliances(await load("appliances", STARTER));
      setS(await load("settings", DEFAULTS));
      setGoals(await load("goals", []));
      setDark(await load("dark", false));
      setEntered(await load("entered", false));
      setLoaded(true);
    })();
  }, []);
  // persist
  useEffect(() => { if (loaded) save("appliances", appliances); }, [appliances, loaded]);
  useEffect(() => { if (loaded) save("settings", s); }, [s, loaded]);
  useEffect(() => { if (loaded) save("goals", goals); }, [goals, loaded]);
  useEffect(() => { if (loaded) save("dark", dark); }, [dark, loaded]);
  useEffect(() => { if (loaded) save("entered", entered); }, [entered, loaded]);

  const st = useMemo(() => computeStats(appliances, s), [appliances, s]);
  const go = (v) => { setView(v); setNavOpen(false); window.scrollTo(0, 0); };
  const reset = () => { setAppliances(STARTER); setS(DEFAULTS); setGoals([]); };

  const wrap = (children) => <div className={"she-root" + (dark ? " dark" : "")} style={{ position: "relative" }}><style>{STYLES}</style><div className="she-bg" />{children}<Modal open={!!policy} onClose={() => setPolicy(null)} title={policy || ""}>{policy && POLICY[policy]}</Modal></div>;

  if (!entered) return wrap(<Landing onStart={() => { setEntered(true); go("dashboard"); }} theme={theme} dark={dark} setDark={setDark} openPolicy={setPolicy} />);

  const VIEWS = {
    dashboard: <Dashboard st={st} s={s} theme={theme} />,
    appliances: <Appliances appliances={appliances} setAppliances={setAppliances} s={s} theme={theme} st={st} />,
    bills: <Bills st={st} s={s} setS={setS} theme={theme} />,
    recs: <Recommendations st={st} appliances={appliances} s={s} theme={theme} />,
    carbon: <Carbon st={st} s={s} theme={theme} />,
    goals: <Goals goals={goals} setGoals={setGoals} st={st} s={s} theme={theme} />,
    tariffs: <Tariffs st={st} s={s} theme={theme} />,
    reports: <Reports st={st} s={s} appliances={appliances} theme={theme} />,
    blog: <Blog theme={theme} />,
    settings: <SettingsView s={s} setS={setS} dark={dark} setDark={setDark} theme={theme} onReset={reset} onLogout={() => { setEntered(false); }} />,
  };

  return wrap(
    <div style={{ position: "relative", zIndex: 1, display: "flex", minHeight: "100vh" }}>
      {/* Sidebar (desktop) */}
      <aside className="glass no-print" style={{ width: 234, borderRight: "1px solid var(--border)", padding: 16, position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", flex: "none" }} data-desktop>
        <div className="flex items-center gap-2.5 mb-5" style={{ padding: "4px 6px" }}>
          <span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--accent)", display: "grid", placeItems: "center" }}><Zap size={19} style={{ color: "var(--on-accent)" }} /></span>
          <span className="display" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.1 }}>Smart House<br /><span style={{ color: theme.accent, fontSize: 13 }}>Energy Monitor</span></span>
        </div>
        <nav className="flex flex-col gap-1" style={{ flex: 1, overflowY: "auto" }}>
          {NAV.map(([id, label, Icon]) => (
            <button key={id} className={"navlink" + (view === id ? " active" : "")} onClick={() => go(id)}>
              <Icon size={17} />{label}
            </button>
          ))}
        </nav>
        <div className="card" style={{ padding: 12, marginTop: 10 }}>
          <div className="flex items-center gap-2" style={{ fontSize: 12.5, color: "var(--soft)" }}><Leaf size={14} style={{ color: theme.eco }} />Free &amp; ad-free, always</div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="glass no-print" data-mobile style={{ display: "none", position: "sticky", top: 0, zIndex: 30, padding: "12px 16px", borderBottom: "1px solid var(--border)", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div className="flex items-center gap-2"><span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--accent)", display: "grid", placeItems: "center" }}><Zap size={17} style={{ color: "var(--on-accent)" }} /></span><span className="display" style={{ fontWeight: 600 }}>Energy Monitor</span></div>
        <button className="btn btn-soft" style={{ padding: 9 }} onClick={() => setNavOpen((o) => !o)}>{navOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {navOpen && (
        <div className="glass no-print" data-mobile style={{ position: "fixed", top: 55, left: 0, right: 0, zIndex: 29, padding: 14, borderBottom: "1px solid var(--border)", display: "none", flexDirection: "column", gap: 4 }}>
          {NAV.map(([id, label, Icon]) => <button key={id} className={"navlink" + (view === id ? " active" : "")} onClick={() => go(id)}><Icon size={17} />{label}</button>)}
        </div>
      )}

      {/* Main */}
      <main style={{ flex: 1, padding: "26px clamp(16px,3vw,38px)", maxWidth: 1180, margin: "0 auto", width: "100%" }}>
        <div className="flex items-center justify-end gap-2 mb-4 no-print">
          <button className="btn btn-soft" style={{ padding: 9 }} onClick={() => setDark(!dark)}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <div className="chip"><span className="live-dot" style={{ width: 7, height: 7 }} />{s.supplier || "No supplier set"}</div>
        </div>
        <div key={view} className="rise">{VIEWS[view]}</div>
        <footer className="no-print" style={{ marginTop: 40, paddingTop: 18, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12.5, color: "var(--faint)" }}>
          <span>© {new Date().getFullYear()} Smart House Energy Monitor</span>
          <div className="flex gap-4">{["About", "Privacy Policy", "Terms", "Cookie Policy", "Contact"].map((p) => <button key={p} className="navlink" style={{ padding: 0, width: "auto", fontSize: 12.5 }} onClick={() => setPolicy(p)}>{p}</button>)}</div>
        </footer>
      </main>

      {/* responsive switch */}
      <style>{`@media(max-width:860px){[data-desktop]{display:none!important;}[data-mobile]{display:flex!important;}main{padding-top:16px!important;}}`}</style>
    </div>
  );
}
