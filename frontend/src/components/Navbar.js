import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <nav>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/create">Créer un article</Link></li>
                        <li><button onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("userId");
                            window.location.reload();
                        }}>Déconnexion</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Connexion</Link></li>
                        <li><Link to="/register">Inscription</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;