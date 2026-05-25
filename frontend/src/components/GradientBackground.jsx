import { motion } from "framer-motion";

function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.28),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.22),transparent_26%),radial-gradient(circle_at_50%_90%,rgba(20,184,166,0.14),transparent_30%),linear-gradient(135deg,#020617_0%,#07111f_48%,#0f1028_100%)]" />

      <motion.div
        className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 44, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[10%] top-[10%] h-80 w-80 rounded-full bg-sky-400/20 blur-3xl"
        animate={{ x: [0, -70, 0], y: [0, 60, 0], scale: [1, 1.16, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
    </div>
  );
}

export default GradientBackground;

