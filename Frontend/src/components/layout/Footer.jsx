import "../../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row">
          <span>© {new Date().getFullYear()} Portal Jurídico Cochabamba</span>
          <span>Zona pública • Flat CMS (File System)</span>
        </div>
      </div>
    </footer>
  );
}