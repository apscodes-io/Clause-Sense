export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#23456f] shadow-md">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L19 6V11C19 15.5 16.2 19.3 12 21C7.8 19.3 5 15.5 5 11V6L12 3Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-xl font-bold leading-tight text-slate-900">
              Clause Sense
            </h1>

            <p className="text-xs font-medium tracking-wide text-slate-400">
              CONTRACT INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="text-[17px] font-medium text-slate-500 transition hover:text-slate-900"
          >
            Features
          </a>

          <a
            href="#capabilities"
            className="text-[17px] font-medium text-slate-500 transition hover:text-slate-900"
          >
            Capabilities
          </a>

          <a
            href="#pricing"
            className="text-[17px] font-medium text-slate-500 transition hover:text-slate-900"
          >
            Pricing
          </a>

          <a
            href="#enterprise"
            className="text-[17px] font-medium text-slate-500 transition hover:text-slate-900"
          >
            Enterprise
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-8">
          <button className="text-[17px] font-medium text-slate-600 transition hover:text-slate-900">
            Sign In
          </button>

          <button className="rounded-2xl bg-[#203f68] px-7 py-3.5 text-[17px] font-semibold text-white shadow-lg transition hover:bg-[#183454]">
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}