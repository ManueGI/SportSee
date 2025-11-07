import './Header.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="SportSee" className="header__logo-img" />
      </div>
      <nav>
        <ul className="header__nav">
          <li><Link to="/" className="header__nav-item">Accueil</Link></li>
          <li><Link to="/profile" className="header__nav-item">Profil</Link></li>
          <li><Link to="/settings" className="header__nav-item">Réglage</Link></li>
          <li><Link to="/community" className="header__nav-item">Communauté</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
