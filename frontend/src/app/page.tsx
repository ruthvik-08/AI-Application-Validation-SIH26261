// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Cpu,
//   FileText,
//   Bot,
//   Send,
//   X,
//   Sparkles,
//   Layers,
//   History,
//   Sliders,
//   PlusCircle,
//   FileSearch,
//   ShieldAlert,
//   CheckCircle2,
//   AlertTriangle,
//   ArrowUpRight,
//   RefreshCw,
//   Search,
//   ChevronRight,
//   Eye,
//   Lock
// } from "lucide-react";

// type Role = "INSTITUTION" | "SCRUTINY_OFFICER" | "AICTE_OFFICIAL" | "ADMIN";
// type TabId = "dashboard" | "applications" | "intelligence" | "simulator" | "ghost" | "audit";

// const ROLES: { id: Role; label: string; badge: string }[] = [
//   { id: "INSTITUTION", label: "Institution Portal", badge: "College Nodal Officer" },
//   { id: "SCRUTINY_OFFICER", label: "Scrutiny Officer", badge: "Expert Reviewer" },
//   { id: "AICTE_OFFICIAL", label: "AICTE Bureau Official", badge: "Approvals & Escalations" },
//   { id: "ADMIN", label: "System Admin", badge: "Rules & Security" },
// ];

// export default function VerifyAIApp() {
//   const [role, setRole] = useState<Role>("AICTE_OFFICIAL");
//   const [tab, setTab] = useState<TabId>("dashboard");
//   const [state, setState] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState<string | null>(null);

//   // Form states
//   const [instName, setInstName] = useState("");
//   const [region, setRegion] = useState("South-Central");
//   const [appType, setAppType] = useState("Increase in Intake / New Course");

//   // Simulator states
//   const [simFaculty, setSimFaculty] = useState(70);
//   const [simStudents, setSimStudents] = useState(1200);
//   const [simArea, setSimArea] = useState(15000);
//   const [simResult, setSimResult] = useState<any>(null);

//   // Ghost faculty state
//   const [ghostData, setGhostData] = useState<any[] | null>(null);
//   const [isScanningGhost, setIsScanningGhost] = useState(false);

//   // Document intelligence active view
//   const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
//   const [isAnalyzingDoc, setIsAnalyzingDoc] = useState(false);

//   // AI Assistant States
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatInput, setChatInput] = useState("");
//   const [messages, setMessages] = useState<any[]>([
//     { sender: "bot", text: "Greetings! I am your 4O4 VerifyAI Intelligence Core, fully synchronized with AICTE Approval Handbooks 2026." }
//   ]);

//   const notify = (msg: string) => {
//     setToast(msg);
//     setTimeout(() => setToast(null), 3500);
//   };

//   const loadData = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/state");
//       const data = await res.json();
//       setState(data);
//       if (data?.documents?.length > 0 && !selectedDocId) {
//         setSelectedDocId(data.documents[0].id);
//       }
//     } catch {
//       notify("Establishing secure connection to backend on port 8000...");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleCreateApp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!instName) return notify("Please enter institution name.");
//     const formData = new FormData();
//     formData.append("institution_name", instName);
//     formData.append("region", region);
//     formData.append("app_type", appType);

//     const res = await fetch("http://localhost:8000/api/applications", { method: "POST", body: formData });
//     const data = await res.json();
//     if (data.status === "success") {
//       notify(`Application initialized successfully: ${data.app_id}`);
//       setInstName("");
//       loadData();
//       setTab("applications");
//     }
//   };

//   const runSimulator = async () => {
//     const formData = new FormData();
//     formData.append("faculty", simFaculty.toString());
//     formData.append("students", simStudents.toString());
//     formData.append("area", simArea.toString());
//     const res = await fetch("http://localhost:8000/api/what-if", { method: "POST", body: formData });
//     const data = await res.json();
//     setSimResult(data);
//     notify("What-If compliance matrix calculated successfully.");
//   };

//   const sendChat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!chatInput.trim()) return;
//     const q = chatInput;
//     setMessages(prev => [...prev, { sender: "user", text: q }]);
//     setChatInput("");
//     try {
//       const formData = new FormData();
//       formData.append("query", q);
//       const res = await fetch("http://localhost:8000/api/help-desk", { method: "POST", body: formData });
//       const data = await res.json();
//       setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
//     } catch {
//       setMessages(prev => [...prev, { sender: "bot", text: "AI Core connection interrupted. Please ensure the backend is running." }]);
//     }
//   };

//   if (loading || !state) {
//     return (
//       <div className="min-h-screen bg-[#FFF7FA] text-[#D94F87] flex flex-col items-center justify-center font-mono space-y-4">
//         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D94F87] to-[#F2B8D0] animate-spin flex items-center justify-center text-white shadow-lg">
//           <Sparkles className="w-6 h-6 animate-pulse" />
//         </div>
//         <p className="text-xs tracking-widest uppercase font-bold text-[#512D43]">INITIALIZING 4O4 VERIFYAI NEURAL CORE (SIH 2026)...</p>
//       </div>
//     );
//   }

//   const activeDoc = state.documents.find((d: any) => d.id === selectedDocId) || state.documents[0];

//   return (
//     <div className="min-h-screen flex flex-col bg-[#FFF7FA] text-[#4A3B43] font-sans relative overflow-x-hidden selection:bg-[#F2B8D0] selection:text-[#512D43]">
//       {/* Ambient background lighting */}
//       <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#F2B8D0]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
//       <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#D94F87]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

//       {toast && (
//         <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl bg-white border border-[#F2B8D0] text-[#512D43] font-mono text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
//           <Sparkles className="w-4 h-4 text-[#D94F87]" />
//           {toast}
//         </div>
//       )}

//       {/* Header */}
//       <header className="border-b border-[#F1DCE5] bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
//         <div className="flex items-center gap-3.5">
//           <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D94F87] to-[#F2B8D0] flex items-center justify-center text-white font-bold shadow-lg shadow-[#D94F87]/25 relative group">
//             <Cpu className="w-5 h-5 transition-transform group-hover:scale-110" />
//             <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
//             <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
//           </div>
//           <div>
//             <div className="flex items-center gap-2.5">
//               <span className="font-extrabold text-base tracking-tight text-[#512D43]">
//                 4O4 VerifyAI
//               </span>
//               <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFF7FA] text-[#D94F87] border border-[#F2B8D0] shadow-xs">
//                 SIH 2026 • PS ID: SIH26261
//               </span>
//             </div>
//             <p className="text-[11px] text-[#7A6370] font-mono">
//               Autonomous AICTE Institutional Verification & Compliance Engine
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-1.5 bg-[#FFF7FA] p-1.5 rounded-2xl border border-[#F1DCE5] shadow-xs">
//             <span className="text-[10px] font-mono uppercase font-bold text-[#7A6370] px-2">Role:</span>
//             {ROLES.map(r => (
//               <button
//                 key={r.id}
//                 onClick={() => { setRole(r.id); notify(`Switched workspace to ${r.label}`); }}
//                 className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all font-medium ${role === r.id ? 'bg-[#D94F87] text-white shadow-md shadow-[#D94F87]/20 scale-102' : 'text-[#7A6370] hover:text-[#512D43] hover:bg-white/80'}`}
//               >
//                 {r.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav className="bg-white/90 backdrop-blur-md border-b border-[#F1DCE5] px-6 py-2.5 flex items-center gap-2.5 overflow-x-auto font-mono text-xs shadow-xs">
//         {[
//           { id: "dashboard", label: "Command Centre", icon: Layers },
//           { id: "applications", label: `Applications (${state.applications.length})`, icon: FileText },
//           { id: "intelligence", label: "Document Intelligence Workspace", icon: FileSearch },
//           { id: "simulator", label: "What-If Simulator", icon: Sliders },
//           { id: "ghost", label: "Ghost Faculty & Reports", icon: ShieldAlert },
//           { id: "audit", label: "Immutable Audit Trail", icon: History },
//         ].map(t => {
//           const Icon = t.icon;
//           return (
//             <button
//               key={t.id}
//               onClick={() => setTab(t.id as TabId)}
//               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap font-medium ${tab === t.id ? 'bg-[#FFF7FA] text-[#D94F87] border border-[#F2B8D0] font-bold shadow-sm translate-y-[-1px]' : 'text-[#7A6370] hover:text-[#512D43] hover:bg-[#FFF7FA]/60'}`}
//             >
//               <Icon className="w-4 h-4 text-[#D94F87]" />
//               {t.label}
//             </button>
//           );
//         })}
//       </nav>

//       <main className="flex-1 max-w-[1500px] w-full mx-auto p-8 space-y-8">
        
//         {/* ================= 1. COMMAND CENTRE ================= */}
//         {tab === "dashboard" && (
//           <div className="space-y-8 animate-in fade-in duration-500">
//             {/* Hero Banner */}
//             <div className="relative rounded-3xl bg-gradient-to-r from-white via-white to-[#FFF7FA] border border-[#F1DCE5] p-8 shadow-sm overflow-hidden">
//               <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-[#F2B8D0]/15 to-transparent pointer-events-none" />
//               <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                 <div className="space-y-2">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7FA] border border-[#F2B8D0] text-[#D94F87] font-mono text-xs font-bold">
//                     <Sparkles className="w-3.5 h-3.5" /> AICTE Smart India Hackathon 2026 • Grand Finale
//                   </div>
//                   <h1 className="text-3xl font-black tracking-tight text-[#512D43]">
//                     Autonomous Institutional Validation Hub
//                   </h1>
//                   <p className="text-sm text-[#7A6370] max-w-2xl font-sans">
//                     Real-time OCR extraction, Error Level Analysis (ELA) tamper detection, RAG-backed compliance checking, and biometric faculty audits unified in a high-security enterprise platform.
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setTab("intelligence")}
//                     className="px-5 py-3 rounded-2xl bg-[#D94F87] hover:bg-[#c43d73] text-white font-bold font-mono text-xs shadow-lg shadow-[#D94F87]/25 flex items-center gap-2 transition-all hover:scale-102"
//                   >
//                     <FileSearch className="w-4 h-4" /> Open Document Workspace
//                   </button>
//                   <button
//                     onClick={() => setTab("simulator")}
//                     className="px-5 py-3 rounded-2xl bg-white hover:bg-[#FFF7FA] text-[#512D43] border border-[#F2B8D0] font-bold font-mono text-xs shadow-xs transition-all"
//                   >
//                     Launch Simulator
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Metrics Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
//               {[
//                 { label: "TOTAL APPLICATIONS", val: state.metrics.total_applications, color: "text-[#512D43]", sub: "Active verification queues" },
//                 { label: "VERIFIED DOCUMENTS", val: state.metrics.verified_documents, color: "text-[#D94F87]", sub: "Processed via local OCR & ELA" },
//                 { label: "UNRESOLVED DISCREPANCIES", val: state.metrics.unresolved_discrepancies, color: "text-amber-600", sub: "Pending officer review" },
//                 { label: "COMPLIANCE ISSUES", val: state.metrics.compliance_issues, color: "text-rose-600", sub: "Rule deviations flagged" },
//               ].map(m => (
//                 <div key={m.label} className="p-6 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs hover:shadow-md transition-all group">
//                   <p className="text-[10px] text-[#7A6370] uppercase font-bold tracking-wider">{m.label}</p>
//                   <p className={`text-4xl font-black mt-2 tracking-tight ${m.color} group-hover:scale-105 transition-transform origin-left`}>{m.val}</p>
//                   <p className="text-[11px] text-[#7A6370] mt-2 font-sans">{m.sub}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Two Column Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
//               {/* Automated Findings */}
//               <div className="lg:col-span-7 p-7 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-5">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#D94F87]">Regulatory Insights</span>
//                     <h3 className="text-lg font-bold text-[#512D43]">Automated Findings & Rule Citations</h3>
//                   </div>
//                   <span className="text-xs font-mono px-3 py-1 rounded-xl bg-[#FFF7FA] text-[#D94F87] border border-[#F2B8D0]">
//                     ChromaDB Vector Synced
//                   </span>
//                 </div>

//                 <div className="space-y-3.5 font-mono text-xs">
//                   {state.findings.map((f: any) => (
//                     <div key={f.id} className="p-4 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex items-start justify-between gap-4 transition-all hover:border-[#F2B8D0]">
//                       <div className="space-y-1.5">
//                         <div className="flex items-center gap-2.5">
//                           <span className="text-[#D94F87] font-bold">[{f.rule_id}]</span>
//                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.severity === 'PASS' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
//                             {f.severity}
//                           </span>
//                         </div>
//                         <p className="text-[#4A3B43] font-sans font-medium">{f.message}</p>
//                         <p className="text-[10px] text-[#7A6370]">Evidence Reference: <span className="text-[#512D43] font-bold">{f.evidence_reference}</span></p>
//                       </div>
//                       <span className="text-[10px] text-amber-600 font-bold whitespace-nowrap bg-white px-2.5 py-1 rounded-xl border border-[#F1DCE5]">
//                         {f.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Application Form */}
//               <div className="lg:col-span-5 p-7 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-5">
//                 <div>
//                   <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#512D43]">Institution Nodal Portal</span>
//                   <h3 className="text-lg font-bold text-[#512D43]">Submit New Application</h3>
//                 </div>

//                 <form onSubmit={handleCreateApp} className="space-y-4 font-mono text-xs">
//                   <div className="space-y-1.5">
//                     <label className="text-[#7A6370] font-medium block">Institution Name</label>
//                     <input
//                       type="text"
//                       value={instName}
//                       onChange={e => setInstName(e.target.value)}
//                       placeholder="e.g. Apex Institute of Technology"
//                       className="w-full bg-[#FFF7FA] border border-[#F1DCE5] rounded-2xl px-4 py-3 text-[#512D43] focus:outline-none focus:border-[#D94F87] font-sans transition-all"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="space-y-1.5">
//                       <label className="text-[#7A6370] font-medium block">AICTE Region</label>
//                       <select value={region} onChange={e => setRegion(e.target.value)} className="w-full bg-[#FFF7FA] border border-[#F1DCE5] rounded-2xl px-3.5 py-3 text-[#512D43] focus:outline-none focus:border-[#D94F87]">
//                         <option value="South-Central">South-Central</option>
//                         <option value="North">North</option>
//                         <option value="West">West</option>
//                         <option value="South">South</option>
//                       </select>
//                     </div>
//                     <div className="space-y-1.5">
//                       <label className="text-[#7A6370] font-medium block">Approval Type</label>
//                       <select value={appType} onChange={e => setAppType(e.target.value)} className="w-full bg-[#FFF7FA] border border-[#F1DCE5] rounded-2xl px-3.5 py-3 text-[#512D43] focus:outline-none focus:border-[#D94F87]">
//                         <option value="Increase in Intake / New Course">Increase in Intake</option>
//                         <option value="Extension of Approval (EoA)">Extension of Approval (EoA)</option>
//                         <option value="New Institution Establishment">New Institution</option>
//                       </select>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full py-3.5 rounded-2xl bg-[#D94F87] hover:bg-[#c43d73] text-white font-bold font-mono shadow-md shadow-[#D94F87]/25 flex items-center justify-center gap-2 transition-all hover:scale-102 mt-3"
//                   >
//                     <PlusCircle className="w-4 h-4" /> Initialize Application & AI Checks
//                   </button>
//                 </form>
//               </div>

//             </div>
//           </div>
//         )}

//         {tab === "applications" && (
//           <div className="space-y-6 animate-in fade-in duration-500">
//             <div>
//               <span className="text-[10px] font-mono uppercase tracking-widest text-[#D94F87]">Queue Management</span>
//               <h2 className="text-2xl font-bold text-[#512D43]">Active Applications Queue & Workflow Status</h2>
//             </div>

//             <div className="space-y-4">
//               {state.applications.map((app: any) => (
//                 <div key={app.id} className="p-6 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs flex flex-wrap items-center justify-between gap-6 font-mono text-xs hover:border-[#F2B8D0] transition-all">
//                   <div className="space-y-1.5">
//                     <div className="flex items-center gap-3">
//                       <span className="text-[#D94F87] font-bold text-sm">{app.id}</span>
//                       <span className="px-3 py-1 rounded-full bg-[#FFF7FA] text-[#512D43] border border-[#F2B8D0] font-bold">{app.status}</span>
//                       <span className="text-[#7A6370]">Region: {app.region}</span>
//                     </div>
//                     <p className="text-base font-bold text-[#512D43] font-sans">{app.institution_name}</p>
//                     <p className="text-[#7A6370]">{app.app_type} • Assigned Officer: <strong className="text-[#512D43]">{app.assigned_officer}</strong></p>
//                   </div>
//                   <div className="flex items-center gap-6">
//                     <div className="text-right space-y-1">
//                       <p className="text-[#D94F87] font-black text-base">{app.compliance_score}% Compliance</p>
//                       <p className="text-[#7A6370]">Tamper Risk: {(app.tamper_risk_score * 100).toFixed(0)}%</p>
//                     </div>
//                     <button
//                       onClick={() => { setSelectedDocId(state.documents[0]?.id); setTab("intelligence"); }}
//                       className="p-3 rounded-2xl bg-[#FFF7FA] border border-[#F2B8D0] text-[#D94F87] hover:bg-[#D94F87] hover:text-white transition-all shadow-xs"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ================= 2. DOCUMENT INTELLIGENCE WORKSPACE ================= */}
//         {tab === "intelligence" && (
//           <div className="space-y-6 animate-in fade-in duration-500">
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <div>
//                 <span className="text-[10px] font-mono uppercase tracking-widest text-[#D94F87]">Immersive AI Review</span>
//                 <h2 className="text-2xl font-bold text-[#512D43]">Document Intelligence & OCR Workspace</h2>
//               </div>
//               <div className="flex items-center gap-3 font-mono text-xs">
//                 <label className="px-4 py-2.5 rounded-2xl bg-[#D94F87] text-white font-bold cursor-pointer shadow-md shadow-[#D94F87]/20 flex items-center gap-2 hover:bg-[#c43d73] transition-all">
//                   <FileText className="w-4 h-4" /> Upload New Disclosure PDF
//                   <input
//                     type="file"
//                     onChange={async e => {
//                       const f = e.target.files?.[0];
//                       if (!f) return;
//                       const fd = new FormData();
//                       fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
//                       fd.append("file", f);
//                       const res = await fetch("http://localhost:8000/api/upload-document", { method: "POST", body: fd });
//                       const d = await res.json();
//                       if (d.status === "success") {
//                         notify("Document uploaded, OCR parsed & ELA scanned successfully!");
//                         loadData();
//                       }
//                     }}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </div>

//             {/* Three-Column Showstopper Workspace */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
//               {/* Left Column: Document Navigator */}
//               <div className="lg:col-span-3 p-5 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-4">
//                 <h3 className="text-xs font-mono uppercase tracking-wider text-[#D94F87] font-bold">Uploaded Disclosures</h3>
//                 <div className="space-y-2.5 font-mono text-xs">
//                   {state.documents.map((doc: any) => (
//                     <button
//                       key={doc.id}
//                       onClick={() => setSelectedDocId(doc.id)}
//                       className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${selectedDocId === doc.id ? 'bg-[#FFF7FA] border-[#D94F87] text-[#512D43] font-bold shadow-xs' : 'bg-white border-[#F1DCE5] text-[#7A6370] hover:bg-[#FFF7FA]/50'}`}
//                     >
//                       <div className="truncate">
//                         <p className="truncate text-[#512D43]">{doc.filename}</p>
//                         <p className="text-[10px] text-[#7A6370] mt-0.5">OCR Conf: {(doc.ocr_confidence * 100).toFixed(0)}%</p>
//                       </div>
//                       <FileSearch className={`w-4 h-4 ${selectedDocId === doc.id ? 'text-[#D94F87]' : 'text-[#7A6370]'}`} />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Centre Column: Interactive Document Viewer */}
//               <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-4 flex flex-col items-center justify-center min-h-[520px] relative overflow-hidden">
//                 <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
//                   <span className="px-3 py-1 rounded-full bg-[#FFF7FA] border border-[#F2B8D0] text-[#D94F87] font-mono text-[10px] font-bold">
//                     LIVE PREVIEW
//                   </span>
//                   <span className="text-xs font-mono text-[#7A6370]">{activeDoc?.filename}</span>
//                 </div>

//                 {/* Animated Scanning Overlay simulation */}
//                 <div className="w-full h-96 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex flex-col items-center justify-center relative p-6 text-center overflow-hidden group">
//                   <div className="absolute inset-0 bg-gradient-to-b from-[#F2B8D0]/10 via-transparent to-[#D94F87]/10 opacity-60 animate-pulse" />
//                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D94F87] to-transparent animate-bounce" />
                  
