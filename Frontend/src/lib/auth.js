const AUTH_KEY = "flatcms_admin_auth";

export function loginAdmin(email) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ email, ts: Date.now() })
  );
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export function getAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}