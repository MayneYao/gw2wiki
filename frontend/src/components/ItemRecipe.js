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
import List, { ListItem, ListItemText } from 'material-ui/List';

// class ItemLine extends (React.Component) {
//     constructor(props){
//         super(props)
//     }
//     render() {
//         return(
//             <div>
//                 <img src={this.props.data.icon} alt=""/><span>{this.props.data.name}</span>
//             </div>
//         )
//     }
// }

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
                data: res.data.data
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data ?
                        <div style={{display:'flex'}}
                        >
                            <img src={this.state.data.icon} style={{
                                width:32,
                                height:32
                            }}
                                 alt=""/> <span style={{ lineHeight: '32px'}}> {this.state.data.name} x {this.state.count}</span>
                        </div>
                        :
                        <div/>
                }
            </div>
        )
    }

}


export default class Recipe extends (React.Component ) {
    constructor(props) {
        super(props)
        this.state = {
            recipe_url: this.props.recipe_url,
            data: false
        }
    }

    componentWillMount() {
        axios.get(this.state.recipe_url).then(res => {
            console.log(res)
                this.setState({
                    data: res.data.data
                })
            }
        )
    }

    render() {
        return (
            <div>
                {
                    this.state.data ?
                        this.state.data.ingredients.map(item => {
                            return <RecipeItem item_id={item.item_id} count={item.count}/>
                        })
                        :
                        <div/>
                }
            </div>
        )
    }
}
