import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";

import TodosList from "./components/todos-list";
import AddTodo from "./components/add-todo";
import Signup from "./components/signup";
import Login from "./components/login";

import TodoDataService from "./services/todos";

function App() {
	const [user, setUser] = useState("");
	const [token, setToken] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(storedUser);
		}
	}, []);

	function handleLogin(user) {
		TodoDataService.login(user)
			.then(response => {
				const { token } = response.data;
				setUser(user.username);
				setToken(token);
				localStorage.setItem("token", token);
				localStorage.setItem("user", user.username);
			})
			.catch(error => {
				console.log('login', error);
				setError(error.toString());
			});
	}

	function handleLogout() {
		setToken("");
		setUser("");
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	}

	function handleSignup(user) {
		TodoDataService.signup(user)
			.then(response => {
				const { token } = response.data;
				setToken(token);
				setUser(user.username);
				localStorage.setItem("token", token);
				localStorage.setItem("user", user.username);
			})
			.catch(error => {
				console.log(error);
				setError(error.toString());
			});
	}

	return (
		<div className="App">
			<Navbar bg="primary" variant="dark">
				<div className="container-fluid">
					<NavbarBrand>TodosApp</NavbarBrand>
					<Nav className="navbar">
						<Container>
							<Link className="nav-link" to="/todos">
								Todos
							</Link>
							{user ? (
								<Link className="nav-link" onClick={handleLogout}>
									Logout ({user})
								</Link>
							) : (
								<>
									<Link className="nav-link" to="/login">
										Login
									</Link>
									<Link className="nav-link" to="/signup">
										Signup
									</Link>
								</>
							)}
						</Container>
					</Nav>
				</div>
			</Navbar>

			<Container className="mt-4">
				<Switch>
					<Route exact path={["/", "/todos"]} component={() => <TodosList token={token} />} />
					<Route path="/todos/create" component={() => <AddTodo token={token} />} />
					<Route path="/todos/:id" component={() => <AddTodo token={token} />} />
					<Route path="/login" component={() => <Login login={handleLogin} />} />
					<Route path="/signup" component={() => <Signup signup={handleSignup} />} />
				</Switch>
			</Container>

			<Navbar
				className="main-footer d-flex justify-content-center navbarContainer bg-dark bg-opacity-25"
				fixed="bottom"
			>
				<Nav>
					<Nav.Link href="#">About us</Nav.Link>
					<Nav.Link href="#">Contact us</Nav.Link>
					<Nav.Link href="#">Join us</Nav.Link>
				</Nav>
			</Navbar>
		</div>
	);
}

export default App;
