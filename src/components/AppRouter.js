import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
          <Link to="/api">Api Example</Link> {/* TODO: Poista kun ei enää tarpeen. */}
        </nav>
        <Route path="/" component={App} />
      </div>
    </Router>
  );
}

export default AppRouter;
