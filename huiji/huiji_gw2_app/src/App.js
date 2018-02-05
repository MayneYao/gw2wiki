import React, { PureComponent } from 'react'
import { HashRouter as Router, Route, } from 'react-router-dom'
import Home from './components/Home'
import './App.css'

import Recipe from './components/Recipe'

class App extends PureComponent {

	render () {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home}/>
					<Route path="/recipe/:id" component={Recipe}/>
				</div>
			</Router>
		)
	}
}

export default App
