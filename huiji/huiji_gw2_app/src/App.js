import React, { PureComponent } from 'react'
import { HashRouter as Router, Route, } from 'react-router-dom'
import Home from './components/Home'
import './App.css'

import Recipe from './components/Recipe'
import ItemDetail from './components/Item/ItemDetail'

class App extends PureComponent {

	render () {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home}/>
					{/*<Route path="/recipe/:id" component={Recipe}/>*/}
					<Route path="/item/:id" component={ItemDetail}/>
				</div>
			</Router>
		)
	}
}

export default App
