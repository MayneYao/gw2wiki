import React from 'react'
import Button from 'material-ui/Button'
import axios from 'axios'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import { CircularProgress } from 'material-ui/Progress'

class RecipeItem extends (React.Component) {
	constructor (props) {
		super(props)
		this.state = {
			data: false
		}
	}

	componentDidMount () {
		const {item_id} = this.props
		axios.get(`https://api.guildwars2.com/v2/items/${item_id}?lang=zh`).then(res => {
			this.setState({
				data: res.data
			})
		})
	}

	render () {
		const {data: {name, rarity, icon}} = this.state
		const {item_id, count} = this.props
		return (
			<div>
				{
					this.state.data ? <div>
							<Button>
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

export default class Recipe extends (React.Component ) {
	handleChange = (deep) => {
		this.setState(
			deep
		)
	}

	constructor (props) {
		super(props)
		console.log(props)
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
						console.log(res)
						this.setState({
							data: res.data,
							loading: false
						})
					}
				)
			}else{
				this.setState({
					loading:false
				})
			}
		})
	}

	render () {
		let deep = this.state.deep + 1
		console.log(this.state.data)
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
												<RecipeItem item_id={item.item_id} count={item.count}/>
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

// export default class Recipes extends React.Component {
// 	render () {
// 		return (
// 			<Grid container justify='center' style={{paddingTop: 20}}>
// 				<Grid item md={8}>
// 					<div style={{border: '1px solid #eee'}}>
// 						<Recipe item_id={this.props.match.params.id}/>
// 					</div>
// 				</Grid>
// 			</Grid>
// 		)
// 	}
// }