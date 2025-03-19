import React, { useState } from "react";
import { api, setAuthToken } from "../api/api.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/login", { email, password });
            localStorage.setItem("token", res.data.token);
            setAuthToken(res.data.token);
            window.location.href = "/dashboard";
        } catch (error) {
            alert("Erreur de connexion");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default Login;
