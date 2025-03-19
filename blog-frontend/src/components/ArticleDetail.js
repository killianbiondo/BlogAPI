import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useParams, Link, useNavigate } from "react-router-dom";

const ArticleDetail = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/api/articles/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'article", error);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                await api.delete(`/api/articles/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                navigate("/articles");
            } catch (error) {
                console.error("Erreur lors de la suppression de l'article", error);
            }
        }
    };

    if (loading) {
        return <div className="text-center p-4">Chargement...</div>;
    }

    if (!article) {
        return <div className="text-center p-4">Article non trouvé</div>;
    }

    // Formatage de la date
    const formattedDate = new Date(article.createdAt).toLocaleDateString();

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Link to="/articles" className="text-blue-500 hover:underline">
                    &larr; Retour aux articles
                </Link>
            </div>

            <article className="border p-6 rounded shadow">
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                <div className="text-gray-600 mb-6">
                    <p>Publié le {formattedDate}</p>
                    {article.autor && <p>Par: {article.autor.email}</p>}
                </div>

                <div className="prose max-w-none">
                    <p>{article.content}</p>
                </div>

                <div className="mt-8 flex space-x-4">
                    <Link
                        to={`/articles/edit/${article.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Modifier
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Supprimer
                    </button>
                </div>
            </article>
        </div>
    );
};

export default ArticleDetail;