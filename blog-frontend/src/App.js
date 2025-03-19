import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";
import AddArticle from "./components/AddArticle";
import EditArticle from "./components/EditArticle";
import Navbar from "./components/Navbar"; // Supposons que vous avez un composant Navbar

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container mx-auto py-8">
                    <Routes>
                        <Route path="/" element={<Navigate to="/articles" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/articles" element={<ArticlesList />} />
                        <Route path="/articles/:id" element={<ArticleDetail />} />
                        <Route path="/articles/new" element={<AddArticle />} />
                        <Route path="/articles/edit/:id" element={<EditArticle />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;