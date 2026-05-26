import { motion } from "framer-motion";

function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-[0_0_80px_rgba(56,189,248,0.14)] backdrop-blur-xl"
    >
      <motion.div
        className="mx-auto h-14 w-14 rounded-full border-2 border-sky-200 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <h3 className="mt-6 text-xl font-semibold">Reading your resume</h3>
      <p className="mt-2 text-sm text-slate-400">
        Extracting PDF text and asking Gemini for structured feedback.
      </p>
    </motion.div>
  );
}

export default LoadingState;

