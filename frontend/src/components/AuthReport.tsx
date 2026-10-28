"use client";

import clsx from "clsx";
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, MapPin } from "lucide-react";
import type { AuthResult } from "@/lib/api";

interface AuthReportProps {
  result: AuthResult;
}

const RISK_CONFIG = {
  LOW: {
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-950/30 border-emerald-700/50",
    barColor: "bg-emerald-500",
    label: "LOW RISK",
  },
  MEDIUM: {
    icon: Shield,
    color: "text-amber-400",
    bg: "bg-amber-950/30 border-amber-700/50",
    barColor: "bg-amber-500",
    label: "MEDIUM RISK",
  },
  HIGH: {
    icon: ShieldAlert,
    color: "text-red-400",
    bg: "bg-red-950/30 border-red-700/50",
    barColor: "bg-red-500",
    label: "HIGH RISK",
  },
};

export default function AuthReport({ result }: AuthReportProps) {
  const cfg = RISK_CONFIG[result.risk_level];
  const Icon = cfg.icon;
  const scorePercent = result.tamper_confidence_score * 100;

  return (
    <div className="space-y-5">
      {/* Verdict Banner */}
      <div className={clsx("rounded-2xl border p-5", cfg.bg)}>
        <div className="flex items-center gap-3">
          <Icon className={clsx("w-8 h-8", cfg.color)} />
          <div>
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  "text-xs font-bold px-2 py-0.5 rounded-full border",
                  result.risk_level === "LOW"
                    ? "bg-emerald-900/60 text-emerald-300 border-emerald-700"
                    : result.risk_level === "MEDIUM"
                    ? "bg-amber-900/60 text-amber-300 border-amber-700"
                    : "bg-red-900/60 text-red-300 border-red-700"
                )}
              >
                {cfg.label}
              </span>
            </div>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">{result.verdict}</p>
          </div>
        </div>
      </div>

      {/* Tamper Score Bar */}
      <div className="glass card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-300">Tamper Confidence Score</p>
          <span className={clsx("text-lg font-bold", cfg.color)}>
            {(result.tamper_confidence_score * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={clsx("h-full rounded-full transition-all duration-700", cfg.barColor)}
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1.5">
          <span>0% (Clean)</span>
          <span>100% (Tampered)</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "ELA Mean Brightness", value: result.ela_mean_brightness.toFixed(2), unit: "/255" },
          {
            label: "Noise Inconsistency",
            value: (result.noise_inconsistency_score * 100).toFixed(1),
            unit: "%",
          },
          {
            label: "EXIF Data Present",
            value: result.metadata.has_exif ? "Yes" : "No",
            unit: "",
          },
          {
            label: "Suspect Regions",
            value: result.suspect_regions.length,
            unit: " found",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="glass card !p-4 flex flex-col gap-1"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wider">{m.label}</p>
            <p className="text-xl font-bold text-slate-100">
              {m.value}
              <span className="text-sm font-normal text-slate-400 ml-0.5">{m.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* EXIF Flags */}
      {result.metadata.exif_flags.length > 0 && (
        <div className="bg-amber-950/30 border border-amber-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <p className="text-sm font-semibold text-amber-300">EXIF Flags Detected</p>
          </div>
          <ul className="space-y-1">
            {result.metadata.exif_flags.map((flag, i) => (
              <li key={i} className="text-xs text-amber-200 pl-4 border-l border-amber-700">
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suspect Regions */}
      {result.suspect_regions.length > 0 && (
        <div className="glass card">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-red-400" />
            <p className="text-sm font-semibold text-slate-300">Top Suspect Regions</p>
          </div>
          <div className="space-y-2">
            {result.suspect_regions.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-slate-900 rounded-lg px-3 py-2 text-xs border border-slate-700"
              >
                <span className="text-slate-400">Region {i + 1}</span>
                <span className="text-slate-300">
                  ({r.x}, {r.y}) — {r.w}×{r.h}px
                </span>
                <span className="text-red-400 font-medium">{r.area} px²</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-600 text-center">
        Analysis ID: {result.request_id}
      </p>
    </div>
  );
}
