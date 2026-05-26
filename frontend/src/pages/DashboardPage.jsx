import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import MissionCard from "../components/MissionCard.jsx";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  completeMission,
  getDashboard,
  getMissions
} from "../services/dashboardService.js";

function DashboardPage() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [missions, setMissions] = useState([]);
  const [completedMissionIds, setCompletedMissionIds] = useState([]);
  const [completingMissionId, setCompletingMissionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const recentMissionIds = useMemo(() => {
    return dashboard?.recent_completed_missions?.map((mission) => mission.id) || [];
  }, [dashboard]);

  async function loadDashboardData() {
    if (!token) {
      return;
    }

    setError("");

    try {
      const [dashboardData, missionData] = await Promise.all([
        getDashboard(token),
        getMissions(token)
      ]);

      setDashboard(dashboardData);
      setMissions(missionData);
      setCompletedMissionIds((currentIds) => [
        ...new Set([...currentIds, ...dashboardData.recent_completed_missions.map((item) => item.id)])
      ]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, [token]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  async function handleCompleteMission(missionId) {
    setCompletingMissionId(missionId);
    setError("");
    setSuccessMessage("");

    try {
      const result = await completeMission(token, missionId);
      setSuccessMessage(result.message);
      setCompletedMissionIds((currentIds) => [...new Set([...currentIds, missionId])]);
      await loadDashboardData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setCompletingMissionId(null);
    }
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <section className="pt-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-200/80">
            Protected dashboard
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            {dashboard?.name ? `Welcome back, ${dashboard.name}.` : "Welcome back."}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Complete missions, build your streak, and convert focused practice into career XP.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.06] p-8 text-slate-300 backdrop-blur-xl">
            Loading your orbit...
          </div>
        ) : (
          <>
            {error && (
              <div className="mt-8 rounded-2xl border border-rose-300/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-100">
                {error}
              </div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-100"
              >
                {successMessage}
              </motion.div>
            )}

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <StatCard label="Total XP" value={dashboard?.xp ?? 0} />
              <StatCard
                label="Current Streak"
                value={dashboard?.streak ?? 0}
                accent="from-emerald-200 to-cyan-200"
              />
              <StatCard
                label="Missions Completed"
                value={dashboard?.missions_completed ?? 0}
                accent="from-violet-200 to-fuchsia-200"
              />
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.72fr]">
              <section>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Available Missions</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Complete each mission once to earn XP.
                    </p>
                  </div>
                  <Link
                    to="/resume-analysis"
                    className="hidden rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100 transition hover:border-sky-300/50 hover:bg-sky-300/15 sm:inline-flex"
                  >
                    Analyze Resume
                  </Link>
                </div>

                <div className="mt-5 grid gap-5">
                  {missions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      onComplete={handleCompleteMission}
                      isCompleting={completingMissionId === mission.id}
                      isCompleted={
                        completedMissionIds.includes(mission.id) ||
                        recentMissionIds.includes(mission.id)
                      }
                    />
                  ))}
                </div>
              </section>

              <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_0_70px_rgba(56,189,248,0.12)] backdrop-blur-xl">
                <h3 className="text-xl font-semibold">Recent Missions</h3>
                <div className="mt-5 space-y-4">
                  {dashboard?.recent_completed_missions?.length ? (
                    dashboard.recent_completed_missions.map((mission) => (
                      <div
                        key={`${mission.id}-${mission.completed_at}`}
                        className="rounded-xl border border-white/10 bg-slate-950/45 p-4"
                      >
                        <p className="font-medium text-white">{mission.title}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          +{mission.xp_reward} XP - {mission.difficulty}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-slate-400">
                      No completed missions yet. Pick a mission and start your streak.
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default DashboardPage;
