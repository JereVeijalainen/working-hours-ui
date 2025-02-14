import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/add">Add working time</Link>
          <Link to="/list">Working time list</Link>
          <Link to="/summary">Summary</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/add" element={<App />} />
          <Route path="/list" element={<App />} />
          <Route path="/summary" element={<App />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
