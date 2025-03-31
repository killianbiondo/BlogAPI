import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import "../styles/ArticleDetail.css";

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await api.get(`/articles/${id}`);
                setArticle(data);
                setLoading(false);
            } catch (error) {
                setError('Erreur lors du chargement de l\'article');
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            try {
                await api.delete(`/articles/${id}`);
                navigate('/');
            } catch (error) {
                setError('Erreur lors de la suppression de l\'article');
            }
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!article) {
        return <div className="not-found">Article non trouvé</div>;
    }

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className="article-detail-container">
            <Link to="/" className="back-link">
                &larr; Retour à la liste
            </Link>

            <article className="article-detail">
                <h1 className="article-title">{article.title}</h1>

                <div className="article-meta">
                    Par {article.author && article.author.email ? article.author.email : 'Auteur inconnu'}
                </div>

                <div className="article-content">
                    {article.content}
                </div>

                {isLoggedIn && (
                    <div className="article-actions">
                        <Link to={`/edit/${article.id}`} className="btn btn-edit">
                            Modifier
                        </Link>
                        <button onClick={handleDelete} className="btn btn-delete">
                            Supprimer
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
};

export default ArticleDetail;