//                   <FileText className="w-16 h-16 text-[#D94F87] mb-4 opacity-80" />
//                   <p className="font-mono text-sm font-bold text-[#512D43]">{activeDoc?.filename}</p>
//                   <p className="font-mono text-xs text-[#7A6370] mt-1">File Type: {activeDoc?.file_type}</p>
                  
//                   <div className="mt-6 p-4 rounded-xl bg-white border border-[#F2B8D0] shadow-xs max-w-sm text-left font-mono text-xs space-y-1">
//                     <p className="text-[#D94F87] font-bold">✓ ELA Tampering Analysis:</p>
//                     <p className="text-[#4A3B43]">{activeDoc?.tamper_analysis?.details || "No pixel inconsistencies detected."}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column: AI Intelligence Panel */}
//               <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-5">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xs font-mono uppercase tracking-wider text-[#512D43] font-bold">Extracted Fields & Verification</h3>
//                   <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold">
//                     VERIFIED
//                   </span>
//                 </div>

//                 <div className="space-y-3 font-mono text-xs">
//                   <div className="p-3.5 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex justify-between items-center">
//                     <span className="text-[#7A6370]">Faculty Count:</span>
//                     <strong className="text-[#512D43] text-sm">{activeDoc?.extracted_data?.faculty_count || 70}</strong>
//                   </div>
//                   <div className="p-3.5 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex justify-between items-center">
//                     <span className="text-[#7A6370]">Student Enrollment:</span>
//                     <strong className="text-[#512D43] text-sm">{activeDoc?.extracted_data?.student_enrollment || 1200}</strong>
//                   </div>
//                   <div className="p-3.5 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex justify-between items-center">
//                     <span className="text-[#7A6370]">Built-up Area (Sq.Ft):</span>
//                     <strong className="text-[#512D43] text-sm">{activeDoc?.extracted_data?.built_up_sqft || 15000}</strong>
//                   </div>
//                   <div className="p-3.5 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex justify-between items-center">
//                     <span className="text-[#7A6370]">PhD Ratio:</span>
//                     <strong className="text-[#512D43] text-sm">{activeDoc?.extracted_data?.phd_percent || 35}%</strong>
//                   </div>
//                 </div>

//                 <div className="pt-2">
//                   <button
//                     onClick={() => notify("AI Compliance check re-verified against AICTE Chapter IV rules.")}
//                     className="w-full py-3 rounded-2xl bg-[#512D43] hover:bg-[#3d2132] text-white font-mono text-xs font-bold transition-all shadow-sm"
//                   >
//                     Run Full RAG Compliance Re-Check
//                   </button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}

//         {/* ================= 3. WHAT-IF SIMULATOR ================= */}
//         {tab === "simulator" && (
//           <div className="p-8 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-8 animate-in fade-in duration-500">
//             <div>
//               <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#D94F87]">Interactive Policy Engine</span>
//               <h2 className="text-2xl font-bold text-[#512D43]">What-If Compliance Simulator</h2>
//               <p className="text-sm text-[#7A6370] mt-1 font-sans">Test hypothetical institutional parameters instantly against AICTE regulations without altering official application records.</p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
//               <div className="lg:col-span-5 space-y-5 p-6 rounded-3xl bg-[#FFF7FA] border border-[#F1DCE5]">
//                 <div className="space-y-2">
//                   <label className="text-[#7A6370] font-medium block">Faculty Count: <strong className="text-[#512D43] text-sm">{simFaculty}</strong></label>
//                   <input type="range" min="20" max="200" value={simFaculty} onChange={e => setSimFaculty(Number(e.target.value))} className="w-full accent-[#D94F87]" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[#7A6370] font-medium block">Student Enrollment: <strong className="text-[#512D43] text-sm">{simStudents}</strong></label>
//                   <input type="range" min="300" max="3000" step="50" value={simStudents} onChange={e => setSimStudents(Number(e.target.value))} className="w-full accent-[#D94F87]" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[#7A6370] font-medium block">Built-Up Area (Sq.Ft): <strong className="text-[#512D43] text-sm">{simArea}</strong></label>
//                   <input type="range" min="5000" max="40000" step="500" value={simArea} onChange={e => setSimArea(Number(e.target.value))} className="w-full accent-[#D94F87]" />
//                 </div>
//                 <button
//                   onClick={runSimulator}
//                   className="w-full py-3.5 rounded-2xl bg-[#D94F87] hover:bg-[#c43d73] text-white font-bold transition-all shadow-md shadow-[#D94F87]/20"
//                 >
//                   Run Compliance Simulation
//                 </button>
//               </div>

//               <div className="lg:col-span-7 p-6 rounded-3xl bg-[#FFF7FA] border border-[#F1DCE5] flex flex-col justify-center items-center text-center">
//                 {simResult ? (
//                   <div className="space-y-5 w-full">
//                     <p className="text-4xl font-black text-[#D94F87] tracking-tight">{simResult.projected_compliance_score}% Projected Score</p>
//                     <div className="grid grid-cols-2 gap-4 text-left p-5 rounded-2xl bg-white border border-[#F1DCE5]">
//                       <div>Student-Faculty Ratio: <strong className="text-[#512D43] block mt-1">{simResult.simulated_ratio}:1 ({simResult.ratio_status})</strong></div>
//                       <div>Infrastructure Area: <strong className="text-[#512D43] block mt-1">{simResult.area_status}</strong></div>
//                     </div>
//                     <p className="text-[#4A3B43] font-sans font-medium">Recommendation: {simResult.recommendation}</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     <Sliders className="w-10 h-10 text-[#D94F87] mx-auto opacity-60" />
//                     <p className="text-[#7A6370]">Adjust the parameters on the left and click 'Run Compliance Simulation' to evaluate rules.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= 4. GHOST FACULTY & REPORTS ================= */}
//         {tab === "ghost" && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
//             <div className="p-7 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-5 font-mono text-xs">
//               <div>
//                 <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#D94F87]">Biometric Verification</span>
//                 <h3 className="text-xl font-bold text-[#512D43]">EPFO & Biometric Ghost Faculty Detector</h3>
//               </div>
//               <p className="text-[#7A6370] font-sans">Cross-reference institutional faculty PAN records against national provident fund registries to flag dual-employment or non-existent staff.</p>
              
//               <button
//                 onClick={async () => {
//                   setIsScanningGhost(true);
//                   try {
//                     const fd = new FormData();
//                     fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
//                     const res = await fetch("http://localhost:8000/api/ghost-faculty-check", { method: "POST", body: fd });
//                     const d = await res.json();
//                     const list = d?.flagged_faculty || [];
//                     setGhostData(list);
//                     notify(`Scan completed: Found ${list.length} records.`);
//                   } catch {
//                     notify("Error executing ghost faculty check.");
//                   } finally {
//                     setIsScanningGhost(false);
//                   }
//                 }}
//                 disabled={isScanningGhost}
//                 className="w-full py-3.5 rounded-2xl bg-[#D94F87] hover:bg-[#c43d73] text-white font-bold transition-all shadow-md shadow-[#D94F87]/20 flex items-center justify-center gap-2"
//               >
//                 {isScanningGhost ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
//                 Run National EPFO Cross-Check
//               </button>

//               {ghostData && (
//                 <div className="space-y-3 mt-4">
//                   {ghostData.map((f: any, idx: number) => (
//                     <div key={idx} className="p-4 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex justify-between items-center">
//                       <div className="space-y-1">
//                         <p className="text-[#512D43] font-bold font-sans">{f.name} ({f.pan})</p>
//                         <p className="text-[10px] text-amber-600 font-bold">{f.conflict || "Verified active"}</p>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${f.status === 'DUPLICATE' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
//                         {f.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="p-7 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-5 font-mono text-xs">
//               <div>
//                 <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#512D43]">Administrative Output</span>
//                 <h3 className="text-xl font-bold text-[#512D43]">One-Click AICTE Scrutiny Report Export</h3>
//               </div>
//               <p className="text-[#7A6370] font-sans">Generate an official structured scrutiny report package complete with compliance scores, tamper risk percentages, and bureau sign-off recommendations.</p>
              
//               <button
//                 onClick={async () => {
//                   const appId = state.applications[0]?.id || "AICTE-2026-REG-8841";
//                   const res = await fetch(`http://localhost:8000/api/scrutiny-report/${appId}`);
//                   const d = await res.json();
//                   alert(JSON.stringify(d, null, 2));
//                   notify("Official Scrutiny Committee Report generated successfully.");
//                 }}
//                 className="w-full py-3.5 rounded-2xl bg-[#512D43] hover:bg-[#3d2132] text-white font-bold transition-all shadow-md shadow-[#512D43]/20"
//               >
//                 Download Official Scrutiny Report (JSON / PDF)
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ================= 5. AUDIT TRAIL ================= */}
//         {tab === "audit" && (
//           <div className="p-7 rounded-3xl bg-white border border-[#F1DCE5] shadow-xs space-y-6 animate-in fade-in duration-500">
//             <div>
//               <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#D94F87]">Security & Immutability</span>
//               <h2 className="text-2xl font-bold text-[#512D43]">Immutable Audit Trail & Activity Logs</h2>
//             </div>

//             <div className="space-y-3 font-mono text-xs">
//               {state.audit_logs.map((log: any) => (
//                 <div key={log.id} className="p-4 rounded-2xl bg-[#FFF7FA] border border-[#F1DCE5] flex flex-wrap justify-between items-center gap-4">
//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2">
//                       <span className="text-[#D94F87] font-bold">[{log.app_id}]</span>
//                       <span className="px-2.5 py-0.5 rounded bg-white border border-[#F2B8D0] text-[#512D43] font-bold">{log.action}</span>
//                     </div>
//                     <p className="text-[#4A3B43] font-sans">{log.details}</p>
//                     <p className="text-[10px] text-[#7A6370]">Actor: {log.actor_name} ({log.actor_role})</p>
//                   </div>
//                   <span className="text-[#7A6370] text-[11px] whitespace-nowrap">{log.timestamp}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </main>

//       {/* ================= 6. SPECTACULAR AI ASSISTANT ================= */}
//       <div className="fixed bottom-6 right-6 z-50">
//         {!chatOpen ? (
//           <button
//             onClick={() => setChatOpen(true)}
//             className="flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-[#D94F87] to-[#F2B8D0] text-white font-bold font-mono shadow-2xl hover:scale-105 transition-all group"
//           >
//             <div className="w-3 h-3 bg-white rounded-full animate-ping" />
//             <Bot className="w-5 h-5 transition-transform group-hover:rotate-12" />
//             <span>VerifyAI Intelligence Core</span>
//           </button>
//         ) : (
//           <div className="w-[380px] h-[520px] rounded-3xl bg-white border border-[#F2B8D0] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
//             <div className="p-4 bg-[#FFF7FA] border-b border-[#F1DCE5] flex items-center justify-between font-mono text-xs">
//               <span className="font-bold text-[#512D43] flex items-center gap-2">
//                 <Bot className="w-4 h-4 text-[#D94F87]" /> SIH 2026 AI Assistant <Sparkles className="w-3 h-3 text-[#D94F87]" />
//               </span>
//               <button onClick={() => setChatOpen(false)} className="text-[#7A6370] hover:text-[#512D43] p-1">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-white font-sans">
//               {messages.map((m, i) => (
//                 <div key={i} className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${m.sender === 'user' ? 'ml-auto bg-[#D94F87] text-white font-medium shadow-sm' : 'mr-auto bg-[#FFF7FA] text-[#4A3B43] border border-[#F1DCE5]'}`}>
//                   {m.text}
//                 </div>
//               ))}
//             </div>

//             <form onSubmit={sendChat} className="p-3 bg-[#FFF7FA] border-t border-[#F1DCE5] flex gap-2">
//               <input
//                 value={chatInput}
//                 onChange={e => setChatInput(e.target.value)}
//                 placeholder="Ask about AICTE rules, ratios, ELA..."
//                 className="flex-1 bg-white border border-[#F1DCE5] rounded-2xl px-4 py-3 text-xs text-[#512D43] focus:outline-none focus:border-[#D94F87] font-sans shadow-xs"
//               />
//               <button type="submit" className="p-3 rounded-2xl bg-[#D94F87] hover:bg-[#c43d73] text-white transition-all shadow-md shadow-[#D94F87]/25">
//                 <Send className="w-4 h-4" />
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


//2nd


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Cpu, FileText, Bot, Send, X, Sparkles, Layers, History, Sliders, PlusCircle, FileSearch, ShieldAlert, ChevronRight, RefreshCw, Download } from "lucide-react";

// type Role = "INSTITUTION" | "SCRUTINY_OFFICER" | "AICTE_OFFICIAL" | "ADMIN";
// type TabId = "dashboard" | "applications" | "intelligence" | "simulator" | "ghost" | "audit";
// const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
// const ROLES: { id: Role; label: string; badge: string }[] = [
//   { id: "INSTITUTION", label: "Institution Portal", badge: "College Nodal Officer" },
//   { id: "SCRUTINY_OFFICER", label: "Scrutiny Officer", badge: "Expert Reviewer" },
//   { id: "AICTE_OFFICIAL", label: "AICTE Bureau Official", badge: "Approvals & Escalations" },
//   { id: "ADMIN", label: "System Admin", badge: "Rules & Security" },
// ];
// const FIELDS: [string, string, number, string][] = [
//   ["Faculty Count", "faculty_count", 70, ""], ["Student Enrollment", "student_enrollment", 1200, ""],
//   ["Built-up Area (Sq.Ft)", "built_up_sqft", 15000, ""], ["PhD Ratio", "phd_percent", 35, "%"],
// ];
// const CSS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
// .v{font-family:Inter,system-ui,sans-serif;color:#512D43}.serif{font-family:Fraunces,Georgia,serif;letter-spacing:-.02em}.mono{font-family:'JetBrains Mono',monospace}
// .rise{animation:rise .6s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*70ms)}@keyframes rise{from{opacity:0;transform:translateY(14px)}}
// .glass{background:rgba(255,255,255,.74);backdrop-filter:blur(18px);border:1px solid #F3D9E6;box-shadow:0 12px 40px -22px rgba(232,77,150,.45)}
// .spot{position:relative;transition:transform .5s cubic-bezier(.34,1.56,.64,1)}.spot:hover{transform:translateY(-3px)}
// .spot::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(260px circle at var(--x,50%) var(--y,50%),rgba(232,77,150,.14),transparent 70%)}.spot:hover::before{opacity:1}
// .aur{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;animation:drift 18s ease-in-out infinite alternate}@keyframes drift{to{transform:translate(90px,60px) scale(1.18)}}
// .beam{position:absolute;left:0;right:0;height:80px;background:linear-gradient(transparent,rgba(232,77,150,.25));border-bottom:2px solid #E84D96;animation:scan 3.4s ease-in-out infinite;pointer-events:none}@keyframes scan{0%{top:-80px}100%{top:100%}}
// .hl{background:linear-gradient(transparent 50%,#F7C6DD 50%);transition:all .3s}
// .btn{background:#E84D96;color:#fff;border-radius:12px;font-weight:600;box-shadow:0 8px 22px -8px rgba(232,77,150,.7);transition:transform .4s cubic-bezier(.34,1.56,.64,1)}.btn:hover{transform:scale(1.03)}.btn:disabled{opacity:.6}
// .inp{width:100%;background:#FFF7FA;border:1px solid #F3D9E6;border-radius:12px;padding:10px 14px;outline:none}.inp:focus{border-color:#E84D96;box-shadow:0 0 0 3px rgba(232,77,150,.15)}
// .nav{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;font-size:13px;color:#7A6370;transition:all .25s;width:100%;text-align:left}.nav:hover{background:#fff}
// .nav.on{background:#fff;color:#E84D96;font-weight:600;box-shadow:0 0 0 1px #F7C6DD,0 8px 24px -10px rgba(232,77,150,.6)}
// .sk{background:linear-gradient(90deg,#FBE4EE,#fff,#FBE4EE);background-size:200% 100%;animation:sh 1.4s infinite}@keyframes sh{to{background-position:-200% 0}}
// @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;

// const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
//   const [v, setV] = useState(0);
//   useEffect(() => {
//     if (reduced()) return setV(to);
//     let r = 0; const t0 = performance.now();
//     const f = (t: number) => { const p = Math.min((t - t0) / 1100, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) r = requestAnimationFrame(f); };
//     r = requestAnimationFrame(f); return () => cancelAnimationFrame(r);
//   }, [to]);
//   return <>{v}{suffix}</>;
// }
// function Card({ children, className = "", i = 0 }: { children: React.ReactNode; className?: string; i?: number }) {
//   return (
//     <div className={`glass spot rise rounded-[22px] ${className}`} style={{ ["--i" as any]: i }}
//       onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--x", e.clientX - r.left + "px"); e.currentTarget.style.setProperty("--y", e.clientY - r.top + "px"); }}>
//       {children}
//     </div>
//   );
// }
// function Particles() {
//   const ref = useRef<HTMLCanvasElement>(null);
//   useEffect(() => {
//     const c = ref.current!, x = c.getContext("2d")!; if (reduced()) return;
//     const resize = () => { c.width = innerWidth; c.height = innerHeight; }; resize(); addEventListener("resize", resize);
//     const ps = Array.from({ length: 38 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 2 + 0.6, v: Math.random() * 0.25 + 0.08, a: Math.random() * 0.4 + 0.2 }));
//     let id = 0;
//     const loop = () => { x.clearRect(0, 0, c.width, c.height); for (const p of ps) { p.y -= p.v; if (p.y < -5) { p.y = c.height + 5; p.x = Math.random() * c.width; } x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.3); x.fillStyle = `rgba(232,77,150,${p.a})`; x.fill(); } id = requestAnimationFrame(loop); };
//     loop(); return () => { cancelAnimationFrame(id); removeEventListener("resize", resize); };
//   }, []);
//   return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" aria-hidden />;
// }
// const Tag = ({ children }: { children: React.ReactNode }) => <span className="mono text-[10px] uppercase tracking-[.18em] text-[#E84D96] font-semibold">{children}</span>;
// const sevCls = (s: string) => s === "PASS" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200";

// export default function VerifyAIApp() {
//   const [role, setRole] = useState<Role>("AICTE_OFFICIAL");
//   const [tab, setTab] = useState<TabId>("dashboard");
//   const [state, setState] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState<string | null>(null);
//   const [instName, setInstName] = useState("");
//   const [region, setRegion] = useState("South-Central");
//   const [appType, setAppType] = useState("Increase in Intake / New Course");
//   const [simFaculty, setSimFaculty] = useState(70);
//   const [simStudents, setSimStudents] = useState(1200);
//   const [simArea, setSimArea] = useState(15000);
//   const [simResult, setSimResult] = useState<any>(null);
//   const [ghostData, setGhostData] = useState<any[] | null>(null);
//   const [isScanningGhost, setIsScanningGhost] = useState(false);
//   const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
//   const [hoverField, setHoverField] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [report, setReport] = useState<any>(null);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatInput, setChatInput] = useState("");
//   const [messages, setMessages] = useState<any[]>([{ sender: "bot", text: "Greetings! I am your 4O4 VerifyAI Intelligence Core, fully synchronized with AICTE Approval Handbooks 2026." }]);
//   const endRef = useRef<HTMLDivElement>(null);
//   useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, chatOpen]);

//   const notify = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3500); };
//   const loadData = async () => {
//     try {
//       const data = await (await fetch(`${API}/api/state`)).json();
//       setState(data);
//       if (data?.documents?.length > 0 && !selectedDocId) setSelectedDocId(data.documents[0].id);
//     } catch { notify("Establishing secure connection to backend on port 8000..."); }
//     finally { setLoading(false); }
//   };
//   useEffect(() => { loadData(); }, []);

//   const handleCreateApp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!instName) return notify("Please enter institution name.");
//     const fd = new FormData(); fd.append("institution_name", instName); fd.append("region", region); fd.append("app_type", appType);
//     try {
//       const data = await (await fetch(`${API}/api/applications`, { method: "POST", body: fd })).json();
//       if (data.status === "success") { notify(`Application initialized successfully: ${data.app_id}`); setInstName(""); loadData(); setTab("applications"); }
//     } catch { notify("Could not reach backend."); }
//   };
//   const runSimulator = async () => {
//     const fd = new FormData(); fd.append("faculty", simFaculty.toString()); fd.append("students", simStudents.toString()); fd.append("area", simArea.toString());
//     try { setSimResult(await (await fetch(`${API}/api/what-if`, { method: "POST", body: fd })).json()); notify("What-If compliance matrix calculated successfully."); }
//     catch { notify("Could not reach backend."); }
//   };
//   const ask = async (q: string) => {
//     if (!q.trim()) return;
//     setMessages(p => [...p, { sender: "user", text: q }]); setChatInput("");
//     try {
//       const fd = new FormData(); fd.append("query", q);
//       const d = await (await fetch(`${API}/api/help-desk`, { method: "POST", body: fd })).json();
//       setMessages(p => [...p, { sender: "bot", text: d.reply }]);
//     } catch { setMessages(p => [...p, { sender: "bot", text: "AI Core connection interrupted. Please ensure the backend is running." }]); }
//   };
//   const firstApp = () => state.applications[0]?.id || "AICTE-2026-REG-8841";

