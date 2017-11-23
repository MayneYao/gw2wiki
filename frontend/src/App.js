import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './pages/Index';
import ItemList from './pages/ItemList';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Index}/>
                    <Route path="/items" component={ItemList}/>
                </div>
            </Router>
        );
    }
}

export default App;
