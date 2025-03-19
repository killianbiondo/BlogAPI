import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get("/api/articles");
                setArticles(response.data["hydra:member"]);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles", error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Chargement...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Liste des articles</h2>
                <Link
                    to="/articles/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nouvel article
                </Link>
            </div>

            {articles.length === 0 ? (
                <p>Aucun article disponible.</p>
            ) : (
                <div className="space-y-4">
                    {articles.map((article) => (
                        <div key={article.id} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">{article.title}</h3>
                            <p className="text-gray-600 mt-2">
                                {article.content.substring(0, 150)}...
                            </p>
                            <div className="mt-4 flex justify-between">
                                <Link
                                    to={`/articles/${article.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Lire la suite
                                </Link>
                                <Link
                                    to={`/articles/edit/${article.id}`}
                                    className="text-green-500 hover:underline"
                                >
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticlesList;