//   if (loading || !state) {
//     return (
//       <div className="v min-h-screen bg-[#FFF7FA] flex flex-col items-center justify-center gap-5 p-6 text-center">
//         <style>{CSS}</style>
//         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E84D96] to-[#F7C6DD] animate-spin flex items-center justify-center text-white"><Sparkles className="w-6 h-6" /></div>
//         <p className="mono text-xs tracking-widest uppercase font-semibold">{loading ? "Initializing 4O4 VerifyAI neural core" : "Backend unreachable on port 8000"}</p>
//         {!loading && <button className="btn px-5 py-2.5 text-sm" onClick={() => { setLoading(true); loadData(); }}>Retry connection</button>}
//       </div>
//     );
//   }

//   const apps: any[] = state.applications || [], docs: any[] = state.documents || [], findings: any[] = state.findings || [], logs: any[] = state.audit_logs || [];
//   const activeDoc = docs.find(d => d.id === selectedDocId) || docs[0];
//   const avg = apps.length ? Math.round(apps.reduce((s, a) => s + (a.compliance_score || 0), 0) / apps.length) : 0;
//   const passN = findings.filter(f => f.severity === "PASS").length, flagN = findings.length - passN;
//   const priority = [...apps].sort((a, b) => b.tamper_risk_score - a.tamper_risk_score).slice(0, 3);
//   const C = 2 * Math.PI * 42;
//   const NAV = [
//     { id: "dashboard", label: "Command Centre", icon: Layers }, { id: "applications", label: `Applications (${apps.length})`, icon: FileText },
//     { id: "intelligence", label: "Document Intelligence", icon: FileSearch }, { id: "simulator", label: "What-If Simulator", icon: Sliders },
//     { id: "ghost", label: "Ghost Faculty & Reports", icon: ShieldAlert }, { id: "audit", label: "Immutable Audit Trail", icon: History },
//   ];
//   const cur = ROLES.find(r => r.id === role)!;
//   const Head = ({ tag, title, sub }: { tag: string; title: string; sub?: string }) => (
//     <div className="rise space-y-1"><Tag>{tag}</Tag><h2 className="serif text-3xl">{title}</h2>{sub && <p className="text-sm text-[#7A6370] max-w-2xl">{sub}</p>}</div>
//   );

//   return (
//     <div className="v min-h-screen bg-[#FFF7FA] relative overflow-x-hidden selection:bg-[#F7C6DD]">
//       <style>{CSS}</style>
//       <div className="aur" style={{ top: -120, left: "20%", width: 520, height: 520, background: "rgba(247,198,221,.65)" }} />
//       <div className="aur" style={{ bottom: -140, right: -80, width: 560, height: 560, background: "rgba(232,77,150,.22)", animationDelay: "-6s" }} />
//       <Particles />
//       {toast && <div role="status" className="rise fixed top-5 right-5 z-[60] px-4 py-3 rounded-2xl glass text-xs mono flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#E84D96]" />{toast}</div>}

//       {/* Sidebar */}
//       <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 z-30 flex-col p-4 gap-6 border-r border-[#F3D9E6] bg-white/60 backdrop-blur-xl">
//         <div className="flex items-center gap-3 px-1 pt-1">
//           <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E84D96] to-[#F7C6DD] text-white flex items-center justify-center shadow-lg shadow-[#E84D96]/30"><Cpu className="w-5 h-5" /><i className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" /></div>
//           <div><p className="serif text-lg leading-none">4O4 VerifyAI</p><p className="mono text-[10px] text-[#7A6370] mt-1">SIH 2026 · SIH26261</p></div>
//         </div>
//         <nav className="space-y-1.5" aria-label="Main">
//           {NAV.map(t => { const I = t.icon; return (
//             <button key={t.id} onClick={() => setTab(t.id as TabId)} className={`nav ${tab === t.id ? "on" : ""}`} aria-current={tab === t.id}><I className="w-4 h-4 text-[#E84D96]" />{t.label}</button>
//           ); })}
//         </nav>
//         <div className="mt-auto glass rounded-2xl p-3 space-y-2">
//           <Tag>Workspace role</Tag>
//           <p className="text-sm font-semibold">{cur.label}</p><p className="text-[11px] text-[#7A6370]">{cur.badge}</p>
//         </div>
//       </aside>

//       <div className="lg:pl-64 relative z-10 min-h-screen flex flex-col">
//         <header className="sticky top-0 z-20 px-5 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#F3D9E6] bg-white/70 backdrop-blur-xl">
//           <div><p className="mono text-[11px] text-[#7A6370]">Autonomous AICTE Institutional Verification & Compliance Engine</p></div>
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="mono text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">● Backend live</span>
//             <select aria-label="Role" value={role} onChange={e => { const r = ROLES.find(x => x.id === e.target.value)!; setRole(r.id); notify(`Switched workspace to ${r.label}`); }} className="inp !w-auto !py-1.5 text-xs">
//               {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
//             </select>
//             <button aria-label="Refresh data" onClick={() => { loadData(); notify("Data refreshed."); }} className="p-2 rounded-xl glass"><RefreshCw className="w-4 h-4 text-[#E84D96]" /></button>
//           </div>
//         </header>
//         <nav className="lg:hidden flex gap-2 overflow-x-auto px-4 py-2 bg-white/70" aria-label="Main mobile">
//           {NAV.map(t => <button key={t.id} onClick={() => setTab(t.id as TabId)} className={`nav !w-auto whitespace-nowrap ${tab === t.id ? "on" : ""}`}>{t.label}</button>)}
//         </nav>

//         <main key={tab} className="flex-1 w-full max-w-[1500px] mx-auto p-5 lg:p-8 space-y-7">
//           {tab === "dashboard" && (<>
//             <Card className="p-8 lg:p-10 overflow-hidden relative" i={0}>
//               <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-[#F7C6DD] to-transparent opacity-70 blur-2xl" />
//               <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
//                 <div className="space-y-4">
//                   <Tag>Smart India Hackathon 2026 · Grand Finale</Tag>
//                   <h1 className="serif text-4xl lg:text-5xl leading-[1.05]">Autonomous institutional<br /><em className="text-[#E84D96] not-italic">validation hub</em></h1>
//                   <p className="text-sm text-[#7A6370] max-w-xl">Real-time OCR extraction, ELA tamper detection, RAG-backed compliance checking and faculty audits in one secure platform.</p>
//                   <div className="flex gap-3 flex-wrap pt-1">
//                     <button className="btn px-5 py-3 text-sm flex items-center gap-2" onClick={() => setTab("intelligence")}><FileSearch className="w-4 h-4" />Open Document Workspace</button>
//                     <button className="px-5 py-3 text-sm rounded-xl bg-white border border-[#F7C6DD] font-semibold" onClick={() => setTab("simulator")}>Launch Simulator</button>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-5 justify-center">
//                   <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90" role="img" aria-label={`Average compliance ${avg}%`}>
//                     <circle cx="50" cy="50" r="42" fill="none" stroke="#F7C6DD" strokeWidth="8" opacity=".5" />
//                     <circle cx="50" cy="50" r="42" fill="none" stroke="#E84D96" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - avg / 100)} style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)" }} />
//                   </svg>
//                   <div><p className="serif text-4xl"><Count to={avg} suffix="%" /></p><p className="text-xs text-[#7A6370]">Avg. compliance<br />across applications</p></div>
//                 </div>
//               </div>
//             </Card>

//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//               {[["Total applications", state.metrics.total_applications, "Active queues"], ["Verified documents", state.metrics.verified_documents, "OCR & ELA processed"], ["Unresolved discrepancies", state.metrics.unresolved_discrepancies, "Pending review"], ["Compliance issues", state.metrics.compliance_issues, "Rule deviations"]].map(([l, v, s]: any, i) => (
//                 <Card key={l} className="p-5" i={i + 1}><Tag>{l}</Tag><p className="serif text-5xl mt-2"><Count to={Number(v) || 0} /></p><p className="text-[11px] text-[#7A6370] mt-1">{s}</p></Card>
//               ))}
//             </div>

//             <div className="grid lg:grid-cols-12 gap-6 items-start">
//               <Card className="lg:col-span-7 p-6 space-y-4" i={5}>
//                 <div className="flex justify-between items-start gap-3"><div><Tag>Regulatory insights</Tag><h3 className="serif text-xl">Findings & rule citations</h3></div>
//                   <svg viewBox="0 0 100 100" className="w-14 h-14 -rotate-90" aria-label={`${passN} pass, ${flagN} flagged`}><circle cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="14" opacity=".6" /><circle cx="50" cy="50" r="42" fill="none" stroke="#E84D96" strokeWidth="14" strokeDasharray={C} strokeDashoffset={C * (1 - (findings.length ? passN / findings.length : 0))} /></svg></div>
//                 <div className="space-y-2.5">
//                   {findings.map(f => (
//                     <div key={f.id} className="p-3.5 rounded-2xl bg-[#FFF7FA] border border-[#F3D9E6] flex justify-between gap-3 text-xs">
//                       <div className="space-y-1"><div className="flex items-center gap-2"><b className="mono text-[#E84D96]">[{f.rule_id}]</b><span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${sevCls(f.severity)}`}>{f.severity}</span></div>
//                         <p className="text-sm">{f.message}</p><p className="mono text-[10px] text-[#7A6370]">Evidence: {f.evidence_reference}</p></div>
//                       <span className="mono text-[10px] text-amber-700 whitespace-nowrap">{f.status}</span>
//                     </div>))}
//                 </div>
//               </Card>
//               <div className="lg:col-span-5 space-y-6">
//                 <Card className="p-6 space-y-3" i={6}><Tag>Priority applications</Tag>
//                   {priority.map(a => (<div key={a.id} className="space-y-1"><div className="flex justify-between text-xs"><span className="font-semibold truncate">{a.institution_name}</span><span className="mono text-[#7A6370]">risk {(a.tamper_risk_score * 100).toFixed(0)}%</span></div>
//                     <div className="h-1.5 rounded bg-[#F7C6DD]/50"><div className="h-full rounded bg-[#E84D96]" style={{ width: `${a.compliance_score}%`, transition: "width 1.2s" }} /></div></div>))}
//                 </Card>
//                 <Card className="p-6 space-y-3" i={7}><Tag>Recent activity</Tag>
//                   {logs.slice(0, 4).map(l => <p key={l.id} className="text-xs border-l-2 border-[#E84D96] pl-3"><b>{l.action}</b> · <span className="text-[#7A6370]">{l.details}</span></p>)}
//                   <button className="text-xs text-[#E84D96] font-semibold" onClick={() => setTab("audit")}>View full trail →</button>
//                 </Card>
//               </div>
//             </div>

//             <Card className="p-6 space-y-4 max-w-3xl" i={8}>
//               <div><Tag>Institution nodal portal</Tag><h3 className="serif text-xl">Submit new application</h3></div>
//               <form onSubmit={handleCreateApp} className="space-y-3 text-sm">
//                 <input className="inp" aria-label="Institution name" value={instName} onChange={e => setInstName(e.target.value)} placeholder="e.g. Apex Institute of Technology" />
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <select className="inp" aria-label="Region" value={region} onChange={e => setRegion(e.target.value)}>{["South-Central", "North", "West", "South"].map(r => <option key={r}>{r}</option>)}</select>
//                   <select className="inp" aria-label="Approval type" value={appType} onChange={e => setAppType(e.target.value)}><option value="Increase in Intake / New Course">Increase in Intake</option><option value="Extension of Approval (EoA)">Extension of Approval (EoA)</option><option value="New Institution Establishment">New Institution</option></select>
//                 </div>
//                 <button className="btn w-full py-3 flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4" />Initialize Application & AI Checks</button>
//               </form>
//             </Card>
//           </>)}

//           {tab === "applications" && (<>
//             <Head tag="Queue management" title="Active applications & workflow status" />
//             {apps.map((a, i) => (
//               <Card key={a.id} className="p-6 flex flex-wrap items-center justify-between gap-5" i={i + 1}>
//                 <div className="space-y-1.5"><div className="flex items-center gap-3 flex-wrap"><b className="mono text-[#E84D96]">{a.id}</b><span className="px-3 py-0.5 rounded-full bg-[#FFF7FA] border border-[#F7C6DD] text-xs font-semibold">{a.status}</span><span className="text-xs text-[#7A6370]">Region: {a.region}</span></div>
//                   <p className="serif text-xl">{a.institution_name}</p><p className="text-xs text-[#7A6370]">{a.app_type} · Officer: <b className="text-[#512D43]">{a.assigned_officer}</b></p></div>
//                 <div className="flex items-center gap-5"><div className="text-right"><p className="serif text-2xl text-[#E84D96]">{a.compliance_score}%</p><p className="mono text-[10px] text-[#7A6370]">Tamper risk {(a.tamper_risk_score * 100).toFixed(0)}%</p></div>
//                   <button aria-label="Open documents" onClick={() => { setSelectedDocId(docs[0]?.id); setTab("intelligence"); }} className="p-3 rounded-xl bg-[#FFF7FA] border border-[#F7C6DD] text-[#E84D96] hover:bg-[#E84D96] hover:text-white transition-colors"><ChevronRight className="w-5 h-5" /></button></div>
//               </Card>))}
//           </>)}

//           {tab === "intelligence" && (<>
//             <div className="flex flex-wrap items-end justify-between gap-4">
//               <Head tag="Immersive AI review" title="Document Intelligence & OCR workspace" />
//               <label className="btn px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2"><FileText className="w-4 h-4" />{uploading ? "Scanning…" : "Upload New Disclosure PDF"}
//                 <input type="file" className="hidden" onChange={async e => {
//                   const f = e.target.files?.[0]; if (!f) return; setUploading(true);
//                   const fd = new FormData(); fd.append("app_id", firstApp()); fd.append("file", f);
//                   try { const d = await (await fetch(`${API}/api/upload-document`, { method: "POST", body: fd })).json(); if (d.status === "success") { notify("Document uploaded, OCR parsed & ELA scanned successfully!"); loadData(); } }
//                   catch { notify("Upload failed."); } finally { setUploading(false); }
//                 }} /></label>
//             </div>
//             <div className="grid lg:grid-cols-12 gap-5 items-start">
//               <Card className="lg:col-span-3 p-4 space-y-2" i={1}><Tag>Disclosures</Tag>
//                 {docs.map(d => (<button key={d.id} onClick={() => setSelectedDocId(d.id)} className={`w-full text-left p-3 rounded-xl border transition-all ${activeDoc?.id === d.id ? "bg-white border-[#E84D96] shadow-md shadow-[#E84D96]/15" : "bg-[#FFF7FA] border-[#F3D9E6] hover:border-[#F7C6DD]"}`}>
//                   <p className="text-xs font-semibold truncate">{d.filename}</p><p className="mono text-[10px] text-[#7A6370] mt-0.5">OCR {(d.ocr_confidence * 100).toFixed(0)}%</p></button>))}
//                 {docs.length === 0 && <div className="sk h-16 rounded-xl" />}
//               </Card>
//               <Card className="lg:col-span-5 p-5" i={2}>
//                 <div className="flex justify-between items-center mb-3"><span className="mono text-[10px] px-2.5 py-1 rounded-full bg-[#FFF7FA] border border-[#F7C6DD] text-[#E84D96] font-semibold">OCR RECONSTRUCTION</span><span className="mono text-[10px] text-[#7A6370]">{activeDoc?.file_type}</span></div>
//                 <div key={activeDoc?.id} className="rise relative overflow-hidden rounded-2xl bg-white border border-[#F3D9E6] min-h-[440px] p-7 space-y-4">
//                   <div className="beam" />
//                   <p className="serif text-lg border-b border-[#F3D9E6] pb-3 truncate">{activeDoc?.filename}</p>
//                   {FIELDS.map(([l, k, d, u]) => (
//                     <p key={k} className="text-sm flex justify-between"><span className="text-[#7A6370]">{l}</span>
//                       <span className={`mono font-semibold px-1 ${hoverField === k ? "hl" : ""}`}>{(activeDoc?.extracted_data?.[k] ?? d)}{u}</span></p>))}
//                   <div className="p-3 rounded-xl bg-[#FFF7FA] border border-[#F7C6DD] text-xs space-y-1"><b className="text-[#E84D96]">ELA tampering analysis</b><p>{activeDoc?.tamper_analysis?.details || "No pixel inconsistencies detected."}</p></div>
//                 </div>
//               </Card>
//               <Card className="lg:col-span-4 p-5 space-y-4" i={3}>
//                 <div className="flex justify-between"><Tag>Extracted fields</Tag><span className="mono text-[10px] text-emerald-700">OCR {((activeDoc?.ocr_confidence || 0) * 100).toFixed(0)}%</span></div>
//                 <div className="space-y-2">
//                   {FIELDS.map(([l, k, d, u]) => {
//                     const vals = docs.map(x => x.extracted_data?.[k] ?? d), mismatch = new Set(vals).size > 1, missing = activeDoc?.extracted_data?.[k] == null;
//                     return (<div key={k} onMouseEnter={() => setHoverField(k)} onMouseLeave={() => setHoverField(null)} className="p-3 rounded-xl bg-[#FFF7FA] border border-[#F3D9E6] flex justify-between items-center text-xs hover:border-[#E84D96] transition-colors">
//                       <span className="text-[#7A6370]">{l}{missing && <i className="block text-[9px]">default value (not extracted)</i>}</span>
//                       <span className="flex items-center gap-2"><b className="mono text-sm">{activeDoc?.extracted_data?.[k] ?? d}{u}</b>{docs.length > 1 && <span className={`text-[9px] px-1.5 py-0.5 rounded border ${mismatch ? sevCls("WARN") : sevCls("PASS")}`}>{mismatch ? "differs across docs" : "consistent"}</span>}</span></div>);
//                   })}
//                 </div>
//                 <div className="space-y-2"><Tag>Discrepancy findings</Tag>{findings.slice(0, 3).map(f => <p key={f.id} className="text-[11px] p-2.5 rounded-xl border border-[#F3D9E6]"><b className="text-[#E84D96]">{f.rule_id}</b> {f.message}</p>)}</div>
//                 <button className="w-full py-3 rounded-xl bg-[#512D43] text-white text-xs font-semibold" onClick={() => notify("Demo only: re-check endpoint is not wired to the backend yet.")}>Run Full RAG Compliance Re-Check</button>
//               </Card>
//             </div>
//           </>)}

//           {tab === "simulator" && (<>
//             <Head tag="Interactive policy engine" title="What-If compliance simulator" sub="Test hypothetical parameters against AICTE rules without altering official records." />
//             <div className="grid lg:grid-cols-12 gap-6">
//               <Card className="lg:col-span-5 p-6 space-y-5" i={1}>
//                 {([["Faculty Count", simFaculty, setSimFaculty, 20, 200, 1], ["Student Enrollment", simStudents, setSimStudents, 300, 3000, 50], ["Built-Up Area (Sq.Ft)", simArea, setSimArea, 5000, 40000, 500]] as any[]).map(([l, v, s, mn, mx, st]) => (
//                   <div key={l} className="space-y-1.5"><label className="text-xs text-[#7A6370]">{l}: <b className="text-[#512D43] text-sm mono">{v}</b></label><input type="range" min={mn} max={mx} step={st} value={v} onChange={e => s(Number(e.target.value))} className="w-full accent-[#E84D96]" /></div>))}
//                 <button className="btn w-full py-3" onClick={runSimulator}>Run Compliance Simulation</button>
//               </Card>
//               <Card className="lg:col-span-7 p-6 flex items-center justify-center text-center min-h-[280px]" i={2}>
//                 {simResult ? (<div className="space-y-4 w-full"><p className="serif text-5xl text-[#E84D96]">{simResult.projected_compliance_score}%</p><p className="mono text-[10px] text-[#7A6370]">PROJECTED SCORE</p>
//                   <div className="grid grid-cols-2 gap-3 text-left text-xs p-4 rounded-2xl bg-white border border-[#F3D9E6]"><div>Student-Faculty Ratio<b className="block text-sm mt-1">{simResult.simulated_ratio}:1 ({simResult.ratio_status})</b></div><div>Infrastructure Area<b className="block text-sm mt-1">{simResult.area_status}</b></div></div>
//                   <p className="text-sm">Recommendation: {simResult.recommendation}</p></div>)
//                   : <div className="space-y-2 text-[#7A6370]"><Sliders className="w-10 h-10 text-[#E84D96] mx-auto opacity-60" /><p className="text-sm">Adjust the parameters and run the simulation.</p></div>}
//               </Card>
//             </div>
//           </>)}

