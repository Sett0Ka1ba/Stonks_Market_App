import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/stonks.png'; 

const Navigation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">
          <img 
            src={logo} 
            alt="Stock Market App Logo" 
            className="nav-logo" 
            height="40" 
          />
          <span className="brand-name">Stonks Market App</span>
        </Link>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/dashboard">Tableau de bord</Link>
            </li>
            <li>
              <Link to="/favorites">Mes favoris</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/register">Inscription</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;