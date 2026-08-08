export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-2">

        {/* Left side */}
        <div>

          {/* Badge */}
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Enterprise AI Platform · Trusted by 500+ Legal Teams
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-6xl font-bold leading-[1.05] tracking-tight text-slate-950">
            Clause
            <br />
            <span className="text-[#23456f]">Sense</span>
          </h1>

          {/* Subtitle */}
          <h2 className="mt-6 max-w-xl text-2xl font-semibold leading-relaxed text-[#23456f]">
            AI-Powered Contract Risk
            <br />
            & Compliance Assistant
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-xl text-lg leading-9 text-slate-500">
            Review contracts with confidence using the power of Artificial
            Intelligence. Clause Sense helps legal teams, enterprises, and
            compliance professionals analyze lengthy contracts within
            seconds — generating concise summaries, identifying contractual
            risks, highlighting critical clauses, and enabling intelligent
            conversations with uploaded documents.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-5">

            <button className="flex items-center gap-4 rounded-2xl bg-[#203f68] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#183454]">
              Start Analyzing Contracts
              <span className="text-2xl">→</span>
            </button>

            <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-lg font-medium text-slate-600 shadow-sm transition hover:bg-slate-50">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm">
                ▶
              </span>
              Watch Demo
            </button>

          </div>

        </div>

        {/* Right side */}
        <div className="relative flex min-h-[550px] items-center justify-center">

          {/* Background */}
          <div className="absolute inset-4 rounded-[32px] bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>

          {/* Contract card */}
          <div className="relative z-10 w-[82%] rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">

            {/* Contract header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#23456f] text-xs font-bold text-white">
                CS
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  SERVICE AGREEMENT
                </p>
                <p className="text-xs text-slate-400">
                  CSA-2024-0847 · 42 pages
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-7 border-b border-slate-100 py-4 text-xs">
              <span className="border-b-2 border-[#23456f] pb-3 font-semibold text-[#23456f]">
                Overview
              </span>
              <span className="text-slate-400">Risks</span>
              <span className="text-slate-400">Clauses</span>
              <span className="text-slate-400">Chat</span>
            </div>

            {/* Fake document lines */}
            <div className="space-y-3 py-6">
              <div className="h-3 w-24 rounded-full bg-slate-200"></div>
              <div className="h-3 w-full rounded-full bg-slate-200"></div>
              <div className="h-3 w-11/12 rounded-full bg-slate-200"></div>
              <div className="h-3 w-8/12 rounded-full bg-slate-200"></div>
            </div>

            {/* Risk */}
            <div className="rounded-2xl border-l-4 border-orange-400 bg-orange-50 p-5">
              <p className="text-xs font-bold text-orange-700">
                ⚠ RISK DETECTED · Section 4.2
              </p>

              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-orange-200"></div>
                <div className="h-2 w-10/12 rounded-full bg-orange-200"></div>
                <div className="h-2 w-7/12 rounded-full bg-orange-200"></div>
              </div>
            </div>

            {/* High risk */}
            <div className="mt-5 rounded-2xl border-l-4 border-red-400 bg-red-50 p-5">
              <p className="text-xs font-bold text-red-600">
                ● HIGH RISK · Section 7.1
              </p>

              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-red-200"></div>
                <div className="h-2 w-9/12 rounded-full bg-red-200"></div>
              </div>
            </div>

            {/* Favorable */}
            <div className="mt-5 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-5">
              <p className="text-xs font-bold text-emerald-700">
                ✓ FAVORABLE · Section 9.3
              </p>

              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-emerald-200"></div>
                <div className="h-2 w-8/12 rounded-full bg-emerald-200"></div>
              </div>
            </div>

          </div>

          {/* Risk analysis card */}
          <div className="absolute right-0 top-24 z-20 w-48 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl">

            <p className="text-sm font-semibold text-slate-800">
              ⚡ AI Risk Analysis
            </p>

            <div className="my-5 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-[8px] border-orange-400">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">67</p>
                  <p className="text-[10px] text-slate-400">/100</p>
                </div>
              </div>
            </div>

            <div className="rounded-full bg-orange-100 px-3 py-1 text-center text-[10px] font-bold text-orange-600">
              MEDIUM RISK
            </div>

            <p className="mt-5 text-[10px] font-semibold text-slate-400">
              KEY FINDINGS
            </p>

            <div className="mt-3 space-y-2 text-xs text-slate-500">
              <p>🔴 Unlimited Liability</p>
              <p>🔴 Vague Termination</p>
              <p>🟠 IP Assignment Risk</p>
              <p>🟢 Payment Terms OK</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}