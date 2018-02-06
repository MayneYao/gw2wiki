import React from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader } from 'material-ui/Card'
import {withRouter} from "react-router-dom";


class ItemCard extends React.Component {
	handleClick = (id)=>{
		console.log(id)
		this.props.history.push(`/item/${id}`);
	}
	// constructor (props) {
	// 	super(props)
	// 	this.state = {
	// 		data: {},
	// 		loading: true
	// 	}
	// }

	// componentDidMount () {
	// 	const {id} = this.props
	// 	axios.get(`https://api.guildwars2.com/v2/items/${id}?lang=zh`).then(res => {
	// 		this.setState({
	// 			data: res.data,
	// 			loading: false
	// 		})
	// 	})
	// }

	render () {
		const {
			classes, data: {
				name, icon, chat_link, description, rarity,id
			}
		} = this.props
		return (
			<div>
				<Card style={ {
					maxWidth: '100%',
				}} onClick={()=>this.handleClick(id)}>
					<CardHeader
						avatar={
							<img src={icon} alt="" width={64} height={64}/>
						}
						title={<span className={rarity}>{name}</span>}
						subheader={description}
					/>
					{/*<CardMedia*/}
					{/*className={classes.media}*/}
					{/*image={icon}*/}
					{/*title={name}*/}
					{/*/>*/}
					{/*<CardContent>*/}
					{/*<Typography variant="headline" component="h2">*/}
					{/*{name}*/}
					{/*</Typography>*/}
					{/*<Typography component="p">*/}
					{/*{description}*/}
					{/*</Typography>*/}
					{/*</CardContent>*/}
					{/*<CardActions>*/}
					{/*<Button size="small" color="primary">*/}
					{/*Share*/}
					{/*</Button>*/}
					{/*<Button size="small" color="primary">*/}
					{/*Learn More*/}
					{/*</Button>*/}
					{/*</CardActions>*/}
				</Card>

			</div>
		)
	}
}

export default withRouter(ItemCard)