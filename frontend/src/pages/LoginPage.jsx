import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton.jsx";
import GlowCard from "../components/GlowCard.jsx";
import InputField from "../components/InputField.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { fadeUp, staggerContainer } from "../animations/motion.js";
import { loginUser } from "../services/authService.js";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);
      login(data.access_token);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GlowCard className="mx-auto w-full max-w-md">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.p variants={fadeUp} className="text-sm font-medium text-sky-200">
          Welcome back
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight">
          Log in to GrowthOrbit
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-sm leading-6 text-slate-400">
          Continue your missions, streaks, and AI-powered career progress.
        </motion.p>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="mt-7 space-y-5">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          {error && (
            <div className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          )}

          <AnimatedButton type="submit" isLoading={isLoading}>
            Login
          </AnimatedButton>
        </motion.form>

        <motion.p variants={fadeUp} className="mt-6 text-center text-sm text-slate-400">
          New to GrowthOrbit?{" "}
          <Link to="/signup" className="font-medium text-sky-200 transition hover:text-white">
            Create an account
          </Link>
        </motion.p>
      </motion.div>
    </GlowCard>
  );
}

export default LoginPage;
