"use client";

import { useState } from "react";
import ContractDashboard, { UploadResponse } from "./ContractDashboard";
import ContractComparison from "./ContractComparison";

export default function UploadPanel() {
  const [activeMode, setActiveMode] = useState<"single" | "compare">("single");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setErrorMsg(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setResult(null);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      let response: Response;
      try {
        response = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
        });
      } catch (netErr) {
        try {
          response = await fetch("http://localhost:8000/upload", {
            method: "POST",
            body: formData,
          });
        } catch {
          throw new Error(
            "Could not connect to Clause Sense backend server (http://127.0.0.1:8000). Please ensure the python server is running."
          );
        }
      }

      let data: any = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        data = { detail: `Server error HTTP ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(data.detail || data.error || `Failed to analyze contract (Status ${response.status}).`);
      }

      setResult(data);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred while communicating with the backend server.");
      }
    } finally {
      setLoading(false);
    }
  };

  // If contract has been analyzed in single mode, display full interactive dashboard!
  if (activeMode === "single" && result) {
    return (
      <ContractDashboard
        result={result}
        onReset={() => {
          setResult(null);
          setFile(null);
          setErrorMsg(null);
        }}
      />
    );
  }

  return (
    <div id="upload-panel" className="mx-auto max-w-5xl px-4 py-12">
      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveMode("single")}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition ${
              activeMode === "single"
                ? "bg-[#23456f] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📄 Single Contract Audit
          </button>
          <button
            onClick={() => setActiveMode("compare")}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition ${
              activeMode === "compare"
                ? "bg-[#23456f] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔄 Contract Comparison
          </button>
        </div>
      </div>

      {activeMode === "compare" ? (
        <ContractComparison />
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900">Upload & Analyze Contract</h2>
          <p className="mt-1 text-sm text-slate-500">
            Upload any legal agreement or contract (PDF) to run instant AI risk analysis, executive summaries, and interactive Q&A.
          </p>

        {/* Dropzone */}
        <div className="mt-6">
          <label className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition hover:border-[#23456f] hover:bg-slate-100/80">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#23456f] text-white">
                📄
              </div>
              <p className="text-base font-semibold text-slate-700">
                {file ? file.name : "Click to choose or drag & drop contract PDF"}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB selected` : "Supports PDF documents up to 25MB"}
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <span className="font-semibold">Analysis Failure: </span>
            {errorMsg}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#203f68] py-4 text-base font-semibold text-white transition hover:bg-[#183454] disabled:cursor-not-allowed disabled:bg-slate-300 shadow-md"
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Analyzing Contract with AI...
            </>
          ) : (
            "Analyze Contract"
          )}
        </button>
      </div>
      )}
    </div>
  );
}