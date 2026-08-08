export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Your Contract",
      description:
        "Upload your PDF or DOCX contract securely. Your document is encrypted and ready for analysis.",
    },
    {
      number: "02",
      title: "AI Analyzes in Seconds",
      description:
        "Clause Sense uses advanced AI to identify important clauses, risks, obligations, and potential issues.",
    },
    {
      number: "03",
      title: "Review Smart Insights",
      description:
        "Get a clear summary of your contract with explanations, risk levels, and actionable insights.",
    },
  ];

  return (
    <section className="bg-slate-50 px-8 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#23456f]">
            Simple & Intelligent
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            How It Works
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            From upload to actionable insights in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >

              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="text-5xl font-bold text-slate-200">
                  {step.number}
                </span>

                {index < steps.length - 1 && (
                  <span className="hidden text-2xl text-slate-300 md:block">
                    →
                  </span>
                )}
              </div>

              {/* Content */}
              <h3 className="mt-8 text-xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                {step.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}