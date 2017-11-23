// import AppBar from '../components/AppBar';
import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import axios from 'axios';
import {FormControl, FormHelperText} from 'material-ui/Form';
import ItemCard from '../components/ItemCard'
import Button from 'material-ui/Button';

export default class Index extends (Component) {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            url: '/api/items',
            data: [],
            qword: this.props.location.state ? this.props.location.state.qword : '',
            next: false,
            pull_done: false,
        }
    }

    componentWillMount() {
        this.getData()
    }

    getData = (url) => {
        let _url = url ? url.split("8000")[1] : this.state.url
        let qword = url ? this.state.qword : false
        console.log(_url)
        let params = qword ? {} : {search: this.state.qword}
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
            <div>
                {
                    this.state.data.map(item => {
                        return (<ItemCard
                            item={item.data}
                            history={this.props.history}
                            recipe={item.recipe}
                        />)
                    })

                }
                {
                    this.state.pull_done ?
                        <p>加载完毕</p>
                        :
                        <Button dense onClick={(e) => this.getData(this.state.next)}>加载更多</Button>
                }


            </div>
        )
    }
}
