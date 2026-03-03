import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logoutAdmin } from "../../lib/auth";
import "../../styles/pages/AdminDashboard.css";

//const API_BASE = "http://localhost:3001";
const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = getToken();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const [content, setContent] = useState(null);

  useEffect(() => {
    (async () => {
      setErrorMsg("");
      setOkMsg("");
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/content`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "No se pudo cargar content");
        setContent(json);
      } catch (e) {
        setErrorMsg("No se pudo cargar el contenido desde el backend (¿corre en 3001?).");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const salir = () => {
    logoutAdmin();
    navigate("/", { replace: true });
  };

  const saveContent = async () => {
    if (!content) return;
    setErrorMsg("");
    setOkMsg("");
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/api/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al guardar");

      setOkMsg("✅ Cambios guardados correctamente.");
    } catch (e) {
      setErrorMsg("❌ No se pudo guardar. Revisa el token (login) o el backend.");
    } finally {
      setSaving(false);
      setTimeout(() => setOkMsg(""), 2500);
    }
  };

  // Valores por defecto si aún no existen en content.json
  const site = content?.site ?? { title: "PORTAL JURÍDICO COCHABAMBA", logo: "/img/logo.png" };
  const navbar =
    content?.navbar ?? [
      { label: "Institución", to: "/institucion" },
      { label: "Sede del Tribunal", to: "/sede-del-tribunal" },
      { label: "Tribunales Departamentales", to: "/tribunales" },
    ];

  const updateSiteField = (field, value) => {
    setContent((prev) => ({
      ...(prev || {}),
      site: { ...(prev?.site || site), [field]: value },
    }));
  };

  const updateNavbarItem = (index, field, value) => {
    const next = [...navbar];
    next[index] = { ...next[index], [field]: value };
    setContent((prev) => ({ ...(prev || {}), navbar: next }));
  };

  const addNavbarItem = () => {
    setContent((prev) => ({
      ...(prev || {}),
      navbar: [...navbar, { label: "Nuevo", to: "/nueva-ruta" }],
    }));
  };

  const removeNavbarItem = (index) => {
    const next = navbar.filter((_, i) => i !== index);
    setContent((prev) => ({ ...(prev || {}), navbar: next }));
  };

  return (
    <main className="adminDash">
      <section className="adminDash__card">
        <div className="adminDash__top">
          <div>
            <h1 className="adminDash__title">Zona Privada (Administración)</h1>
            <p className="adminDash__sub">
              Backend: <b>{API_BASE}</b>
            </p>
          </div>

          <div className="adminDash__actions">
            <button
              className="btn btnPrimary"
              onClick={saveContent}
              disabled={saving || loading || !content}
              type="button"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>

            <button className="btn" onClick={salir} type="button">
              Cerrar sesión
            </button>
          </div>
        </div>

        {errorMsg ? <div className="alert alertError">{errorMsg}</div> : null}
        {okMsg ? <div className="alert alertOk">{okMsg}</div> : null}

        {loading ? <p className="adminDash__sub" style={{ marginTop: 12 }}>Cargando contenido…</p> : null}

        {!loading && content ? (
          <div className="adminDash__grid2">
            {/* CONFIG SITIO */}
            <div className="panel">
              <p className="panel__title">Configuración del sitio</p>

              <div className="field">
                <label>Título del sitio</label>
                <input
                  className="input"
                  value={site.title || ""}
                  onChange={(e) => updateSiteField("title", e.target.value)}
                />
              </div>

              <div className="field">
                <label>Logo (URL)</label>
                <input
                  className="input"
                  value={site.logo || ""}
                  onChange={(e) => updateSiteField("logo", e.target.value)}
                  placeholder="/uploads/images/logo.png"
                />
              </div>

              <p className="adminDash__sub" style={{ marginTop: 10 }}>
                Por ahora es URL. En el siguiente paso agregamos “Subir logo” con /api/upload.
              </p>
            </div>

            {/* NAVBAR */}
            <div className="panel">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <p className="panel__title" style={{ margin: 0 }}>Barra de navegación</p>

                <button className="btn" onClick={addNavbarItem} type="button">
                  + Agregar
                </button>
              </div>

              {navbar.map((it, i) => (
                <div className="navItem" key={`${it.to}-${i}`}>
                  <div className="navItem__row">
                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Texto</label>
                      <input
                        className="input"
                        value={it.label}
                        onChange={(e) => updateNavbarItem(i, "label", e.target.value)}
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Ruta</label>
                      <input
                        className="input"
                        value={it.to}
                        onChange={(e) => updateNavbarItem(i, "to", e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="linkDanger" onClick={() => removeNavbarItem(i)} type="button">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <div className="panel">
            <p className="panel__title">Carrusel</p>
            <p className="adminDash__sub">Siguiente módulo</p>
          </div>

          <div className="panel">
            <p className="panel__title">Biblioteca (PDF)</p>
            <p className="adminDash__sub">Siguiente módulo</p>
          </div>

          <div className="panel">
            <p className="panel__title">Noticias / Avisos</p>
            <p className="adminDash__sub">Siguiente módulo</p>
          </div>
        </div>
      </section>
    </main>
  );
}