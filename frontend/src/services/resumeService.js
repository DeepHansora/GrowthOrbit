const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Resume analysis failed. Please try again.");
  }

  return data;
}

export async function analyzeResume(token, file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/resume-analysis`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  return parseResponse(response);
}

