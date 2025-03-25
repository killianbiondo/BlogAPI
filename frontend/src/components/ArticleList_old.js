import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get("/articles");

                console.log("Réponse API :", response); // Debugging

                if (response && response) {
                    if (Array.isArray(response)) {
                        setArticles(response);
                    } else {
                        console.error("Format incorrect :", response);
                        setError("Les données reçues ne sont pas valides.");
                    }
                } else {
                    console.error("Réponse API vide ou incorrecte.");
                    setError("Aucune donnée reçue de l'API.");
                }
            } catch (err) {
                console.error("Erreur API :", err);
                setError("Impossible de charger les articles.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <div>Chargement des articles...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div>
            <h1>Liste des articles</h1>
            {articles.length === 0 ? (
                <p>Aucun article disponible.</p>
            ) : (
                <ul>
                    {articles.map((article) => (
                        <li key={article.id}>
                            <Link to={`/articles/${article.id}`}>{article.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArticleList;