//           {tab === "ghost" && (<>
//             <Head tag="Biometric verification" title="Ghost faculty & scrutiny reports" />
//             <div className="grid lg:grid-cols-2 gap-6 items-start">
//               <Card className="p-6 space-y-4" i={1}><h3 className="serif text-xl">EPFO & biometric ghost faculty detector</h3>
//                 <p className="text-sm text-[#7A6370]">Cross-reference faculty PAN records against provident fund registries to flag dual employment or non-existent staff.</p>
//                 <button disabled={isScanningGhost} className="btn w-full py-3 flex items-center justify-center gap-2" onClick={async () => {
//                   setIsScanningGhost(true);
//                   try { const fd = new FormData(); fd.append("app_id", firstApp()); const d = await (await fetch(`${API}/api/ghost-faculty-check`, { method: "POST", body: fd })).json(); const l = d?.flagged_faculty || []; setGhostData(l); notify(`Scan completed: Found ${l.length} records.`); }
//                   catch { notify("Error executing ghost faculty check."); } finally { setIsScanningGhost(false); }
//                 }}>{isScanningGhost ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}Run National EPFO Cross-Check</button>
//                 {ghostData?.map((f, i) => (<div key={i} className="p-3.5 rounded-2xl bg-[#FFF7FA] border border-[#F3D9E6] flex justify-between items-center text-xs"><div><p className="text-sm font-semibold">{f.name} ({f.pan})</p><p className="text-amber-700">{f.conflict || "Verified active"}</p></div><span className={`px-3 py-1 rounded-full border text-[10px] font-semibold ${f.status === "DUPLICATE" ? "bg-rose-50 text-rose-700 border-rose-200" : sevCls("PASS")}`}>{f.status}</span></div>))}
//               </Card>
//               <Card className="p-6 space-y-4" i={2}><h3 className="serif text-xl">One-click AICTE scrutiny report</h3>
//                 <p className="text-sm text-[#7A6370]">Generate a structured scrutiny report with compliance scores, tamper risk and sign-off recommendations.</p>
//                 <button className="w-full py-3 rounded-xl bg-[#512D43] text-white text-sm font-semibold" onClick={async () => {
//                   try { setReport(await (await fetch(`${API}/api/scrutiny-report/${firstApp()}`)).json()); notify("Official Scrutiny Committee Report generated successfully."); } catch { notify("Could not generate report."); }
//                 }}>Generate Scrutiny Report</button>
//               </Card>
//             </div>
//           </>)}

//           {tab === "audit" && (<>
//             <Head tag="Security & immutability" title="Immutable audit trail & activity logs" />
//             <div className="space-y-3 border-l-2 border-[#F7C6DD] ml-2 pl-5">
//               {logs.map((l, i) => (<Card key={l.id} className="p-4 flex flex-wrap justify-between gap-3 text-xs relative" i={Math.min(i, 8)}>
//                 <i className="absolute -left-[27px] top-5 w-3 h-3 rounded-full bg-[#E84D96] border-2 border-white" />
//                 <div className="space-y-1"><div className="flex gap-2 items-center"><b className="mono text-[#E84D96]">[{l.app_id}]</b><span className="px-2 py-0.5 rounded bg-white border border-[#F7C6DD] font-semibold">{l.action}</span></div><p className="text-sm">{l.details}</p><p className="mono text-[10px] text-[#7A6370]">Actor: {l.actor_name} ({l.actor_role})</p></div>
//                 <span className="mono text-[11px] text-[#7A6370]">{l.timestamp}</span></Card>))}
//             </div>
//           </>)}
//         </main>
//       </div>

//       {report && (
//         <div className="fixed inset-0 z-[70] bg-[#512D43]/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setReport(null)}>
//           <div role="dialog" aria-modal="true" aria-label="Scrutiny report" className="rise glass bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
//             <div className="p-5 flex justify-between items-center border-b border-[#F3D9E6]"><h3 className="serif text-xl">Scrutiny report</h3><div className="flex gap-2">
//               <button className="btn px-3 py-2 text-xs flex items-center gap-1.5" onClick={() => { const u = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })); const a = document.createElement("a"); a.href = u; a.download = "scrutiny-report.json"; a.click(); URL.revokeObjectURL(u); }}><Download className="w-3.5 h-3.5" />JSON</button>
//               <button aria-label="Close" onClick={() => setReport(null)} className="p-2"><X className="w-4 h-4" /></button></div></div>
//             <pre className="mono text-[11px] p-5 overflow-auto">{JSON.stringify(report, null, 2)}</pre>
//           </div></div>)}

//       {/* AI assistant */}
//       <div className="fixed bottom-6 right-6 z-50">
//         {!chatOpen ? (
//           <button aria-label="Open AI assistant" onClick={() => setChatOpen(true)} className="relative w-16 h-16 rounded-full text-white flex items-center justify-center shadow-2xl shadow-[#E84D96]/50 hover:scale-110 transition-transform" style={{ background: "radial-gradient(circle at 30% 30%,#F7C6DD,#E84D96 60%)" }}>
//             <span className="absolute inset-0 rounded-full bg-[#E84D96]/40 animate-ping" /><Bot className="w-6 h-6 relative" /></button>
//         ) : (
//           <div className="rise glass bg-white/90 w-[380px] max-w-[calc(100vw-2rem)] h-[540px] rounded-3xl flex flex-col overflow-hidden">
//             <div className="p-4 border-b border-[#F3D9E6] flex justify-between items-center"><span className="font-semibold text-sm flex items-center gap-2"><Bot className="w-4 h-4 text-[#E84D96]" />VerifyAI Intelligence Core</span><button aria-label="Close assistant" onClick={() => setChatOpen(false)}><X className="w-4 h-4" /></button></div>
//             <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
//               {messages.map((m, i) => <div key={i} className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${m.sender === "user" ? "ml-auto bg-[#E84D96] text-white" : "bg-[#FFF7FA] border border-[#F3D9E6]"}`}>{m.text}</div>)}
//               {messages.length < 2 && <div className="flex flex-wrap gap-2">{["What is the student-faculty ratio norm?", "How does ELA detect tampering?", "Which findings need review?"].map(q => <button key={q} onClick={() => ask(q)} className="px-3 py-1.5 rounded-full border border-[#F7C6DD] bg-white text-[11px] hover:bg-[#FFF7FA]">{q}</button>)}</div>}
//               <div ref={endRef} />
//             </div>
//             <form onSubmit={e => { e.preventDefault(); ask(chatInput); }} className="p-3 border-t border-[#F3D9E6] flex gap-2">
//               <input className="inp text-xs" aria-label="Ask a question" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask about AICTE rules, ratios, ELA..." />
//               <button aria-label="Send" className="btn p-3"><Send className="w-4 h-4" /></button>
//             </form>
//           </div>)}
//       </div>
//     </div>
//   );
// }


//3rd


// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Cpu, FileText, Bot, Send, X, Sparkles, Layers, History, Sliders, PlusCircle, FileSearch, ShieldAlert, ChevronRight, RefreshCw, ArrowUpRight } from "lucide-react";

// type Role = "INSTITUTION" | "SCRUTINY_OFFICER" | "AICTE_OFFICIAL" | "ADMIN";
// type TabId = "dashboard" | "applications" | "intelligence" | "simulator" | "ghost" | "audit";

// const API = "http://localhost:8000";
// const ROLES: { id: Role; label: string; badge: string }[] = [
//   { id: "INSTITUTION", label: "Institution Portal", badge: "College Nodal Officer" },
//   { id: "SCRUTINY_OFFICER", label: "Scrutiny Officer", badge: "Expert Reviewer" },
//   { id: "AICTE_OFFICIAL", label: "AICTE Bureau Official", badge: "Approvals & Escalations" },
//   { id: "ADMIN", label: "System Admin", badge: "Rules & Security" },
// ];
// const NAV: { id: TabId; label: string; icon: any; sub: string }[] = [
//   { id: "dashboard", label: "Command Centre", icon: Layers, sub: "Everything that needs a decision today" },
//   { id: "applications", label: "Applications", icon: FileText, sub: "Queue, status and risk per institution" },
//   { id: "intelligence", label: "Document Intelligence", icon: FileSearch, sub: "Read, scan and cross-check every page" },
//   { id: "simulator", label: "What-If Simulator", icon: Sliders, sub: "Test numbers against the rules, safely" },
//   { id: "ghost", label: "Ghost Faculty & Reports", icon: ShieldAlert, sub: "Cross-check staff and export the report" },
//   { id: "audit", label: "Audit Trail", icon: History, sub: "Every action, permanently recorded" },
// ];
// const CHIPS = ["What is the faculty-student ratio rule?", "How does ELA tamper detection work?", "Explain the flagged findings"];
// const WIDTHS = [92, 78, 0, 84, 66, 0, 90, 72, 0, 80, 94, 0, 70, 86];

// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
// .v{font-family:'Hanken Grotesk',system-ui,sans-serif;color:#512D43}
// .disp{font-family:'Fraunces',Georgia,serif;letter-spacing:-.025em}
// @keyframes rise{from{opacity:0;transform:translateY(20px) scale(.98);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
// .st{animation:rise .8s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(var(--i,0)*80ms)}
// @keyframes drift{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(7vw,5vh,0) scale(1.2)}}
// .blob{position:absolute;border-radius:9999px;filter:blur(90px);animation:drift 20s ease-in-out infinite}
// @keyframes beam{from{top:-12%}to{top:102%}}
// .beam{position:absolute;left:0;right:0;height:80px;z-index:5;pointer-events:none;background:linear-gradient(to bottom,transparent,rgba(232,77,150,.26));border-bottom:2px solid #E84D96;box-shadow:0 10px 34px rgba(232,77,150,.55);animation:beam 3s cubic-bezier(.6,0,.4,1) infinite alternate}
// @keyframes spin{to{transform:rotate(360deg)}}
// @keyframes ping2{from{transform:scale(.7);opacity:.7}to{transform:scale(2.4);opacity:0}}
// @keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
// @keyframes growx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
// @keyframes shimmer{to{background-position:-200% 0}}
// @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
// @keyframes dot{0%,80%,100%{opacity:.25;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}
// @keyframes pop{from{opacity:0;transform:scale(.88) translateY(24px)}to{opacity:1;transform:none}}
// @keyframes shrink{from{width:100%}to{width:0}}
// @keyframes slide{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
// .sk{background:linear-gradient(90deg,#fbe3ee 25%,#fff 50%,#fbe3ee 75%);background-size:200% 100%;animation:shimmer 1.3s linear infinite}
// .lift{transition:transform .45s cubic-bezier(.34,1.56,.64,1),box-shadow .3s,border-color .3s}
// .lift:hover{transform:translateY(-4px);box-shadow:0 22px 50px -20px rgba(232,77,150,.5);border-color:#E84D96}
// .v :focus-visible{outline:2px solid #E84D96;outline-offset:2px}
// .v input[type=range]{accent-color:#E84D96;height:6px}
// @media (prefers-reduced-motion:reduce){.v *,.v *::before,.v *::after{animation:none!important;transition:none!important}}
// `;

// const card = "rounded-[22px] bg-white/80 backdrop-blur-xl border border-[#F7C6DD]/70 shadow-[0_10px_40px_-20px_rgba(232,77,150,.4)]";
// const btn = "rounded-full font-semibold text-sm transition-all duration-300 active:scale-95 disabled:opacity-60";
// const primary = `${btn} bg-[#E84D96] text-white px-6 py-3 shadow-[0_8px_24px_-8px_rgba(232,77,150,.7)] hover:shadow-[0_12px_32px_-6px_rgba(232,77,150,.8)] hover:-translate-y-0.5`;
// const ghost = `${btn} bg-white text-[#512D43] border border-[#F7C6DD] px-6 py-3 hover:border-[#E84D96]`;
// const field = "w-full bg-[#FFF7FA] border border-[#F7C6DD] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#E84D96] focus:shadow-[0_0_0_4px_rgba(232,77,150,.12)] transition-all";
// const mute = "text-[#7A5C6D]";
// const d = (i: number) => ({ ["--i" as any]: i });

// function useCount(to: number, dur = 1200) {
//   const [v, setV] = useState(0);
//   useEffect(() => {
//     if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
//     let r = 0, s = 0;
//     const f = (t: number) => { if (!s) s = t; const p = Math.min((t - s) / dur, 1); setV(to * (1 - Math.pow(1 - p, 4))); if (p < 1) r = requestAnimationFrame(f); };
//     r = requestAnimationFrame(f);
//     return () => cancelAnimationFrame(r);
//   }, [to, dur]);
//   return v;
// }
// function Num({ to, suffix = "" }: { to: any; suffix?: string }) {
//   const v = useCount(Number(to) || 0);
//   return <>{Math.round(v)}{suffix}</>;
// }

// function Backdrop() {
//   const ref = useRef<HTMLCanvasElement>(null);
//   useEffect(() => {
//     const c = ref.current!, x = c.getContext("2d")!;
//     if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
//     let w = 0, h = 0, raf = 0;
//     const P = Array.from({ length: 44 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.7, s: Math.random() * 0.0004 + 0.0001, p: Math.random() * 6 }));
//     const rs = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
//     rs(); addEventListener("resize", rs);
//     const f = (t: number) => {
//       x.clearRect(0, 0, w, h);
//       P.forEach(p => {
//         p.y -= p.s * 16; if (p.y < -0.05) p.y = 1.05;
//         x.beginPath(); x.arc((p.x + Math.sin(t / 2600 + p.p) * 0.02) * w, p.y * h, p.r, 0, 7);
//         x.fillStyle = `rgba(232,77,150,${0.16 + 0.16 * Math.sin(t / 900 + p.p)})`; x.fill();
//       });
//       raf = requestAnimationFrame(f);
//     };
//     raf = requestAnimationFrame(f);
//     return () => { cancelAnimationFrame(raf); removeEventListener("resize", rs); };
//   }, []);
//   return (
//     <div className="fixed inset-0 z-0 bg-[#FFF7FA] overflow-hidden pointer-events-none" aria-hidden>
//       <div className="blob w-[46vw] h-[46vw] -top-[12vw] left-[8vw] bg-[#F7C6DD]/70" />
//       <div className="blob w-[36vw] h-[36vw] bottom-[-8vw] right-[-4vw] bg-[#E84D96]/20" style={{ animationDelay: "-7s" }} />
//       <div className="blob w-[24vw] h-[24vw] top-[35vh] right-[26vw] bg-[#F7C6DD]/50" style={{ animationDelay: "-12s" }} />
//       <canvas ref={ref} className="absolute inset-0" />
//     </div>
//   );
// }

// function Ring({ pct, size = 132, label }: { pct: number; size?: number; label?: string }) {
//   const r = 52, c = 2 * Math.PI * r, [o, setO] = useState(c);
//   useEffect(() => { const t = setTimeout(() => setO(c * (1 - Math.min(pct, 100) / 100)), 150); return () => clearTimeout(t); }, [pct, c]);
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full" aria-hidden>
//         <circle cx="60" cy="60" r={r} fill="none" stroke="#F7C6DD" strokeOpacity=".45" strokeWidth="9" />
//         <circle cx="60" cy="60" r={r} fill="none" stroke="#E84D96" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={o} style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.9,.2,1)", filter: "drop-shadow(0 0 6px rgba(232,77,150,.55))" }} />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="disp font-semibold" style={{ fontSize: size / 4.4 }}><Num to={pct} suffix="%" /></span>
//         {label && <span className={`text-[11px] ${mute}`}>{label}</span>}
//       </div>
//     </div>
//   );
// }

// function Head({ children, tag }: { children: React.ReactNode; tag?: React.ReactNode }) {
//   return <div className="flex items-center justify-between gap-3 mb-4"><h3 className="disp text-xl font-semibold">{children}</h3>{tag}</div>;
// }
// const Pill = ({ children, tone = "pink" }: { children: React.ReactNode; tone?: "pink" | "plum" | "ok" }) => (
//   <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tone === "ok" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : tone === "plum" ? "bg-[#512D43] text-white border-[#512D43]" : "bg-[#FFF7FA] text-[#C2337A] border-[#F7C6DD]"}`}>{children}</span>
// );

// export default function VerifyAIApp() {
//   const [role, setRole] = useState<Role>("AICTE_OFFICIAL");
//   const [tab, setTab] = useState<TabId>("dashboard");
//   const [state, setState] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState<string | null>(null);
//   const [instName, setInstName] = useState("");
//   const [region, setRegion] = useState("South-Central");
//   const [appType, setAppType] = useState("Increase in Intake / New Course");
//   const [simFaculty, setSimFaculty] = useState(70);
//   const [simStudents, setSimStudents] = useState(1200);
//   const [simArea, setSimArea] = useState(15000);
//   const [simResult, setSimResult] = useState<any>(null);
//   const [ghostData, setGhostData] = useState<any[] | null>(null);
//   const [isScanningGhost, setIsScanningGhost] = useState(false);
//   const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
//   const [isAnalyzingDoc, setIsAnalyzingDoc] = useState(false);
//   const [hot, setHot] = useState<string | null>(null);
//   const [report, setReport] = useState<any>(null);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatInput, setChatInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [messages, setMessages] = useState<any[]>([
//     { sender: "bot", text: "Greetings! I am your 4O4 VerifyAI Intelligence Core, fully synchronized with AICTE Approval Handbooks 2026." },
//   ]);
//   const chatEnd = useRef<HTMLDivElement>(null);

//   const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3500); };
//   const analyse = () => { setIsAnalyzingDoc(true); setTimeout(() => setIsAnalyzingDoc(false), 1400); };
//   const pickDoc = (id: string) => { setSelectedDocId(id); analyse(); };
//   const go = (t: TabId) => { setTab(t); if (t === "intelligence") analyse(); };

//   const loadData = async () => {
//     try {
//       const res = await fetch(`${API}/api/state`);
//       const data = await res.json();
//       setState(data);
//       if (data?.documents?.length > 0 && !selectedDocId) setSelectedDocId(data.documents[0].id);
//     } catch {
//       notify("Establishing secure connection to backend on port 8000...");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => { loadData(); }, []);
//   useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

//   const handleCreateApp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!instName) return notify("Please enter institution name.");
//     const formData = new FormData();
//     formData.append("institution_name", instName);
//     formData.append("region", region);
//     formData.append("app_type", appType);
//     const res = await fetch(`${API}/api/applications`, { method: "POST", body: formData });
//     const data = await res.json();
//     if (data.status === "success") {
//       notify(`Application initialized successfully: ${data.app_id}`);
//       setInstName(""); loadData(); setTab("applications");
//     }
//   };

//   const runSimulator = async () => {
//     const formData = new FormData();
//     formData.append("faculty", simFaculty.toString());
//     formData.append("students", simStudents.toString());
//     formData.append("area", simArea.toString());
//     const res = await fetch(`${API}/api/what-if`, { method: "POST", body: formData });
//     setSimResult(await res.json());
//     notify("What-If compliance matrix calculated successfully.");
//   };

//   const ask = async (q: string) => {
//     if (!q.trim()) return;
//     setMessages(prev => [...prev, { sender: "user", text: q }]);
//     setChatInput(""); setTyping(true);
//     try {
//       const formData = new FormData();
//       formData.append("query", q);
//       const res = await fetch(`${API}/api/help-desk`, { method: "POST", body: formData });
//       const data = await res.json();
//       setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
//     } catch {
//       setMessages(prev => [...prev, { sender: "bot", text: "AI Core connection interrupted. Please ensure the backend is running." }]);
//     } finally { setTyping(false); }
//   };
//   const sendChat = (e: React.FormEvent) => { e.preventDefault(); ask(chatInput); };

//   const runGhost = async () => {
//     setIsScanningGhost(true);
//     try {
//       const fd = new FormData();
//       fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
//       const res = await fetch(`${API}/api/ghost-faculty-check`, { method: "POST", body: fd });
//       const out = await res.json();
//       const list = out?.flagged_faculty || [];
//       setGhostData(list);
//       notify(`Scan completed: Found ${list.length} records.`);
//     } catch { notify("Error executing ghost faculty check."); }
//     finally { setIsScanningGhost(false); }
//   };

//   const getReport = async () => {
//     const appId = state.applications[0]?.id || "AICTE-2026-REG-8841";
//     const res = await fetch(`${API}/api/scrutiny-report/${appId}`);
//     setReport(await res.json());
//     notify("Official Scrutiny Committee Report generated successfully.");
//   };
//   const downloadReport = () => {
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }));
//     a.download = "scrutiny-report.json"; a.click();
//   };

