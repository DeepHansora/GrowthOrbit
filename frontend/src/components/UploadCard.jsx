import { motion } from "framer-motion";

function UploadCard({ file, onFileSelect, onAnalyze, isLoading }) {
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/[0.065] p-6 shadow-[0_0_80px_rgba(124,58,237,0.16)] backdrop-blur-xl"
    >
      <label
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-sky-300/30 bg-slate-950/45 px-6 py-10 text-center transition hover:border-violet-300/60 hover:bg-white/[0.05]"
      >
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0];
            if (selectedFile) {
              onFileSelect(selectedFile);
            }
          }}
        />
        <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-sky-100">
          PDF Resume
        </div>
        <h3 className="mt-6 text-2xl font-semibold">Drop your resume here</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
          Upload a PDF resume and GrowthOrbit will extract the text, send it to Gemini, and return a focused career analysis.
        </p>
        {file && <p className="mt-5 text-sm text-cyan-200">{file.name}</p>}
      </label>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={!file || isLoading}
        className="mt-5 h-12 w-full rounded-xl bg-gradient-to-r from-violet-400 via-sky-300 to-cyan-300 font-semibold text-slate-950 shadow-[0_0_38px_rgba(56,189,248,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </motion.div>
  );
}

export default UploadCard;

