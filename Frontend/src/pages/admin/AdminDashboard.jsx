/*
import { useNavigate } from "react-router-dom";
import { getAdminSession, logoutAdmin } from "../../lib/auth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const session = getAdminSession();

  const salir = () => {
    logoutAdmin();
    navigate("/", { replace: true });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black">Zona Privada (Admin)</h1>
          <p className="mt-1 text-sm text-slate-600">
            Bienvenido: <span className="font-bold">{session?.email || "admin"}</span>
          </p>
        </div>

        <button
          onClick={salir}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black hover:bg-slate-50"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Editar Logo</p>
          <p className="text-sm text-slate-600">Próximamente</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Carrusel</p>
          <p className="text-sm text-slate-600">Próximamente</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Enlaces / PDFs</p>
          <p className="text-sm text-slate-600">Próximamente</p>
        </div>
      </div>
    </div>
  );
}
  */

/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logoutAdmin } from "../../lib/auth";
import "../../styles/pages/AdminDashboard.css";

const API_BASE = "http://localhost:3001";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = getToken();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const [content, setContent] = useState(null);

  // Cargar contenido
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
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(content)
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

  // Helpers para editar
  const site = content?.site ?? { title: "PORTAL JURÍDICO COCHABAMBA", logo: "/img/logo.png" };
  const navbar = content?.navbar ?? [
    { label: "Institución", to: "/institucion" },
    { label: "Sede del Tribunal", to: "/sede-del-tribunal" },
    { label: "Tribunales Departamentales", to: "/tribunales" }
  ];

  const updateSiteField = (field, value) => {
    setContent((prev) => ({
      ...(prev || {}),
      site: { ...(prev?.site || site), [field]: value }
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
      navbar: [...navbar, { label: "Nuevo", to: "/nueva-ruta" }]
    }));
  };

  const removeNavbarItem = (index) => {
    const next = navbar.filter((_, i) => i !== index);
    setContent((prev) => ({ ...(prev || {}), navbar: next }));
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black">Zona Privada (Admin)</h1>
          <p className="mt-1 text-sm text-slate-600">
            Backend: <span className="font-bold">{API_BASE}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={saveContent}
            disabled={saving || loading || !content}
            className="rounded-lg bg-black px-3 py-2 text-sm font-black text-white disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>

          <button
            onClick={salir}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black hover:bg-slate-50"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {errorMsg ? (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      ) : null}

      {okMsg ? (
        <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {okMsg}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-5 text-sm text-slate-600">Cargando contenido...</div>
      ) : null}

      {!loading && content ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="font-black">Configuración del sitio</p>

            <label className="mt-3 block text-sm font-bold">
              Título del sitio
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 p-2"
                value={site.title || ""}
                onChange={(e) => updateSiteField("title", e.target.value)}
              />
            </label>

            <label className="mt-3 block text-sm font-bold">
              Logo (URL)
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 p-2"
                value={site.logo || ""}
                onChange={(e) => updateSiteField("logo", e.target.value)}
                placeholder="/uploads/images/logo.png"
              />
            </label>

            <p className="mt-3 text-xs text-slate-500">
              Por ahora es URL. En el siguiente paso agregamos “Subir logo” con /api/upload.
            </p>
          </div>

          
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <p className="font-black">Navbar</p>
              <button
                onClick={addNavbarItem}
                className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-black hover:bg-slate-50"
                type="button"
              >
                + Agregar
              </button>
            </div>

            <div className="mt-3 grid gap-3">
              {navbar.map((it, i) => (
                <div key={i} className="rounded-lg border border-slate-200 p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <label className="text-sm font-bold">
                      Texto
                      <input
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2"
                        value={it.label}
                        onChange={(e) => updateNavbarItem(i, "label", e.target.value)}
                      />
                    </label>

                    <label className="text-sm font-bold">
                      Ruta
                      <input
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2"
                        value={it.to}
                        onChange={(e) => updateNavbarItem(i, "to", e.target.value)}
                      />
                    </label>
                  </div>

                  <button
                    onClick={() => removeNavbarItem(i)}
                    className="mt-2 text-sm font-black text-red-600"
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Carrusel</p>
          <p className="text-sm text-slate-600">Siguiente módulo</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Biblioteca (PDFs)</p>
          <p className="text-sm text-slate-600">Siguiente módulo</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Noticias / Avisos</p>
          <p className="text-sm text-slate-600">Siguiente módulo</p>
        </div>
      </div>
    </div>
  );
}
  */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logoutAdmin } from "../../lib/auth";
import "../../styles/pages/AdminDashboard.css";

const API_BASE = "http://localhost:3001";

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