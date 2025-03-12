import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateArticle from "./components/CreateArticle";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-article" element={<CreateArticle />} />
        </Routes>
      </Router>
  );
}

export default App;
