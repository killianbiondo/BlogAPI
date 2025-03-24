import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

const ArticleDetail = () => {
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        api.get(`/articles/${id}`)
            .then((res) => setArticle(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const deleteArticle = async () => {
        try {
            await api.delete(`/articles/${id}`);
            navigate("/articles");
        } catch (error) {
            console.error("Erreur lors de la suppression", error);
        }
    };

    if (!article) return <div>Chargement...</div>;

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <p>Auteur: {article.author.email}</p>
            {userId === article.author.id.toString() && (
                <>
                    <button onClick={() => navigate(`/edit/${id}`)}>Modifier</button>
                    <button onClick={deleteArticle}>Supprimer</button>
                </>
            )}
        </div>
    );
};

export default ArticleDetail;