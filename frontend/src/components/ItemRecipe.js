import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import classnames from 'classnames';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import axios from 'axios';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';


class RecipeItem extends (React.Component) {
    constructor(props) {
        super(props)
        this.state = {
            item_id: this.props.item_id,
            count: this.props.count,
            data: false
        }
    }

    componentWillMount() {
        axios.get(`api/items/${this.state.item_id}`).then(res => {
            this.setState({
                data: res.data.data,
                recipe: res.data.recipe
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data ?
                        <div>
                            <Button>
                                <img src={this.state.data.icon} style={{
                                    width: 32,
                                    height: 32
                                }}
                                     alt=""/> <span style={{lineHeight: '32px'}}
                                                    className={this.state.data.rarity}> {this.state.data.name}
                                x {this.state.count}</span>
                            </Button>
                        </div>
                        :
                        <div/>
                }
            </div>
        )
    }

}


class Recipe extends (React.Component ) {
    constructor(props) {
        super(props)
        console.log(props)
        let deep = this.props.deep ? this.props.deep : 0
        this.state = {
            data: false,
            deep: deep,
            max_deep: 2
        }
    }

    componentWillMount() {
        axios.get(`/api/items/${this.props.item_id}`).then(res => {
            let url = res.data.recipe
            if (url.length > 0) {
                axios.get(url[0]).then(res => {
                        console.log(res)
                        this.setState({
                            data: res.data.data,
                        })
                    }
                )
            }
        })
    }

    render() {
        let deep = this.state.deep + 1
        return (
            this.state.data ?
                <Table>
                    <TableBody>
                        {
                            this.state.data ?
                                this.state.data.ingredients.map(item => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <RecipeItem item_id={item.item_id} count={item.count}/>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    this.state.deep < this.state.max_deep ?
                                                        <Recipe item_id={item.item_id} deep={deep}/> :
                                                        <div/>
                                                }

                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                :
                                <div/>
                        }
                    </TableBody>
                </Table>
                :
                <div/>
        )
    }
}

export default class Recipes extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.location.item_id)
    }

    componentWillMount() {
    }

    render() {
        return (
            <div style={{border: '1px solid #eee'}}>
                <Recipe item_id={this.props.location.item_id}/>
            </div>
        )
    }
}