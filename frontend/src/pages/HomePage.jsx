import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard.jsx";
import { fadeUp, staggerContainer } from "../animations/motion.js";
import { getHealthStatus } from "../services/api.js";

const features = [
  {
    title: "AI Career Intelligence",
    text: "A focused foundation for future resume, interview, and career growth workflows."
  },
  {
    title: "Scalable Product Base",
    text: "Frontend and backend are separated clearly so new SaaS features can grow without clutter."
  },
  {
    title: "Fast Local Setup",
    text: "Vite, FastAPI, and SQLite make the first developer experience quick and lightweight."
  }
];

function HomePage() {
  const [apiStatus, setApiStatus] = useState("Checking API...");

  useEffect(() => {
    getHealthStatus()
      .then((data) => setApiStatus(data.message))
      .catch(() => setApiStatus("Backend not connected yet"));
  }, []);

  return (
    <section className="relative isolate min-h-screen px-6 py-6 sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.34),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.25),transparent_30%),linear-gradient(135deg,#020617_0%,#08111f_45%,#101827_100%)]" />
      <motion.div
        className="absolute left-1/2 top-16 -z-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
        animate={{ x: [-80, 90, -80], y: [0, 55, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <div className="text-xl font-bold tracking-tight">GrowthOrbit</div>
        <a
          href="http://localhost:8000/docs"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-teal-300/50 hover:text-white"
        >
          API Docs
        </a>
      </nav>

      <div className="mx-auto grid max-w-7xl items-center gap-12 pb-16 pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm text-teal-100 backdrop-blur"
          >
            AI SaaS foundation for ambitious career products
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Build smarter career momentum with GrowthOrbit.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A premium starter setup for an AI growth platform, ready for auth, dashboards,
            recommendations, and user workflows when the product grows.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="rounded-full bg-teal-300 px-6 py-3 text-center font-semibold text-slate-950 shadow-glow transition hover:bg-teal-200"
            >
              Start Building
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-white/10 px-6 py-3 text-center font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Login
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-sm text-slate-400">
            API status: <span className="text-teal-200">{apiStatus}</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-glow backdrop-blur-2xl"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-slate-400">Career readiness</p>
                <h2 className="mt-1 text-2xl font-semibold">AI Growth Console</h2>
              </div>
              <div className="rounded-full bg-teal-300/15 px-3 py-1 text-sm text-teal-100">Live</div>
            </div>

            <div className="mt-6 grid gap-4">
              {["Resume score", "Interview confidence", "Role match"].map((label, index) => (
                <div key={label} className="rounded-2xl bg-white/[0.05] p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{label}</span>
                    <span className="text-white">{82 + index * 5}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-teal-300 to-indigo-300"
                      initial={{ width: 0 }}
                      animate={{ width: `${82 + index * 5}%` }}
                      transition={{ delay: 0.3 + index * 0.15, duration: 0.9 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl gap-5 pb-16 md:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={fadeUp}>
            <GlassCard title={feature.title}>{feature.text}</GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default HomePage;
