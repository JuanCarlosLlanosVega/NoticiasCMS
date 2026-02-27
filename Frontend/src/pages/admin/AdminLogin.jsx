import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../lib/auth";
import "../../styles/pages/AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    loginAdmin(email || "admin@demo.com");
    navigate("/admin/dashboard", { replace: true });
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
              Correo
              <input
                className="adminLogin__input"
                type="email"
                placeholder="admin@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <button className="adminLogin__btn" type="submit">
              Ingresar
            </button>

            <p className="adminLogin__hint">
              *Por ahora el acceso es libre (acepta cualquier dato). Luego lo conectamos a tu Backend.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}