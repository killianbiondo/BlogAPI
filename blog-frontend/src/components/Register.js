import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/users", {
                email,
                password,
                roles: ["ROLE_USER"]
            });
            navigate("/login"); // Redirection vers la page de connexion après inscription
        } catch (error) {
            console.error("Erreur d'inscription", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Inscription</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Mot de passe</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default Register;