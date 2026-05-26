import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnalysisCard from "../components/AnalysisCard.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import LoadingState from "../components/LoadingState.jsx";
import UploadCard from "../components/UploadCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { analyzeResume } from "../services/resumeService.js";

function ResumeAnalysisPage() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleFileSelect(selectedFile) {
    setError("");
    setAnalysis(null);

    if (selectedFile.type !== "application/pdf") {
      setFile(null);
      setError("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
  }

  async function handleAnalyze() {
    if (!file) {
      setError("Please choose a resume PDF first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const result = await analyzeResume(token, file);
      setAnalysis(result);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <section className="pt-14">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-200/80">
              AI resume analyzer
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Turn your resume into a sharper growth plan.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Upload your resume PDF and get AI feedback on strengths, gaps, missing skills, and ATS improvements.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="rounded-full border border-white/10 px-4 py-2 text-center text-sm text-slate-200 transition hover:border-sky-300/50 hover:bg-white/10 hover:text-white"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <UploadCard
            file={file}
            onFileSelect={handleFileSelect}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />

          <div className="space-y-5">
            {error && (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-100">
                {error}
              </div>
            )}

            {isLoading && <LoadingState />}

            {analysis && (
              <div className="grid gap-5">
                <AnalysisCard title="Strengths" items={analysis.strengths} />
                <AnalysisCard
                  title="Weaknesses"
                  items={analysis.weaknesses}
                  accent="from-rose-200 to-orange-200"
                />
                <AnalysisCard
                  title="Missing Skills"
                  items={analysis.missing_skills}
                  accent="from-violet-200 to-fuchsia-200"
                />
                <AnalysisCard
                  title="Improvement Suggestions"
                  items={analysis.suggestions}
                  accent="from-emerald-200 to-cyan-200"
                />
                <AnalysisCard
                  title="ATS Improvement Tips"
                  items={analysis.ats_tips}
                  accent="from-sky-200 to-indigo-200"
                />
              </div>
            )}

            {!isLoading && !analysis && !error && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-slate-300 shadow-[0_0_70px_rgba(124,58,237,0.12)] backdrop-blur-xl">
                Your AI feedback will appear here after analysis.
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ResumeAnalysisPage;

