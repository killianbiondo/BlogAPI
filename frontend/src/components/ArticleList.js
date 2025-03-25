import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import ArticleCard from './ArticleCard';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get('/articles');
                console.log("Réponse API :", response);
                if (response && response.member) {
                    setArticles(response.member);
                } else {
                    setArticles([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Erreur API :", err);
                setError("Impossible de charger les articles.");
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
                <div className="article-grid">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticleList;