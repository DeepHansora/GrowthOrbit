import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton.jsx";
import GlowCard from "../components/GlowCard.jsx";
import InputField from "../components/InputField.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { fadeUp, staggerContainer } from "../animations/motion.js";
import { signupUser } from "../services/authService.js";

function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please complete all fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = await signupUser(formData);
      setSuccessMessage(data.message || "Account created successfully.");
      setTimeout(() => navigate("/login"), 900);
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
          Start your orbit
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight">
          Create your account
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 text-sm leading-6 text-slate-400">
          Join GrowthOrbit and begin turning focused work into measurable career XP.
        </motion.p>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="mt-7 space-y-5">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Deep"
            autoComplete="name"
          />
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
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />

          {error && (
            <div className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              {successMessage}
            </div>
          )}

          <AnimatedButton type="submit" isLoading={isLoading}>
            Create Account
          </AnimatedButton>
        </motion.form>

        <motion.p variants={fadeUp} className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-sky-200 transition hover:text-white">
            Login
          </Link>
        </motion.p>
      </motion.div>
    </GlowCard>
  );
}

export default SignupPage;
