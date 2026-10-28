"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Cpu,
  FileText,
  Bot,
  Send,
  X,
  Sparkles,
  Layers,
  History,
  Sliders,
  PlusCircle,
  FileSearch,
  ShieldAlert,
  ChevronRight,
  RefreshCw,
  Scale,
  ShieldCheck,
  GraduationCap,
  Binary,
  Sun,
  Moon
} from "lucide-react";

type Role = "AICTE_OFFICIAL" | "SCRUTINY_OFFICER" | "INSTITUTION" | "ADMIN";
type TabId = "dashboard" | "applications" | "intelligence" | "simulator" | "ghost" | "audit";

const API = "http://localhost:8000";

const getTheme = (role: Role, isDark: boolean) => {
  const themes = {
    AICTE_OFFICIAL: {
      id: "AICTE_OFFICIAL",
      label: "AICTE Bureau Official",
      badge: "Rashtriya Bureau Governance & AICTE Sign-Off",
      personaTag: "Bureau Official ",
      icon: Scale,
      primary: isDark ? "#FB923C" : "#EA580C",
      bg: isDark ? "#0F0B08" : "#FFFBF7",
      cardBg: isDark ? "rgba(28, 19, 14, 0.92)" : "rgba(255, 255, 255, 0.95)",
      subCardBg: isDark ? "#2A1C15" : "#FFF7ED",
      heading: isDark ? "#FFEDD5" : "#431407",
      text: isDark ? "#E7D5C7" : "#572C15",
      border: isDark ? "#57220B" : "#FED7AA",
      beamColor: isDark ? "rgba(251, 146, 60, 0.65)" : "rgba(234, 88, 12, 0.55)",
      blob1: isDark ? "#7C2D12" : "#FFEDD5",
      blob2: isDark ? "rgba(234, 88, 12, 0.25)" : "rgba(251, 146, 60, 0.2)",
    },
    SCRUTINY_OFFICER: {
      id: "SCRUTINY_OFFICER",
      label: "Scrutiny Officer",
      badge: "Forensic Investigation & Discrepancy Auditing",
      personaTag: "Scrutiny Officer",
      icon: ShieldCheck,
      primary: isDark ? "#F87171" : "#DC2626",
      bg: isDark ? "#100809" : "#FFF1F2",
      cardBg: isDark ? "rgba(28, 16, 18, 0.92)" : "rgba(255, 255, 255, 0.95)",
      subCardBg: isDark ? "#2B161A" : "#FFE4E6",
      heading: isDark ? "#FFE4E6" : "#881337",
      text: isDark ? "#EAD2D5" : "#5C1D24",
      border: isDark ? "#5C1D24" : "#FECDD3",
      beamColor: isDark ? "rgba(248, 113, 113, 0.65)" : "rgba(220, 38, 38, 0.55)",
      blob1: isDark ? "#881337" : "#FDA4AF",
      blob2: isDark ? "rgba(220, 38, 38, 0.22)" : "rgba(220, 38, 38, 0.2)",
    },
    INSTITUTION: {
      id: "INSTITUTION",
      label: "Institution Portal",
      badge: "Nodal College Application Desk",
      personaTag: "College Portal",
      icon: GraduationCap,
      primary: isDark ? "#34D399" : "#059669",
      bg: isDark ? "#06120D" : "#F0FDF4",
      cardBg: isDark ? "rgba(12, 28, 20, 0.92)" : "rgba(255, 255, 255, 0.95)",
      subCardBg: isDark ? "#163829" : "#DCFCE7",
      heading: isDark ? "#D1FAE5" : "#064E3B",
      text: isDark ? "#C6E8D5" : "#1B4734",
      border: isDark ? "#164E33" : "#BBF7D0",
      beamColor: isDark ? "rgba(52, 211, 153, 0.65)" : "rgba(5, 150, 105, 0.55)",
      blob1: isDark ? "#064E3B" : "#A7F3D0",
      blob2: isDark ? "rgba(5, 150, 105, 0.22)" : "rgba(5, 150, 105, 0.2)",
    },
    ADMIN: {
      id: "ADMIN",
      label: "System Admin",
      badge: "Cryptographic Core & AI Telemetry",
      personaTag: "System Admin ",
      icon: Binary,
      primary: isDark ? "#818CF8" : "#6366F1",
      bg: isDark ? "#080A14" : "#EEF2FF",
      cardBg: isDark ? "rgba(18, 21, 38, 0.92)" : "rgba(255, 255, 255, 0.95)",
      subCardBg: isDark ? "#23284A" : "#E0E7FF",
      heading: isDark ? "#E0E7FF" : "#312E81",
      text: isDark ? "#CED4F0" : "#2F325E",
      border: isDark ? "#2F356B" : "#C7D2FE",
      beamColor: isDark ? "rgba(129, 140, 248, 0.65)" : "rgba(99, 102, 241, 0.55)",
      blob1: isDark ? "#312E81" : "#C7D2FE",
      blob2: isDark ? "rgba(99, 102, 241, 0.22)" : "rgba(99, 102, 241, 0.2)",
    },
  };
  return themes[role];
};

