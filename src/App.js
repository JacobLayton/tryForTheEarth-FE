import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from "./pages/Login";
import Minimalism from "./pages/Minimalism";
import ProductReviews from "./pages/ProductReviews";
import ForTheHome from "./pages/ForTheHome";
import Lifestyle from "./pages/Lifestyle";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import BlogPost from './pages/BlogPost';
import AdminPost from './pages/AdminPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { AuthContext } from "./context/auth";
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);

function App(props) {
	// Auth
	const existingTokens = JSON.parse(localStorage.getItem("tokens"));
	const [authTokens, setAuthTokens] = useState(existingTokens);
	const setTokens = (data) => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	}
	// Nav
	const [displayMenu, setDisplayMenu] = useState(false);

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
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/category/minimalism" component={Minimalism} />
					<Route path="/category/product_reviews" component={ProductReviews} />
					<Route path="/category/for_the_home" component={ForTheHome} />
					<Route path="/category/lifestyle" component={Lifestyle} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<Route path="/blogpost/:id" component={BlogPost} />
					<PrivateRoute path="/admin" component={Admin} />
					<PrivateRoute path="/adminpost/:id" component={AdminPost} />
					<PrivateRoute path="/createpost" component={CreatePost} />
					<PrivateRoute path="/editpost/:id" component={EditPost} />
					<Footer />
				</div>
			</Router>
		</AuthContext.Provider>
  );
}

export default App;