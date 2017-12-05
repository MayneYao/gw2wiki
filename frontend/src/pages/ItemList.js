// import AppBar from '../components/AppBar';
import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import axios from 'axios';
import {FormControl, FormHelperText} from 'material-ui/Form';
import ItemCard from '../components/ItemCard'
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

export default class Index extends (Component) {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            url: '/api/items',
            data: [],
            qword: this.props.qword ? this.props.qword : '',
            next: false,
            pull_done: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({qword: nextProps.qword});
    }

    componentWillMount() {
        this.getData()
    }

    getData = (url) => {
        let _url = url ? url : this.state.url
        let qword = url ? this.state.qword : false
        console.log(_url)
        let params = qword ? {} : {q: this.state.qword}
        axios.get(_url, {
            params: params
        }).then(res => {
            this.setState({
                data: [...this.state.data, ...res.data.results],
                next: res.data.next,
                pull_done: res.data.next ? false : true
            })
            console.log(this.state.data)
        })
    }

    render() {
        return (
            <Grid container style={{width: 414}}>
                {
                    this.state.data.map(item => {
                        return (<ItemCard
                            item={item.data}
                            // history={this.props.history}
                            recipe={item.recipe}
                        />)
                    })

                }
                {
                    this.state.pull_done ?
                        <div>找不到更多了哦:D</div>
                        :
                        <Button raised dense onClick={(e) => this.getData(this.state.next)}
                                style={{width: '100%'}}>加载更多</Button>
                }


            </Grid>
        )
    }
}
