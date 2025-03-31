import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';
import Login from './components/Login';
import Register from './components/Register';
import './styles/Navbar.css';
import './styles/ArticleDetail.css';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<ArticleList />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                    <Route path="/create" element={<CreateArticle />} />
                    <Route path="/edit/:id" element={<EditArticle />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;