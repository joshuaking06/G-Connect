import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import components
import Login from './auth/Login'
import Home from './home/Home'
import NavBar from './common/Navbar'
import Register from './auth/Register'
import Search from './search/Search'
import News from './news/News'

class App extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<main>
						<NavBar />
						<Switch>
							<Route path="/games/:id" component={Login} />
							<Route path="/news" component={News} />
							<Route path="/search" component={Search} />
							<Route path="/register" component={Register} />
							<Route path="/login" component={Login} />
							<Route path="/" component={Home} />
						</Switch>
					</main>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
