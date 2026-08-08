export default function Stats() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 px-8 py-8 sm:grid-cols-2">

        {/* Stat 1 */}
        <div>
          <p className="text-4xl font-bold tracking-tight text-slate-950">
            &lt; 60s
          </p>

          <p className="mt-2 text-sm font-medium text-slate-400">
            Avg. Review Time
          </p>
        </div>

        {/* Stat 2 */}
        <div className="mt-6 sm:mt-0">
          <p className="text-4xl font-bold tracking-tight text-slate-950">
            98%
          </p>

          <p className="mt-2 text-sm font-medium text-slate-400">
            Risk Detection Accuracy
          </p>
        </div>

      </div>
    </section>
  );
}