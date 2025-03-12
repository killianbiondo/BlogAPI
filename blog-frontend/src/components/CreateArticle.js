import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post("/articles", { title, content });
            navigate("/articles"); // Redirige après la création
        } catch (error) {
            console.error("Erreur lors de la création de l'article", error);
        }
    };

    return (
        <div>
            <h2>Créer un Article</h2>
            <form onSubmit={handleCreate}>
                <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Contenu" value={content} onChange={(e) => setContent(e.target.value)} required />
                <button type="submit">Créer</button>
            </form>
        </div>
    );
};

export default CreateArticle;
