function GlassCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-teal-300/40">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{children}</p>
    </div>
  );
}

export default GlassCard;

