const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Dashboard request failed. Please try again.");
  }

  return data;
}

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`
  };
}

export async function getDashboard(token) {
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: authHeaders(token)
  });

  return parseResponse(response);
}

export async function getMissions(token) {
  const response = await fetch(`${API_BASE_URL}/missions`, {
    headers: authHeaders(token)
  });

  return parseResponse(response);
}

export async function completeMission(token, missionId) {
  const response = await fetch(`${API_BASE_URL}/missions/complete/${missionId}`, {
    method: "POST",
    headers: authHeaders(token)
  });

  return parseResponse(response);
}