const NAV: { id: TabId; label: string; icon: any; sub: string }[] = [
  { id: "dashboard", label: "Command Centre", icon: Layers, sub: "Real-time compliance overview and priority decisions" },
  { id: "applications", label: "Applications", icon: FileText, sub: "Queue, institutional profiles and risk status" },
  { id: "intelligence", label: "Document Intelligence", icon: FileSearch, sub: "OCR extraction, ELA tampering and field checks" },
  { id: "simulator", label: "What-If Simulator", icon: Sliders, sub: "Simulate parameter variations against active rules" },
  { id: "ghost", label: "Ghost Faculty & Reports", icon: ShieldAlert, sub: "EPFO biometric scans and official report builder" },
  { id: "audit", label: "Audit Trail", icon: History, sub: "Cryptographic, immutable ledger of actions" },
];

const CHIPS = [
  "Why was this application flagged?",
  "What is the compliance score & status?",
  "What should the institution do next?",
  "Show extracted OCR fields",
  "Did any document fail tamper analysis?"
];

const WIDTHS = [92, 78, 0, 84, 66, 0, 90, 72, 0, 80, 94, 0, 70, 86];

function useCount(to: number, dur = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    let r = 0, s = 0;
    const f = (t: number) => {
      if (!s) s = t;
      const p = Math.min((t - s) / dur, 1);
      setV(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) r = requestAnimationFrame(f);
    };
    r = requestAnimationFrame(f);
    return () => cancelAnimationFrame(r);
  }, [to, dur]);
  return v;
}

function Num({ to, suffix = "" }: { to: any; suffix?: string }) {
  const v = useCount(Number(to) || 0);
  return <>{Math.round(v)}{suffix}</>;
}

function Backdrop({ theme }: { theme: ReturnType<typeof getTheme> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, h = 0, raf = 0;
    const P = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 1,
      s: Math.random() * 0.0004 + 0.0001,
      p: Math.random() * 6,
    }));
    const rs = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    rs();
    addEventListener("resize", rs);
    const f = (t: number) => {
      x.clearRect(0, 0, w, h);
      P.forEach((p) => {
        p.y -= p.s * 16;
        if (p.y < -0.05) p.y = 1.05;
        x.beginPath();
        x.arc((p.x + Math.sin(t / 2600 + p.p) * 0.02) * w, p.y * h, p.r, 0, 7);
        x.fillStyle = theme.primary + "30";
        x.fill();
      });
      raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", rs);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-500" style={{ backgroundColor: theme.bg }} aria-hidden>
      <div className="blob w-[52vw] h-[52vw] -top-[12vw] left-[6vw] transition-all duration-700" style={{ backgroundColor: theme.blob1, opacity: 0.55 }} />
      <div className="blob w-[42vw] h-[42vw] bottom-[-10vw] right-[-4vw] transition-all duration-700" style={{ backgroundColor: theme.blob2 }} />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}

function Ring({ pct, size = 132, label, color }: { pct: number; size?: number; label?: string; color: string }) {
  const r = 52, c = 2 * Math.PI * r, [o, setO] = useState(c);
  useEffect(() => {
    const t = setTimeout(() => setO(c * (1 - Math.min(pct, 100) / 100)), 150);
    return () => clearTimeout(t);
  }, [pct, c]);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full" aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeOpacity=".18" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={o}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.9,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="disp font-bold" style={{ fontSize: size / 4.4, color }}>
          <Num to={pct} suffix="%" />
        </span>
        {label && <span className="text-[11px] opacity-75">{label}</span>}
      </div>
    </div>
  );
}

