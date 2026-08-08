export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0f1f33] px-8 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
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
                <h2 className="text-xl font-bold">
                  Clause Sense
                </h2>

                <p className="text-xs tracking-wide text-slate-400">
                  CONTRACT INTELLIGENCE
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              AI-powered contract intelligence that helps legal teams
              understand risks, identify important clauses, and make
              confident decisions faster.
            </p>

          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold">
              Product
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a
                href="#features"
                className="block transition hover:text-white"
              >
                Features
              </a>

              <a
                href="#capabilities"
                className="block transition hover:text-white"
              >
                Capabilities
              </a>

              <a
                href="#upload"
                className="block transition hover:text-white"
              >
                Contract Analysis
              </a>

              <a
                href="#pricing"
                className="block transition hover:text-white"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold">
              Company
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a
                href="#"
                className="block transition hover:text-white"
              >
                About
              </a>

              <a
                href="#"
                className="block transition hover:text-white"
              >
                Contact
              </a>

              <a
                href="#"
                className="block transition hover:text-white"
              >
                Enterprise
              </a>

              <a
                href="#"
                className="block transition hover:text-white"
              >
                Security
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 Clause Sense. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms of Service
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}