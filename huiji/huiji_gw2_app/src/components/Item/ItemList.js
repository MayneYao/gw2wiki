import React from 'react'
import axios from 'axios'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import ItemCard from './ItemCard'

export default class ItemList extends React.Component {

	getItems = (ids) => {
		const qids = ids.join()
		axios.get(`https://api.guildwars2.com/v2/items?ids=${qids}&lang=zh`).then(res => {
			const {items, page} = this.state
			this.setState({
				items: items.concat(res.data),
				loading: false,
				page: page + 1
			})
		})
	}
	getMore = () => {
		const {page, ids, pageSize} = this.state
		const nextPage = page + 1
		const nextIds = ids.slice(page * pageSize, nextPage * pageSize)
		this.getItems(nextIds)
	}

	constructor (props) {
		super(props)
		this.state = {
			items: [],
			ids: [],
			loading: true,
			page: 1,
			pageSize: 10,
		}
	}

	componentDidMount () {
		const {page, pageSize, items} = this.state
		axios.get(`https://api.guildwars2.com/v2/items`).then(res => {
			this.setState({
				ids: res.data.reverse(),
			})
			const new_item_ids = res.data.slice(0, 10)
			return new_item_ids
		}).then(new_item_ids => {
			this.getItems(new_item_ids)
		})
	}

	render () {
		const {items, loading} = this.state
		return (
			loading ? <CircularProgress/> : <div>
				{
					items.map(item => {
						return <div key={item.id}>
							<ItemCard data={item}/>

						</div>
					})

				}
				<div style={{textAlign:'center'}}>
					<Button onClick={this.getMore} color="primary">更多</Button>
				</div>

			</div>
		)
	}
}