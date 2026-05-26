import { motion } from "framer-motion";

function AnalysisCard({ title, items, accent = "from-sky-300 to-violet-300" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_0_60px_rgba(59,130,246,0.12)] backdrop-blur-xl"
    >
      <h3 className={`bg-gradient-to-r ${accent} bg-clip-text text-xl font-semibold text-transparent`}>
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items?.length ? (
          items.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-slate-950/45 px-4 py-3 text-sm leading-6 text-slate-300">
              {item}
            </li>
          ))
        ) : (
          <li className="text-sm text-slate-400">No items returned.</li>
        )}
      </ul>
    </motion.section>
  );
}

export default AnalysisCard;

