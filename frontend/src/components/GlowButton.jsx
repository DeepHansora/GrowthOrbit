import { motion } from "framer-motion";

function GlowButton({ children, onClick, isLoading = false, disabled = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className="rounded-xl bg-gradient-to-r from-violet-400 via-sky-300 to-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_34px_rgba(56,189,248,0.24)] transition disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Completing..." : children}
    </motion.button>
  );
}

export default GlowButton;

