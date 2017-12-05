// import AppBar from '../components/AppBar';
import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import axios from 'axios';
import {FormControl, FormHelperText} from 'material-ui/Form';
import ItemCard from '../components/ItemCard'
import Button from 'material-ui/Button';
import SearchTabs from '../pages/SearchTabs';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%'
    },
    formControl: {
        width: '100%',
        margin: theme.spacing.unit,
    },
    searchbox: {
        margin: 'auto',
    }
});

export default class Index extends (Component) {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            qword: this.props.qword,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({qword: nextProps.qword});
    }

    render() {
        return (
            <Grid container justify='center'>
                <Grid item sm={12} xs={12} md={6}>
                    {
                        this.state.qword ?
                            <SearchTabs qword={this.state.qword}/>
                            :
                            <div/>
                    }
                </Grid>
            </Grid>
        )
    }
}





