import React ,{Component}from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Zoom from 'material-ui/transitions/Zoom';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/ModeEdit';
import UpIcon from 'material-ui-icons/KeyboardArrowUp';
import green from 'material-ui/colors/green';
import axios from 'axios'

import ItemCard from './ItemCard'

export default  class ItemList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			items:[],
			loading:true,
			recentItems:[]
		}
	}
	componentDidMount(){
		axios.get("https://api.guildwars2.com/v2/items").then(res=>{
			this.setState({
				items:res.data,
				loading:false,
				recentItems:res.data.slice(res.data.length-10)
			})
		})
	}
	render(){
		const {recentItems,loading} = this.state
		return (
			loading?'':
			<div>
				{
					recentItems.map(id=>{
						return <div key={id}>
							<ItemCard id={id}/>
						</div>
					})
				}

		</div>
		)
	}
}