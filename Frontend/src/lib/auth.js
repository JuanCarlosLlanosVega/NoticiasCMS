

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


export function getAdminSession() {
  const token = getToken();
  if (!token) return null;
  return { token, email: "admin" }; 
}