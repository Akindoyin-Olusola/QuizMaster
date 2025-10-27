export default function Navbar() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo + brand */}
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="size-10 rounded-xl bg-purplePrimary/10 flex items-center justify-center">
              {/* simple bolt mark */}
              <svg
                viewBox="0 0 24 24"
                className="size-5 text-purplePrimary"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-heading text-xl text-gray-900">QuizMaster</div>
              <div className="text-xs text-gray-500">Fun • Learn • Repeat</div>
            </div>
          </div>

          {/* Right: actions (optional) */}
          <div className="flex items-center gap-2">
            <a
              href="/home"
              className="hidden sm:inline-flex px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Home
            </a>
            <a
              href="/dashboard"
              className="hidden sm:inline-flex px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </a>
            <a
              href="/login"
              className="inline-flex px-3 py-2 text-sm rounded-lg bg-purplePrimary text-white hover:opacity-90"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
