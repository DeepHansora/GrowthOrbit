const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Keep backend calls in one place so pages stay focused on UI.
export async function getHealthStatus() {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Unable to reach GrowthOrbit API");
  }

  return response.json();
}
