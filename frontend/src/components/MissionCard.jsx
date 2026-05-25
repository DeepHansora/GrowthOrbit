import { motion } from "framer-motion";
import GlowButton from "./GlowButton.jsx";

function MissionCard({ mission, onComplete, isCompleting, isCompleted }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{
        opacity: 1,
        y: 0,
        borderColor: isCompleted ? "rgba(134,239,172,0.45)" : "rgba(255,255,255,0.1)"
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-2xl border bg-white/[0.06] p-5 shadow-[0_0_60px_rgba(124,58,237,0.1)] backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{mission.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{mission.description}</p>
        </div>
        <span className="shrink-0 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs text-sky-100">
          {mission.difficulty}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-300">
          Reward <span className="font-semibold text-cyan-200">+{mission.xp_reward} XP</span>
        </p>
        <GlowButton
          onClick={() => onComplete(mission.id)}
          isLoading={isCompleting}
          disabled={isCompleted}
        >
          {isCompleted ? "Completed" : "Complete"}
        </GlowButton>
      </div>
    </motion.article>
  );
}

export default MissionCard;

