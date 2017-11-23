// import AppBar from '../components/AppBar';
import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import axios from 'axios';
import {FormControl, FormHelperText} from 'material-ui/Form';
import ItemCard from '../components/ItemCard'
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%'
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    searchbox: {
        margin: 'auto',
    }
});

export default class Index extends (Component) {
    state = {
        name: '',
        data: []
    }

    handleChange = (e) => {
        console.log(e)
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = () => {
        this.props.history.push({
            pathname:'/items',
            state:{
                qword:this.state.name
            }
        })
    }

    handleEnter = (event) => {
        if (event.charCode == 13) {
            event.preventDefault();
            event.stopPropagation();
            this.handleSubmit()
        }
    }

    render() {
        return (
            <div className={'container'}>
                {/*<AppBar/>*/}
                <FormControl style={styles.formControl}>
                    <Input id="qword" value={this.state.name} onChange={this.handleChange} onSubmit={this.handleSubmit}
                           placeholder='Coming Soon'
                           onKeyPress={this.handleEnter}

                    />

                </FormControl>
            </div>
        )
    }
}





