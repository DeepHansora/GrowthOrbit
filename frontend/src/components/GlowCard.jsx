import { motion } from "framer-motion";

function GlowCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.075] p-7 shadow-[0_0_90px_rgba(59,130,246,0.16)] backdrop-blur-2xl ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-400/12 blur-3xl" />
      {children}
    </motion.div>
  );
}

export default GlowCard;

