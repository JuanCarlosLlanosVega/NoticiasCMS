

import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import SimplePage from "./pages/SimplePage";

export default function App() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <Header />
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6 py-4">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Páginas públicas (placeholders por ahora) */}
          <Route path="/institucion" element={<SimplePage title="Institución" />} />
          <Route path="/sede-del-tribunal" element={<SimplePage title="Sede del Tribunal" />} />
          <Route path="/tribunales" element={<SimplePage title="Tribunales Departamentales" />} />
          <Route path="/publicaciones" element={<SimplePage title="Publicaciones" />} />
          <Route path="/normas-y-leyes" element={<SimplePage title="Normas y Leyes" />} />
          <Route path="/biblioteca" element={<SimplePage title="Biblioteca" />} />
          <Route path="/sentencias-cidh" element={<SimplePage title="Sentencias CIDH" />} />
          <Route path="/contacto" element={<SimplePage title="Contacto" />} />
          <Route path="/quienes-somos" element={<SimplePage title="Quiénes somos" />} />
          <Route path="/contactanos" element={<SimplePage title="Contáctanos" />} />

          {/* Login admin (zona privada la haremos después) */}
          <Route path="/admin" element={<SimplePage title="Acceso Administrador" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}