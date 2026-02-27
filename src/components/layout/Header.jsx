import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/components/Header.css";

export default function Header() {
  const [openTopMenu, setOpenTopMenu] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">LOGO</div>

          <div className="header__titleWrap">
            <h1 className="header__title">PORTAL JURÍDICO COCHABAMBA</h1>
            <div className="header__line" />
          </div>

          <div className="header__topLinks">
            <Link to="/quienes-somos">Quienes somos</Link>
            <Link to="/contactanos">Contáctanos</Link>

            <button
              type="button"
              className="header__btn"
              onClick={() => setOpenTopMenu((v) => !v)}
            >
              Menú
            </button>
          </div>

          <button
            type="button"
            className="header__btn header__mobileBtn"
            onClick={() => setOpenTopMenu((v) => !v)}
            aria-expanded={openTopMenu}
          >
            Menú
          </button>
        </div>

        {openTopMenu && (
          <div className="header__dropdown">
            <Link to="/quienes-somos">Quienes somos</Link>
            <Link to="/contactanos">Contáctanos</Link>
            <Link to="/admin" className="header__admin">
              Ingresar como Administrador
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}