//   const uploadDoc = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     const fd = new FormData();
//     fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
//     fd.append("file", f);
//     const res = await fetch(`${API}/api/upload-document`, { method: "POST", body: fd });
//     const out = await res.json();
//     if (out.status === "success") { notify("Document uploaded, OCR parsed & ELA scanned successfully!"); loadData(); }
//   };

//   if (loading || !state) {
//     return (
//       <div className="v min-h-screen flex flex-col items-center justify-center gap-8 relative">
//         <style>{CSS}</style><Backdrop />
//         <div className="relative z-10 w-24 h-24 flex items-center justify-center">
//           <div className="absolute inset-0 rounded-full border border-dashed border-[#E84D96]/60" style={{ animation: "spin 6s linear infinite" }} />
//           <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-[#E84D96]" style={{ animation: "spin 1.1s linear infinite" }} />
//           <div className="absolute inset-0 rounded-full bg-[#E84D96]/30" style={{ animation: "ping2 2s ease-out infinite" }} />
//           <Sparkles className="w-7 h-7 text-[#E84D96]" />
//         </div>
//         <p className="relative z-10 disp text-xl">Waking the verification core…</p>
//       </div>
//     );
//   }

//   const apps: any[] = state.applications || [], docs: any[] = state.documents || [], findings: any[] = state.findings || [], logs: any[] = state.audit_logs || [];
//   const activeDoc = docs.find((x: any) => x.id === selectedDocId) || docs[0];
//   const avg = apps.length ? apps.reduce((s, a) => s + (Number(a.compliance_score) || 0), 0) / apps.length : 0;
//   const priority = [...apps].sort((a, b) => (b.tamper_risk_score || 0) - (a.tamper_risk_score || 0)).slice(0, 3);
//   const open = findings.filter(f => f.severity !== "PASS");
//   const navIdx = NAV.findIndex(n => n.id === tab);
//   const cur = NAV[navIdx];
//   const roleInfo = ROLES.find(r => r.id === role)!;
//   const ex = activeDoc?.extracted_data || {};
//   const fields = [
//     { k: "faculty", l: "Faculty count", v: ex.faculty_count, f: 70, u: "" },
//     { k: "students", l: "Student enrollment", v: ex.student_enrollment, f: 1200, u: "" },
//     { k: "area", l: "Built-up area (sq ft)", v: ex.built_up_sqft, f: 15000, u: "" },
//     { k: "phd", l: "PhD share", v: ex.phd_percent, f: 35, u: "%" },
//   ];

//   return (
//     <div className="v min-h-screen relative selection:bg-[#F7C6DD]">
//       <style>{CSS}</style>
//       <Backdrop />

//       {toast && (
//         <div className="fixed top-5 right-5 z-[60] rounded-2xl bg-white border border-[#F7C6DD] shadow-2xl overflow-hidden max-w-sm" style={{ animation: "slide .5s cubic-bezier(.2,.9,.2,1)" }} role="status">
//           <div className="px-5 py-3 text-sm flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#E84D96] shrink-0" />{toast}</div>
//           <div className="h-0.5 bg-[#E84D96]" style={{ animation: "shrink 3.5s linear forwards" }} />
//         </div>
//       )}

//       {/* ===== Sidebar ===== */}
//       <aside className="hidden lg:flex fixed left-4 top-4 bottom-4 w-[256px] z-30 flex-col rounded-[28px] bg-white/75 backdrop-blur-2xl border border-[#F7C6DD]/80 shadow-[0_20px_60px_-24px_rgba(232,77,150,.5)] p-5">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="relative w-11 h-11 shrink-0">
//             <div className="absolute -inset-1 rounded-full" style={{ background: "conic-gradient(from 0deg,#E84D96,#F7C6DD,#fff,#E84D96)", animation: "spin 5s linear infinite", filter: "blur(2px)" }} />
//             <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center"><Cpu className="w-5 h-5 text-[#E84D96]" /></div>
//           </div>
//           <div><p className="disp text-lg font-semibold leading-none">4O4 VerifyAI</p><p className={`text-[11px] mt-1 ${mute}`}>SIH 2026 · PS SIH26261</p></div>
//         </div>
//         <nav className="relative" aria-label="Primary">
//           <div className="absolute left-0 right-0 h-11 rounded-2xl bg-gradient-to-r from-[#E84D96] to-[#F07AB4] shadow-[0_10px_26px_-8px_rgba(232,77,150,.8)]" style={{ transform: `translateY(${navIdx * 52}px)`, transition: "transform .6s cubic-bezier(.34,1.56,.64,1)" }} />
//           {NAV.map(n => {
//             const Icon = n.icon, on = tab === n.id;
//             return (
//               <button key={n.id} onClick={() => go(n.id)} aria-current={on ? "page" : undefined} className={`relative z-10 w-full h-11 mb-2 px-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold transition-colors duration-300 ${on ? "text-white" : "text-[#512D43] hover:text-[#E84D96]"}`}>
//                 <Icon className="w-[18px] h-[18px]" />{n.label}
//                 {n.id === "applications" && <span className={`ml-auto text-[11px] px-1.5 rounded-full ${on ? "bg-white/25" : "bg-[#FFF7FA] text-[#C2337A]"}`}>{apps.length}</span>}
//               </button>
//             );
//           })}
//         </nav>
//         <div className="mt-auto pt-4 border-t border-[#F7C6DD]/60">
//           <p className={`text-xs mb-2 ${mute}`}>Working as</p>
//           <div className="space-y-1">
//             {ROLES.map(r => (
//               <button key={r.id} onClick={() => { setRole(r.id); notify(`Switched workspace to ${r.label}`); }} className={`w-full text-left px-3 py-2 rounded-xl text-[13px] transition-all duration-300 ${role === r.id ? "bg-[#FFF7FA] border border-[#E84D96] font-bold text-[#C2337A] translate-x-1" : "border border-transparent hover:bg-[#FFF7FA] text-[#512D43]"}`}>{r.label}</button>
//             ))}
//           </div>
//         </div>
//       </aside>

//       <div className="lg:pl-[288px] relative z-10">
//         {/* Mobile nav + role */}
//         <div className="lg:hidden sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-[#F7C6DD] px-3 py-2 space-y-2">
//           <nav className="flex gap-2 overflow-x-auto" aria-label="Primary mobile">
//             {NAV.map(n => { const Icon = n.icon; return (
//               <button key={n.id} onClick={() => go(n.id)} className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${tab === n.id ? "bg-[#E84D96] text-white" : "text-[#512D43] bg-[#FFF7FA]"}`}><Icon className="w-4 h-4" />{n.label}</button>
//             ); })}
//           </nav>
//           <select value={role} onChange={e => { const r = ROLES.find(x => x.id === e.target.value)!; setRole(r.id); notify(`Switched workspace to ${r.label}`); }} aria-label="Role" className={`${field} py-2`}>{ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}</select>
//         </div>

//         <header className="px-6 lg:px-10 pt-8 flex flex-wrap items-end justify-between gap-4">
//           <div key={tab} className="st">
//             <h1 className="disp text-4xl lg:text-[44px] font-semibold leading-[1.05]">{cur.label}</h1>
//             <p className={`mt-2 text-sm ${mute}`}>{cur.sub}</p>
//           </div>
//           <div className="flex items-center gap-3 st" style={d(2)}>
//             <span className="flex items-center gap-2 text-xs font-semibold bg-white/80 border border-[#F7C6DD] rounded-full px-3.5 py-2">
//               <span className="relative w-2 h-2"><span className="absolute inset-0 rounded-full bg-[#E84D96]" style={{ animation: "ping2 1.8s ease-out infinite" }} /><span className="absolute inset-0 rounded-full bg-[#E84D96]" /></span>
//               Backend live
//             </span>
//             <span className="text-xs bg-white/80 border border-[#F7C6DD] rounded-full px-3.5 py-2"><b>{roleInfo.label}</b> · {roleInfo.badge}</span>
//           </div>
//         </header>

//         <main key={tab} className="px-6 lg:px-10 py-8 pb-32 max-w-[1440px]">
//           {/* ===== DASHBOARD ===== */}
//           {tab === "dashboard" && (
//             <div className="space-y-8">
//               <section className="grid lg:grid-cols-12 gap-6 items-stretch">
//                 <div className="st lg:col-span-8 relative overflow-hidden rounded-[36px] bg-white/80 backdrop-blur-xl border border-[#F7C6DD] p-8 lg:p-12" style={d(0)}>
//                   <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full border border-dashed border-[#E84D96]/40" style={{ animation: "spin 40s linear infinite" }} />
//                   <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full border border-[#F7C6DD]" style={{ animation: "spin 28s linear infinite reverse" }} />
//                   <Pill>Smart India Hackathon 2026 · Grand Finale</Pill>
//                   <h2 className="disp text-5xl lg:text-6xl font-semibold leading-[1.02] mt-6 max-w-xl">Every document, read twice.</h2>
//                   <p className={`mt-5 max-w-lg leading-relaxed ${mute}`}>OCR extraction, Error Level Analysis tamper detection, rule-backed compliance checks and faculty audits, working on one queue.</p>
//                   <div className="flex flex-wrap gap-3 mt-8">
//                     <button onClick={() => go("intelligence")} className={`${primary} flex items-center gap-2`}><FileSearch className="w-4 h-4" />Open document workspace</button>
//                     <button onClick={() => go("simulator")} className={ghost}>Launch simulator</button>
//                   </div>
//                 </div>
//                 <div className="st lg:col-span-4 relative rounded-[36px] bg-gradient-to-br from-white to-[#FDE7F1] border border-[#F7C6DD] p-8 flex flex-col items-center justify-center gap-5 overflow-hidden" style={d(2)}>
//                   <div className="absolute w-48 h-48 rounded-full bg-[#E84D96]/25" style={{ animation: "ping2 3.5s ease-out infinite" }} />
//                   <div className="relative"><Ring pct={avg} size={168} label="avg. compliance" /></div>
//                   <span className="relative text-xs bg-white border border-[#F7C6DD] rounded-full px-3 py-1.5 font-semibold" style={{ animation: "float 5s ease-in-out infinite" }}>ELA scan active</span>
//                   <span className="relative text-xs bg-[#512D43] text-white rounded-full px-3 py-1.5 font-semibold -mt-2 ml-16" style={{ animation: "float 6s ease-in-out infinite -2s" }}>ChromaDB synced</span>
//                 </div>
//               </section>

//               <section className={`st ${card} grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#F7C6DD]/60`} style={d(3)}>
//                 {[
//                   ["Applications in queue", state.metrics.total_applications],
//                   ["Documents verified", state.metrics.verified_documents],
//                   ["Unresolved discrepancies", state.metrics.unresolved_discrepancies],
//                   ["Compliance issues", state.metrics.compliance_issues],
//                 ].map(([l, v]: any) => (
//                   <div key={l} className="p-6 group">
//                     <p className="disp text-5xl font-semibold group-hover:text-[#E84D96] transition-colors duration-500"><Num to={v} /></p>
//                     <p className={`text-xs mt-2 ${mute}`}>{l}</p>
//                   </div>
//                 ))}
//               </section>

//               <section className="grid lg:grid-cols-12 gap-6 items-start">
//                 <div className="lg:col-span-7 space-y-6">
//                   <div className={`st ${card} p-7`} style={d(4)}>
//                     <Head tag={<Pill>ChromaDB vector synced</Pill>}>Automated findings</Head>
//                     <div className="relative pl-6">
//                       <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#E84D96] to-[#F7C6DD]" />
//                       {findings.map((f, i) => (
//                         <div key={f.id} className="st relative pb-5 last:pb-0" style={d(5 + i)}>
//                           <span className={`absolute -left-6 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-white ${f.severity === "PASS" ? "bg-emerald-500" : "bg-[#E84D96]"}`} />
//                           <div className="lift rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD]/70 p-4">
//                             <div className="flex flex-wrap items-center gap-2"><b className="font-mono text-xs text-[#C2337A]">{f.rule_id}</b><Pill tone={f.severity === "PASS" ? "ok" : "pink"}>{f.severity}</Pill><span className={`ml-auto text-[11px] ${mute}`}>{f.status}</span></div>
//                             <p className="text-sm font-medium mt-2">{f.message}</p>
//                             <p className={`text-xs mt-1 ${mute}`}>Evidence: <b className="text-[#512D43]">{f.evidence_reference}</b></p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className={`st ${card} p-7`} style={d(6)}>
//                     <Head tag={<button onClick={() => go("audit")} className="text-xs font-semibold text-[#C2337A] flex items-center gap-1 hover:gap-2 transition-all">All activity <ArrowUpRight className="w-3.5 h-3.5" /></button>}>Recent activity</Head>
//                     <div className="space-y-2">
//                       {logs.slice(0, 4).map(l => (
//                         <div key={l.id} className="flex items-center gap-3 text-sm rounded-xl px-3 py-2 hover:bg-[#FFF7FA] transition-colors"><span className="w-2 h-2 rounded-full bg-[#E84D96] shrink-0" /><span className="font-semibold">{l.action}</span><span className={`truncate ${mute}`}>{l.details}</span><span className={`ml-auto text-[11px] whitespace-nowrap ${mute}`}>{l.timestamp}</span></div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="lg:col-span-5 space-y-6">
//                   <div className={`st ${card} p-7`} style={d(5)}>
//                     <Head>Priority applications</Head>
//                     <div className="space-y-3">
//                       {priority.map(a => (
//                         <button key={a.id} onClick={() => go("applications")} className="lift w-full text-left rounded-2xl bg-white border border-[#F7C6DD] p-4 flex items-center gap-4">
//                           <div className="flex-1 min-w-0"><p className="font-semibold truncate">{a.institution_name}</p><p className={`text-xs mt-0.5 ${mute}`}>Tamper risk {((a.tamper_risk_score || 0) * 100).toFixed(0)}% · {a.status}</p></div>
//                           <ChevronRight className="w-4 h-4 text-[#E84D96]" />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className={`st ${card} p-7`} style={d(6)}>
//                     <Head>Compliance by application</Head>
//                     <div className="flex items-end gap-3 h-36">
//                       {apps.slice(0, 8).map((a, i) => (
//                         <div key={a.id} className="flex-1 h-full flex flex-col justify-end items-center gap-1 group" title={`${a.institution_name}: ${a.compliance_score}%`}>
//                           <span className="text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{a.compliance_score}%</span>
//                           <div className="w-full rounded-t-xl bg-gradient-to-t from-[#E84D96] to-[#F7C6DD] group-hover:brightness-110" style={{ height: `${Math.max(6, Number(a.compliance_score) || 0)}%`, transformOrigin: "bottom", animation: `grow .9s ${0.2 + i * 0.1}s cubic-bezier(.2,.9,.2,1) both` }} />
//                         </div>
//                       ))}
//                     </div>
//                     <p className={`text-xs mt-3 ${mute}`}>{open.length} open finding{open.length === 1 ? "" : "s"} across {apps.length} application{apps.length === 1 ? "" : "s"}.</p>
//                   </div>
//                   <div className={`st ${card} p-7`} style={d(7)}>
//                     <Head>Start a new application</Head>
//                     <form onSubmit={handleCreateApp} className="space-y-3">
//                       <input value={instName} onChange={e => setInstName(e.target.value)} placeholder="Institution name, e.g. Apex Institute of Technology" aria-label="Institution name" className={field} />
//                       <div className="grid grid-cols-2 gap-3">
//                         <select value={region} onChange={e => setRegion(e.target.value)} aria-label="AICTE region" className={field}>{["South-Central", "North", "West", "South"].map(r => <option key={r}>{r}</option>)}</select>
//                         <select value={appType} onChange={e => setAppType(e.target.value)} aria-label="Approval type" className={field}>
//                           <option value="Increase in Intake / New Course">Increase in intake</option>
//                           <option value="Extension of Approval (EoA)">Extension of approval</option>
//                           <option value="New Institution Establishment">New institution</option>
//                         </select>
//                       </div>
//                       <button type="submit" className={`${primary} w-full flex items-center justify-center gap-2`}><PlusCircle className="w-4 h-4" />Create application and run AI checks</button>
//                     </form>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           )}

//           {/* ===== APPLICATIONS ===== */}
//           {tab === "applications" && (
//             <div className="space-y-4">
//               {apps.map((a, i) => (
//                 <div key={a.id} className={`st lift ${card} p-6 flex flex-wrap items-center gap-6`} style={d(i)}>
//                   <Ring pct={Number(a.compliance_score) || 0} size={92} />
//                   <div className="flex-1 min-w-[240px]">
//                     <div className="flex flex-wrap items-center gap-2"><b className="font-mono text-sm text-[#C2337A]">{a.id}</b><Pill>{a.status}</Pill><span className={`text-xs ${mute}`}>{a.region}</span></div>
//                     <p className="disp text-2xl font-semibold mt-1">{a.institution_name}</p>
//                     <p className={`text-sm mt-1 ${mute}`}>{a.app_type} · Officer: <b className="text-[#512D43]">{a.assigned_officer}</b></p>
//                   </div>
//                   <div className="w-44">
//                     <p className={`text-xs mb-1.5 ${mute}`}>Tamper risk {((a.tamper_risk_score || 0) * 100).toFixed(0)}%</p>
//                     <div className="h-2 rounded-full bg-[#F7C6DD]/40 overflow-hidden"><div className="h-full rounded-full bg-[#E84D96] origin-left" style={{ width: `${(a.tamper_risk_score || 0) * 100}%`, animation: "growx 1.1s .3s cubic-bezier(.2,.9,.2,1) both" }} /></div>
//                   </div>
//                   <button aria-label="Review documents" onClick={() => { setSelectedDocId(docs[0]?.id); go("intelligence"); }} className="w-12 h-12 rounded-full bg-[#FFF7FA] border border-[#F7C6DD] text-[#E84D96] flex items-center justify-center hover:bg-[#E84D96] hover:text-white hover:-rotate-45 transition-all duration-500"><ChevronRight className="w-5 h-5" /></button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ===== DOCUMENT INTELLIGENCE ===== */}
//           {tab === "intelligence" && (
//             <div className="space-y-6">
//               <div className="flex justify-end st">
//                 <label className={`${primary} cursor-pointer flex items-center gap-2 focus-within:ring-2 ring-[#E84D96]`}><FileText className="w-4 h-4" />Upload disclosure PDF<input type="file" onChange={uploadDoc} className="sr-only" /></label>
//               </div>
//               <div className="grid lg:grid-cols-12 gap-6 items-start">
//                 <div className={`st lg:col-span-3 ${card} p-5`} style={d(1)}>
//                   <p className="text-sm font-bold mb-3">Uploaded disclosures</p>
//                   <div className="space-y-2">
//                     {docs.map(x => (
//                       <button key={x.id} onClick={() => pickDoc(x.id)} className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${activeDoc?.id === x.id ? "bg-[#FFF7FA] border-[#E84D96] translate-x-1 shadow-[0_8px_24px_-12px_rgba(232,77,150,.6)]" : "bg-white border-[#F7C6DD]/70 hover:border-[#E84D96]"}`}>
//                         <FileSearch className={`w-4 h-4 shrink-0 ${activeDoc?.id === x.id ? "text-[#E84D96]" : mute}`} />
//                         <div className="min-w-0"><p className="truncate text-sm font-semibold">{x.filename}</p><p className={`text-[11px] ${mute}`}>OCR confidence {(x.ocr_confidence * 100).toFixed(0)}%</p></div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className={`st lg:col-span-5 ${card} p-6`} style={d(2)}>
//                   <div className="flex items-center gap-2 mb-4"><Pill tone="plum">{isAnalyzingDoc ? "Scanning" : "Live preview"}</Pill><span className={`text-xs truncate ${mute}`}>{activeDoc?.filename} · {activeDoc?.file_type}</span></div>
//                   <div className="relative rounded-2xl bg-white border border-[#F7C6DD] overflow-hidden p-7 min-h-[430px] shadow-inner">
//                     {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map(c => <span key={c} className={`absolute w-5 h-5 border-[#E84D96] ${c}`} />)}
//                     <div className="beam" />
//                     <div className="space-y-3.5">
//                       {WIDTHS.map((w, i) => {
//                         const ev = [2, 5, 8, 11].indexOf(i);
//                         if (ev < 0) return <div key={i} className={`h-2.5 rounded-full ${isAnalyzingDoc ? "sk" : "bg-[#F7C6DD]/50"}`} style={{ width: `${w}%` }} />;
//                         const fl = fields[ev], on = hot === fl.k;
//                         return (
//                           <div key={i} onMouseEnter={() => setHot(fl.k)} onMouseLeave={() => setHot(null)} className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs border transition-all duration-500 ${isAnalyzingDoc ? "opacity-0 -translate-x-3" : "opacity-100"} ${on ? "bg-[#E84D96] text-white border-[#E84D96] scale-[1.03] shadow-lg" : "bg-[#FDE7F1] border-[#F7C6DD]"}`} style={{ transitionDelay: isAnalyzingDoc ? "0ms" : `${ev * 180}ms` }}>
//                             <span className="font-semibold">{fl.l}</span><b className="font-mono">{fl.v ?? fl.f}{fl.u}</b>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                   <div className="mt-4 rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-4 text-sm">
//                     <p className="font-bold text-[#C2337A]">Tamper analysis (ELA)</p>
//                     <p className="mt-1">{activeDoc?.tamper_analysis?.details || "No pixel inconsistencies detected."}</p>
//                   </div>
//                 </div>

