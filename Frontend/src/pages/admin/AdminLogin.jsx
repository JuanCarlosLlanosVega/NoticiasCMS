
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/AdminLogin.css";

const API_BASE = "http://localhost:3001";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // usaremos username en vez de email
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // Si el usuario deja vacío, usamos "admin"
      const payload = {
        username: (username || "admin").trim(),
        password: pass
      };

      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.error || "No se pudo iniciar sesión.");
        setLoading(false);
        return;
      }

      // Guardar token JWT
      localStorage.setItem("token", data.token);

      // Redirigir al dashboard
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setErrorMsg("Error de conexión con el backend (¿está corriendo en 3001?).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="adminLogin">
      <div className="adminLogin__container">
        <div className="adminLogin__card">
          <h1 className="adminLogin__title">Ingresar como Administrador</h1>
          <p className="adminLogin__desc">
            Acceso a la zona privada (Flat CMS).
          </p>

          <form className="adminLogin__form" onSubmit={onSubmit}>
            <label className="adminLogin__label">
              Usuario
              <input
                className="adminLogin__input"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="adminLogin__label">
              Contraseña
              <input
                className="adminLogin__input"
                type="password"
                placeholder="********"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </label>

            <button className="adminLogin__btn" type="submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            {errorMsg ? (
              <p className="adminLogin__hint" style={{ color: "crimson" }}>
                {errorMsg}
              </p>
            ) : (
              <p className="adminLogin__hint">
                *Asegúrate de tener el Backend corriendo en <b>http://localhost:3001</b>.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}