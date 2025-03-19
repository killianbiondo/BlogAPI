import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token") !== null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Blog API</Link>

                <div className="space-x-4">
                    <Link to="/articles" className="hover:text-gray-300">Articles</Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/articles/new" className="hover:text-gray-300">Nouvel Article</Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-300"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Connexion</Link>
                            <Link to="/register" className="hover:text-gray-300">Inscription</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;