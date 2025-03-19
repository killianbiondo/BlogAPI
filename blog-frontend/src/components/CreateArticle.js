import React, { useState } from "react";
import { api } from "../services/api";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/articles", { title, content });
            alert("Article créé !");
            window.location.reload();
        } catch (error) {
            alert("Erreur lors de la création");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenu" required></textarea>
            <button type="submit">Créer</button>
        </form>
    );
};

export default CreateArticle;
