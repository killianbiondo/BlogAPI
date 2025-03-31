import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">BlogAPI</Link>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Accueil</Link>
                    {isLoggedIn && <Link to="/create" className="navbar-link">Créer un article</Link>}
                </div>
                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="navbar-button">Déconnexion</button>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-button">Connexion</Link>
                            <Link to="/register" className="navbar-button">Inscription</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;