import React, {Component} from 'react';
import Input, {InputLabel} from 'material-ui/Input';
import axios from 'axios';
import {FormControl, FormHelperText} from 'material-ui/Form';
import WikiCard from '../components/WikiCard'
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

export default class Index extends (Component) {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            url: 'http://gw2.huijiwiki.com/api.php?action=opensearch&format=json',
            data: [[]],
            qword: this.props.qword ? this.props.qword : '',
            loading: true
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
        let params = qword ? {} : {search: this.state.qword}
        axios.get(_url, {
            params: params
        }).then(res => {
            this.setState({
                data: [...this.state.data, ...res.data],
                loading: false
            })
            console.log(this.state.data)
        })
    }

    render() {
        return (
            <Grid container spacing={16}>
                {
                    this.state.loading ?
                        <span>加载中</span>
                        :
                        this.state.data[2].map((item, index) => {
                            let wiki_data = {
                                name: item,
                                desc: this.state.data[3][index],
                                url: this.state.data[4][index]
                            }
                            return (<WikiCard
                                data={wiki_data}
                            />)
                        })

                }
            </Grid>
        )
    }
}
