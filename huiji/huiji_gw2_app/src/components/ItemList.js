import React from 'react'
import axios from 'axios'
import { CircularProgress } from 'material-ui/Progress'

import ItemCard from './ItemCard'

export default class ItemList extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			items: [],
			loading: true,
			recentItems: []
		}
	}

	componentDidMount () {
		axios.get('https://api.guildwars2.com/v2/items').then(res => {
			this.setState({
				items: res.data,
				loading: false,
				recentItems: res.data.slice(res.data.length - 10)
			})
		})
	}

	render () {
		const {recentItems, loading} = this.state
		return (
			loading ? <CircularProgress/> : <div>
				{
					recentItems.map(id => {
						return <div key={id}>
							<ItemCard id={id}/>
						</div>
					})
				}

			</div>
		)
	}
}