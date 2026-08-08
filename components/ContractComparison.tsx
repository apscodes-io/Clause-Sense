"use client";

import { useState } from "react";

export type ChangedClause = {
  clause: string;
  change_type: "Modified" | "Added" | "Removed" | string;
  original: string;
  revised: string;
  impact: "High" | "Medium" | "Low" | string;
  risk_direction: "Increased" | "Decreased" | "Neutral" | string;
  explanation: string;
  recommendation: string;
};

export type ComparisonData = {
  summary: string;
  total_changes: number;
  risk_summary: {
    high: number;
    medium: number;
    low: number;
  };
  changes: ChangedClause[];
};

export type ComparisonResponse = {
  original_filename: string;
  revised_filename: string;
  comparison: ComparisonData;
};

export default function ContractComparison() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [revisedFile, setRevisedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ComparisonResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<"ALL" | "HIGH" | "MEDIUM" | "LOW">("ALL");

  const handleOriginalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setOriginalFile(f);
      setErrorMsg(null);
    }
  };

  const handleRevisedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setRevisedFile(f);
      setErrorMsg(null);
    }
  };

  const handleCompare = async () => {
    if (!originalFile || !revisedFile) {
      setErrorMsg("Please upload both the Original Contract and the Revised Contract before comparing.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("original_contract", originalFile);
      formData.append("revised_contract", revisedFile);

      let response: Response;
      try {
        response = await fetch("http://127.0.0.1:8000/compare", {
          method: "POST",
          body: formData,
        });
      } catch {
        try {
          response = await fetch("http://localhost:8000/compare", {
            method: "POST",
            body: formData,
          });
        } catch {
          throw new Error(
            "Could not connect to Clause Sense backend server on http://127.0.0.1:8000. Please ensure the backend is running."
          );
        }
      }

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        data = { detail: `Server HTTP error ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(data.detail || data.error || `Comparison failed (Status ${response.status}).`);
      }

      setResult(data);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred while comparing contracts.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setOriginalFile(null);
    setRevisedFile(null);
    setResult(null);
    setErrorMsg(null);
    setRiskFilter("ALL");
  };

  // If comparison completed, show interactive comparison dashboard!
  if (result) {
    const comp = result.comparison;
    const filteredChanges = comp.changes.filter((ch) => {
      if (riskFilter === "ALL") return true;
      return ch.impact.toUpperCase() === riskFilter;
    });

    return (
      <div id="comparison-results" className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#23456f] text-white text-lg font-bold">
                  🔄
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900">Comparison Complete</h1>
                <span className="rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800">
                  Side-by-Side Audit
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-mono">
                {result.original_filename} <span className="text-slate-400">vs</span> {result.revised_filename}
              </p>
            </div>

            <button
              onClick={resetAll}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 shadow-sm"
            >
              <span>←</span> Compare Again
            </button>
          </div>

          {/* Overall Change Summary */}
          <div className="rounded-2xl bg-[#1e1e24] p-6 text-white shadow-xl border border-slate-700 font-sans">
            <h2 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-4">Overall Change Summary</h2>
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-700 text-center">
                <p className="text-2xl font-extrabold font-mono text-white">{comp.total_changes}</p>
                <p className="text-xs font-semibold text-slate-400 mt-1">Total Changes</p>
              </div>
              <div className="rounded-xl bg-rose-950/40 p-4 border border-rose-800/50 text-center">
                <p className="text-2xl font-extrabold font-mono text-rose-400">🔴 {comp.risk_summary?.high ?? 0}</p>
                <p className="text-xs font-semibold text-rose-200 mt-1">High Impact</p>
              </div>
              <div className="rounded-xl bg-amber-950/40 p-4 border border-amber-800/50 text-center">
                <p className="text-2xl font-extrabold font-mono text-amber-400">🟡 {comp.risk_summary?.medium ?? 0}</p>
                <p className="text-xs font-semibold text-amber-200 mt-1">Medium Impact</p>
              </div>
              <div className="rounded-xl bg-emerald-950/40 p-4 border border-emerald-800/50 text-center">
                <p className="text-2xl font-extrabold font-mono text-emerald-400">🟢 {comp.risk_summary?.low ?? 0}</p>
                <p className="text-xs font-semibold text-emerald-200 mt-1">Low Impact</p>
              </div>
            </div>
          </div>

          {/* AI Comparison Executive Summary */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>🤖</span> AI Comparison Summary
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {comp.summary}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Detailed Clause Modifications ({filteredChanges.length})
            </h3>

            <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
              {(["ALL", "HIGH", "MEDIUM", "LOW"] as const).map((flt) => (
                <button
                  key={flt}
                  onClick={() => setRiskFilter(flt)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                    riskFilter === flt
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {flt === "ALL" ? "All Changes" : `${flt} Risk`}
                </button>
              ))}
            </div>
          </div>

          {/* Changes Cards List */}
          {filteredChanges.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 font-medium">
              No significant contractual changes detected matching the selected filter.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredChanges.map((item, idx) => {
                const impact = item.impact.toUpperCase();
                const impactBadge =
                  impact === "HIGH"
                    ? "bg-rose-100 text-rose-800 border-rose-200"
                    : impact === "LOW"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                    : "bg-amber-100 text-amber-800 border-amber-200";

                const impactDot = impact === "HIGH" ? "🔴" : impact === "LOW" ? "🟢" : "🟡";

                const changeTypeColor =
                  item.change_type.toUpperCase() === "ADDED"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : item.change_type.toUpperCase() === "REMOVED"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : "bg-blue-50 text-blue-800 border-blue-200";

                const riskDirColor =
                  item.risk_direction.toUpperCase() === "INCREASED"
                    ? "text-rose-700 font-extrabold"
                    : item.risk_direction.toUpperCase() === "DECREASED"
                    ? "text-emerald-700 font-extrabold"
                    : "text-slate-600 font-semibold";

                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg space-y-4"
                  >
                    {/* Header line */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-400"># {idx + 1}</span>
                        <h4 className="text-lg font-bold text-slate-950">
                          CLAUSE: <span className="text-[#23456f]">{item.clause}</span>
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase ${changeTypeColor}`}>
                          CHANGE: {item.change_type}
                        </span>
                        <span className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase ${impactBadge}`}>
                          {impactDot} IMPACT: {item.impact}
                        </span>
                      </div>
                    </div>

                    {/* Side-by-side Wording Comparison */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          📄 ORIGINAL WORDING:
                        </p>
                        <p className="text-sm font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed italic">
                          "{item.original}"
                        </p>
                      </div>

                      <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2">
                          ✏️ REVISED WORDING:
                        </p>
                        <p className="text-sm font-mono text-blue-950 bg-white p-3 rounded-lg border border-blue-200 leading-relaxed italic">
                          "{item.revised}"
                        </p>
                      </div>
                    </div>

                    {/* Risk & Explanation */}
                    <div className="space-y-2 text-sm pt-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">RISK DIRECTION:</span>
                        <span className={riskDirColor}>{item.risk_direction}</span>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900">WHY IT MATTERS: </span>
                        <span className="text-slate-700">{item.explanation}</span>
                      </div>

                      {item.recommendation && (
                        <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-950">
                          <span className="font-bold text-emerald-900">RECOMMENDATION: </span>
                          <span>{item.recommendation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Upload Form State (Side by Side)
  return (
    <div id="contract-comparison" className="mx-auto max-w-5xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900">Contract Comparison</h2>
        <p className="mt-1 text-sm text-slate-500">
          Compare two contract versions and identify important changes, risks, and their potential impact.
        </p>

        {/* Side by Side Upload Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Left: Original Contract */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">Original Contract</h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded">Version 1</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Upload the earlier version of the contract
              </p>

              <label className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-4 transition hover:border-[#23456f] hover:bg-slate-50">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#23456f] text-white">
                    📄
                  </div>
                  <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                    {originalFile ? originalFile.name : "Select Original PDF"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {originalFile
                      ? `${(originalFile.size / (1024 * 1024)).toFixed(2)} MB`
                      : "PDF up to 25MB"}
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleOriginalChange}
                  className="hidden"
                />
              </label>
            </div>

            {originalFile && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 font-medium">
                ✓ Ready: {originalFile.name}
              </div>
            )}
          </div>

          {/* Right: Revised Contract */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">Revised Contract</h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Version 2</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Upload the newer version of the contract
              </p>

              <label className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-4 transition hover:border-[#23456f] hover:bg-slate-50">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#23456f] text-white">
                    ✏️
                  </div>
                  <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                    {revisedFile ? revisedFile.name : "Select Revised PDF"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {revisedFile
                      ? `${(revisedFile.size / (1024 * 1024)).toFixed(2)} MB`
                      : "PDF up to 25MB"}
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleRevisedChange}
                  className="hidden"
                />
              </label>
            </div>

            {revisedFile && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 font-medium">
                ✓ Ready: {revisedFile.name}
              </div>
            )}
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <span className="font-semibold">Comparison Notice: </span>
            {errorMsg}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleCompare}
          disabled={!originalFile || !revisedFile || loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#203f68] py-4 text-base font-semibold text-white transition hover:bg-[#183454] disabled:cursor-not-allowed disabled:bg-slate-300 shadow-md"
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Comparing Contracts with AI...
            </>
          ) : (
            "Compare Contracts"
          )}
        </button>
      </div>
    </div>
  );
}
