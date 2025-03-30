import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    return (
        <div className="article-card">
            <div className="article-card-content">
                <h2>{article.title}</h2>
                <p>{article.content.substring(0, 100)}...</p>
                <Link to={`/articles/${article.id}`} className="read-more">Lire la suite</Link>
            </div>
        </div>
    );
};

export default ArticleCard;