import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to='/'><h1 className="app-title">Pokémon Explorer</h1></Link>
        
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
      </nav>
    </header>
  );
};

export default Header;
