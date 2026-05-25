import { Link, Outlet } from "react-router-dom";
import GradientBackground from "../components/GradientBackground.jsx";

function AuthLayout() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <GradientBackground />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-white">
            GrowthOrbit
          </Link>
          <Link
            to="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-300/50 hover:text-white"
          >
            Home
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="hidden lg:block">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-200/80">
              AI career acceleration
            </p>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-tight text-white">
              Your growth cockpit for focused career momentum.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
              Sign in to track missions, build streaks, and turn daily progress into visible XP.
            </p>
          </section>

          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;

