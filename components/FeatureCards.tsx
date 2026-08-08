export default function FeatureCards() {
  const features = [
    {
      icon: "🔒",
      title: "Secure Uploads",
      description:
        "Your contracts are encrypted and securely processed with enterprise-grade protection.",
    },
    {
      icon: "✨",
      title: "AI Powered",
      description:
        "Advanced AI analyzes contracts quickly to identify risks, obligations, and important clauses.",
    },
    {
      icon: "💡",
      title: "Explainable AI",
      description:
        "Understand why a clause was flagged with clear explanations and actionable insights.",
    },
    {
      icon: "🏢",
      title: "Enterprise Ready",
      description:
        "Built for legal teams and organizations with scalable contract intelligence.",
    },
  ];

  return (
    <section id="features" className="bg-white px-8 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#23456f]">
            Why Clause Sense
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Built for Smarter Contract Review
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            Everything your team needs to understand contracts faster,
            identify risks confidently, and make better decisions.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {feature.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 text-lg font-semibold text-[#23456f]">
                →
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}