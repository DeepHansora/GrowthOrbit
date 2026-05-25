import { motion } from "framer-motion";

function AnimatedButton({ children, isLoading = false, type = "button" }) {
  return (
    <motion.button
      type={type}
      disabled={isLoading}
      whileHover={{ scale: isLoading ? 1 : 1.015 }}
      whileTap={{ scale: isLoading ? 1 : 0.985 }}
      className="relative mt-2 h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-400 via-sky-300 to-cyan-300 px-5 font-semibold text-slate-950 shadow-[0_0_38px_rgba(56,189,248,0.28)] transition disabled:cursor-not-allowed disabled:opacity-70"
    >
      <motion.span
        className="absolute inset-0 bg-white/30"
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <span className="relative">{isLoading ? "Please wait..." : children}</span>
    </motion.button>
  );
}

export default AnimatedButton;