export default function VerifyAIApp() {
  const [role, setRole] = useState<Role>("AICTE_OFFICIAL");
  const [isDark, setIsDark] = useState(false);
  const [tab, setTab] = useState<TabId>("dashboard");
  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const [instName, setInstName] = useState("");
  const [region, setRegion] = useState("South-Central");
  const [appType, setAppType] = useState("Increase in Intake / New Course");

  const [simFaculty, setSimFaculty] = useState(70);
  const [simStudents, setSimStudents] = useState(1200);
  const [simArea, setSimArea] = useState(15000);
  const [simResult, setSimResult] = useState<any>(null);

  const [ghostData, setGhostData] = useState<any[] | null>(null);
  const [isScanningGhost, setIsScanningGhost] = useState(false);

  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [isAnalyzingDoc, setIsAnalyzingDoc] = useState(false);
  const [hot, setHot] = useState<string | null>(null);

  const [report, setReport] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { sender: "bot", text: "Greetings! I am your 4O4 VerifyAI Intelligence Core. I can explain findings, check compliance scores, and suggest remediation steps." },
  ]);

  const chatEnd = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const curTheme = getTheme(role, isDark);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const analyse = () => {
    setIsAnalyzingDoc(true);
    setTimeout(() => setIsAnalyzingDoc(false), 1200);
  };

  const pickDoc = (id: string) => {
    setSelectedDocId(id);
    analyse();
  };

  const go = (t: TabId) => {
    setTab(t);
    if (t === "intelligence") analyse();
  };

  const loadData = async () => {
    try {
      const res = await fetch(`${API}/api/state`);
      const data = await res.json();
      setState(data);
      if (data?.documents?.length > 0 && !selectedDocId) {
        setSelectedDocId(data.documents[0].id);
      }
    } catch {
      notify("Establishing secure connection to backend on port 8000...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName) return notify("Please enter institution name.");
    const formData = new FormData();
    formData.append("institution_name", instName);
    formData.append("region", region);
    formData.append("app_type", appType);
    const res = await fetch(`${API}/api/applications`, { method: "POST", body: formData });
    const data = await res.json();
    if (data.status === "success") {
      notify(`Application initialized: ${data.app_id}`);
      setInstName("");
      loadData();
      setTab("applications");
    }
  };

  const runSimulator = async () => {
    const formData = new FormData();
    formData.append("faculty", simFaculty.toString());
    formData.append("students", simStudents.toString());
    formData.append("area", simArea.toString());
    const res = await fetch(`${API}/api/what-if`, { method: "POST", body: formData });
    setSimResult(await res.json());
    notify("What-If compliance matrix calculated successfully.");
  };

  const ask = async (q: string) => {
    if (!q.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: q }]);
    setChatInput("");
    setTyping(true);
    try {
      const activeAppId = state?.applications?.[0]?.id || "AICTE-2026-REG-8841";
      const formData = new FormData();
      formData.append("query", q);
      formData.append("app_id", activeAppId);
      const res = await fetch(`${API}/api/help-desk`, { method: "POST", body: formData });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "AI Core connection interrupted. Please ensure backend is running." }]);
    } finally {
      setTyping(false);
    }
  };

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    ask(chatInput);
  };

  const runGhost = async () => {
    setIsScanningGhost(true);
    try {
      const fd = new FormData();
      fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
      const res = await fetch(`${API}/api/ghost-faculty-check`, { method: "POST", body: fd });
      const out = await res.json();
      const list = out?.flagged_faculty || [];
      setGhostData(list);
      notify(`Scan completed: Found ${list.length} records.`);
    } catch {
      notify("Error executing ghost faculty check.");
    } finally {
      setIsScanningGhost(false);
    }
  };

  const getReport = async () => {
    const appId = state.applications[0]?.id || "AICTE-2026-REG-8841";
    const res = await fetch(`${API}/api/scrutiny-report/${appId}`);
    setReport(await res.json());
    notify("Official Scrutiny Committee Report generated successfully.");
  };

  const downloadReport = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }));
    a.download = "scrutiny-report.json";
    a.click();
  };

  const uploadDoc = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
    fd.append("file", f);
    const res = await fetch(`${API}/api/upload-document`, { method: "POST", body: fd });
    const out = await res.json();
    if (out.status === "success") {
      notify("Document uploaded, OCR parsed & ELA scanned successfully!");
      loadData();
    }
  };

  const DYNAMIC_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
    .v { font-family: 'Hanken Grotesk', system-ui, sans-serif; color: ${curTheme.heading}; }
    .disp { font-family: 'Fraunces', Georgia, serif; letter-spacing: -.025em; color: ${curTheme.heading}; }
    @keyframes rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
    .st { animation: rise .6s cubic-bezier(.2,.9,.2,1) both; }
    @keyframes drift { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(6vw,4vh,0) scale(1.15); } }
    .blob { position: absolute; border-radius: 9999px; filter: blur(85px); animation: drift 18s ease-in-out infinite; }
    @keyframes beam { from { top: -10%; } to { top: 100%; } }
    .beam {
      position: absolute; left: 0; right: 0; height: 75px; z-index: 5; pointer-events: none;
      background: linear-gradient(to bottom, transparent, ${curTheme.beamColor});
      border-bottom: 3px solid ${curTheme.primary};
      box-shadow: 0 8px 30px ${curTheme.primary}88;
      animation: beam 3s cubic-bezier(.6,0,.4,1) infinite alternate;
    }
    @keyframes shrink { from { width: 100%; } to { width: 0; } }
    @keyframes slide { from { opacity: 0; transform: translateX(35px); } to { opacity: 1; transform: none; } }
    .v input[type=range] { accent-color: ${curTheme.primary}; height: 6px; }
  `;

  if (!mounted || loading || !state) {
    return (
      <div className="v min-h-screen flex flex-col items-center justify-center gap-6 relative" style={{ backgroundColor: curTheme.bg }}>
        <style dangerouslySetInnerHTML={{ __html: DYNAMIC_CSS }} />
        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-dashed animate-spin" style={{ borderColor: curTheme.primary }}>
          <Sparkles className="w-6 h-6" style={{ color: curTheme.primary }} />
        </div>
        <p className="disp text-xl font-bold">Initializing 4O4 VerifyAI Workspaces…</p>
      </div>
    );
  }

  const apps: any[] = state.applications || [];
  const docs: any[] = state.documents || [];
  const findings: any[] = state.findings || [];
  const logs: any[] = state.audit_logs || [];
  const activeDoc = docs.find((x: any) => x.id === selectedDocId) || docs[0];
  const avg = apps.length ? apps.reduce((s: number, a: any) => s + (Number(a.compliance_score) || 0), 0) / apps.length : 0;
  const navIdx = NAV.findIndex((n) => n.id === tab);
  const cur = NAV[navIdx];
  const RoleIcon = curTheme.icon;

  const ex = activeDoc?.extracted_data || {};
  const fields = [
    { k: "faculty", l: "Faculty count", v: ex.faculty_count, f: 70, u: "" },
    { k: "students", l: "Student enrollment", v: ex.student_enrollment, f: 1200, u: "" },
    { k: "area", l: "Built-up area (sq ft)", v: ex.built_up_sqft, f: 15000, u: "" },
    { k: "phd", l: "PhD share", v: ex.phd_percent, f: 35, u: "%" },
  ];

  const roleList: Role[] = ["AICTE_OFFICIAL", "SCRUTINY_OFFICER", "INSTITUTION", "ADMIN"];

  return (
    <div className="v min-h-screen relative transition-colors duration-500" style={{ backgroundColor: curTheme.bg }}>
      <style dangerouslySetInnerHTML={{ __html: DYNAMIC_CSS }} />
      <Backdrop theme={curTheme} />

      {toast && (
        <div className="fixed top-5 right-5 z-[60] rounded-2xl border shadow-2xl overflow-hidden max-w-sm" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border, animation: "slide .4s ease-out" }}>
          <div className="px-5 py-3 text-sm flex items-center gap-2 font-medium" style={{ color: curTheme.heading }}>
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: curTheme.primary }} />
            {toast}
          </div>
          <div className="h-1" style={{ backgroundColor: curTheme.primary, animation: "shrink 3.5s linear forwards" }} />
        </div>
      )}

      {/* ===== GLOBAL TOP BAR WITH DARK/LIGHT TOGGLE & THEME SELECTOR ===== */}
      <header className="sticky top-0 z-40 px-6 py-3.5 border-b backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 transition-colors duration-500 shadow-sm" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md transition-all" style={{ backgroundColor: curTheme.primary }}>
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="disp font-bold text-base leading-none">4O4 VerifyAI</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold" style={{ borderColor: curTheme.border, color: curTheme.primary, backgroundColor: curTheme.subCardBg }}>
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] opacity-75 font-sans mt-0.5">Autonomous Institutional Compliance Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* DARK / LIGHT MODE SWITCH BUTTON */}
          <button
            onClick={() => {
              setIsDark(!isDark);
              notify(`Switched to ${!isDark ? "Dark" : "Light"} Mode`);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-bold text-xs shadow-xs transition-all hover:scale-105"
            style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.heading }}
            title="Toggle Dark / Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* 4 ROLE THEME SWITCHERS */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-xs" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 opacity-60">Role:</span>
            {roleList.map((r) => {
              const themeOption = getTheme(r, isDark);
              const active = role === r;
              return (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    notify(`Switched workspace to ${themeOption.label}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    active ? "text-white shadow-md scale-102" : "opacity-80 border-transparent hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: active ? themeOption.primary : "transparent",
                    borderColor: active ? themeOption.primary : "transparent",
                    color: active ? "#FFFFFF" : curTheme.heading,
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: active ? "#FFFFFF" : themeOption.primary }} />
                  <span>{themeOption.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ===== SIDEBAR ===== */}
      <aside className="hidden lg:flex fixed left-4 top-20 bottom-4 w-[265px] z-30 flex-col rounded-[28px] border shadow-xl p-5 backdrop-blur-xl transition-all duration-500" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
        <div className="p-3.5 rounded-2xl mb-4 border transition-colors" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
          <div className="flex items-center gap-2">
            <RoleIcon className="w-4 h-4" style={{ color: curTheme.primary }} />
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: curTheme.primary }}>{curTheme.personaTag}</span>
          </div>
          <p className="text-[11px] opacity-80 mt-1 font-medium">{curTheme.badge}</p>
        </div>

        <nav className="relative space-y-1.5" aria-label="Primary Navigation">
          {NAV.map((n) => {
            const Icon = n.icon;
            const on = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`w-full h-11 px-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 ${
                  on ? "text-white shadow-md" : "hover:opacity-100 opacity-80"
                }`}
                style={{
                  backgroundColor: on ? curTheme.primary : "transparent",
                  color: on ? "#FFFFFF" : curTheme.heading,
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{n.label}</span>
                {n.id === "applications" && (
                  <span className={`ml-auto text-[11px] px-2 py-0.5 rounded-full font-bold ${on ? "bg-white/25 text-white" : "bg-black/10 text-inherit"}`}>
                    {apps.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="lg:pl-[295px] relative z-10">
        <main key={tab + isDark} className="px-6 lg:px-10 py-8 pb-32 max-w-[1440px] space-y-8">
          <div className="st flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="disp text-4xl lg:text-[42px] font-bold leading-tight">{cur.label}</h1>
              <p className="text-sm opacity-80 mt-1">{cur.sub}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-xs font-semibold border rounded-full px-3.5 py-2 shadow-xs backdrop-blur-md" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border, color: curTheme.heading }}>
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: curTheme.primary }} />
                Active Theme: <b>{curTheme.label} ({isDark ? "Dark" : "Light"})</b>
              </span>
            </div>
          </div>

          {/* ===== 1. DASHBOARD TAB ===== */}
          {tab === "dashboard" && (
            <div className="space-y-8">
              <section className="grid lg:grid-cols-12 gap-6 items-stretch">
                <div
                  className="st lg:col-span-8 relative overflow-hidden rounded-[32px] border p-8 lg:p-11 shadow-sm backdrop-blur-xl"
                  style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-4" style={{ borderColor: curTheme.border, backgroundColor: curTheme.subCardBg, color: curTheme.primary }}>
                    <Sparkles className="w-3.5 h-3.5" /> Smart India Hackathon 2026 • AICTE PS ID SIH26261
                  </div>
                  <h2 className="disp text-4xl lg:text-5xl font-bold leading-tight max-w-xl">
                    Autonomous Institutional Scrutiny & Regulatory AI
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-85">
                    Unified OCR extraction, Error Level Analysis (ELA) pixel tampering detection, and RAG compliance evaluation aligned with AICTE Chapter IV requirements.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-8">
                    <button
                      onClick={() => go("intelligence")}
                      className="px-6 py-3 rounded-full text-white font-semibold text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2"
                      style={{ backgroundColor: curTheme.primary }}
                    >
                      <FileSearch className="w-4 h-4" /> Open Document Workspace
                    </button>
                    <button
                      onClick={() => go("simulator")}
                      className="px-6 py-3 rounded-full font-semibold text-sm border hover:opacity-80 transition-all shadow-xs"
                      style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.heading }}
                    >
                      Launch What-If Simulator
                    </button>
                  </div>
                </div>

                <div
                  className="st lg:col-span-4 rounded-[32px] border p-8 flex flex-col items-center justify-center gap-5 shadow-sm backdrop-blur-xl"
                  style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}
                >
                  <Ring pct={avg} size={168} label="Average Compliance" color={curTheme.primary} />
                  <span className="text-xs border rounded-full px-3.5 py-1.5 font-bold shadow-xs" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.primary }}>
                    ChromaDB Vector Synced
                  </span>
                </div>
              </section>

              {/* Metrics Grid */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  ["Applications in Queue", state.metrics.total_applications],
                  ["Documents Verified", state.metrics.verified_documents],
                  ["Unresolved Discrepancies", state.metrics.unresolved_discrepancies],
                  ["Compliance Flags", state.metrics.compliance_issues],
                ].map(([label, val]: any) => (
                  <div
                    key={label}
                    className="p-6 rounded-[24px] border shadow-xs transition-all hover:translate-y-[-2px] backdrop-blur-md"
                    style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}
                  >
                    <p className="disp text-4xl font-bold" style={{ color: curTheme.primary }}>
                      <Num to={val} />
                    </p>
                    <p className="text-xs font-semibold opacity-75 mt-1">{label}</p>
                  </div>
                ))}
              </section>

              {/* Findings & Create Section */}
              <section className="grid lg:grid-cols-12 gap-6 items-start">
                <div
                  className="lg:col-span-7 p-7 rounded-[28px] border shadow-xs space-y-4 backdrop-blur-xl"
                  style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="disp text-xl font-bold">Automated Findings & Rule Citations</h3>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border" style={{ borderColor: curTheme.border, color: curTheme.primary, backgroundColor: curTheme.subCardBg }}>
                      AICTE Chapter IV
                    </span>
                  </div>
                  <div className="space-y-3">
                    {findings.map((f: any) => (
                      <div
                        key={f.id}
                        className="p-4 rounded-2xl border transition-all hover:scale-[1.01]"
                        style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}
                      >
                        <div className="flex items-center gap-2">
                          <b className="font-mono text-xs" style={{ color: curTheme.primary }}>[{f.rule_id}]</b>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.severity === "PASS" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                            {f.severity}
                          </span>
                          <span className="ml-auto text-[11px] opacity-70">{f.status}</span>
                        </div>
                        <p className="text-sm font-medium mt-1.5">{f.message}</p>
                        <p className="text-xs opacity-70 mt-1">Evidence: <b>{f.evidence_reference}</b></p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="lg:col-span-5 p-7 rounded-[28px] border shadow-xs space-y-4 backdrop-blur-xl"
                  style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}
                >
                  <h3 className="disp text-xl font-bold">Start New Application</h3>
                  <form onSubmit={handleCreateApp} className="space-y-3 font-mono text-xs">
                    <input
                      value={instName}
                      onChange={(e) => setInstName(e.target.value)}
                      placeholder="e.g. Apex Institute of Engineering"
                      className="w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none"
                      style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.heading }}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="border rounded-2xl px-3 py-2.5 text-xs focus:outline-none"
                        style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.heading }}
                      >
                        {["South-Central", "North", "West", "South"].map((r) => (
                          <option key={r} value={r} style={{ backgroundColor: curTheme.bg, color: curTheme.heading }}>{r}</option>
                        ))}
                      </select>
                      <select
                        value={appType}
                        onChange={(e) => setAppType(e.target.value)}
                        className="border rounded-2xl px-3 py-2.5 text-xs focus:outline-none"
                        style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.heading }}
                      >
                        <option value="Increase in Intake / New Course" style={{ backgroundColor: curTheme.bg, color: curTheme.heading }}>Increase in Intake</option>
                        <option value="Extension of Approval (EoA)" style={{ backgroundColor: curTheme.bg, color: curTheme.heading }}>Extension of Approval</option>
                        <option value="New Institution Establishment" style={{ backgroundColor: curTheme.bg, color: curTheme.heading }}>New Institution</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                      style={{ backgroundColor: curTheme.primary }}
                    >
                      <PlusCircle className="w-4 h-4" /> Create & Initialize Pipeline
                    </button>
                  </form>
                </div>
              </section>
            </div>
          )}

          {/* ===== 2. APPLICATIONS TAB ===== */}
          {tab === "applications" && (
            <div className="space-y-4">
              {apps.map((a: any) => (
                <div
                  key={a.id}
                  className="p-6 rounded-[28px] border shadow-xs flex flex-wrap items-center gap-6 backdrop-blur-xl transition-all hover:translate-y-[-2px]"
                  style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}
                >
                  <Ring pct={Number(a.compliance_score) || 0} size={94} color={curTheme.primary} />
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex items-center gap-2">
                      <b className="font-mono text-xs" style={{ color: curTheme.primary }}>{a.id}</b>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border" style={{ borderColor: curTheme.border, backgroundColor: curTheme.subCardBg }}>
                        {a.status}
                      </span>
                      <span className="text-xs opacity-75">{a.region}</span>
                    </div>
                    <p className="disp text-2xl font-bold mt-1">{a.institution_name}</p>
                    <p className="text-xs opacity-75 mt-0.5">{a.app_type} • Officer: <b>{a.assigned_officer}</b></p>
                  </div>
                  <div className="w-44 text-right">
                    <p className="text-xs opacity-80 mb-1">Tamper Risk: {((a.tamper_risk_score || 0) * 100).toFixed(0)}%</p>
                    <div className="h-2 rounded-full overflow-hidden bg-black/10">
                      <div className="h-full rounded-full" style={{ width: `${(a.tamper_risk_score || 0) * 100}%`, backgroundColor: curTheme.primary }} />
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedDocId(docs[0]?.id); go("intelligence"); }}
                    className="w-11 h-11 rounded-full flex items-center justify-center border transition-all hover:scale-110"
                    style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.primary }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ===== 3. DOCUMENT INTELLIGENCE TAB ===== */}
          {tab === "intelligence" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <label
                  className="px-6 py-3 rounded-full text-white font-semibold text-sm shadow-md cursor-pointer flex items-center gap-2 transition-all hover:scale-105"
                  style={{ backgroundColor: curTheme.primary }}
                >
                  <FileText className="w-4 h-4" /> Upload Disclosure PDF / Image
                  <input type="file" onChange={uploadDoc} className="sr-only" />
                </label>
              </div>

              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-3 p-5 rounded-[28px] border shadow-xs space-y-3 backdrop-blur-xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-75">Uploaded Files</p>
                  <div className="space-y-2">
                    {docs.map((x: any) => (
                      <button
                        key={x.id}
                        onClick={() => pickDoc(x.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                          activeDoc?.id === x.id ? "border-2 shadow-xs translate-x-1" : "hover:opacity-100 opacity-80"
                        }`}
                        style={{
                          backgroundColor: activeDoc?.id === x.id ? curTheme.subCardBg : "transparent",
                          borderColor: activeDoc?.id === x.id ? curTheme.primary : curTheme.border,
                        }}
                      >
                        <FileSearch className="w-4 h-4 shrink-0" style={{ color: activeDoc?.id === x.id ? curTheme.primary : "inherit" }} />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold">{x.filename}</p>
                          <p className="text-[10px] opacity-70">OCR Confidence: {(x.ocr_confidence * 100).toFixed(0)}%</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-[28px] border shadow-xs space-y-4 backdrop-blur-xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: curTheme.primary }}>
                      {isAnalyzingDoc ? "Scanning Bounding Boxes" : "Live Document Inspection"}
                    </span>
                    <span className="text-xs opacity-75 truncate">{activeDoc?.filename}</span>
                  </div>

                  <div className="relative rounded-2xl border overflow-hidden p-6 min-h-[420px] shadow-inner" style={{ backgroundColor: isDark ? "#0A0D14" : "#FFFFFF", borderColor: curTheme.border }}>
                    <div className="beam" />
                    <div className="space-y-3.5">
                      {WIDTHS.map((w, i) => {
                        const ev = [2, 5, 8, 11].indexOf(i);
                        if (ev < 0) {
                          return <div key={i} className="h-2.5 rounded-full opacity-20" style={{ width: `${w}%`, backgroundColor: curTheme.primary }} />;
                        }
                        const fl = fields[ev];
                        const on = hot === fl.k;
                        return (
                          <div
                            key={i}
                            onMouseEnter={() => setHot(fl.k)}
                            onMouseLeave={() => setHot(null)}
                            className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs border transition-all cursor-pointer"
                            style={{
                              backgroundColor: on ? curTheme.primary : curTheme.subCardBg,
                              color: on ? "#FFFFFF" : curTheme.heading,
                              borderColor: on ? curTheme.primary : curTheme.border,
                              transform: on ? "scale(1.02)" : "none",
                            }}
                          >
                            <span className="font-semibold">{fl.l}</span>
                            <b className="font-mono">{fl.v ?? fl.f}{fl.u}</b>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border text-xs" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
                    <b style={{ color: curTheme.primary }}>Tamper Analysis (ELA Engine):</b>
                    <p className="mt-0.5 opacity-85">{activeDoc?.tamper_analysis?.details || "No pixel anomalies found."}</p>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-[28px] border shadow-xs space-y-4 backdrop-blur-xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-sm">Extracted Parameters</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Verified Fields</span>
                  </div>

                  <div className="space-y-2.5">
                    {fields.map((fl) => (
                      <div
                        key={fl.k}
                        onMouseEnter={() => setHot(fl.k)}
                        onMouseLeave={() => setHot(null)}
                        className="p-3.5 rounded-2xl border transition-all"
                        style={{
                          backgroundColor: hot === fl.k ? curTheme.primary : curTheme.subCardBg,
                          color: hot === fl.k ? "#FFFFFF" : curTheme.heading,
                          borderColor: hot === fl.k ? curTheme.primary : curTheme.border,
                        }}
                      >
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs opacity-75">{fl.l}</span>
                          <b className="disp text-2xl" style={{ color: hot === fl.k ? "#FFFFFF" : curTheme.primary }}>{fl.v ?? fl.f}{fl.u}</b>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => { analyse(); notify("Re-evaluating RAG compliance matrix against AICTE Handbooks..."); }}
                    className="w-full py-3 rounded-2xl text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: curTheme.primary }}
                  >
                    Run Full Compliance Re-Check
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== 4. WHAT-IF SIMULATOR TAB ===== */}
          {tab === "simulator" && (
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 p-8 rounded-[32px] border shadow-xs space-y-6 backdrop-blur-xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
                <h3 className="disp text-2xl font-bold">Policy Parameters</h3>
                <p className="text-xs opacity-75 -mt-3">Simulate institutional figures without affecting stored application records.</p>

                {[
                  ["Faculty Count", simFaculty, setSimFaculty, 20, 200, 1],
                  ["Student Enrollment", simStudents, setSimStudents, 300, 3000, 50],
                  ["Built-Up Area (sq ft)", simArea, setSimArea, 5000, 40000, 500],
                ].map(([label, val, setVal, mn, mx, stp]: any) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{label}</span>
                      <b className="font-mono text-sm" style={{ color: curTheme.primary }}>{val}</b>
                    </div>
                    <input
                      type="range"
                      min={mn}
                      max={mx}
                      step={stp}
                      value={val}
                      onChange={(e) => setVal(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                ))}

                <button
                  onClick={runSimulator}
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: curTheme.primary }}
                >
                  Run Compliance Simulation
                </button>
              </div>

              <div className="lg:col-span-7 p-8 rounded-[32px] border shadow-xs flex flex-col justify-center items-center text-center backdrop-blur-xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
                {simResult ? (
                  <div className="space-y-5 w-full flex flex-col items-center">
                    <Ring pct={Number(simResult.projected_compliance_score) || 0} size={180} label="Projected Score" color={curTheme.primary} />
                    <div className="grid grid-cols-2 gap-4 w-full text-left">
                      <div className="p-4 rounded-2xl border" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
                        <p className="text-[11px] opacity-75">Student-Faculty Ratio</p>
                        <p className="disp text-xl font-bold mt-0.5">{simResult.simulated_ratio}:1</p>
                        <p className="text-xs font-semibold mt-1" style={{ color: curTheme.primary }}>{simResult.ratio_status}</p>
                      </div>
                      <div className="p-4 rounded-2xl border" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
                        <p className="text-[11px] opacity-75">Infrastructure Area</p>
                        <p className="disp text-xl font-bold mt-0.5">{simArea} sq ft</p>
                        <p className="text-xs font-semibold mt-1" style={{ color: curTheme.primary }}>{simResult.area_status}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{simResult.recommendation}</p>
                  </div>
                ) : (
                  <div className="space-y-2 opacity-60">
                    <Sliders className="w-10 h-10 mx-auto" style={{ color: curTheme.primary }} />
                    <p className="text-xs">Adjust sliders on the left to simulate compliance score results.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== 5. GHOST FACULTY & REPORTS TAB ===== */}
          {tab === "ghost" && (
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="p-8 rounded-[32px] border shadow-xs space-y-5 backdrop-blur-xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
                <h3 className="disp text-2xl font-bold">Biometric & EPFO Cross-Reference</h3>
                <p className="text-xs opacity-75 -mt-3">Audit faculty PAN data against nationwide provident registries to detect dual-employment or ghost staff.</p>

                <button
                  onClick={runGhost}
                  disabled={isScanningGhost}
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: curTheme.primary }}
                >
                  {isScanningGhost ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
                  Execute National EPFO Cross-Check
                </button>

                {ghostData && (
                  <div className="space-y-2.5">
                    {ghostData.map((f: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl border flex justify-between items-center" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
                        <div>
                          <p className="font-bold text-xs">{f.name} <span className="opacity-70">({f.pan})</span></p>
                          <p className="text-[11px] font-semibold mt-0.5" style={{ color: curTheme.primary }}>{f.conflict || "Verified Active Faculty"}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${f.status === "DUPLICATE" ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                          {f.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 rounded-[32px] border shadow-xs space-y-5 backdrop-blur-xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
                <h3 className="disp text-2xl font-bold">Official Scrutiny Report</h3>
                <p className="text-xs opacity-75 -mt-3">Compile all verified OCR extractions, tamper indices, and compliance percentages into an official report packet.</p>

                <button
                  onClick={getReport}
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: curTheme.primary }}
                >
                  Generate Official Scrutiny Report
                </button>
              </div>
            </div>
          )}

          {/* ===== 6. AUDIT TRAIL TAB ===== */}
          {tab === "audit" && (
            <div className="p-8 rounded-[32px] border shadow-xs backdrop-blur-xl space-y-6" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
              <h3 className="disp text-2xl font-bold">Immutable Audit Trail</h3>
              <div className="space-y-3 font-mono text-xs">
                {logs.map((l: any) => (
                  <div key={l.id} className="p-4 rounded-2xl border flex flex-wrap justify-between items-center gap-3" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
                    <div>
                      <span className="font-bold mr-2" style={{ color: curTheme.primary }}>[{l.app_id}]</span>
                      <span className="font-bold px-2 py-0.5 rounded bg-black/10 mr-2">{l.action}</span>
                      <span className="opacity-90">{l.details}</span>
                      <p className="text-[10px] opacity-60 mt-1">Actor: {l.actor_name} ({l.actor_role})</p>
                    </div>
                    <span className="text-[10px] opacity-60">{l.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===== SCRUTINY REPORT MODAL ===== */}
      {report && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setReport(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-[28px] border p-6 shadow-2xl" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="disp text-2xl font-bold">Official Scrutiny Committee Report</h3>
              <button onClick={() => setReport(null)} className="p-2 rounded-full hover:bg-black/10"><X className="w-4 h-4" /></button>
            </div>
            <pre className="flex-1 overflow-auto rounded-2xl p-4 text-xs font-mono border" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.heading }}>
              {JSON.stringify(report, null, 2)}
            </pre>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setReport(null)} className="px-5 py-2.5 rounded-full border text-xs font-bold" style={{ borderColor: curTheme.border, color: curTheme.heading }}>Close</button>
              <button onClick={downloadReport} className="px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-md" style={{ backgroundColor: curTheme.primary }}>
                Download JSON Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== ASSISTANT FLOATING ORB & CHAT DRAWER ===== */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110"
            style={{ backgroundColor: curTheme.primary }}
          >
            <Bot className="w-7 h-7" />
          </button>
        ) : (
          <div className="w-[390px] h-[540px] rounded-[28px] border shadow-2xl flex flex-col overflow-hidden" style={{ backgroundColor: curTheme.cardBg, borderColor: curTheme.border }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border }}>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" style={{ color: curTheme.primary }} />
                <span className="font-bold text-sm">VerifyAI Intelligence Core</span>
              </div>
              <button onClick={() => setChatOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed whitespace-pre-line ${
                    m.sender === "user" ? "ml-auto text-white shadow-sm" : "mr-auto border"
                  }`}
                  style={{
                    backgroundColor: m.sender === "user" ? curTheme.primary : curTheme.subCardBg,
                    borderColor: m.sender === "user" ? "transparent" : curTheme.border,
                    color: m.sender === "user" ? "#FFFFFF" : curTheme.heading,
                  }}
                >
                  {m.text}
                </div>
              ))}
              {typing && <div className="text-xs opacity-60">AI is analyzing application evidence...</div>}
              {messages.length < 3 && (
                <div className="space-y-1.5 pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Suggested Questions:</p>
                  {CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => ask(c)}
                      className="w-full text-left p-2 rounded-xl border text-[11px] transition-all hover:opacity-100 opacity-85"
                      style={{ borderColor: curTheme.border, color: curTheme.heading, backgroundColor: curTheme.subCardBg }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
              <div ref={chatEnd} />
            </div>
            <form onSubmit={sendChat} className="p-3 border-t flex gap-2" style={{ borderColor: curTheme.border }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about AICTE rules, ratios, status, ELA..."
                className="flex-1 border rounded-xl px-3 py-2 text-xs focus:outline-none"
                style={{ backgroundColor: curTheme.subCardBg, borderColor: curTheme.border, color: curTheme.heading }}
              />
              <button type="submit" className="px-4 py-2 rounded-xl text-white font-bold" style={{ backgroundColor: curTheme.primary }}>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
