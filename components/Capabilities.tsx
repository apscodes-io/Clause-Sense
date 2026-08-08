export default function Capabilities() {
  const capabilities = [
    {
      number: "01",
      title: "AI Contract Analysis",
      description:
        "Automatically analyze lengthy contracts and understand their structure, terms, obligations, and important clauses in seconds.",
      icon: "✦",
    },
    {
      number: "02",
      title: "Risk Detection",
      description:
        "Identify high-risk clauses, unusual terms, liability concerns, termination risks, and other potential contractual issues.",
      icon: "⚠",
    },
    {
      number: "03",
      title: "Clause Intelligence",
      description:
        "Understand individual clauses with clear explanations, context, risk levels, and actionable recommendations.",
      icon: "⌘",
    },
    {
      number: "04",
      title: "Smart Document Chat",
      description:
        "Ask questions about your uploaded contract and receive intelligent answers based directly on the document.",
      icon: "◌",
    },
  ];

  return (
    <section
      id="capabilities"
      className="bg-white px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#23456f]">
            Platform Capabilities
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Everything You Need to Understand Your Contracts
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            Clause Sense combines advanced AI with contract intelligence to
            help your team review documents faster and make confident
            decisions.
          </p>
        </div>

        {/* Capability cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">

          {capabilities.map((capability) => (
            <div
              key={capability.number}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-[#23456f]">
                  {capability.icon}
                </div>

                {/* Number */}
                <span className="text-sm font-bold text-slate-300">
                  {capability.number}
                </span>

              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                {capability.title}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                {capability.description}
              </p>

              <div className="mt-7 text-lg font-semibold text-[#23456f] transition group-hover:translate-x-1">
                Explore capability →
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}