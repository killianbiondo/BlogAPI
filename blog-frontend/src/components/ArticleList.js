import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        api.get("/articles")
            .then((res) => setArticles(res.data))
            .catch((err) => console.error(err));
    }, []);

    const deleteArticle = async (id, authorId) => {
        if (userId !== authorId.toString()) {
            alert("Vous ne pouvez supprimer que vos articles !");
            return;
        }

        try {
            await api.delete(`/articles/${id}`);
            setArticles(articles.filter((article) => article.id !== id));
        } catch (error) {
            alert("Erreur lors de la suppression");
        }
    };

    return (
        <div>
            <h1>Articles</h1>
            {articles.map((article) => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <p>Auteur: {article.author.email}</p>
                    {userId === article.author.id.toString() && (
                        <button onClick={() => deleteArticle(article.id, article.author.id)}>Supprimer</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
