import AppBar from '../components/AppBar';
import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import axios from 'axios';
import {FormControl, FormHelperText} from 'material-ui/Form';

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
        name: ''
    }

    handleChange = (e) => {
        console.log(e)
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log(e)
    }

    handleEnter = (e) => {
        console.log(e)
    }

    render() {
        return (
            <div className={'container'}>
                {/*<AppBar/>*/}
                <FormControl style={styles.formControl}>
                    <Input id="qword" value={this.state.name} onChange={this.handleChange} onSubmit={this.handleSubmit}
                           placeholder='Coming Soon'
                    />
                </FormControl>
            </div>
        )
    }
}





