import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Bienvenue sur mon Blog</h1>
            <div className="space-x-4">
                <Link to="/register">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                        Créer un compte
                    </button>
                </Link>
                <Link to="/login">
                    <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
                        Se connecter
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
