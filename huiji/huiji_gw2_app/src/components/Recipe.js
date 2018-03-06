import React from 'react'
import Button from 'material-ui/Button'
import axios from 'axios'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import { CircularProgress } from 'material-ui/Progress'
import { withRouter } from 'react-router-dom'

class RecipeItem extends (React.Component) {
	itemJump = (item_id) => {
		console.log(item_id)
		this.props.history.push(`/item/${item_id}`)
	}

	constructor (props) {
		super(props)
		this.state = {
			data: false
		}
	}

	componentDidMount () {
		const {item_id} = this.props
		axios.get(`https://gw2.huijiwiki.com/api/rest_v1/namespace/data?filter={"id":${item_id}}`).then(res => {
			if (res.data._returned) {
				this.setState({
					data: res.data._embedded[0]
				})
			}
		})
	}

	render () {
		const {data: {name, rarity, icon}} = this.state
		const {item_id, count} = this.props
		return (
			<div>
				{
					this.state.data ? <div>
							<Button onClick={() => this.itemJump(item_id)}>
								<img src={icon} style={{
									width: 32,
									height: 32
								}}
								     alt=""/> <span style={{lineHeight: '32px'}}
								                    className={rarity}> {name}
								x {count}</span>
							</Button>
						</div>
						: <div/>
				}
			</div>
		)
	}

}

const RecipeItemW = withRouter(RecipeItem)

class Recipe extends (React.Component ) {
	handleChange = (deep) => {
		this.setState(
			deep
		)
	}

	constructor (props) {
		super(props)
		let deep = this.props.deep ? this.props.deep : 0
		this.state = {
			data: {},
			loading: true,
			deep: deep,
			max_deep: 2
		}
	}

	componentDidMount () {
		axios.get(`https://api.guildwars2.com/v2/recipes/search?output=${this.props.item_id}`).then(res => {
			let recipe_ids = res.data
			if (recipe_ids.length > 0) {
				let recipe_id = recipe_ids[0]
				const recipe_url = `https://api.guildwars2.com/v2/recipes/${recipe_id}`
				axios.get(recipe_url).then(res => {
						this.setState({
							data: res.data,
							loading: false
						})
					}
				)
			} else {
				this.setState({
					loading: false
				})
			}
		})
	}

	render () {
		let deep = this.state.deep + 1
		return (
			this.state.loading ? <CircularProgress/> : <div>
				{/*<Select*/}
				{/*value={this.state.deep}*/}
				{/*onChange={this.handleChange}*/}
				{/*>*/}
				{/*<MenuItem value={1}>1级配方</MenuItem>*/}
				{/*<MenuItem value={2}>2级配方</MenuItem>*/}
				{/*</Select>*/}
				<Table>
					<TableBody>
						{
							this.state.data.ingredients ? this.state.data.ingredients.map(item => {
									return (
										<TableRow>
											<TableCell>
												<RecipeItemW item_id={item.item_id} count={item.count}/>
											</TableCell>
											<TableCell>
												{
													this.state.deep < this.state.max_deep ?
														<Recipe item_id={item.item_id} deep={deep}/> : <div/>
												}

											</TableCell>
										</TableRow>
									)
								})
								: <div/>
						}
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default withRouter(Recipe)