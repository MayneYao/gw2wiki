import React from 'react'
import axios from 'axios'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader } from 'material-ui/Card'

const styles = {
	card: {
		maxWidth: 345,
	},
	media: {
		height: 200,
	},
}

class ItemCard extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			data: {},
			loading: true
		}
	}

	componentDidMount () {
		const {id} = this.props
		axios.get(`https://api.guildwars2.com/v2/items/${id}?lang=zh`).then(res => {
			this.setState({
				data: res.data,
				loading: false
			})
		})
	}

	render () {
		const {
			data: {
				name, icon, chat_link, description
			}, loading
		} = this.state
		const {classes} = this.props
		return (
			loading ? '' : <div>
				<Card className={classes.card}>
					<CardHeader
						avatar={
							<img src={icon} alt=""/>
						}

						title={name}
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

export default withStyles(styles)(ItemCard)