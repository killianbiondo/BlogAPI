import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

const EditArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/articles/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/articles/${id}`, { title, content });
            navigate(`/articles/${id}`);
        } catch (error) {
            console.error("Erreur lors de la modification de l'article", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Modifier l'article</h2>
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
            <button type="submit">Modifier</button>
        </form>
    );
};

export default EditArticle;