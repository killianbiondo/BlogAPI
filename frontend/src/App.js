import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";
import Navbar from "./components/Navbar";
import './styles/Main.css';


function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/edit/:id" element={<EditArticle />} />
          <Route path="/" element={<ArticleList />} />
        </Routes>
      </Router>
  );
}

export default App;