//                 <div className={`st lg:col-span-4 ${card} p-6 space-y-5`} style={d(3)}>
//                   <div className="flex items-center justify-between"><p className="font-bold">Extracted fields</p><Pill tone="ok">Verified</Pill></div>
//                   <div className="space-y-3">
//                     {fields.map((fl, i) => (
//                       <div key={fl.k} onMouseEnter={() => setHot(fl.k)} onMouseLeave={() => setHot(null)} className={`rounded-2xl border p-4 transition-all duration-300 ${hot === fl.k ? "border-[#E84D96] bg-[#FDE7F1] -translate-x-1" : "border-[#F7C6DD]/70 bg-[#FFF7FA]"}`}>
//                         {isAnalyzingDoc ? <div className="sk h-10 rounded-lg" /> : (
//                           <div className="st" style={d(i)}>
//                             <div className="flex justify-between items-baseline"><span className={`text-xs ${mute}`}>{fl.l}</span><b className="disp text-2xl">{fl.v ?? fl.f}{fl.u}</b></div>
//                             <div className="h-1 mt-3 rounded-full bg-[#F7C6DD]/50 overflow-hidden"><div className="h-full bg-[#E84D96] rounded-full origin-left" style={{ width: `${(activeDoc?.ocr_confidence || 0.9) * 100}%`, animation: "growx 1s cubic-bezier(.2,.9,.2,1) both" }} /></div>
//                             {fl.v === undefined && <p className={`text-[11px] mt-1.5 ${mute}`}>Demo default · not found in this document</p>}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {open.length > 0 && (
//                     <div>
//                       <p className="text-sm font-bold mb-2">Open discrepancies</p>
//                       {open.slice(0, 2).map(f => <p key={f.id} className="text-xs rounded-xl bg-[#FDE7F1] p-3 mb-2"><b className="text-[#C2337A]">{f.rule_id}</b> · {f.message}</p>)}
//                     </div>
//                   )}
//                   <button onClick={() => { analyse(); notify("AI Compliance check re-verified against AICTE Chapter IV rules."); }} className={`${btn} w-full py-3 bg-[#512D43] text-white hover:bg-[#3d2132]`}>Run full compliance re-check</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ===== SIMULATOR ===== */}
//           {tab === "simulator" && (
//             <div className="grid lg:grid-cols-12 gap-6 items-stretch">
//               <div className={`st lg:col-span-5 ${card} p-8 space-y-7`}>
//                 <p className={`text-sm ${mute}`}>Test hypothetical numbers against AICTE rules without touching official records.</p>
//                 {[
//                   ["Faculty count", simFaculty, setSimFaculty, 20, 200, 1],
//                   ["Student enrollment", simStudents, setSimStudents, 300, 3000, 50],
//                   ["Built-up area (sq ft)", simArea, setSimArea, 5000, 40000, 500],
//                 ].map(([l, v, set, mn, mx, stp]: any) => (
//                   <div key={l}>
//                     <div className="flex justify-between items-baseline text-sm mb-2"><label htmlFor={l}>{l}</label><b className="disp text-2xl text-[#E84D96] tabular-nums">{v}</b></div>
//                     <input id={l} type="range" min={mn} max={mx} step={stp} value={v} onChange={e => set(Number(e.target.value))} className="w-full" />
//                   </div>
//                 ))}
//                 <p className={`text-xs rounded-xl bg-[#FFF7FA] border border-[#F7C6DD] p-3 ${mute}`}>Live ratio preview: <b className="text-[#512D43]">{(simStudents / simFaculty).toFixed(1)} : 1</b> students per faculty</p>
//                 <button onClick={runSimulator} className={`${primary} w-full`}>Run compliance simulation</button>
//               </div>
//               <div className={`st lg:col-span-7 ${card} p-8 flex items-center justify-center text-center`} style={d(2)}>
//                 {simResult ? (
//                   <div key={JSON.stringify(simResult)} className="st w-full space-y-6 flex flex-col items-center">
//                     <Ring pct={Number(simResult.projected_compliance_score) || 0} size={200} label="projected score" />
//                     <div className="grid grid-cols-2 gap-4 w-full text-left">
//                       <div className="rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-5 space-y-1"><p className={`text-xs ${mute}`}>Student–faculty ratio</p><p className="disp text-2xl font-semibold">{simResult.simulated_ratio}:1</p><Pill>{simResult.ratio_status}</Pill></div>
//                       <div className="rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-5 space-y-1"><p className={`text-xs ${mute}`}>Infrastructure area</p><p className="disp text-2xl font-semibold">{simResult.area_status}</p></div>
//                     </div>
//                     <p className="font-medium max-w-md">Recommendation: {simResult.recommendation}</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3"><Sliders className="w-10 h-10 text-[#E84D96] mx-auto" style={{ animation: "float 4s ease-in-out infinite" }} /><p className={`max-w-xs ${mute}`}>Move the sliders, then run the simulation to see the projected score.</p></div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* ===== GHOST & REPORTS ===== */}
//           {tab === "ghost" && (
//             <div className="grid lg:grid-cols-2 gap-6 items-start">
//               <div className={`st ${card} p-8 space-y-5`}>
//                 <h3 className="disp text-2xl font-semibold">EPFO and biometric ghost-faculty check</h3>
//                 <p className={`text-sm ${mute}`}>Match faculty PAN records against national provident fund registries to catch dual employment or staff who don't exist.</p>
//                 <div className="relative flex items-center justify-center h-44 overflow-hidden">
//                   {[0, 1, 2].map(i => <span key={i} className="absolute rounded-full border border-[#E84D96]/50" style={{ width: 60 + i * 50, height: 60 + i * 50, animation: isScanningGhost ? `ping2 2s ${i * 0.4}s ease-out infinite` : undefined }} />)}
//                   <span className="absolute w-36 h-36 rounded-full" style={{ background: "conic-gradient(from 0deg,transparent 70%,rgba(232,77,150,.45))", animation: `spin ${isScanningGhost ? 1.4 : 9}s linear infinite` }} />
//                   <ShieldAlert className="relative w-8 h-8 text-[#E84D96]" />
//                 </div>
//                 <button onClick={runGhost} disabled={isScanningGhost} className={`${primary} w-full flex items-center justify-center gap-2`}>{isScanningGhost ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}Run national EPFO cross-check</button>
//                 {ghostData && (
//                   <div className="space-y-3">
//                     {ghostData.map((f, i) => (
//                       <div key={i} className="st lift rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-4 flex justify-between items-center gap-3" style={d(i)}>
//                         <div><p className="font-semibold">{f.name} <span className={`font-mono text-xs ${mute}`}>({f.pan})</span></p><p className="text-xs text-[#C2337A] font-semibold mt-0.5">{f.conflict || "Verified active"}</p></div>
//                         <Pill tone={f.status === "DUPLICATE" ? "pink" : "ok"}>{f.status}</Pill>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className={`st ${card} p-8 space-y-5`} style={d(2)}>
//                 <h3 className="disp text-2xl font-semibold">One-click scrutiny report</h3>
//                 <p className={`text-sm ${mute}`}>Build the official report: compliance scores, tamper risk and bureau sign-off recommendations.</p>
//                 <button onClick={getReport} className={`${btn} w-full py-3.5 bg-[#512D43] text-white hover:bg-[#3d2132] hover:-translate-y-0.5`}>Generate official scrutiny report</button>
//               </div>
//             </div>
//           )}

//           {/* ===== AUDIT ===== */}
//           {tab === "audit" && (
//             <div className={`st ${card} p-8`}>
//               <div className="relative pl-8">
//                 <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#E84D96] via-[#F7C6DD] to-transparent" />
//                 {logs.map((l, i) => (
//                   <div key={l.id} className="st relative pb-5 last:pb-0" style={d(Math.min(i, 12))}>
//                     <span className="absolute -left-8 top-4 w-5 h-5 rounded-full bg-white border-2 border-[#E84D96] flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-[#E84D96]" style={{ animation: i === 0 ? "ping2 1.8s ease-out infinite" : undefined }} /></span>
//                     <div className="lift rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD]/70 p-4 flex flex-wrap justify-between gap-3">
//                       <div>
//                         <div className="flex items-center gap-2"><b className="font-mono text-xs text-[#C2337A]">{l.app_id}</b><Pill>{l.action}</Pill></div>
//                         <p className="text-sm mt-1.5">{l.details}</p>
//                         <p className={`text-xs mt-1 ${mute}`}>{l.actor_name} · {l.actor_role}</p>
//                       </div>
//                       <span className={`text-xs whitespace-nowrap ${mute}`}>{l.timestamp}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* ===== Report modal ===== */}
//       {report && (
//         <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#512D43]/30 backdrop-blur-sm" onClick={() => setReport(null)} role="dialog" aria-modal="true" aria-label="Scrutiny report">
//           <div onClick={e => e.stopPropagation()} className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-[28px] bg-white border border-[#F7C6DD] shadow-2xl p-6" style={{ animation: "pop .5s cubic-bezier(.34,1.56,.64,1)" }}>
//             <div className="flex items-center justify-between mb-4"><h3 className="disp text-2xl font-semibold">Scrutiny committee report</h3><button aria-label="Close" onClick={() => setReport(null)} className="p-2 rounded-full hover:bg-[#FFF7FA]"><X className="w-4 h-4" /></button></div>
//             <pre className="flex-1 overflow-auto rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-4 text-xs font-mono">{JSON.stringify(report, null, 2)}</pre>
//             <div className="flex gap-3 mt-4 justify-end"><button onClick={() => setReport(null)} className={ghost}>Close</button><button onClick={downloadReport} className={primary}>Download JSON</button></div>
//           </div>
//         </div>
//       )}

//       {/* ===== AI orb + assistant ===== */}
//       <div className="fixed bottom-6 right-6 z-50">
//         {!chatOpen ? (
//           <button onClick={() => setChatOpen(true)} aria-label="Open AI assistant" className="group relative w-[72px] h-[72px] rounded-full">
//             <span className="absolute inset-0 rounded-full bg-[#E84D96]/50" style={{ animation: "ping2 2.6s ease-out infinite" }} />
//             <span className="absolute -inset-1 rounded-full" style={{ background: "conic-gradient(#E84D96,#F7C6DD,#fff,#E84D96)", animation: "spin 4s linear infinite", filter: "blur(3px)" }} />
//             <span className="relative w-full h-full rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff,#F7C6DD_45%,#E84D96)] shadow-[0_14px_40px_-6px_rgba(232,77,150,.8)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ animation: "float 4.5s ease-in-out infinite" }}><Bot className="w-7 h-7 text-white drop-shadow" /></span>
//           </button>
//         ) : (
//           <div className="w-[min(400px,calc(100vw-2rem))] h-[560px] max-h-[calc(100vh-3rem)] rounded-[28px] bg-white/95 backdrop-blur-2xl border border-[#F7C6DD] shadow-[0_30px_80px_-20px_rgba(232,77,150,.6)] flex flex-col overflow-hidden" style={{ animation: "pop .5s cubic-bezier(.34,1.56,.64,1)", transformOrigin: "bottom right" }}>
//             <div className="p-4 bg-gradient-to-r from-[#FFF7FA] to-[#FDE7F1] border-b border-[#F7C6DD] flex items-center justify-between">
//               <div className="flex items-center gap-3"><span className="w-9 h-9 rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff,#E84D96)] flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></span><div><p className="font-bold text-sm">VerifyAI Intelligence Core</p><p className={`text-[11px] ${mute}`}>Answers come from your backend</p></div></div>
//               <button onClick={() => setChatOpen(false)} aria-label="Close assistant" className="p-2 rounded-full hover:bg-white"><X className="w-4 h-4" /></button>
//             </div>
//             <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm" aria-live="polite">
//               {messages.map((m, i) => (
//                 <div key={i} className={`max-w-[88%] p-3 rounded-2xl leading-relaxed ${m.sender === "user" ? "ml-auto bg-[#E84D96] text-white rounded-br-md" : "bg-[#FFF7FA] border border-[#F7C6DD]/70 rounded-bl-md"}`} style={{ animation: "pop .4s cubic-bezier(.34,1.56,.64,1)", transformOrigin: m.sender === "user" ? "bottom right" : "bottom left" }}>{m.text}</div>
//               ))}
//               {typing && <div className="flex gap-1.5 p-3 w-16 rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD]/70">{[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-[#E84D96]" style={{ animation: `dot 1.2s ${i * 0.15}s infinite` }} />)}</div>}
//               {messages.length < 3 && (
//                 <div className="flex flex-wrap gap-2 pt-2">
//                   {CHIPS.map(c => <button key={c} onClick={() => ask(c)} className="text-xs px-3 py-2 rounded-full border border-[#F7C6DD] bg-white hover:bg-[#E84D96] hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-left">{c}</button>)}
//                 </div>
//               )}
//               <div ref={chatEnd} />
//             </div>
//             <form onSubmit={sendChat} className="p-3 border-t border-[#F7C6DD] flex gap-2">
//               <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask about AICTE rules, ratios, ELA..." aria-label="Message" className={field} />
//               <button type="submit" aria-label="Send" className="w-12 shrink-0 rounded-2xl bg-[#E84D96] text-white flex items-center justify-center hover:rotate-12 hover:scale-105 transition-all duration-300"><Send className="w-4 h-4" /></button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// 4th
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Cpu, FileText, Bot, Send, X, Sparkles, Layers, History, Sliders, PlusCircle, FileSearch, ShieldAlert, ChevronRight, RefreshCw, ArrowUpRight } from "lucide-react";

// type Role = "INSTITUTION" | "SCRUTINY_OFFICER" | "AICTE_OFFICIAL" | "ADMIN";
// type TabId = "dashboard" | "applications" | "intelligence" | "simulator" | "ghost" | "audit";

// const API = "http://localhost:8000";
// const ROLES: { id: Role; label: string; badge: string }[] = [
//   { id: "INSTITUTION", label: "Institution Portal", badge: "College Nodal Officer" },
//   { id: "SCRUTINY_OFFICER", label: "Scrutiny Officer", badge: "Expert Reviewer" },
//   { id: "AICTE_OFFICIAL", label: "AICTE Bureau Official", badge: "Approvals & Escalations" },
//   { id: "ADMIN", label: "System Admin", badge: "Rules & Security" },
// ];
// const NAV: { id: TabId; label: string; icon: any; sub: string }[] = [
//   { id: "dashboard", label: "Command Centre", icon: Layers, sub: "Everything that needs a decision today" },
//   { id: "applications", label: "Applications", icon: FileText, sub: "Queue, status and risk per institution" },
//   { id: "intelligence", label: "Document Intelligence", icon: FileSearch, sub: "Read, scan and cross-check every page" },
//   { id: "simulator", label: "What-If Simulator", icon: Sliders, sub: "Test numbers against the rules, safely" },
//   { id: "ghost", label: "Ghost Faculty & Reports", icon: ShieldAlert, sub: "Cross-check staff and export the report" },
//   { id: "audit", label: "Audit Trail", icon: History, sub: "Every action, permanently recorded" },
// ];
// const CHIPS = ["What is the faculty-student ratio rule?", "How does ELA tamper detection work?", "Explain the flagged findings"];
// const WIDTHS = [92, 78, 0, 84, 66, 0, 90, 72, 0, 80, 94, 0, 70, 86];

// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
// .v{font-family:'Hanken Grotesk',system-ui,sans-serif;color:#512D43}
// .disp{font-family:'Fraunces',Georgia,serif;letter-spacing:-.025em}
// @keyframes rise{from{opacity:0;transform:translateY(20px) scale(.98);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
// .st{animation:rise .8s cubic-bezier(.2,.9,.2,1) both}
// @keyframes drift{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(7vw,5vh,0) scale(1.2)}}
// .blob{position:absolute;border-radius:9999px;filter:blur(90px);animation:drift 20s ease-in-out infinite}
// @keyframes beam{from{top:-12%}to{top:102%}}
// .beam{position:absolute;left:0;right:0;height:80px;z-index:5;pointer-events:none;background:linear-gradient(to bottom,transparent,rgba(232,77,150,.26));border-bottom:2px solid #E84D96;box-shadow:0 10px 34px rgba(232,77,150,.55);animation:beam 3s cubic-bezier(.6,0,.4,1) infinite alternate}
// @keyframes spin{to{transform:rotate(360deg)}}
// @keyframes ping2{from{transform:scale(.7);opacity:.7}to{transform:scale(2.4);opacity:0}}
// @keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
// @keyframes growx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
// @keyframes shimmer{to{background-position:-200% 0}}
// @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
// @keyframes dot{0%,80%,100%{opacity:.25;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}
// @keyframes pop{from{opacity:0;transform:scale(.88) translateY(24px)}to{opacity:1;transform:none}}
// @keyframes shrink{from{width:100%}to{width:0}}
// @keyframes slide{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
// .sk{background:linear-gradient(90deg,#fbe3ee 25%,#fff 50%,#fbe3ee 75%);background-size:200% 100%;animation:shimmer 1.3s linear infinite}
// .lift{transition:transform .45s cubic-bezier(.34,1.56,.64,1),box-shadow .3s,border-color .3s}
// .lift:hover{transform:translateY(-4px);box-shadow:0 22px 50px -20px rgba(232,77,150,.5);border-color:#E84D96}
// .v :focus-visible{outline:2px solid #E84D96;outline-offset:2px}
// .v input[type=range]{accent-color:#E84D96;height:6px}
// @media (prefers-reduced-motion:reduce){.v *,.v *::before,.v *::after{animation:none!important;transition:none!important}}
// `;

// const card = "rounded-[22px] bg-white/80 backdrop-blur-xl border border-[#F7C6DD]/70 shadow-[0_10px_40px_-20px_rgba(232,77,150,.4)]";
// const btn = "rounded-full font-semibold text-sm transition-all duration-300 active:scale-95 disabled:opacity-60";
// const primary = `${btn} bg-[#E84D96] text-white px-6 py-3 shadow-[0_8px_24px_-8px_rgba(232,77,150,.7)] hover:shadow-[0_12px_32px_-6px_rgba(232,77,150,.8)] hover:-translate-y-0.5`;
// const ghost = `${btn} bg-white text-[#512D43] border border-[#F7C6DD] px-6 py-3 hover:border-[#E84D96]`;
// const field = "w-full bg-[#FFF7FA] border border-[#F7C6DD] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#E84D96] focus:shadow-[0_0_0_4px_rgba(232,77,150,.12)] transition-all";
// const mute = "text-[#7A5C6D]";

// function useCount(to: number, dur = 1200) {
//   const [v, setV] = useState(0);
//   useEffect(() => {
//     if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
//     let r = 0, s = 0;
//     const f = (t: number) => { if (!s) s = t; const p = Math.min((t - s) / dur, 1); setV(to * (1 - Math.pow(1 - p, 4))); if (p < 1) r = requestAnimationFrame(f); };
//     r = requestAnimationFrame(f);
//     return () => cancelAnimationFrame(r);
//   }, [to, dur]);
//   return v;
// }
// function Num({ to, suffix = "" }: { to: any; suffix?: string }) {
//   const v = useCount(Number(to) || 0);
//   return <>{Math.round(v)}{suffix}</>;
// }

