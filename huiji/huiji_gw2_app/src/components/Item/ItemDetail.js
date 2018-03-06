import React from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import { CircularProgress } from 'material-ui/Progress'
import ItemCard from './ItemCard'
import axios from 'axios'
import Typography from 'material-ui/Typography'
import Recipe from '../Recipe'

const styles = {
	card: {
		maxWidth: '100%',
	},
	media: {
		height: 200,
	},
}

class ItemInputRecipe extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			loading: true,
			list: []
		}
	}

	componentDidMount () {
		const {id} = this.props
		axios.get(`https://api.guildwars2.com/v2/recipes/search?input=${id}`).then(res => {
			const output_recipes = res.data
			return output_recipes
		}).then(output_recipes => {

			if (output_recipes.length) {
				axios.get(`https://api.guildwars2.com/v2/recipes?ids=${output_recipes.join()}`).then(res => {
					const recipe_list = res.data
					const output_item_ids = recipe_list.map(item => {
						return item.output_item_id
					})
					return output_item_ids
				}).then(output_item_ids => {
					axios.get(`https://api.guildwars2.com/v2/items?ids=${output_item_ids.join()}&lang=zh`).then(res => {
						const item_data_list = res.data
						this.setState({
							loading: false,
							list: item_data_list
						})
					})
				})
			} else {
				this.setState({
					loading: false
				})
			}

		})
	}

	render () {
		const {loading, list} = this.state
		return loading ? <CircularProgress/> : <div>
			{
				list.map(item => {
					return <div key={item.id}>
						<ItemCard data={item}/>
					</div>
				})
			}
		</div>
	}
}

class ItemDetail extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			data: {},
			loading: true
		}
	}

	componentDidMount () {
		const {id} = this.props.match.params

		axios.get(`https://gw2.huijiwiki.com/api/rest_v1/namespace/data?filter={"id":${id}}`).then(res => {
			if (res.data._returned) {
				this.setState({
					data: res.data._embedded[0],
					loading: false
				})
			}
		})
	}

	render () {
		const {
			data: {
				name, icon, chat_link, description, rarity, id, type
			}, loading
		} = this.state

		const {classes} = this.props
		return (
			loading ? <CircularProgress/> : <div>
				<Card className={classes.card}>
					<CardHeader
						avatar={
							<img src={icon} alt="" width={64} height={64}/>
						}
						title={<span className={rarity}>{name}</span>}
						subheader={description}
					/>
					<CardContent>
						<Typography component="div">
							<h3>物品详情</h3>
							<b>聊天代码: </b> <span>{chat_link}</span>

							<h3>可以合成物品</h3>
							<ItemInputRecipe id={id}/>
							<h3>合成配方</h3>
							<Recipe item_id={id}/>
						</Typography>
					</CardContent>
				</Card>
			</div>
		)
	}
}

export default withStyles(styles)(ItemDetail)