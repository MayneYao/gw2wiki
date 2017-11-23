// import AppBar from '../components/AppBar';
import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import axios from 'axios';
import {FormControl, FormHelperText} from 'material-ui/Form';
import ItemCard from '../components/ItemCard'
import Button from 'material-ui/Button';

import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export default class ItemInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.location.data ? this.props.location.data : false
        }
        console.log(props)
    }

    componentWillMount() {
        console.log(this.props.history)
    }

    render() {
        return (
            <div>
                    <Card>
                        <CardHeader
                            avatar={<img src={this.state.data.icon} alt=""/>}
                            title={this.state.data.name}
                            subheader={this.state.data.description}/>

                    </Card>
            </div>
        )
    }

}