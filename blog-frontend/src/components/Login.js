import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login_check", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/articles"); // Redirige vers la liste des articles
        } catch (error) {
            console.error("Erreur de connexion", error);
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
