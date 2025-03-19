import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ArticleList from "./components/ArticleList";
import CreateArticle from "./components/CreateArticle";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/articles" element={<ArticleList />} />
                <Route path="/create" element={<CreateArticle />} />
            </Routes>
        </Router>
    );
}

export default App;
