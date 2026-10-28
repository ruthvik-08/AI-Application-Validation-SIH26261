"use client";

import clsx from "clsx";
import { CheckCircle2, XCircle, MinusCircle, TrendingUp } from "lucide-react";
import type { ComplianceResult, ComplianceNormResult } from "@/lib/api";

interface ComplianceReportProps {
  result: ComplianceResult;
}

const STATUS_CONFIG = {
  PASS: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-950/40 border-emerald-800/50",
    badge: "bg-emerald-900/60 text-emerald-300 border-emerald-700",
    label: "PASS",
  },
  FAIL: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-950/40 border-red-800/50",
    badge: "bg-red-900/60 text-red-300 border-red-700",
    label: "FAIL",
  },
  NOT_CHECKED: {
    icon: MinusCircle,
    color: "text-slate-500",
    bg: "bg-slate-900/40 border-slate-700/50",
    badge: "bg-slate-800/60 text-slate-400 border-slate-600",
    label: "N/A",
  },
} as const;

const OVERALL_CONFIG = {
  COMPLIANT: {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-950/30 border-emerald-700/50",
    text: "text-emerald-300",
    label: "COMPLIANT",
    description: "All checked metrics meet AICTE norms.",
  },
  NON_COMPLIANT: {
    gradient: "from-red-500 to-rose-500",
    bg: "bg-red-950/30 border-red-700/50",
    text: "text-red-300",
    label: "NON-COMPLIANT",
    description: "One or more critical metrics fail AICTE norms.",
  },
  PARTIAL: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-950/30 border-amber-700/50",
    text: "text-amber-300",
    label: "PARTIAL COMPLIANCE",
    description: "Some metrics pass; review failures before submission.",
  },
};

function NormCard({ norm }: { norm: ComplianceNormResult }) {
  const cfg = STATUS_CONFIG[norm.status];
  const Icon = cfg.icon;

  return (
    <div
      className={clsx(
        "flex items-start gap-4 rounded-xl border p-4 transition-all",
        cfg.bg
      )}
    >
      <Icon className={clsx("w-5 h-5 mt-0.5 shrink-0", cfg.color)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {norm.category}
          </span>
          <span
            className={clsx(
              "text-[10px] font-bold px-2 py-0.5 rounded-full border",
              cfg.badge
            )}
          >
            {cfg.label}
          </span>
        </div>
        <p className="text-sm text-slate-200 mt-1 leading-relaxed">{norm.rule}</p>
        <p className={clsx("text-xs mt-1.5 font-medium", cfg.color)}>{norm.message}</p>
        {norm.provided_value !== null && norm.provided_value !== undefined && (
          <p className="text-xs text-slate-500 mt-1">
            Extracted value:{" "}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
              {String(norm.provided_value)}
            </code>
          </p>
        )}
      </div>
    </div>
  );
}

export default function ComplianceReport({ result }: ComplianceReportProps) {
  const overall = OVERALL_CONFIG[result.overall_status];
  const scorePercent = result.compliance_score;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className={clsx("rounded-2xl border p-6", overall.bg)}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
              Overall Compliance Status
            </p>
            <h2 className={clsx("text-2xl font-bold", overall.text)}>{overall.label}</h2>
            <p className="text-sm text-slate-400 mt-1">{overall.description}</p>
          </div>

          {/* Score Ring */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none" stroke="#1e293b" strokeWidth="3.5"
                />
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="3.5"
                  strokeDasharray={`${scorePercent} ${100 - scorePercent}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={scorePercent > 70 ? "#10b981" : scorePercent > 40 ? "#f59e0b" : "#ef4444"} />
                    <stop offset="100%" stopColor={scorePercent > 70 ? "#0d9488" : scorePercent > 40 ? "#f97316" : "#e11d48"} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{scorePercent.toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">Compliance Score</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: "Passed", value: result.passed, color: "text-emerald-400" },
            { label: "Failed", value: result.failed, color: "text-red-400" },
            { label: "Not Checked", value: result.not_checked, color: "text-slate-500" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900/60 rounded-xl p-3 text-center border border-slate-700/50">
              <p className={clsx("text-2xl font-bold", s.color)}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Metrics */}
      {Object.keys(result.input_metrics).length > 0 && (
        <div className="glass card">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Extracted Metrics Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(result.input_metrics).map(([k, v]) => (
              <div key={k} className="bg-slate-800 rounded-lg px-3 py-1.5 text-xs border border-slate-700">
                <span className="text-slate-400">{k}: </span>
                <span className="text-slate-200 font-medium">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Norm Results */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
          Norm-by-Norm Results
        </h3>
        <div className="space-y-3">
          {result.results.map((norm) => (
            <NormCard key={norm.norm_id} norm={norm} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-slate-600 text-center">
        Report ID: {result.request_id} · Powered by AICTE Validator AI
      </p>
    </div>
  );
}
