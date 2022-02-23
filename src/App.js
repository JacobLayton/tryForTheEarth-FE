import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from "./pages/Login";
import Minimalism from "./pages/Minimalism";
import ProductReviews from "./pages/ProductReviews";
import ForTheHome from "./pages/ForTheHome";
import Lifestyle from "./pages/Lifestyle";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import NavMenu from './components/NavMenu';
import ScrollUpArrow from './components/ScrollUpArrow';
import Footer from './components/Footer';
import BlogPost from './pages/BlogPost';
import AdminPost from './pages/AdminPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { AuthContext } from "./context/auth";
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
					<Route path="/loading" component={LoadingSpinner} />
					<Route path="/minimalism" component={Minimalism} />
					<Route path="/product_mentions" component={ProductReviews} />
					<Route path="/homemade" component={ForTheHome} />
					<Route path="/lifestyle" component={Lifestyle} />
					<Route path="/contact" component={Contact} />
					<Route path="/blogpost/:id" component={BlogPost} />
					<Route path="/privacypolicy" component={PrivacyPolicy} />
					<PrivateRoute path="/admin" component={Admin} />
					<PrivateRoute path="/adminpost/:id" component={AdminPost} />
					<PrivateRoute path="/createpost" component={CreatePost} />
					<PrivateRoute path="/editpost/:id" component={EditPost} />
					<ScrollUpArrow />
					<Footer />
				</div>
			</Router>
		</AuthContext.Provider>
  );
}

export default App;