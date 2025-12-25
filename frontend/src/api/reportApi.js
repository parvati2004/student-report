const BASE_URL = import.meta.env.VITE_API_BASE || 'https://student-report-backend-ksks.onrender.com';

async function getJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  } catch (err) {
    console.error('Network error fetching', url, err);
    throw err;
  }
}

export function fetchStudents() {
  return getJson(`${BASE_URL}/api/students`);
}

export function fetchStudent(id) {
  return getJson(`${BASE_URL}/api/students/${id}`);
}
