// import React, { useState, useEffect } from "react";
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
import Navbar from "./components/Navbar";
import NavMenu from './components/NavMenu';
import BlogPost from './pages/BlogPost';
import AdminPost from './pages/AdminPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { AuthContext } from "./context/auth";
// import axios from 'axios';
import TFTELogo from './img/TFTElogo.png';
import './App.css';

function App(props) {
	// Auth
	const existingTokens = JSON.parse(localStorage.getItem("tokens"));
	const [authTokens, setAuthTokens] = useState(existingTokens);
	const setTokens = (data) => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	}

	// Other
	const [displayMenu, setDisplayMenu] = useState(false);
	// const [posts, setPosts] = useState([]);

	// useEffect(() => {
	// 	axios.get('http://localhost:9001/posts')
	// 		.then(res =>  {
	// 			console.log('API CALLED', res)
	// 			// res.data.results.forEach(function(person) {
	// 			// 	people.push(person);
	// 			// })
	// 		})
	// 		.catch(err => {
	// 			console.log('Error in get request', err);
	// 		})
	//   }, [posts]);

	//   console.log(people);
	function toggleMenu() {
		if(displayMenu) {
			setDisplayMenu(false);
		} else {
			setDisplayMenu(true);
		}
	}

	function handleMouseUp(e) {
		toggleMenu();
	}
	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router>
				<div>
					<Navbar toggleMenu={toggleMenu} />
					<NavMenu displayMenu={displayMenu} handleMouseUp={handleMouseUp}/>
					{/* <ul>
						<li>
						<Link to="/">Home Page</Link>
						</li>
						<li>
						<Link to="/admin">Admin Page</Link>
						</li>
						<li>
							<Link to="/login">Admin Login</Link>
						</li>
					</ul> */}
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/minimalism" component={Minimalism} />
					<Route path="/forthehome" component={ForTheHome} />
					<Route path="/lifestyle" component={Lifestyle} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<Route path="/blogpost/:id" component={BlogPost} />
					<PrivateRoute path="/admin" component={Admin} />
					<PrivateRoute path="/adminpost/:id" component={AdminPost} />
					<PrivateRoute path="/createpost" component={CreatePost} />
					<PrivateRoute path="/editpost/:id" component={EditPost} />
				</div>
			</Router>
		</AuthContext.Provider>
  );
}

export default App;