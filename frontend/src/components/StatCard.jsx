import { motion } from "framer-motion";

function StatCard({ label, value, accent = "from-sky-300 to-violet-300" }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-white/[0.065] p-5 shadow-[0_0_60px_rgba(59,130,246,0.12)] backdrop-blur-xl"
    >
      <p className="text-sm text-slate-400">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-3 bg-gradient-to-r ${accent} bg-clip-text text-4xl font-semibold text-transparent`}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

export default StatCard;

