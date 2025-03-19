import React, { useState } from "react";
import { api } from "../api/api.js";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/users", { email, password });
            alert("Inscription réussie !");
        } catch (error) {
            alert("Erreur d'inscription");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default Register;
