import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            await api.post("/api/articles", {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/articles");
        } catch (error) {
            console.error("Erreur lors de la création de l'article", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Ajouter un nouvel article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Titre</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Contenu</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Publier l'article
                </button>
            </form>
        </div>
    );
};

export default AddArticle;