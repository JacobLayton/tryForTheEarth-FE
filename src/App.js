import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from "./pages/Login";
import Minimalism from "./pages/Minimalism";
import ForTheHome from "./pages/ForTheHome";
import Lifestyle from "./pages/Lifestyle";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar"
import { AuthContext } from "./context/auth";

function App(props) {
	const existingTokens = JSON.parse(localStorage.getItem("tokens"));
	const [authTokens, setAuthTokens] = useState(existingTokens);

	const setTokens = (data) => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	}
	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router>
				<div>
					<Navbar />
					<ul>
						<li>
						<Link to="/">Home Page</Link>
						</li>
						<li>
						<Link to="/admin">Admin Page</Link>
						</li>
						<li>
							<Link to="/login">Admin Login</Link>
						</li>
					</ul>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/minimalism" component={Minimalism} />
					<Route path="/forthehome" component={ForTheHome} />
					<Route path="/lifestyle" component={Lifestyle} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<PrivateRoute path="/admin" component={Admin} />
				</div>
			</Router>
		</AuthContext.Provider>
  );
}

export default App;