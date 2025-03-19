import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await api.get(`/api/articles/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTitle(response.data.title);
                setContent(response.data.content);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'article", error);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            await api.put(`/api/articles/${id}`, {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate(`/articles/${id}`);
        } catch (error) {
            console.error("Erreur lors de la modification de l'article", error);
        }
    };

    if (loading) {
        return <div className="text-center p-4">Chargement...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Modifier l'article</h2>
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
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Enregistrer les modifications
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/articles/${id}`)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditArticle;