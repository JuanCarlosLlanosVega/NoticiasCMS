/*
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// ====== Config ======
const PORT = 3001;
const JWT_SECRET = "CAMBIA_ESTE_SECRET_EN_PRODUCCION";

// Admin fijo (sin DB). Cambia el usuario/clave a tu gusto.
const ADMIN_USER = "admin";
const ADMIN_PASS_HASH = bcrypt.hashSync("admin123", 10); // <-- cambia "admin123"

// Paths
const CONTENT_PATH = path.join(__dirname, "data", "content.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// Servir uploads como estáticos
app.use("/uploads", express.static(UPLOADS_DIR));

// ====== Helpers ======
function readContent() {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeContent(data) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// ====== API ======

// 1) GET contenido (público)
app.get("/api/content", (req, res) => {
  try {
    res.json(readContent());
  } catch (e) {
    res.status(500).json({ error: "No se pudo leer el contenido" });
  }
});

// 2) PUT contenido (protegido)
app.put("/api/content", requireAuth, (req, res) => {
  try {
    writeContent(req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "No se pudo guardar el contenido" });
  }
});

// 3) Login (JWT)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  if (username !== ADMIN_USER) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const ok = await bcrypt.compare(password, ADMIN_PASS_HASH);
  if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

// 4) Upload (multer) - protegido
function folderByType(type) {
  if (type === "image") return "images";
  if (type === "pdf") return "pdfs";
  if (type === "video") return "videos";
  return "files";
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.query.type || "files";
    const folder = folderByType(type);
    const dest = path.join(UPLOADS_DIR, folder);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + safeName);
  }
});

const upload = multer({ storage });

app.post("/api/upload", requireAuth, upload.single("file"), (req, res) => {
  const type = req.query.type || "files";
  const folder = folderByType(type);
  const url = `/uploads/${folder}/${req.file.filename}`;
  res.json({ ok: true, url });
});

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Backend corriendo: http://localhost:${PORT}`);
});

app.get("/api/me", requireAuth, (req, res) => {
    res.json({ ok: true, user: req.user });
  });
  */

  const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

const app = express();

// ✅ CORS (por ahora abierto para no bloquear deploy)
// Luego lo restringimos a tu dominio web.app
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ limit: "10mb" }));

// ====== Config ======
// ✅ Render/hosting usa PORT por variable de entorno
const PORT = process.env.PORT || 3001;

// ✅ En producción DEBE venir de variable de entorno
const JWT_SECRET = process.env.JWT_SECRET || "DEV_SECRET_CAMBIAME";

// Admin fijo (sin DB). Cambia el usuario/clave a tu gusto.
const ADMIN_USER = process.env.ADMIN_USER || "admin";

// ✅ Recomendado: también por env (pero si no, queda admin123)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_PASS_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// Paths
const CONTENT_PATH = path.join(__dirname, "data", "content.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// Servir uploads como estáticos
app.use("/uploads", express.static(UPLOADS_DIR));

// ====== Helpers ======
function readContent() {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeContent(data) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// ====== API ======

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// 1) GET contenido (público)
app.get("/api/content", (req, res) => {
  try {
    res.json(readContent());
  } catch (e) {
    res.status(500).json({ error: "No se pudo leer el contenido" });
  }
});

// 2) PUT contenido (protegido)
app.put("/api/content", requireAuth, (req, res) => {
  try {
    writeContent(req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "No se pudo guardar el contenido" });
  }
});

// 3) Login (JWT)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  if (username !== ADMIN_USER) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // ✅ Comparamos contra el hash del password configurado
  const ok = await bcrypt.compare(password, ADMIN_PASS_HASH);
  if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

// 4) Upload (multer) - protegido
function folderByType(type) {
  if (type === "image") return "images";
  if (type === "pdf") return "pdfs";
  if (type === "video") return "videos";
  return "files";
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.query.type || "files";
    const folder = folderByType(type);
    const dest = path.join(UPLOADS_DIR, folder);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + safeName);
  },
});

const upload = multer({ storage });

app.post("/api/upload", requireAuth, upload.single("file"), (req, res) => {
  const type = req.query.type || "files";
  const folder = folderByType(type);
  const url = `/uploads/${folder}/${req.file.filename}`;
  res.json({ ok: true, url });
});

// ✅ endpoint para verificar token
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// ✅ El listen va al final
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto: ${PORT}`);
});