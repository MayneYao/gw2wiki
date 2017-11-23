import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './pages/Index';
import ItemList from './pages/ItemList';
import ItemInfo from './pages/ItemInfo';

import {
    HashRouter as Router,
    Route,
    Link,
} from 'react-router-dom'


class App extends Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Route exact path="/" component={Index}/>
                    <Route path="/items" component={ItemList}/>
                    <Route path="/item/:id" component={ItemInfo}/>
                </div>
            </Router>
        );
    }
}

export default App;
