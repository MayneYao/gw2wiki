import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './pages/Index';
import ItemList from './pages/ItemList';
import ItemInfo from './pages/ItemInfo';
import Recipe from './components/ItemRecipe'
import AppBar from './components/Drawer';

import {
    HashRouter as Router,
    Route,
    Link,
} from 'react-router-dom'


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            qword: false
        }
    }

    setQword = (qw) => {
        this.setState({
            qword: qw
        })
        console.log(qw)
        console.log(this.props.history)
    }

    render() {
        return (
            <Router>
                <div style={{width: '100%', height: '100%'}}>
                    <AppBar setQword={this.setQword}/>
                    {/*<Index qword={this.state.qword}/>*/}
                    <div className='container'>
                        <Route exact path="/" render={() => <Index qword={this.state.qword}/>}/>
                        {/*<Route path="/items" component={ItemList}/>*/}
                        {/*<Route path="/item/:id" component={ItemInfo}/>*/}
                        <Route path="/recipe/:id" component={Recipe}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
