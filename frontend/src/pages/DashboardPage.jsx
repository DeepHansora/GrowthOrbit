import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function DashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">GrowthOrbit</h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/50 hover:text-white"
          >
            Logout
          </button>
        </nav>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-[0_0_80px_rgba(56,189,248,0.14)] backdrop-blur-xl">
          <p className="text-sm font-medium text-sky-200">Protected route</p>
          <h2 className="mt-3 text-4xl font-semibold">Dashboard access confirmed</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            {user?.name ? `Welcome back, ${user.name}.` : "Your token is valid."} The full
            dashboard UI will be built later.
          </p>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