// function Backdrop() {
//   const ref = useRef<HTMLCanvasElement>(null);
//   useEffect(() => {
//     const c = ref.current;
//     if (!c) return;
//     const x = c.getContext("2d");
//     if (!x) return;
//     if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
//     let w = 0, h = 0, raf = 0;
//     const P = Array.from({ length: 44 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.7, s: Math.random() * 0.0004 + 0.0001, p: Math.random() * 6 }));
//     const rs = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
//     rs(); addEventListener("resize", rs);
//     const f = (t: number) => {
//       x.clearRect(0, 0, w, h);
//       P.forEach(p => {
//         p.y -= p.s * 16; if (p.y < -0.05) p.y = 1.05;
//         x.beginPath(); x.arc((p.x + Math.sin(t / 2600 + p.p) * 0.02) * w, p.y * h, p.r, 0, 7);
//         x.fillStyle = `rgba(232,77,150,${0.16 + 0.16 * Math.sin(t / 900 + p.p)})`; x.fill();
//       });
//       raf = requestAnimationFrame(f);
//     };
//     raf = requestAnimationFrame(f);
//     return () => { cancelAnimationFrame(raf); removeEventListener("resize", rs); };
//   }, []);
//   return (
//     <div className="fixed inset-0 z-0 bg-[#FFF7FA] overflow-hidden pointer-events-none" aria-hidden>
//       <div className="blob w-[46vw] h-[46vw] -top-[12vw] left-[8vw] bg-[#F7C6DD]/70" />
//       <div className="blob w-[36vw] h-[36vw] bottom-[-8vw] right-[-4vw] bg-[#E84D96]/20" style={{ animationDelay: "-7s" }} />
//       <div className="blob w-[24vw] h-[24vw] top-[35vh] right-[26vw] bg-[#F7C6DD]/50" style={{ animationDelay: "-12s" }} />
//       <canvas ref={ref} className="absolute inset-0" />
//     </div>
//   );
// }

// function Ring({ pct, size = 132, label }: { pct: number; size?: number; label?: string }) {
//   const r = 52, c = 2 * Math.PI * r, [o, setO] = useState(c);
//   useEffect(() => { const t = setTimeout(() => setO(c * (1 - Math.min(pct, 100) / 100)), 150); return () => clearTimeout(t); }, [pct, c]);
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full" aria-hidden>
//         <circle cx="60" cy="60" r={r} fill="none" stroke="#F7C6DD" strokeOpacity=".45" strokeWidth="9" />
//         <circle cx="60" cy="60" r={r} fill="none" stroke="#E84D96" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={o} style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.9,.2,1)", filter: "drop-shadow(0 0 6px rgba(232,77,150,.55))" }} />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="disp font-semibold" style={{ fontSize: size / 4.4 }}><Num to={pct} suffix="%" /></span>
//         {label && <span className={`text-[11px] ${mute}`}>{label}</span>}
//       </div>
//     </div>
//   );
// }

// function Head({ children, tag }: { children: React.ReactNode; tag?: React.ReactNode }) {
//   return <div className="flex items-center justify-between gap-3 mb-4"><h3 className="disp text-xl font-semibold">{children}</h3>{tag}</div>;
// }
// const Pill = ({ children, tone = "pink" }: { children: React.ReactNode; tone?: "pink" | "plum" | "ok" }) => (
//   <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tone === "ok" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : tone === "plum" ? "bg-[#512D43] text-white border-[#512D43]" : "bg-[#FFF7FA] text-[#C2337A] border-[#F7C6DD]"}`}>{children}</span>
// );

// export default function VerifyAIApp() {
//   const [role, setRole] = useState<Role>("AICTE_OFFICIAL");
//   const [tab, setTab] = useState<TabId>("dashboard");
//   const [state, setState] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState<string | null>(null);
//   const [instName, setInstName] = useState("");
//   const [region, setRegion] = useState("South-Central");
//   const [appType, setAppType] = useState("Increase in Intake / New Course");
//   const [simFaculty, setSimFaculty] = useState(70);
//   const [simStudents, setSimStudents] = useState(1200);
//   const [simArea, setSimArea] = useState(15000);
//   const [simResult, setSimResult] = useState<any>(null);
//   const [ghostData, setGhostData] = useState<any[] | null>(null);
//   const [isScanningGhost, setIsScanningGhost] = useState(false);
//   const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
//   const [isAnalyzingDoc, setIsAnalyzingDoc] = useState(false);
//   const [hot, setHot] = useState<string | null>(null);
//   const [report, setReport] = useState<any>(null);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatInput, setChatInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [messages, setMessages] = useState<any[]>([
//     { sender: "bot", text: "Greetings! I am your 4O4 VerifyAI Intelligence Core, fully synchronized with AICTE Approval Handbooks 2026." },
//   ]);
//   const chatEnd = useRef<HTMLDivElement>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => { setMounted(true); }, []);

//   const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3500); };
//   const analyse = () => { setIsAnalyzingDoc(true); setTimeout(() => setIsAnalyzingDoc(false), 1400); };
//   const pickDoc = (id: string) => { setSelectedDocId(id); analyse(); };
//   const go = (t: TabId) => { setTab(t); if (t === "intelligence") analyse(); };

//   const loadData = async () => {
//     try {
//       const res = await fetch(`${API}/api/state`);
//       const data = await res.json();
//       setState(data);
//       if (data?.documents?.length > 0 && !selectedDocId) setSelectedDocId(data.documents[0].id);
//     } catch {
//       notify("Establishing secure connection to backend on port 8000...");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => { loadData(); }, []);
//   useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

//   const handleCreateApp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!instName) return notify("Please enter institution name.");
//     const formData = new FormData();
//     formData.append("institution_name", instName);
//     formData.append("region", region);
//     formData.append("app_type", appType);
//     const res = await fetch(`${API}/api/applications`, { method: "POST", body: formData });
//     const data = await res.json();
//     if (data.status === "success") {
//       notify(`Application initialized successfully: ${data.app_id}`);
//       setInstName(""); loadData(); setTab("applications");
//     }
//   };

//   const runSimulator = async () => {
//     const formData = new FormData();
//     formData.append("faculty", simFaculty.toString());
//     formData.append("students", simStudents.toString());
//     formData.append("area", simArea.toString());
//     const res = await fetch(`${API}/api/what-if`, { method: "POST", body: formData });
//     setSimResult(await res.json());
//     notify("What-If compliance matrix calculated successfully.");
//   };

//   const ask = async (q: string) => {
//     if (!q.trim()) return;
//     setMessages(prev => [...prev, { sender: "user", text: q }]);
//     setChatInput(""); setTyping(true);
//     try {
//       const formData = new FormData();
//       formData.append("query", q);
//       const res = await fetch(`${API}/api/help-desk`, { method: "POST", body: formData });
//       const data = await res.json();
//       setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
//     } catch {
//       setMessages(prev => [...prev, { sender: "bot", text: "AI Core connection interrupted. Please ensure the backend is running." }]);
//     } finally { setTyping(false); }
//   };
//   const sendChat = (e: React.FormEvent) => { e.preventDefault(); ask(chatInput); };

//   const runGhost = async () => {
//     setIsScanningGhost(true);
//     try {
//       const fd = new FormData();
//       fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
//       const res = await fetch(`${API}/api/ghost-faculty-check`, { method: "POST", body: fd });
//       const out = await res.json();
//       const list = out?.flagged_faculty || [];
//       setGhostData(list);
//       notify(`Scan completed: Found ${list.length} records.`);
//     } catch { notify("Error executing ghost faculty check."); }
//     finally { setIsScanningGhost(false); }
//   };

//   const getReport = async () => {
//     const appId = state.applications[0]?.id || "AICTE-2026-REG-8841";
//     const res = await fetch(`${API}/api/scrutiny-report/${appId}`);
//     setReport(await res.json());
//     notify("Official Scrutiny Committee Report generated successfully.");
//   };
//   const downloadReport = () => {
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }));
//     a.download = "scrutiny-report.json"; a.click();
//   };

//   const uploadDoc = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     const fd = new FormData();
//     fd.append("app_id", state.applications[0]?.id || "AICTE-2026-REG-8841");
//     fd.append("file", f);
//     const res = await fetch(`${API}/api/upload-document`, { method: "POST", body: fd });
//     const out = await res.json();
//     if (out.status === "success") { notify("Document uploaded, OCR parsed & ELA scanned successfully!"); loadData(); }
//   };

//   if (!mounted || loading || !state) {
//     return (
//       <div className="v min-h-screen flex flex-col items-center justify-center gap-8 relative">
//         <style>{CSS}</style><Backdrop />
//         <div className="relative z-10 w-24 h-24 flex items-center justify-center">
//           <div className="absolute inset-0 rounded-full border border-dashed border-[#E84D96]/60" style={{ animation: "spin 6s linear infinite" }} />
//           <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-[#E84D96]" style={{ animation: "spin 1.1s linear infinite" }} />
//           <div className="absolute inset-0 rounded-full bg-[#E84D96]/30" style={{ animation: "ping2 2s ease-out infinite" }} />
//           <Sparkles className="w-7 h-7 text-[#E84D96]" />
//         </div>
//         <p className="relative z-10 disp text-xl">Waking the verification core…</p>
//       </div>
//     );
//   }

//   const apps: any[] = state.applications || [], docs: any[] = state.documents || [], findings: any[] = state.findings || [], logs: any[] = state.audit_logs || [];
//   const activeDoc = docs.find((x: any) => x.id === selectedDocId) || docs[0];
//   const avg = apps.length ? apps.reduce((s, a) => s + (Number(a.compliance_score) || 0), 0) / apps.length : 0;
//   const priority = [...apps].sort((a, b) => (b.tamper_risk_score || 0) - (a.tamper_risk_score || 0)).slice(0, 3);
//   const open = findings.filter(f => f.severity !== "PASS");
//   const navIdx = NAV.findIndex(n => n.id === tab);
//   const cur = NAV[navIdx];
//   const roleInfo = ROLES.find(r => r.id === role)!;
//   const ex = activeDoc?.extracted_data || {};
//   const fields = [
//     { k: "faculty", l: "Faculty count", v: ex.faculty_count, f: 70, u: "" },
//     { k: "students", l: "Student enrollment", v: ex.student_enrollment, f: 1200, u: "" },
//     { k: "area", l: "Built-up area (sq ft)", v: ex.built_up_sqft, f: 15000, u: "" },
//     { k: "phd", l: "PhD share", v: ex.phd_percent, f: 35, u: "%" },
//   ];

//   return (
//     <div className="v min-h-screen relative selection:bg-[#F7C6DD]">
//       <style>{CSS}</style>
//       <Backdrop />

//       {toast && (
//         <div className="fixed top-5 right-5 z-[60] rounded-2xl bg-white border border-[#F7C6DD] shadow-2xl overflow-hidden max-w-sm" style={{ animation: "slide .5s cubic-bezier(.2,.9,.2,1)" }} role="status">
//           <div className="px-5 py-3 text-sm flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#E84D96] shrink-0" />{toast}</div>
//           <div className="h-0.5 bg-[#E84D96]" style={{ animation: "shrink 3.5s linear forwards" }} />
//         </div>
//       )}

//       {/* ===== Sidebar ===== */}
//       <aside className="hidden lg:flex fixed left-4 top-4 bottom-4 w-[256px] z-30 flex-col rounded-[28px] bg-white/75 backdrop-blur-2xl border border-[#F7C6DD]/80 shadow-[0_20px_60px_-24px_rgba(232,77,150,.5)] p-5">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="relative w-11 h-11 shrink-0">
//             <div className="absolute -inset-1 rounded-full" style={{ background: "conic-gradient(from 0deg,#E84D96,#F7C6DD,#fff,#E84D96)", animation: "spin 5s linear infinite", filter: "blur(2px)" }} />
//             <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center"><Cpu className="w-5 h-5 text-[#E84D96]" /></div>
//           </div>
//           <div><p className="disp text-lg font-semibold leading-none">4O4 VerifyAI</p><p className={`text-[11px] mt-1 ${mute}`}>SIH 2026 · PS SIH26261</p></div>
//         </div>
//         <nav className="relative" aria-label="Primary">
//           <div className="absolute left-0 right-0 h-11 rounded-2xl bg-gradient-to-r from-[#E84D96] to-[#F07AB4] shadow-[0_10px_26px_-8px_rgba(232,77,150,.8)]" style={{ transform: `translateY(${navIdx * 52}px)`, transition: "transform .6s cubic-bezier(.34,1.56,.64,1)" }} />
//           {NAV.map(n => {
//             const Icon = n.icon, on = tab === n.id;
//             return (
//               <button key={n.id} onClick={() => go(n.id)} aria-current={on ? "page" : undefined} className={`relative z-10 w-full h-11 mb-2 px-3.5 rounded-2xl flex items-center gap-3 text-sm font-semibold transition-colors duration-300 ${on ? "text-white" : "text-[#512D43] hover:text-[#E84D96]"}`}>
//                 <Icon className="w-[18px] h-[18px]" />{n.label}
//                 {n.id === "applications" && <span className={`ml-auto text-[11px] px-1.5 rounded-full ${on ? "bg-white/25" : "bg-[#FFF7FA] text-[#C2337A]"}`}>{apps.length}</span>}
//               </button>
//             );
//           })}
//         </nav>
//         <div className="mt-auto pt-4 border-t border-[#F7C6DD]/60">
//           <p className={`text-xs mb-2 ${mute}`}>Working as</p>
//           <div className="space-y-1">
//             {ROLES.map(r => (
//               <button key={r.id} onClick={() => { setRole(r.id); notify(`Switched workspace to ${r.label}`); }} className={`w-full text-left px-3 py-2 rounded-xl text-[13px] transition-all duration-300 ${role === r.id ? "bg-[#FFF7FA] border border-[#E84D96] font-bold text-[#C2337A] translate-x-1" : "border border-transparent hover:bg-[#FFF7FA] text-[#512D43]"}`}>{r.label}</button>
//             ))}
//           </div>
//         </div>
//       </aside>

//       <div className="lg:pl-[288px] relative z-10">
//         {/* Mobile nav + role */}
//         <div className="lg:hidden sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-[#F7C6DD] px-3 py-2 space-y-2">
//           <nav className="flex gap-2 overflow-x-auto" aria-label="Primary mobile">
//             {NAV.map(n => { const Icon = n.icon; return (
//               <button key={n.id} onClick={() => go(n.id)} className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${tab === n.id ? "bg-[#E84D96] text-white" : "text-[#512D43] bg-[#FFF7FA]"}`}><Icon className="w-4 h-4" />{n.label}</button>
//             ); })}
//           </nav>
//           <select value={role} onChange={e => { const r = ROLES.find(x => x.id === e.target.value)!; setRole(r.id); notify(`Switched workspace to ${r.label}`); }} aria-label="Role" className={`${field} py-2`}>{ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}</select>
//         </div>

//         <header className="px-6 lg:px-10 pt-8 flex flex-wrap items-end justify-between gap-4">
//           <div key={tab} className="st">
//             <h1 className="disp text-4xl lg:text-[44px] font-semibold leading-[1.05]">{cur.label}</h1>
//             <p className={`mt-2 text-sm ${mute}`}>{cur.sub}</p>
//           </div>
//           <div className="flex items-center gap-3 st">
//             <span className="flex items-center gap-2 text-xs font-semibold bg-white/80 border border-[#F7C6DD] rounded-full px-3.5 py-2">
//               <span className="relative w-2 h-2"><span className="absolute inset-0 rounded-full bg-[#E84D96]" style={{ animation: "ping2 1.8s ease-out infinite" }} /><span className="absolute inset-0 rounded-full bg-[#E84D96]" /></span>
//               Backend live
//             </span>
//             <span className="text-xs bg-white/80 border border-[#F7C6DD] rounded-full px-3.5 py-2"><b>{roleInfo.label}</b> · {roleInfo.badge}</span>
//           </div>
//         </header>

//         <main key={tab} className="px-6 lg:px-10 py-8 pb-32 max-w-[1440px]">
//           {/* ===== DASHBOARD ===== */}
//           {tab === "dashboard" && (
//             <div className="space-y-8">
//               <section className="grid lg:grid-cols-12 gap-6 items-stretch">
//                 <div className="st lg:col-span-8 relative overflow-hidden rounded-[36px] bg-white/80 backdrop-blur-xl border border-[#F7C6DD] p-8 lg:p-12">
//                   <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full border border-dashed border-[#E84D96]/40" style={{ animation: "spin 40s linear infinite" }} />
//                   <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full border border-[#F7C6DD]" style={{ animation: "spin 28s linear infinite reverse" }} />
//                   <Pill>Smart India Hackathon 2026 · Grand Finale</Pill>
//                   <h2 className="disp text-5xl lg:text-6xl font-semibold leading-[1.02] mt-6 max-w-xl">Every document, read twice.</h2>
//                   <p className={`mt-5 max-w-lg leading-relaxed ${mute}`}>OCR extraction, Error Level Analysis tamper detection, rule-backed compliance checks and faculty audits, working on one queue.</p>
//                   <div className="flex flex-wrap gap-3 mt-8">
//                     <button onClick={() => go("intelligence")} className={`${primary} flex items-center gap-2`}><FileSearch className="w-4 h-4" />Open document workspace</button>
//                     <button onClick={() => go("simulator")} className={ghost}>Launch simulator</button>
//                   </div>
//                 </div>
//                 <div className="st lg:col-span-4 relative rounded-[36px] bg-gradient-to-br from-white to-[#FDE7F1] border border-[#F7C6DD] p-8 flex flex-col items-center justify-center gap-5 overflow-hidden">
//                   <div className="absolute w-48 h-48 rounded-full bg-[#E84D96]/25" style={{ animation: "ping2 3.5s ease-out infinite" }} />
//                   <div className="relative"><Ring pct={avg} size={168} label="avg. compliance" /></div>
//                   <span className="relative text-xs bg-white border border-[#F7C6DD] rounded-full px-3 py-1.5 font-semibold" style={{ animation: "float 5s ease-in-out infinite" }}>ELA scan active</span>
//                   <span className="relative text-xs bg-[#512D43] text-white rounded-full px-3 py-1.5 font-semibold -mt-2 ml-16" style={{ animation: "float 6s ease-in-out infinite -2s" }}>ChromaDB synced</span>
//                 </div>
//               </section>

//               <section className={`st ${card} grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#F7C6DD]/60`}>
//                 {[
//                   ["Applications in queue", state.metrics.total_applications],
//                   ["Documents verified", state.metrics.verified_documents],
//                   ["Unresolved discrepancies", state.metrics.unresolved_discrepancies],
//                   ["Compliance issues", state.metrics.compliance_issues],
//                 ].map(([l, v]: any) => (
//                   <div key={l} className="p-6 group">
//                     <p className="disp text-5xl font-semibold group-hover:text-[#E84D96] transition-colors duration-500"><Num to={v} /></p>
//                     <p className={`text-xs mt-2 ${mute}`}>{l}</p>
//                   </div>
//                 ))}
//               </section>

