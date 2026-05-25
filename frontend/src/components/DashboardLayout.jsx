import GradientBackground from "./GradientBackground.jsx";

function DashboardLayout({ children, onLogout }) {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <GradientBackground />

      <div className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-10 lg:px-16">
        <nav className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-200/70">
              GrowthOrbit
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Mission Control</h1>
          </div>

          <button
            onClick={onLogout}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/50 hover:bg-white/10 hover:text-white"
          >
            Logout
          </button>
        </nav>

        {children}
      </div>
    </main>
  );
}

export default DashboardLayout;

