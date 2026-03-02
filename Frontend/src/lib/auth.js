
/*
const TOKEN_KEY = "token";

export function loginAdminWithToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(getToken());
}

// ✅ Para que AdminDashboard.jsx NO falle:
export function getAdminSession() {
  const token = getToken();
  if (!token) return null;
  // No decodificamos JWT aquí (no hace falta). Solo devolvemos algo usable.
  return { token };
}
  */

const TOKEN_KEY = "token";

export function loginAdminWithToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(getToken());
}

// ✅ Compatibilidad con tu AdminDashboard.jsx
export function getAdminSession() {
  const token = getToken();
  if (!token) return null;
  return { token, email: "admin" }; // mantenemos email para que no rompa tu UI
}