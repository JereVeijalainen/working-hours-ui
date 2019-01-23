import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './components/App';

const routes = (
	<Router>
		<div>
			<nav className="menu">
				<Link to="/">Home</Link>
				<Link to="/list">Work time list</Link>
				<Link to="/add">Add work time</Link>
			</nav>
			<Route path="/" component={App} />
		</div>
	</Router>
)

export default routes
