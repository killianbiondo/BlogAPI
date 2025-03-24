import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/articles", { title, content });
            navigate("/articles");
        } catch (error) {
            console.error("Erreur lors de la création de l'article", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer un nouvel article</h2>
            <div>
                <label>Titre:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contenu:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Créer</button>
        </form>
    );
};

export default CreateArticle;