//               <section className="grid lg:grid-cols-12 gap-6 items-start">
//                 <div className="lg:col-span-7 space-y-6">
//                   <div className={`st ${card} p-7`}>
//                     <Head tag={<Pill>ChromaDB vector synced</Pill>}>Automated findings</Head>
//                     <div className="relative pl-6">
//                       <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#E84D96] to-[#F7C6DD]" />
//                       {findings.map((f) => (
//                         <div key={f.id} className="st relative pb-5 last:pb-0">
//                           <span className={`absolute -left-6 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-white ${f.severity === "PASS" ? "bg-emerald-500" : "bg-[#E84D96]"}`} />
//                           <div className="lift rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD]/70 p-4">
//                             <div className="flex flex-wrap items-center gap-2"><b className="font-mono text-xs text-[#C2337A]">{f.rule_id}</b><Pill tone={f.severity === "PASS" ? "ok" : "pink"}>{f.severity}</Pill><span className={`ml-auto text-[11px] ${mute}`}>{f.status}</span></div>
//                             <p className="text-sm font-medium mt-2">{f.message}</p>
//                             <p className={`text-xs mt-1 ${mute}`}>Evidence: <b className="text-[#512D43]">{f.evidence_reference}</b></p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className={`st ${card} p-7`}>
//                     <Head tag={<button onClick={() => go("audit")} className="text-xs font-semibold text-[#C2337A] flex items-center gap-1 hover:gap-2 transition-all">All activity <ArrowUpRight className="w-3.5 h-3.5" /></button>}>Recent activity</Head>
//                     <div className="space-y-2">
//                       {logs.slice(0, 4).map(l => (
//                         <div key={l.id} className="flex items-center gap-3 text-sm rounded-xl px-3 py-2 hover:bg-[#FFF7FA] transition-colors"><span className="w-2 h-2 rounded-full bg-[#E84D96] shrink-0" /><span className="font-semibold">{l.action}</span><span className={`truncate ${mute}`}>{l.details}</span><span className={`ml-auto text-[11px] whitespace-nowrap ${mute}`}>{l.timestamp}</span></div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="lg:col-span-5 space-y-6">
//                   <div className={`st ${card} p-7`}>
//                     <Head>Priority applications</Head>
//                     <div className="space-y-3">
//                       {priority.map(a => (
//                         <button key={a.id} onClick={() => go("applications")} className="lift w-full text-left rounded-2xl bg-white border border-[#F7C6DD] p-4 flex items-center gap-4">
//                           <div className="flex-1 min-w-0"><p className="font-semibold truncate">{a.institution_name}</p><p className={`text-xs mt-0.5 ${mute}`}>Tamper risk {((a.tamper_risk_score || 0) * 100).toFixed(0)}% · {a.status}</p></div>
//                           <ChevronRight className="w-4 h-4 text-[#E84D96]" />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className={`st ${card} p-7`}>
//                     <Head>Compliance by application</Head>
//                     <div className="flex items-end gap-3 h-36">
//                       {apps.slice(0, 8).map((a) => (
//                         <div key={a.id} className="flex-1 h-full flex flex-col justify-end items-center gap-1 group" title={`${a.institution_name}: ${a.compliance_score}%`}>
//                           <span className="text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{a.compliance_score}%</span>
//                           <div className="w-full rounded-t-xl bg-gradient-to-t from-[#E84D96] to-[#F7C6DD] group-hover:brightness-110" style={{ height: `${Math.max(6, Number(a.compliance_score) || 0)}%`, transformOrigin: "bottom" }} />
//                         </div>
//                       ))}
//                     </div>
//                     <p className={`text-xs mt-3 ${mute}`}>{open.length} open finding{open.length === 1 ? "" : "s"} across {apps.length} application{apps.length === 1 ? "" : "s"}.</p>
//                   </div>
//                   <div className={`st ${card} p-7`}>
//                     <Head>Start a new application</Head>
//                     <form onSubmit={handleCreateApp} className="space-y-3">
//                       <input value={instName} onChange={e => setInstName(e.target.value)} placeholder="Institution name, e.g. Apex Institute of Technology" aria-label="Institution name" className={field} />
//                       <div className="grid grid-cols-2 gap-3">
//                         <select value={region} onChange={e => setRegion(e.target.value)} aria-label="AICTE region" className={field}>{["South-Central", "North", "West", "South"].map(r => <option key={r}>{r}</option>)}</select>
//                         <select value={appType} onChange={e => setAppType(e.target.value)} aria-label="Approval type" className={field}>
//                           <option value="Increase in Intake / New Course">Increase in intake</option>
//                           <option value="Extension of Approval (EoA)">Extension of approval</option>
//                           <option value="New Institution Establishment">New institution</option>
//                         </select>
//                       </div>
//                       <button type="submit" className={`${primary} w-full flex items-center justify-center gap-2`}><PlusCircle className="w-4 h-4" />Create application and run AI checks</button>
//                     </form>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           )}

//           {/* ===== APPLICATIONS ===== */}
//           {tab === "applications" && (
//             <div className="space-y-4">
//               {apps.map((a) => (
//                 <div key={a.id} className={`st lift ${card} p-6 flex flex-wrap items-center gap-6`}>
//                   <Ring pct={Number(a.compliance_score) || 0} size={92} />
//                   <div className="flex-1 min-w-[240px]">
//                     <div className="flex flex-wrap items-center gap-2"><b className="font-mono text-sm text-[#C2337A]">{a.id}</b><Pill>{a.status}</Pill><span className={`text-xs ${mute}`}>{a.region}</span></div>
//                     <p className="disp text-2xl font-semibold mt-1">{a.institution_name}</p>
//                     <p className={`text-sm mt-1 ${mute}`}>{a.app_type} · Officer: <b className="text-[#512D43]">{a.assigned_officer}</b></p>
//                   </div>
//                   <div className="w-44">
//                     <p className={`text-xs mb-1.5 ${mute}`}>Tamper risk {((a.tamper_risk_score || 0) * 100).toFixed(0)}%</p>
//                     <div className="h-2 rounded-full bg-[#F7C6DD]/40 overflow-hidden"><div className="h-full rounded-full bg-[#E84D96] origin-left" style={{ width: `${(a.tamper_risk_score || 0) * 100}%` }} /></div>
//                   </div>
//                   <button aria-label="Review documents" onClick={() => { setSelectedDocId(docs[0]?.id); go("intelligence"); }} className="w-12 h-12 rounded-full bg-[#FFF7FA] border border-[#F7C6DD] text-[#E84D96] flex items-center justify-center hover:bg-[#E84D96] hover:text-white hover:-rotate-45 transition-all duration-500"><ChevronRight className="w-5 h-5" /></button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ===== DOCUMENT INTELLIGENCE ===== */}
//           {tab === "intelligence" && (
//             <div className="space-y-6">
//               <div className="flex justify-end st">
//                 <label className={`${primary} cursor-pointer flex items-center gap-2 focus-within:ring-2 ring-[#E84D96]`}><FileText className="w-4 h-4" />Upload disclosure PDF<input type="file" onChange={uploadDoc} className="sr-only" /></label>
//               </div>
//               <div className="grid lg:grid-cols-12 gap-6 items-start">
//                 <div className={`st lg:col-span-3 ${card} p-5`}>
//                   <p className="text-sm font-bold mb-3">Uploaded disclosures</p>
//                   <div className="space-y-2">
//                     {docs.map(x => (
//                       <button key={x.id} onClick={() => pickDoc(x.id)} className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${activeDoc?.id === x.id ? "bg-[#FFF7FA] border-[#E84D96] translate-x-1 shadow-[0_8px_24px_-12px_rgba(232,77,150,.6)]" : "bg-white border-[#F7C6DD]/70 hover:border-[#E84D96]"}`}>
//                         <FileSearch className={`w-4 h-4 shrink-0 ${activeDoc?.id === x.id ? "text-[#E84D96]" : mute}`} />
//                         <div className="min-w-0"><p className="truncate text-sm font-semibold">{x.filename}</p><p className={`text-[11px] ${mute}`}>OCR confidence {(x.ocr_confidence * 100).toFixed(0)}%</p></div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className={`st lg:col-span-5 ${card} p-6`}>
//                   <div className="flex items-center gap-2 mb-4"><Pill tone="plum">{isAnalyzingDoc ? "Scanning" : "Live preview"}</Pill><span className={`text-xs truncate ${mute}`}>{activeDoc?.filename} · {activeDoc?.file_type}</span></div>
//                   <div className="relative rounded-2xl bg-white border border-[#F7C6DD] overflow-hidden p-7 min-h-[430px] shadow-inner">
//                     {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map(c => <span key={c} className={`absolute w-5 h-5 border-[#E84D96] ${c}`} />)}
//                     <div className="beam" />
//                     <div className="space-y-3.5">
//                       {WIDTHS.map((w, i) => {
//                         const ev = [2, 5, 8, 11].indexOf(i);
//                         if (ev < 0) return <div key={i} className={`h-2.5 rounded-full ${isAnalyzingDoc ? "sk" : "bg-[#F7C6DD]/50"}`} style={{ width: `${w}%` }} />;
//                         const fl = fields[ev], on = hot === fl.k;
//                         return (
//                           <div key={i} onMouseEnter={() => setHot(fl.k)} onMouseLeave={() => setHot(null)} className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs border transition-all duration-500 ${isAnalyzingDoc ? "opacity-0 -translate-x-3" : "opacity-100"} ${on ? "bg-[#E84D96] text-white border-[#E84D96] scale-[1.03] shadow-lg" : "bg-[#FDE7F1] border-[#F7C6DD]"}`}>
//                             <span className="font-semibold">{fl.l}</span><b className="font-mono">{fl.v ?? fl.f}{fl.u}</b>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                   <div className="mt-4 rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-4 text-sm">
//                     <p className="font-bold text-[#C2337A]">Tamper analysis (ELA)</p>
//                     <p className="mt-1">{activeDoc?.tamper_analysis?.details || "No pixel inconsistencies detected."}</p>
//                   </div>
//                 </div>

//                 <div className={`st lg:col-span-4 ${card} p-6 space-y-5`}>
//                   <div className="flex items-center justify-between"><p className="font-bold">Extracted fields</p><Pill tone="ok">Verified</Pill></div>
//                   <div className="space-y-3">
//                     {fields.map((fl) => (
//                       <div key={fl.k} onMouseEnter={() => setHot(fl.k)} onMouseLeave={() => setHot(null)} className={`rounded-2xl border p-4 transition-all duration-300 ${hot === fl.k ? "border-[#E84D96] bg-[#FDE7F1] -translate-x-1" : "border-[#F7C6DD]/70 bg-[#FFF7FA]"}`}>
//                         {isAnalyzingDoc ? <div className="sk h-10 rounded-lg" /> : (
//                           <div className="st">
//                             <div className="flex justify-between items-baseline"><span className={`text-xs ${mute}`}>{fl.l}</span><b className="disp text-2xl">{fl.v ?? fl.f}{fl.u}</b></div>
//                             <div className="h-1 mt-3 rounded-full bg-[#F7C6DD]/50 overflow-hidden"><div className="h-full bg-[#E84D96] rounded-full origin-left" style={{ width: `${(activeDoc?.ocr_confidence || 0.9) * 100}%` }} /></div>
//                             {fl.v === undefined && <p className={`text-[11px] mt-1.5 ${mute}`}>Demo default · not found in this document</p>}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {open.length > 0 && (
//                     <div>
//                       <p className="text-sm font-bold mb-2">Open discrepancies</p>
//                       {open.slice(0, 2).map(f => <p key={f.id} className="text-xs rounded-xl bg-[#FDE7F1] p-3 mb-2"><b className="text-[#C2337A]">{f.rule_id}</b> · {f.message}</p>)}
//                     </div>
//                   )}
//                   <button onClick={() => { analyse(); notify("AI Compliance check re-verified against AICTE Chapter IV rules."); }} className={`${btn} w-full py-3 bg-[#512D43] text-white hover:bg-[#3d2132]`}>Run full compliance re-check</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ===== SIMULATOR ===== */}
//           {tab === "simulator" && (
//             <div className="grid lg:grid-cols-12 gap-6 items-stretch">
//               <div className={`st lg:col-span-5 ${card} p-8 space-y-7`}>
//                 <p className={`text-sm ${mute}`}>Test hypothetical numbers against AICTE rules without touching official records.</p>
//                 {[
//                   ["Faculty count", simFaculty, setSimFaculty, 20, 200, 1],
//                   ["Student enrollment", simStudents, setSimStudents, 300, 3000, 50],
//                   ["Built-up area (sq ft)", simArea, setSimArea, 5000, 40000, 500],
//                 ].map(([l, v, set, mn, mx, stp]: any) => (
//                   <div key={l}>
//                     <div className="flex justify-between items-baseline text-sm mb-2"><label htmlFor={l}>{l}</label><b className="disp text-2xl text-[#E84D96] tabular-nums">{v}</b></div>
//                     <input id={l} type="range" min={mn} max={mx} step={stp} value={v} onChange={e => set(Number(e.target.value))} className="w-full" />
//                   </div>
//                 ))}
//                 <p className={`text-xs rounded-xl bg-[#FFF7FA] border border-[#F7C6DD] p-3 ${mute}`}>Live ratio preview: <b className="text-[#512D43]">{(simStudents / simFaculty).toFixed(1)} : 1</b> students per faculty</p>
//                 <button onClick={runSimulator} className={`${primary} w-full`}>Run compliance simulation</button>
//               </div>
//               <div className={`st lg:col-span-7 ${card} p-8 flex items-center justify-center text-center`}>
//                 {simResult ? (
//                   <div key={JSON.stringify(simResult)} className="st w-full space-y-6 flex flex-col items-center">
//                     <Ring pct={Number(simResult.projected_compliance_score) || 0} size={200} label="projected score" />
//                     <div className="grid grid-cols-2 gap-4 w-full text-left">
//                       <div className="rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-5 space-y-1"><p className={`text-xs ${mute}`}>Student–faculty ratio</p><p className="disp text-2xl font-semibold">{simResult.simulated_ratio}:1</p><Pill>{simResult.ratio_status}</Pill></div>
//                       <div className="rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-5 space-y-1"><p className={`text-xs ${mute}`}>Infrastructure area</p><p className="disp text-2xl font-semibold">{simResult.area_status}</p></div>
//                     </div>
//                     <p className="font-medium max-w-md">Recommendation: {simResult.recommendation}</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-3"><Sliders className="w-10 h-10 text-[#E84D96] mx-auto" style={{ animation: "float 4s ease-in-out infinite" }} /><p className={`max-w-xs ${mute}`}>Move the sliders, then run the simulation to see the projected score.</p></div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* ===== GHOST & REPORTS ===== */}
//           {tab === "ghost" && (
//             <div className="grid lg:grid-cols-2 gap-6 items-start">
//               <div className={`st ${card} p-8 space-y-5`}>
//                 <h3 className="disp text-2xl font-semibold">EPFO and biometric ghost-faculty check</h3>
//                 <p className={`text-sm ${mute}`}>Match faculty PAN records against national provident fund registries to catch dual employment or staff who don't exist.</p>
//                 <div className="relative flex items-center justify-center h-44 overflow-hidden">
//                   {[0, 1, 2].map(i => <span key={i} className="absolute rounded-full border border-[#E84D96]/50" style={{ width: 60 + i * 50, height: 60 + i * 50, animation: isScanningGhost ? `ping2 2s ${i * 0.4}s ease-out infinite` : undefined }} />)}
//                   <span className="absolute w-36 h-36 rounded-full" style={{ background: "conic-gradient(from 0deg,transparent 70%,rgba(232,77,150,.45))", animation: `spin ${isScanningGhost ? 1.4 : 9}s linear infinite` }} />
//                   <ShieldAlert className="relative w-8 h-8 text-[#E84D96]" />
//                 </div>
//                 <button onClick={runGhost} disabled={isScanningGhost} className={`${primary} w-full flex items-center justify-center gap-2`}>{isScanningGhost ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}Run national EPFO cross-check</button>
//                 {ghostData && (
//                   <div className="space-y-3">
//                     {ghostData.map((f, i) => (
//                       <div key={i} className="st lift rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-4 flex justify-between items-center gap-3">
//                         <div><p className="font-semibold">{f.name} <span className={`font-mono text-xs ${mute}`}>({f.pan})</span></p><p className="text-xs text-[#C2337A] font-semibold mt-0.5">{f.conflict || "Verified active"}</p></div>
//                         <Pill tone={f.status === "DUPLICATE" ? "pink" : "ok"}>{f.status}</Pill>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className={`st ${card} p-8 space-y-5`}>
//                 <h3 className="disp text-2xl font-semibold">One-click scrutiny report</h3>
//                 <p className={`text-sm ${mute}`}>Build the official report: compliance scores, tamper risk and bureau sign-off recommendations.</p>
//                 <button onClick={getReport} className={`${btn} w-full py-3.5 bg-[#512D43] text-white hover:bg-[#3d2132] hover:-translate-y-0.5`}>Generate official scrutiny report</button>
//               </div>
//             </div>
//           )}

//           {/* ===== AUDIT ===== */}
//           {tab === "audit" && (
//             <div className={`st ${card} p-8`}>
//               <div className="relative pl-8">
//                 <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#E84D96] via-[#F7C6DD] to-transparent" />
//                 {logs.map((l, i) => (
//                   <div key={l.id} className="st relative pb-5 last:pb-0">
//                     <span className="absolute -left-8 top-4 w-5 h-5 rounded-full bg-white border-2 border-[#E84D96] flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-[#E84D96]" style={{ animation: i === 0 ? "ping2 1.8s ease-out infinite" : undefined }} /></span>
//                     <div className="lift rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD]/70 p-4 flex flex-wrap justify-between gap-3">
//                       <div>
//                         <div className="flex items-center gap-2"><b className="font-mono text-xs text-[#C2337A]">{l.app_id}</b><Pill>{l.action}</Pill></div>
//                         <p className="text-sm mt-1.5">{l.details}</p>
//                         <p className={`text-xs mt-1 ${mute}`}>{l.actor_name} · {l.actor_role}</p>
//                       </div>
//                       <span className={`text-xs whitespace-nowrap ${mute}`}>{l.timestamp}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* ===== Report modal ===== */}
//       {report && (
//         <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#512D43]/30 backdrop-blur-sm" onClick={() => setReport(null)} role="dialog" aria-modal="true" aria-label="Scrutiny report">
//           <div onClick={e => e.stopPropagation()} className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-[28px] bg-white border border-[#F7C6DD] shadow-2xl p-6" style={{ animation: "pop .5s cubic-bezier(.34,1.56,.64,1)" }}>
//             <div className="flex items-center justify-between mb-4"><h3 className="disp text-2xl font-semibold">Scrutiny committee report</h3><button aria-label="Close" onClick={() => setReport(null)} className="p-2 rounded-full hover:bg-[#FFF7FA]"><X className="w-4 h-4" /></button></div>
//             <pre className="flex-1 overflow-auto rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD] p-4 text-xs font-mono">{JSON.stringify(report, null, 2)}</pre>
//             <div className="flex gap-3 mt-4 justify-end"><button onClick={() => setReport(null)} className={ghost}>Close</button><button onClick={downloadReport} className={primary}>Download JSON</button></div>
//           </div>
//         </div>
//       )}

//       {/* ===== AI orb + assistant ===== */}
//       <div className="fixed bottom-6 right-6 z-50">
//         {!chatOpen ? (
//           <button onClick={() => setChatOpen(true)} aria-label="Open AI assistant" className="group relative w-[72px] h-[72px] rounded-full">
//             <span className="absolute inset-0 rounded-full bg-[#E84D96]/50" style={{ animation: "ping2 2.6s ease-out infinite" }} />
//             <span className="absolute -inset-1 rounded-full" style={{ background: "conic-gradient(#E84D96,#F7C6DD,#fff,#E84D96)", animation: "spin 4s linear infinite", filter: "blur(3px)" }} />
//             <span className="relative w-full h-full rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff,#F7C6DD_45%,#E84D96)] shadow-[0_14px_40px_-6px_rgba(232,77,150,.8)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500" style={{ animation: "float 4.5s ease-in-out infinite" }}><Bot className="w-7 h-7 text-white drop-shadow" /></span>
//           </button>
//         ) : (
//           <div className="w-[min(400px,calc(100vw-2rem))] h-[560px] max-h-[calc(100vh-3rem)] rounded-[28px] bg-white/95 backdrop-blur-2xl border border-[#F7C6DD] shadow-[0_30px_80px_-20px_rgba(232,77,150,.6)] flex flex-col overflow-hidden" style={{ animation: "pop .5s cubic-bezier(.34,1.56,.64,1)", transformOrigin: "bottom right" }}>
//             <div className="p-4 bg-gradient-to-r from-[#FFF7FA] to-[#FDE7F1] border-b border-[#F7C6DD] flex items-center justify-between">
//               <div className="flex items-center gap-3"><span className="w-9 h-9 rounded-full bg-[radial-gradient(circle_at_30%_25%,#fff,#E84D96)] flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></span><div><p className="font-bold text-sm">VerifyAI Intelligence Core</p><p className={`text-[11px] ${mute}`}>Answers come from your backend</p></div></div>
//               <button onClick={() => setChatOpen(false)} aria-label="Close assistant" className="p-2 rounded-full hover:bg-white"><X className="w-4 h-4" /></button>
//             </div>
//             <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm" aria-live="polite">
//               {messages.map((m, i) => (
//                 <div key={i} className={`max-w-[88%] p-3 rounded-2xl leading-relaxed ${m.sender === "user" ? "ml-auto bg-[#E84D96] text-white rounded-br-md" : "bg-[#FFF7FA] border border-[#F7C6DD]/70 rounded-bl-md"}`} style={{ animation: "pop .4s cubic-bezier(.34,1.56,.64,1)", transformOrigin: m.sender === "user" ? "bottom right" : "bottom left" }}>{m.text}</div>
//               ))}
//               {typing && <div className="flex gap-1.5 p-3 w-16 rounded-2xl bg-[#FFF7FA] border border-[#F7C6DD]/70">{[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-[#E84D96]" style={{ animation: `dot 1.2s ${i * 0.15}s infinite` }} />)}</div>}
//               {messages.length < 3 && (
//                 <div className="flex flex-wrap gap-2 pt-2">
//                   {CHIPS.map(c => <button key={c} onClick={() => ask(c)} className="text-xs px-3 py-2 rounded-full border border-[#F7C6DD] bg-white hover:bg-[#E84D96] hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-left">{c}</button>)}
//                 </div>
//               )}
//               <div ref={chatEnd} />
//             </div>
//             <form onSubmit={sendChat} className="p-3 border-t border-[#F7C6DD] flex gap-2">
//               <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask about AICTE rules, ratios, ELA..." aria-label="Message" className={field} />
//               <button type="submit" aria-label="Send" className="w-12 shrink-0 rounded-2xl bg-[#E84D96] text-white flex items-center justify-center hover:rotate-12 hover:scale-105 transition-all duration-300"><Send className="w-4 h-4" /></button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


//5th



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
